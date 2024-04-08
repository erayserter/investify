"use client";

import React from "react";
import {BarChart4, Newspaper} from "lucide-react";
import Link from "next/link";

const stocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/apple--big.svg",
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    logo: "https://s3-symbol-logo.tradingview.com/tesla--big.svg",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc. (Google) Class A",
    logo: "https://s3-symbol-logo.tradingview.com/alphabet--big.svg",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    logo: "https://s3-symbol-logo.tradingview.com/microsoft--big.svg",
  }
]

export default function Home() {
  return (
    <main>
      <h1 className="text-6xl font-extrabold">Stocks</h1>
      <div className="flex gap-4 flex-wrap mt-8">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-center p-5 pr-8 rounded-full bg-[#2a2e39] gap-6">
            <img className="rounded-full" alt={stock.symbol} src={stock.logo}/>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-xl">{stock.symbol}</p>
              <p className="font-semibold text-lg">{stock.name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Link href={`/stocks/${stock.symbol}/news`}>
                <Newspaper />
              </Link>
              <Link href={`/stocks/${stock.symbol}/chart`}>
                <BarChart4 />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

