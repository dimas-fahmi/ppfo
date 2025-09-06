"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import navigations from "@/src/lib/configs/navigations.json";
import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitter,
} from "react-icons/bi";
import { usePathname } from "next/navigation";

const NavBar_Desktop = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex layout-width flex-col border-b space-y-4">
      {/* Uptop */}
      <div className="grid grid-cols-3 pt-4 px-4">
        {/* Socials */}
        <div className="flex gap-4 items-center">
          <BiLogoFacebookCircle className="w-6 h-6" />
          <BiLogoTwitter className="w-6 h-6" />
          <BiLogoInstagramAlt className="w-6 h-6" />
        </div>

        {/* Region */}
        <div className="flex items-center justify-center">
          <ul className="flex gap-4 text-xs">
            <li>International</li>
            <li>Asia</li>
            <li>Europe</li>
            <li>America</li>
            <li>More</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-1 text-sm rounded-md border">
            Write Article
          </button>
          <button className="px-4 py-1 text-sm rounded-md border bg-primary text-primary-foreground">
            Sign In
          </button>
        </div>
      </div>

      {/* Midsec */}
      <div className="flex gap-6">
        {/* Brand */}
        <div className="flex items-center justify-start ps-4">
          <Link href={"/ "}>
            <Image
              width={180}
              height={20}
              src={"/resources/ppfo/logos/horizontal.png"}
              alt="PPFO LOGO"
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex">
          <ul className="flex gap-4 uppercase text-sm">
            {navigations.map((nav, index) => (
              <li key={index}>
                <Link
                  className={`flex ${
                    pathname === nav.href ? "underline-effect-active" : ""
                  } hover:bg-muted transition-all duration-300 flex-grow underline-effect justify-center px-4 items-center w-full h-full`}
                  href={nav.href}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Headline */}
        <div className="hidden lg:flex justify-end flex-grow items-center">
          <p className="max-w-50 text-sm text-right text-accent">
            Gaza: Israeli School Strikes Magnify Civilian Peril
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar_Desktop;
