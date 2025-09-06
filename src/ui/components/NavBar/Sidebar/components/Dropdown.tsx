"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";

export interface DropdownProps {
  title: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

const Dropdown = ({ title, defaultOpen = false, children }: DropdownProps) => {
  // OpenState
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      {/* Trigger */}
      <button
        className="group/button hover:bg-muted hover:text-muted-foreground px-4 py-2 w-full flex justify-between cursor-pointer rounded-md"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="tracking-widest text-sm group-hover/button:opacity-100 uppercase opacity-75">
          {title}
        </span>

        <span>
          <ChevronDown
            className={`${
              !open ? "-rotate-z-180" : "rotate-z-0"
            } transition-all duration-300 opacity-75`}
          />
        </span>
      </button>

      {/* Dropdown Content Container */}
      <motion.div
        initial={{ height: 0 }}
        animate={open ? { height: "auto" } : { height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4">{children}</div>
      </motion.div>
    </div>
  );
};

export default Dropdown;
