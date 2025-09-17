"use client";

import fetchMedia from "@/src/lib/fetchers/fetchMedia";
import { useSession } from "@/src/lib/hooks/useSession";
import ImageCard from "@/src/ui/components/ImageCard";
import ToggleSidebarButton from "@/src/ui/components/ToggleSidebarButton";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ImageUp, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const MediaIndex = () => {
  // Session
  const { data: session } = useSession();
  const user = session?.user;

  // Query
  const { data } = useQuery({
    queryKey: ["media", user?.id],
    queryFn: () => fetchMedia({ mediaOwner: user?.id, includePublic: "true" }),
  });

  return (
    <div>
      {/* Header */}
      <header className="p-4 flex items-center justify-between border mb-4 rounded-md gap-4">
        <div>
          <h1 className="font-header text-2xl">Gallery</h1>
          <p className="text-sm font-light">
            This is where your uploaded images will be stored
          </p>
        </div>
        <div>
          <ToggleSidebarButton
            variant={{ variant: "outline" }}
            className="hover:bg-secondary hover:text-secondary-foreground"
          />
        </div>
      </header>

      {/* Controller */}
      <div className="fixed py-2 px-7 rounded-4xl bg-secondary bottom-5 right-5 flex gap-2 mb-6 z-40">
        <Button
          variant={"outline"}
          className="rounded-full w-10 h-10 bg-background text-foreground"
        >
          <Search />
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full w-10 h-10 bg-background text-foreground"
          asChild
        >
          <Link href={"/media/new"}>
            <ImageUp />
          </Link>
        </Button>
      </div>

      {/* Gallery Container */}
      <div
        className={`${
          data?.result && data?.result.length > 0
            ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            : "flex items-center justify-center min-h-72"
        }`}
      >
        {data?.result && data?.result.length > 0 ? (
          data?.result.map((item) => (
            // Galler Card
            <ImageCard key={item.id} item={item} />
          ))
        ) : (
          <span className="text-sm font-light">{`No picture owned, upload a new one!`}</span>
        )}
      </div>
    </div>
  );
};

export default MediaIndex;
