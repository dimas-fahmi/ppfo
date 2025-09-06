"use client";

import React from "react";
import { motion } from "motion/react";
import { useSidebarStore } from "@/src/lib/stores/sidebar";
import SidebarHeader from "./sections/Header";
import SidebarNavigations from "./sections/Navigations";

const Sidebar = () => {
  const openState = useSidebarStore((state) => state.open);

  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={openState ? { x: 0 } : { x: -1000 }}
      transition={{
        duration: 0.3,
      }}
      className="fixed overflow-y-scroll scrollbar-none left-0 top-0 bottom-0 p-4 bg-background text-foreground border-r w-full md:w-[320px] "
    >
      <div className="flex flex-col pb-24 space-y-6">
        {/* Header */}
        <SidebarHeader />

        {/* Navigations */}
        <SidebarNavigations />
      </div>
    </motion.div>
  );
};

export default Sidebar;
