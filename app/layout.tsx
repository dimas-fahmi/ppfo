"use client";

import { geistMonoFont, interFont } from "@/src/ui/fonts";
import "@/src/ui/css/globals.tailwind.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import NavBar from "@/src/ui/components/NavBar";
import Sidebar from "@/src/ui/components/NavBar/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="PPFO" />
      </head>
      <body
        className={`${interFont.variable} ${geistMonoFont.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          {/* NavBar */}
          <NavBar />

          {/* Body */}
          {children}

          {/* Footer */}
          <footer></footer>

          {/* Overlays */}
          <Sidebar />
        </QueryClientProvider>
      </body>
    </html>
  );
}
