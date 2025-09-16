import React from "react";
import MediaIndex from "./MediaIndex";
import type { Metadata } from "next";
import { generateMetadata } from "@/src/lib/utils/generateMetadata";

export const metadata: Metadata = generateMetadata({
  title: "My Media | PPFO",
});

const MediaPage = () => {
  return <MediaIndex />;
};

export default MediaPage;
