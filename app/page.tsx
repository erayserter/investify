"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BarChart4, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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
  {
    symbol: "T",
    name: "AT&T Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/at-and-t--big.svg",
  },
  {
    symbol: "VZ",
    name: "Verizon Communications Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/verizon--big.svg",
  },
  {
    symbol: "KO",
    name: "The Coca-Cola Co.",
    logo: "https://s3-symbol-logo.tradingview.com/coca-cola--big.svg",
  },
  {
    symbol: "PEP",
    name: "PepsiCo Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/pepsico--big.svg",
  },
  {
    symbol: "PG",
    name: "Procter & Gamble Co.",
    logo: "https://s3-symbol-logo.tradingview.com/procter-and-gamble--big.svg",
  },
  {
    symbol: "UNH",
    name: "UnitedHealth Group Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/unitedhealth--big.svg",
  },
  {
    symbol: "MRK",
    name: "Merck & Co. Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/merck--big.svg",
  },
  {
    symbol: "PFE",
    name: "Pfizer Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/pfizer--big.svg",
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    logo: "https://s3-symbol-logo.tradingview.com/johnson-and-johnson--big.svg",
  },
  {
    symbol: "COST",
    name: "Costco Wholesale Corp.",
    logo: "https://s3-symbol-logo.tradingview.com/costco-wholesale--big.svg",
  },
  {
    symbol: "HD",
    name: "The Home Depot Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/home-depot--big.svg",
  },
  {
    symbol: "LOW",
    name: "Lowe's Companies Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/lowe-s--big.svg",
  },
  {
    symbol: "TGT",
    name: "Target Corp.",
    logo: "https://s3-symbol-logo.tradingview.com/target--big.svg",
  },
  {
    symbol: "WBA",
    name: "Walgreens Boots Alliance Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/walgreens-boots-alliance--big.svg",
  },
  {
    symbol: "CVS",
    name: "CVS Health Corp.",
    logo: "https://s3-symbol-logo.tradingview.com/cvs-health--big.svg",
  },
  {
    symbol: "XOM",
    name: "Exxon Mobil Corp.",
    logo: "https://s3-symbol-logo.tradingview.com/exxon--big.svg",
  },
  {
    symbol: "CVX",
    name: "Chevron Corp.",
    logo: "https://s3-symbol-logo.tradingview.com/chevron--big.svg",
  },
  {
    symbol: "MRT",
    name: "Marti Technologies, Inc.",
    logo: "https://s3-symbol-logo.tradingview.com/marti-technologies--big.svg",
  },
];

export default function Home() {
  const searchParams = useSearchParams();
  const [queryStocks, setQueryStocks] = useState(stocks);

  const query = searchParams.get("q");

  const fetchQueryStocks = useCallback(async () => {
    if (!query) {
      setQueryStocks(stocks);
      return;
    }

    const filteredStocks = stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()),
    );

    setQueryStocks(filteredStocks);
  }, [query]);

  useEffect(() => {
    fetchQueryStocks();
  }, [query, fetchQueryStocks]);

  return (
    <main className="w-full">
      <h1 className="text-6xl font-extrabold">Stocks</h1>
      <div className="mt-8 flex flex-wrap gap-4">
        {queryStocks.map((stock) => (
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
