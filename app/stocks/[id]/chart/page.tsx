"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChartComponent } from "@/app/components/chart";

interface CandleDataItem {
    timestamp: string;
    data: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  }

export default function Chart() {
  const { id } = useParams();
  const [candleData, setCandleData] = useState<CandleDataItem[] | null>(null);

  useEffect(() => {
    fetch(`/api/stocks/${id}/chart`)
      .then((res) => res.json())
      .then((data: { "Time Series (Daily)": CandleDataItem }) => {
        const dataArray = Object.entries(data["Time Series (Daily)"]);

        dataArray.sort(([timestampA], [timestampB]) => {
          const timeA = new Date(timestampA).getTime();
          const timeB = new Date(timestampB).getTime();

          return timeA - timeB;
        });

        const sortedData = dataArray.map(([timestamp, data]) => ({
          timestamp,
          data,
        }));

        setCandleData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching candle data:", error);
      });
  }, [id]);

  console.log(candleData);

  return (
    <div>
      {candleData ? (
        <ChartComponent data={candleData.map((item) => ({
            time: item.timestamp,
            open: parseFloat(item.data["1. open"]),
            high: parseFloat(item.data["2. high"]),
            low: parseFloat(item.data["3. low"]),
            close: parseFloat(item.data["4. close"]),
        }))} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
