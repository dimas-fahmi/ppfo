"use client";

import { geistMonoFont, interFont } from "@/src/ui/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="PPFO" />
      </head>
      <body
        className={`${interFont.variable} ${geistMonoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
