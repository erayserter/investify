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
import { Angry, Frown, Laugh, Meh, Smile } from "lucide-react";
  
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

    function formatDateTime(dateTimeString:string) {
      const year = parseInt(dateTimeString.substring(0, 4));
      const month = parseInt(dateTimeString.substring(4, 6));
      const day = parseInt(dateTimeString.substring(6, 8));
      const hour = parseInt(dateTimeString.substring(9, 11));
      const minute = parseInt(dateTimeString.substring(11, 13));
      const second = parseInt(dateTimeString.substring(13, 15));
  
      return new Date(year, month - 1, day, hour, minute, second);
  }
  
    function emojis(score){
      if(score < -0.4){
        return <Angry/>
      }
      else if(score < -0.1){
        return <Frown/>
      }
      else if(score < 0.1){
        return <Meh/>
      }
      else if(score < 0.4){
        return <Smile/>
      }
      else{
        return <Laugh/>
      }
    }
  // Kullanım örneği:


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Table>
            <TableCaption>A list of {id} news.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Author</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Sentiment Score</TableHead>
                <TableHead>Emojis</TableHead>
                <TableHead>Published Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {newsData.feed.map((newsItem: NewsItem) => (
                <TableRow key={newsItem.title}> 
                    <TableCell className="font-medium">{newsItem.authors.map((author) => author)}</TableCell>
                    <TableCell>{newsItem.source}</TableCell>
                    <TableCell>{newsItem.title}</TableCell>
                    <TableCell>{newsItem.ticker_sentiment.find(ticker => ticker.ticker.toLowerCase() == id)?.ticker_sentiment_score}</TableCell>
                    <TableCell>{emojis(newsItem.ticker_sentiment.find(ticker => ticker.ticker.toLowerCase() == id)?.ticker_sentiment_score)}</TableCell>
                    <TableCell className="text-right">{formatDateTime(newsItem.time_published).toLocaleString('en-US', { timeZone: 'UTC', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' })}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </main>
    );
}
/*


*/

 //KCK3AWRYB9LFSHFO