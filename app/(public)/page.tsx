import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { Metadata } from "next";
import Hero from "./sections/Hero";
import React from "react";

export const metadata: Metadata = generateMetadata();

export default function Home() {
  return (
    <div className="min-h-[2000px]">
      {/* Hero Section */}
      <Hero />
    </div>
  );
}
