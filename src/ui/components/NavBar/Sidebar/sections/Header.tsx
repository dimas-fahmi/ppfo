import { useSidebarStore } from "@/src/lib/stores/sidebar";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { KeyRound, PanelLeftClose, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
          <Button variant={"outline"} onClick={() => toggle()} asChild>
            <Link href={"https://github.com/dimas-fahmi/ppfo"}>
              <FaGithub /> Repository
            </Link>
          </Button>
          <Button variant={"outline"} onClick={() => toggle()} asChild>
            <Link href={"/auth"}>
              <KeyRound /> Sign In
            </Link>
          </Button>
        </div>
        <Button variant={"outline"} onClick={() => toggle()} asChild>
          <Link href={"/search"}>
            <Search /> Search
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SidebarHeader;
