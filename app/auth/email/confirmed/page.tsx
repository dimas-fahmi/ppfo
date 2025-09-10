import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { ArrowLeft, ArrowRight, CircleCheckBig } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Email is confirmed, Thank You.",
});

interface EmailConfirmedProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const EmailConfirmed = ({ searchParams }: EmailConfirmedProps) => {
  const email = searchParams.email;
  if (!email) {
    redirect("/");
  }

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
        <h1 className="font-header text-3xl font-black mb-2">
          EMAIL CONFIRMED, THANK YOU FOR YOUR CO-OPERATION!
        </h1>
        <p className="font-light">This helped us prevent spam</p>
        <span className="flex items-center text-sm px-4 py-2 mt-2 justify-center gap-2 rounded-md font-semibold">
          <span className="text-green-700">{email}</span>
          <CircleCheckBig className="w-4 h-4 opacity-50" />
        </span>
      </header>

      <Button className="w-full mb-4" type="submit" asChild>
        <Link href={"/auth"}>To Sign In Page</Link>
      </Button>

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

export default EmailConfirmed;
