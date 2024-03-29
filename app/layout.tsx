import "./ui/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { ThemeProvider } from "@/app/components/theme-provider";
import { Navbar } from "@/app/components/navbar";
import { cn } from "@/app/lib/utils";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Investify",
  description:
    "Investify is a platform for investing in the future of markets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  types: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={cn(inter.className, "antialiased")}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
