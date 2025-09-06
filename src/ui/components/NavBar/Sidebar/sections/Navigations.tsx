"use client";

import React from "react";
import NavItem from "./NavItem";
import {
  Antenna,
  HatGlasses,
  House,
  MessageSquareText,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import Dropdown from "../components/Dropdown";
import { Separator } from "@/src/ui/shadcn/components/ui/separator";
import { useMediaQuery } from "react-responsive";

const SidebarNavigations = () => {
  const isDesktopOrTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <nav className="grid grid-cols-1 space-y-4">
      <Separator className="opacity-50" />

      {/* Navigation One */}
      <div>
        <Dropdown title="Navigation" defaultOpen={!isDesktopOrTablet}>
          <NavItem label="Feeds" href="/" icon={House} />
          <NavItem label="News" href="/news" icon={Newspaper} />
          <NavItem label="Forums" href="/forums" icon={MessageSquareText} />
          <NavItem label="Channels" href="/channels" icon={Antenna} />
          <NavItem label="Journalism" href="/journalism" icon={HatGlasses} />
          <NavItem
            label="Trusted Media"
            href="/trusted-media"
            icon={ShieldCheck}
          />
        </Dropdown>
      </div>

      <Separator className="opacity-50" />

      {/* Navigation Two */}
      <div>
        <Dropdown title="Journalism" defaultOpen={isDesktopOrTablet}>
          <NavItem label="Feeds" href="/" icon={House} />
          <NavItem label="News" href="/news" icon={Newspaper} />
          <NavItem label="Forums" href="/forums" icon={MessageSquareText} />
          <NavItem label="Channels" href="/channels" icon={Antenna} />
          <NavItem label="Journalism" href="/journalism" icon={HatGlasses} />
          <NavItem
            label="Trusted Media"
            href="/trusted-media"
            icon={ShieldCheck}
          />
        </Dropdown>
      </div>

      <Separator className="opacity-50" />
    </nav>
  );
};

export default SidebarNavigations;
