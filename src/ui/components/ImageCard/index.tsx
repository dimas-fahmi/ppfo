import { SelectMedia } from "@/src/db/schema/media";
import React from "react";
import { truncateString } from "@/src/lib/utils/truncateString";

const ImageCard = ({ item }: { item: SelectMedia }) => {
  return (
    <div
      key={item?.id}
      className="relative break-inside-avoid overflow-hidden rounded-lg shadow-xl cursor-pointer group/card"
    >
      <img
        src={item?.mediaPath}
        alt={item?.mediaAlt}
        className="group-hover/card:brightness-20 transition-all duration-300 w-full object-cover rounded-lg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex justify-center items-center text-white">
        {/* Wrapper */}
        <div className="min-w-[80%] space-y-4 p-4">
          {/* Media Name */}
          <div className="flex flex-col">
            <span className="text-xs font-light">Media Name</span>
            <span className="font-light text-sm italic">
              {truncateString(item.mediaName, 5, true)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
