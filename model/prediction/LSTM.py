import numpy as np
import pandas as pd

import requests

from matplotlib import pyplot as plt
import seaborn as sns

import pickle

from sklearn.preprocessing import StandardScaler,MinMaxScaler
from sklearn.model_selection import train_test_split

import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM

tf.keras.utils.set_random_seed(42)  # sets seeds for base-python, numpy and tf
tf.config.experimental.enable_op_determinism()

from statistics import mean
from collections import defaultdict
import json
import requests

# from datetime import datetime, timedelta
#
data = requests.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=YNCMGFZYA6QVXNN9&outputsize=full')
data = data.json().get('Time Series (Daily)')
filtered_data = {k: v for k, v in data.items() if k.startswith("2023")}
array_data = [[k] + list(v.values()) for k, v in filtered_data.items()]

with open('../data.json') as f:
    data = json.load(f)

sentiments_by_date = defaultdict(list)
for item in data:
    for sentiment in item['ticker_sentiment']:
        if sentiment['ticker'] == 'AAPL':
            key = item['time_published'][:4] + "-" + item['time_published'][4:6] + "-" + item['time_published'][6:8]
            sentiments_by_date[key].append(float(sentiment['ticker_sentiment_score']) * float(sentiment['relevance_score']))

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

scaler = MinMaxScaler()
scaler = scaler.fit(df.iloc[:-30, :])
df_for_training_scaled = scaler.transform(df)

scaler_for_inference = MinMaxScaler()
scaler_for_inference.fit_transform(pd.DataFrame(df.iloc[:-30,0]))

#Empty lists to be populated using formatted training data
trainX = []
trainY = []

n_future = 1   # Number of days we want to look into the future based on the past days.
n_past = 5  # Number of past days we want to use to predict the future.

#Reformat input data into a shape: (n_samples x timesteps x n_features)
#In my example, my df_for_training_scaled has a shape (12823, 5)
#12823 refers to the number of data points and 5 refers to the columns (multi-variables).
for i in range(n_past, len(df_for_training_scaled) - n_future +1):
    trainX.append(df_for_training_scaled[i - n_past:i, 0:df.shape[1]])
    trainY.append(df_for_training_scaled[i + n_future - 1:i + n_future,[0]])

trainX, trainY = np.array(trainX), np.array(trainY)

print('TrainX shape = {}.'.format(trainX.shape))
print('TrainY shape = {}.'.format(trainY.shape))
X_train_lstm_without_news, X_test_lstm_without_news, y_train_lstm_without_news, y_test_lstm_without_news = train_test_split(trainX[:, :, :-1], trainY, test_size=30, shuffle=False)

X_train_lstm_news, X_test_lstm_news, y_train_lstm_news, y_test_lstm_news = train_test_split(trainX, trainY, test_size=30, shuffle=False)


def build_model(input_shape):
    tf.keras.utils.set_random_seed(42)
    model = Sequential()

    model.add(LSTM(units=256, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(0.2))

    model.add(LSTM(units=256, return_sequences=True))
    model.add(Dropout(0.2))

    model.add(LSTM(units=128))
    model.add(Dropout(0.2))

    model.add(Dense(units=1))
    model.summary()
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model


lstm_model_news = build_model((X_train_lstm_news.shape[1], X_train_lstm_news.shape[2]))

lstm_model_news.fit(X_train_lstm_news, y_train_lstm_news, epochs=60, batch_size=64, verbose=1, )

lstm_model_news.save('model.keras')

with open('training_scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

with open('inference_scaler.pkl', 'wb') as f:
    pickle.dump(scaler_for_inference, f)
