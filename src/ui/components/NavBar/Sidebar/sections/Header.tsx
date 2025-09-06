import { useSidebarStore } from "@/src/lib/stores/sidebar";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { KeyRound, PanelLeftClose, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaGithub } from "react-icons/fa";

const SidebarHeader = () => {
  // Toggle Sidebar
  const toggle = useSidebarStore((state) => state.toggleOpen);

  return (
    <div className="space-y-4">
      {/* Controller */}
      <div className="flex justify-between items-center">
        {/* Brand */}
        <div>
          <Image
            width={180}
            height={71}
            src={"/resources/ppfo/logos/horizontal.png"}
            alt="PPFO Logo"
          />
        </div>

        {/* Close Button */}
        <div>
          <Button onClick={toggle}>
            <PanelLeftClose />
          </Button>
        </div>
      </div>

      {/* Search Button */}
      <div className="grid gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Button variant={"outline"}>
            <FaGithub /> Repository
          </Button>
          <Button variant={"outline"}>
            <KeyRound /> Log In
          </Button>
        </div>
        <Button variant={"outline"}>
          <Search /> Search
        </Button>
      </div>
    </div>
  );
};

export default SidebarHeader;
