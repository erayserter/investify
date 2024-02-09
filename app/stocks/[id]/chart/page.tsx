"use client";

import { useParams } from "next/navigation";
import {useEffect, useState} from "react";

export default function Chart() {
    const { id } = useParams();
    const [candleData, setCandleData] = useState(null);

    useEffect(() => {
        fetch(`/api/stocks/${id}/chart`)
            .then((res) => res.json())
            .then((data) => setCandleData(data));
    }, [id]);

    console.log(candleData);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            This is a chart page of a stock with id: {id}
        </main>
    );
}
