"use client";

import { geistMonoFont, interFont } from "@/src/ui/fonts";
import "@/src/ui/css/globals.tailwind.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Sidebar from "@/src/ui/components/NavBar/Sidebar";
import { useSidebarStore } from "@/src/lib/stores/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create a client
  const queryClient = new QueryClient();

  // Sidebar open State
  const sidebarOpenState = useSidebarStore((state) => state.open);

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="PPFO" />
      </head>
      <body
        className={`${sidebarOpenState ? "ms-[320px]" : ""} ${
          interFont.variable
        } ${geistMonoFont.variable} antialiased duration-300 transition-all`}
      >
        <QueryClientProvider client={queryClient}>
          {children}

          {/* Overlays */}
          <Sidebar />
        </QueryClientProvider>
      </body>
    </html>
  );
}
