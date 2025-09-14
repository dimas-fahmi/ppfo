import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RecoveryPageIndex from "./RecoveryPageIndex";

export const metadata: Metadata = generateMetadata({
  title: "Reset Password | Recovery",
});

const RecoveryPage = () => {
  return (
    <div className="max-w-md p-4 overflow-y-scroll scrollbar-none h-full max-h-dvh">
      <div className="mb-4">
        <Image
          width={90}
          height={90}
          src={"/resources/ppfo/logos/circular.png"}
          alt="ppfo logo"
          className="w-24"
        />
      </div>

      <header className="mb-4">
        <h1 className="font-header uppercase text-3xl font-black mb-2">
          {`DON'T WORRY, IT'S HAPPENED TO THE REST OF US TOO`}
        </h1>
        <p className="font-light">We just need to confirm that it is you</p>
      </header>

      <RecoveryPageIndex />

      <div className="text-sm flex justify-between items-center">
        <Link
          href={"/"}
          prefetch
          className="flex hover:underline items-center gap-2"
        >
          <ArrowLeft />
          Homepage
        </Link>
        <Link
          href={"/auth"}
          prefetch
          className="flex hover:underline items-center gap-2"
        >
          Sign In
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default RecoveryPage;
