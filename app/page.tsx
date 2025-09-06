import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata();

export default function Home() {
  return <div></div>;
}
