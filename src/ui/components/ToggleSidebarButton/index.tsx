"use client";

import { useSidebarStore } from "@/src/lib/stores/sidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "../../shadcn/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/shadcn/utils";

const ToggleSidebarButton = ({
  variant,
  className,
}: {
  variant?: VariantProps<typeof buttonVariants>;
  className?: string;
}) => {
  // Sidebar State
  const sidebarOpenState = useSidebarStore((state) => state.open);
  const toggleSidebar = useSidebarStore((state) => state.toggleOpen);

  // Render Icon
  const ToggleIcon = sidebarOpenState ? PanelLeftClose : PanelLeftOpen;

  return (
    <Button
      variant={variant?.variant ?? "default"}
      size={variant?.size ?? "default"}
      onClick={toggleSidebar}
      className={cn(
        "cursor-pointer active:scale-95 transition-all duration-300",
        className
      )}
    >
      <ToggleIcon size={24} />
    </Button>
  );
};

export default ToggleSidebarButton;
