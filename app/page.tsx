"use client";

import React, {useEffect} from "react";

export default function Home() {
  const [data, setData] = React.useState(null)

  useEffect(() => {
    fetch('api/stocks/news')
        .then(res => res.json())
        .then(data => setData(data))
  })

  if (!data) return <div>Loading...</div>

  console.log(data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
