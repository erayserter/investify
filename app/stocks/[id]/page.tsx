"use client";

import { useParams } from "next/navigation";

export default function Stock() {
  const { id } = useParams();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      This is a stock page of a stock with id: {id}
    </main>
  );
}
