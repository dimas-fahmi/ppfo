"use client";

import React from "react";
import { CircleAlert, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type IlloProps =
  | { icon: LucideIcon; image?: never; alt?: never }
  | { icon?: never; image: string; alt: string };

type Reactivity =
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void };

export interface NavItemProps {
  label: string;
}

/**
 * Renders a navigation item button that can either link to a route (`href`) or trigger an `onClick` action.
 * It supports displaying either a Lucide icon or an image, and highlights itself when the current route matches.
 *
 * @component
 *
 * @param {LucideIcon} [icon] - A Lucide icon component to display. Must not be used with `image`.
 * @param {string} [image] - A URL to an image to display instead of an icon. Must not be used with `icon`.
 * @param {string} [href] - Optional route path to navigate to when clicked.
 * @param {() => void} [onClick] - Optional click handler function. Used only if `href` is not provided.
 * @param {string} label - Text label to display next to the icon/image.
 *
 * @returns {JSX.Element} The rendered navigation item button.
 *
 * @throws {Error} If both `icon` and `image` are provided (TypeScript should prevent this).
 *
 * @example
 * <NavItem icon={HomeIcon} label="Home" href="/home" />
 *
 * @example
 * <NavItem image="/logo.png" label="Logo" onClick={() => console.log("Clicked")} />
 */
const NavItem = ({
  icon,
  image,
  label,
  href,
  onClick,
  alt,
}: NavItemProps & IlloProps & Reactivity) => {
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
      {!image ? (
        <Icon />
      ) : (
        <div>
          <Image
            width={30}
            height={30}
            src={image}
            alt={alt}
            className="w-7 h-7 rounded-full"
          />
        </div>
      )}

      <span>{label}</span>
    </button>
  );
};

export default NavItem;
