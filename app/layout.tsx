"use client";

import { geistMonoFont, interFont, oswaldFont } from "@/src/ui/fonts";
import "@/src/ui/css/globals.tailwind.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Sidebar from "@/src/ui/components/NavBar/Sidebar";
import { useSidebarStore } from "@/src/lib/stores/sidebar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMediaQuery } from "react-responsive";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create a client
  const queryClient = new QueryClient();

  // Sidebar open State
  const sidebarOpenState = useSidebarStore((state) => state.open);

  // Query Media
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="PPFO" />
      </head>
      <body
        className={`${isDesktop && sidebarOpenState ? "ms-[320px]" : ""} ${
          interFont.variable
        } ${geistMonoFont.variable} ${
          oswaldFont.variable
        } antialiased duration-300 transition-all`}
      >
        <QueryClientProvider client={queryClient}>
          {children}

          {/* Overlays */}
          <Sidebar />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
