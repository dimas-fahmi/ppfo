"use client";

import ToggleSidebarButton from "@/src/ui/components/ToggleSidebarButton";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { ImageUp, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const placeholders = [
  "https://images.pexels.com/photos/33866528/pexels-photo-33866528.jpeg",
  "https://images.pexels.com/photos/33140582/pexels-photo-33140582.jpeg",
  "https://images.pexels.com/photos/33140583/pexels-photo-33140583.jpeg",
  "https://images.pexels.com/photos/33140584/pexels-photo-33140584.jpeg",
  "https://images.pexels.com/photos/33140585/pexels-photo-33140585.jpeg",
  "https://images.pexels.com/photos/32718971/pexels-photo-32718971.jpeg",
  "https://images.pexels.com/photos/29201821/pexels-photo-29201821.jpeg",
  "https://images.pexels.com/photos/33140586/pexels-photo-33140586.jpeg",
  "https://images.pexels.com/photos/28886583/pexels-photo-28886583.jpeg",
];

const MediaIndex = () => {
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
      <div className="fixed py-2 px-7 rounded-4xl bg-secondary bottom-5 right-5 flex gap-2 mb-6">
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
          placeholders?.length > 0
            ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            : "flex items-center justify-center min-h-72"
        }`}
      >
        {placeholders.length > 0 ? (
          placeholders.map((src, index) => (
            // Galler Card
            <div
              key={index}
              className="break-inside-avoid overflow-hidden rounded-lg shadow-xl"
            >
              <img
                src={src}
                alt={`placeholder-${index}`}
                className="w-full object-cover rounded-lg"
              />
            </div>
          ))
        ) : (
          <span className="text-sm font-light">{`No picture owned, upload a new one!`}</span>
        )}
      </div>
    </div>
  );
};

export default MediaIndex;
