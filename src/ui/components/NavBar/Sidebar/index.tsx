import React from "react";
import { motion } from "motion/react";
import { useSidebarStore } from "@/src/lib/stores/sidebar";

const Sidebar = () => {
  const openState = useSidebarStore((state) => state.open);

  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={openState ? { x: 0 } : { x: -1000 }}
      transition={{
        duration: 0.3,
      }}
      className="fixed left-0 top-0 bottom-0 p-4 bg-secondary text-secondary-foreground w-[320px]"
    >
      Sidebar
    </motion.div>
  );
};

export default Sidebar;
