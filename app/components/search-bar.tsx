"use client";

import React, {useEffect, useState} from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [stocks, setStocks] = useState([]);

    const fetchStocks = async () => {
        if (!query) {
            setStocks([]);
            return;
        }

        const response = await fetch("/api/stocks", {
            method: "POST",
            body: JSON.stringify({query}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await response.json();
        console.log(data)
        setStocks(data);
    }

    useEffect(() => {
        const timeOutId = setTimeout(fetchStocks, 750);
        return () => clearTimeout(timeOutId);
    }, [query]);

    return (
            <input
                className="h-10 bg-background rounded-lg pl-4 border border-amber-50"
                type="text"
                placeholder="Search"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
    );
};

export default SearchBar;