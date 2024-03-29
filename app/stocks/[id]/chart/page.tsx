"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChartComponent } from "@/app/components/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import { Database } from "lucide-react";

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

interface SignalData {
  [date: string]: {
      signal: string;
      price: number;
  };
}

export default function Chart() {
  const { id } = useParams();
  const [candleData, setCandleData] = useState<CandleDataItem[] | null>(null);
  const [signals, setSignals] = useState(null);

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

      fetch(`http://127.0.0.1:8000/${id.toString().toUpperCase()}/predict/`)
        .then((res) => res.json())
        .then((data) => setSignals(data));
  }, [id]);

  console.log(signals);
  console.log(candleData);

  if(signals == null){
    return <div> </div>
  }

  const sortedSignalData = Object.keys(signals)
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  .reduce((acc: SignalData, date) => {
    acc[date] = signals[date];
    return acc;
  }, {} as SignalData);

  return (
    <div className="h-screen w-full">
      {candleData ? (
        <>
          <ChartComponent
            data={candleData.map((item) => ({
              time: item.timestamp,
              open: parseFloat(item.data["1. open"]),
              high: parseFloat(item.data["2. high"]),
              low: parseFloat(item.data["3. low"]),
              close: parseFloat(item.data["4. close"]),
            }))}
          />
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Signal</TableHead>
                <TableHead>Current Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
    {Object.keys(sortedSignalData).map((date) => (
        <TableRow key={date}> 
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {date}
            </TableCell>
            <TableCell style={{ color: sortedSignalData[date].signal === "Long" ? "green": "red" }}>
                {sortedSignalData[date].signal}
            </TableCell>
            <TableCell>
                {sortedSignalData[date].price.toFixed(2)}
            </TableCell>
        </TableRow>
    ))}
</TableBody>
            </Table>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
