import React from "react";
import { CircleUser, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSidebarStore } from "@/src/lib/stores/sidebar";
import { useSession } from "@/src/lib/hooks/useSession";
import UserPopover from "../UserPopover";

const NavBar_Mobile = () => {
  // Sidebar State
  const setOpen = useSidebarStore((state) => state.setOpen);

  // Session
  const { data: session } = useSession();

  return (
    <nav className="flex md:hidden justify-between px-4 py-2 border-b">
      {/* Hamburger Button */}
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        <Menu size={30} />
      </button>

      {/* Brand */}
      <div>
        <Link href={"/ "}>
          <Image
            width={180}
            height={180}
            src={"/resources/ppfo/logos/horizontal.png"}
            alt="PPFO LOGO"
            priority
          />
        </Link>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center">
        {!session ? (
          <Link href={"/auth"}>
            <CircleUser size={30} />
          </Link>
        ) : (
          <UserPopover />
        )}
      </div>
    </nav>
  );
};

export default NavBar_Mobile;
