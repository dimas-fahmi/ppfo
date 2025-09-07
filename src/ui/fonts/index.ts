import { Geist_Mono, Inter, Oswald } from "next/font/google";

export const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const geistMonoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const oswaldFont = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});
