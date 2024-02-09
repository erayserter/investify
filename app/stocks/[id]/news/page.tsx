"use client";

import { useParams } from "next/navigation";
import {useEffect, useState} from "react";

export default function News() {
    const { id } = useParams();
    // fetch stock data with id
    const [news, setNews] = useState(null);

    useEffect(() => {
        fetch(`/api/stocks/${id}/news`)
            .then((res) => res.json())
            .then((data) => setNews(data));
    }, [id]);

    console.log(news);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            This is a news page of a stock with id: {id}
        </main>
    );
}
