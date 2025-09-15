import { useSignOut } from "@/src/lib/hooks/useAuth";
import { useProfile } from "@/src/lib/hooks/useProfile";
import { useSession } from "@/src/lib/hooks/useSession";
import { useSidebarStore } from "@/src/lib/stores/sidebar";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { KeyRound, PanelLeftClose, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import UserPopover from "../../../UserPopover";

const SidebarHeader = () => {
  // Session
  const { data: session } = useSession();
  const { data: profile } = useProfile();

  // SignOut
  const signOut = useSignOut();

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

      {/* Controller Button */}
      {!session && (
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button variant={"outline"} onClick={() => toggle()} asChild>
              <Link href={"https://github.com/dimas-fahmi/ppfo"}>
                <FaGithub /> Repository
              </Link>
            </Button>
            {session ? (
              <Button
                variant={"outline"}
                onClick={() => {
                  signOut.mutate();
                }}
              >
                <KeyRound /> Sign Out
              </Button>
            ) : (
              <Button variant={"outline"} onClick={() => toggle()} asChild>
                <Link href={"/auth"}>
                  <KeyRound /> Sign In
                </Link>
              </Button>
            )}
          </div>
          <Button variant={"outline"} onClick={() => toggle()} asChild>
            <Link href={"/search"}>
              <Search /> Search
            </Link>
          </Button>
        </div>
      )}

      {session && (
        <div className="space-y-2">
          <div className="flex gap-4 border rounded-md p-4">
            {/* Avatar */}
            <div className="flex justify-center items-center">
              <UserPopover className="w-14 h-14" />
            </div>

            {/* Information */}
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-xl font-header">
                  {profile?.firstName} {profile?.lastName}
                </h1>
                <p className="text-sm font-light">{profile?.username}</p>
              </div>
              <Button variant={"outline"} size={"sm"} asChild>
                <Link href="/settings">
                  <Settings />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant={"outline"} onClick={() => toggle()} asChild>
              <Link href={"/search"}>
                <Search /> Search
              </Link>
            </Button>
            {session ? (
              <Button
                variant={"outline"}
                onClick={() => {
                  signOut.mutate();
                }}
              >
                <KeyRound /> Sign Out
              </Button>
            ) : (
              <Button variant={"outline"} onClick={() => toggle()} asChild>
                <Link href={"/auth"}>
                  <KeyRound /> Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
