"use client";

import { Button } from "@/src/ui/shadcn/components/ui/button";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const EmailVerificationIndex = () => {
  // Initialize router
  const router = useRouter();

  const params = useSearchParams();
  // const code = params.get("code");
  // const message = params.get("message");
  const email = params.get("email");

  if (!email) {
    router.replace("/auth");
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
      {/* Form */}
      <header className="mb-4">
        <h1 className="font-header text-3xl font-black mb-2">
          {"THANK YOU FOR JOINING US, IMPORTANT STEP!"}
        </h1>
        <p className="font-light">
          We need you to confirm that you have access to this email
        </p>
        <span className="flex items-center text-sm px-4 py-2 mt-2 justify-center gap-2 rounded-md font-semibold">
          <span className="text-yellow-700">{email}</span>
          <Loader className="animate-spin w-4 h-4 opacity-50" />
        </span>
      </header>

      <Button className="w-full mb-4" type="submit">
        Send Email Verification
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

export default EmailVerificationIndex;
