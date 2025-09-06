import React from "react";
import { Menu, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSidebarStore } from "@/src/lib/stores/sidebar";

const NavBar_Mobile = () => {
  const setOpen = useSidebarStore((state) => state.setOpen);

  return (
    <nav className="flex md:hidden justify-between p-4 border-b">
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
      <button>
        <UserRound size={30} />
      </button>
    </nav>
  );
};

export default NavBar_Mobile;
