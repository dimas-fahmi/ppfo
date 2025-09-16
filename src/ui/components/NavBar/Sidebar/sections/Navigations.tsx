"use client";

import React from "react";
import NavItem from "./NavItem";
import {
  Antenna,
  BookImage,
  HatGlasses,
  House,
  MessageSquareText,
  Newspaper,
  Plus,
} from "lucide-react";
import Dropdown from "../components/Dropdown";
import { Separator } from "@/src/ui/shadcn/components/ui/separator";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { useSession } from "@/src/lib/hooks/useSession";
import Link from "next/link";
import { useSidebarStore } from "@/src/lib/stores/sidebar";

const SidebarNavigations = () => {
  // Responsive
  const isDesktopOrTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });

  // Session
  const { data: session } = useSession();

  // Sidebar Toggle
  const toggleSidebar = useSidebarStore((s) => s.toggleOpen);

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

          {session && (
            <NavItem label="My Media" href="/media" icon={BookImage} />
          )}
        </Dropdown>
      </div>

      <Separator className="opacity-50" />

      {/* Organization */}
      {session && (
        <>
          <div>
            <Dropdown title="Organization">
              {/* <NavItem
            label="Freedom Of Assembly"
            href="/freedom-of-assembly"
            image="/resources/placeholder/pexels-mohamedelaminemsiouri-2246258.jpg"
            alt="Illustration of Demonstration"
          /> */}

              <p className="text-xs text-center font-light mb-3">
                You do not belong to any organization.
              </p>

              <Button className="w-full mt-2" variant={"outline"} asChild>
                <Link
                  href={"/organization/new"}
                  onClick={() => {
                    if (!isDesktopOrTablet) {
                      toggleSidebar();
                    }
                  }}
                >
                  <Plus />
                  Create an organization
                </Link>
              </Button>
            </Dropdown>
          </div>

          <Separator className="opacity-50" />
        </>
      )}

      {/* Navigation Two */}
      <div>
        <Dropdown title="Journalism" defaultOpen={isDesktopOrTablet}>
          <NavItem
            label="Figures & Heroes"
            href="/figures"
            image="/resources/placeholder/MunirProfile.jpg"
            alt="Munir's Profile"
          />
          <NavItem
            label="Investigative"
            href="/investigative"
            image="/resources/placeholder/Christo pic.jpg"
            alt="Christo Grozev's Profile"
          />
          <NavItem
            label="Human Rights"
            href="/human-rights"
            image="/resources/placeholder/MariaR2019_3000x1688-Header-5-scaled.jpg"
            alt="Maria Ressa's Profile"
          />
          <NavItem
            label="Opinions"
            href="/journalism/opinions"
            image="/resources/placeholder/pexels-jibarofoto-2014775.jpg"
            alt="Illustration of public debates"
          />

          <Button className="w-full mt-2" variant={"outline"}>
            <Plus />
            Publish Your Story
          </Button>
        </Dropdown>
      </div>

      <Separator className="opacity-50" />

      {/* Navigation Two */}
      <div>
        <Dropdown title="Activism & Events">
          <NavItem
            label="Freedom Of Assembly"
            href="/freedom-of-assembly"
            image="/resources/placeholder/pexels-mohamedelaminemsiouri-2246258.jpg"
            alt="Illustration of Demonstration"
          />
          <NavItem
            label="Serious Events"
            href="/events"
            image="/resources/placeholder/pexels-pluyar-4561540.jpg"
            alt="Illustration of Demonstration for Black Lives Matter"
          />
          <NavItem
            label="Movements To Support"
            href="/human-rights"
            image="/resources/placeholder/pexels-markusspiske-3039036.jpg"
            alt="Illustraion of one world banner"
          />

          <Button className="w-full mt-2" variant={"outline"}>
            <Plus />
            Create Your Movements
          </Button>
        </Dropdown>
      </div>

      <Separator className="opacity-50" />
    </nav>
  );
};

export default SidebarNavigations;
