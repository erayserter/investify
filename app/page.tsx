"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    router.push(`/stocks/${inputValue}/chart`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter stock symbol"
        style={{ backgroundColor: "lightblue", border: "2px solid blue", padding: "8px", borderRadius: "4px" }}
      />
      <button 
        onClick={handleButtonClick}
        style={{ backgroundColor: "lightgreen", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer" }}
      >
        Go to Chart
      </button>
    </main>
  );
}

