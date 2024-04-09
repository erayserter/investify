"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const createQuery = useCallback(() => {
    if (input.length === 0) {
      router.push("/");
      return;
    }

    router.push(`/?q=${input}`);
  }, [input, router]);

  useEffect(() => {
    const timeOutId = setTimeout(createQuery, 750);
    return () => clearTimeout(timeOutId);
  }, [input, createQuery]);

  return (
    <input
      className="h-10 rounded-lg border border-amber-50 bg-background pl-4"
      type="text"
      placeholder="Search"
      value={input}
      onChange={(event) => setInput(event.target.value)}
    />
  );
};

export default SearchBar;
