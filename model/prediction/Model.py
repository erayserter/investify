import pickle
from collections import defaultdict
from statistics import mean

import numpy as np
import pandas as pd
import requests

import tensorflow as tf


class Model:
    n_future = 1
    n_past = 5

    def __init__(self):
        self.model = tf.keras.models.load_model('prediction/model.keras')
        self.training_scaler = pickle.load(open('prediction/training_scaler.pkl', 'rb'))
        self.inference_scaler = pickle.load(open('prediction/inference_scaler.pkl', 'rb'))

    def predict(self):
        data = requests.get(
            'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=YNCMGFZYA6QVXNN9')
        data = data.json().get('Time Series (Daily)')
        filtered_data = {k: v for k, v in data.items() if k.startswith("2024")}
        array_data = [[k] + list(v.values()) for k, v in filtered_data.items()]

        data = requests.get(
            'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=YNCMGFZYA6QVXNN9&limit=1000')
        data = data.json().get('feed')
        sentiments_by_date = defaultdict(list)
        for item in data:
            for sentiment in item['ticker_sentiment']:
                if sentiment['ticker'] == 'AAPL':
                    key = item['time_published'][:4] + "-" + item['time_published'][4:6] + "-" + item['time_published'][
                                                                                                 6:8]
                    sentiments_by_date[key].append(
                        float(sentiment['ticker_sentiment_score']) * float(sentiment['relevance_score']))

        # # Calculate the average sentiment score for each day
        average_sentiments = {date: mean(scores) for date, scores in sentiments_by_date.items()}
        #
        average_sentiments_df = pd.DataFrame(list(average_sentiments.items()), columns=['date', 'average_sentiment'])
        #
        # # Convert array_data to DataFrame
        array_data_df = pd.DataFrame(array_data, columns=['date', 'open', 'high', 'low', 'close', 'volume'])
        #
        # # Merge the two DataFrames on the date column
        df = pd.merge(array_data_df, average_sentiments_df, on='date')

        df = df.set_index('date').sort_index()

        df = df.drop(columns=['high', 'low', 'volume'])

        df = df[['close', 'open', 'average_sentiment']]

        df_for_training_scaled = self.training_scaler.transform(df)

        x = []

        for i in range(self.n_past, len(df_for_training_scaled) - self.n_future + 1):
            x.append(df_for_training_scaled[i - self.n_past:i, 0:df.shape[1]])

        x = np.array(x)

        pred = self.model.predict(x)

        df = df[-len(pred):]
        dates = df.index.values
        last = np.array(df)
        last = last.astype(np.float32)
        predicted = self.inference_scaler.inverse_transform(pred)

        signals = {}
        signals[dates[0]] = {"signal": "Long" if predicted[0] > last[0][0] else "Short", "price": last[0][0]}
        for i in range(1, len(predicted)):
            last_value = predicted[i - 1] > last[i - 1][0]
            predicted_value = predicted[i] > last[i][0]

            if last_value != predicted_value:
                if predicted_value:
                    signals[dates[i]] = {"signal": "Long", "price": last[i][0]}
                else:
                    signals[dates[i]] = {"signal": "Short", "price": last[i][0]}

        return signals


model = Model()
