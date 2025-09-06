"use client";

import React from "react";
import { CircleAlert, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export interface NavItemProps {
  href?: string;
  onClick?: () => void;
  label: string;
  icon: LucideIcon;
}

const NavItem = ({ icon, label, href, onClick }: NavItemProps) => {
  // Render Icon
  const Icon = icon ?? CircleAlert;

  // Router Init
  const router = useRouter();

  // Active Pathname
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <button
      className={`${
        isActive ? "bg-primary text-primary-foreground px-4" : "hover:bg-muted"
      } hover:px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 w-full`}
      onClick={
        href
          ? () => {
              router.push(href);
            }
          : onClick
      }
    >
      {/* Icon */}
      <Icon />

      <span>{label}</span>
    </button>
  );
};

export default NavItem;
