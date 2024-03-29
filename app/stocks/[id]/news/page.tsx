"use client";

import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
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
  
  interface CompanyData {
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;
    "9. matchScore": string;
  }
  
  interface JsonResponse {
    bestMatches: CompanyData[];
  }

  interface NewsData {
    items: string;
    sentiment_score_definition: string;
    relevance_score_definition: string;
    feed: NewsItem[];
  }
  
  interface NewsItem {
    title: string;
    url: string;
    time_published: string;
    authors: string[];
    summary: string;
    banner_image: string;
    source: string;
    category_within_source: string;
    source_domain: string;
    topics: Topic[];
    overall_sentiment_score: number;
    overall_sentiment_label: string;
    ticker_sentiment: TickerSentiment[];
  }
  
  interface Topic {
    topic: string;
    relevance_score: string;
  }
  
  interface TickerSentiment {
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: number;
    ticker_sentiment_label: string;
  }


export default function News() {
    const { id } = useParams();
    // fetch stock data with id
    const [news, setNews] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(`/api/stocks/${id}/news`)
            .then((res) => res.json())
            .then((data) => setNews(data));
        fetch(`/api/stocks/${id}`)
            .then((res) => res.json())
            .then((data) => setDetails(data));
    }, [id]);

    
    if(news == null){
        return <div> </div>
    }
    if(details == null){
        return <div> </div>
    }
    const jsonData: JsonResponse = details;
    const newsData: NewsData = news;
    

    return (
        <main>
            This is a news page of a stock with id: {id}
            <h2>{jsonData.bestMatches[0]["2. name"]}</h2>
            <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Author</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Published Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {newsData.feed.map((newsItem: NewsItem) => (
                <TableRow key={newsItem.title}> 
                    <TableCell className="font-medium">{newsItem.authors.map((author) => author)}</TableCell>
                    <TableCell>{newsItem.source}</TableCell>
                    <TableCell>{newsItem.title}</TableCell>
                    <TableCell className="text-right">{newsItem.time_published}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500</TableCell>
                </TableRow>
            </TableFooter>
            </Table>

        </main>
    );
}
