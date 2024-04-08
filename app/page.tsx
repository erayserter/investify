"use client";

import React from "react";
import { BarChart4, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/amazon--big.svg",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/nvidia--big.svg",
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/meta--big.svg",
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/netflix--big.svg",
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/visa--big.svg",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    logo: "https://s3-symbol-logo.tradingview.com/jpmorgan--big.svg",
  },
  {
    symbol: "WMT",
    name: "Walmart Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/walmart--big.svg",
  },
  {
    symbol: "DIS",
    name: "The Walt Disney Co.",
    logo: "https://s3-symbol-logo.tradingview.com/walt-disney--big.svg",
  },
  {
    symbol: "GS",
    name: "The Goldman Sachs Group",
    logo: "https://s3-symbol-logo.tradingview.com/golden-sachs-etf-trust-goldman--big.svg",
  },
  {
    symbol: "BA",
    name: "The Boeing Co.",
    logo: "https://s3-symbol-logo.tradingview.com/boeing--big.svg",
  },
  {
    symbol: "IBM",
    name: "IBM",
    logo: "https://s3-symbol-logo.tradingview.com/international-bus-mach--big.svg",
  },
  {
    symbol: "CSCO",
    name: "Cisco Systems Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/cisco--big.svg",
  },
  {
    symbol: "INTC",
    name: "Intel Corp.",
    logo: "https://s3-symbol-logo.tradingview.com/intel--big.svg",
  },
  {
    symbol: "ORCL",
    name: "Oracle Corp.",
    logo: "https://s3-symbol-logo.tradingview.com/oracle--big.svg",
  },
  {
    symbol: "QCOM",
    name: "Qualcomm Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/qualcomm--big.svg",
  },
];

export default function Home() {
  return (
    <main>
      <h1 className="text-6xl font-extrabold">Stocks</h1>
      <div className="mt-8 flex flex-wrap gap-4">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-center gap-6 rounded-full bg-[#2a2e39] p-5 pr-8"
          >
            <Image
              className="rounded-full"
              src={stock.logo}
              alt={stock.symbol}
              width={56}
              height={56}
            />
            <div className="flex flex-col gap-1">
              <p className="text-xl font-bold">{stock.symbol}</p>
              <p className="text-lg font-semibold">{stock.name}</p>
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
