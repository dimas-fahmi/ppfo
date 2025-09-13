"use client";

import { useProfile } from "@/src/lib/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NamePhase from "./phase/NamePhase";
import AvatarPhase from "./phase/AvatarPhase";
import ConfirmationPhase from "./phase/ConfirmationPhase";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/lib/hooks/useUser";

const RegistrationPageIndex = () => {
  // Phase
  const { data: profile } = useProfile();
  const { data: user } = useUser();
  const phase = user?.user_metadata?.registration_phase;
  const firstName = profile?.firstName;

  // Render
  const [header, setHeader] = useState(
    "LET'S BUILD YOUR PROFILE, IT WON'T TAKE LONG"
  );
  const [label, setLabel] = useState("Wait a moment");
  const [render, setRender] = useState<React.ReactNode>(<>...</>);

  const router = useRouter();

  useEffect(() => {
    if (phase === "completed") {
      router.refresh();
    }

    switch (phase) {
      case "name":
        setHeader("LET'S BUILD YOUR PROFILE, IT WON'T TAKE LONG");
        setLabel("Let's pick your display and unique username");
        setRender(<NamePhase />);
        break;
      case "avatar":
        setHeader(`Nice to have you aboard ${firstName}, LAST ONE!`);
        setLabel(`Upload something that'll represent you`);
        setRender(<AvatarPhase />);
        break;
      case "confirmation":
        setHeader(`Welcome to the Press & Public Freedom Organization`);
        setLabel("It's nice to have you aboard");
        setRender(<ConfirmationPhase />);
        break;
      default:
        setRender(<>...</>);
        break;
    }
  }, [phase, setRender, firstName, router]);

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
          {header}
        </h1>
        <p className="font-light">{label}</p>
        <span className="flex items-center text-sm px-4 justify-center gap-2 rounded-md font-semibold"></span>
      </header>

      {render}

      <div className="text-sm font-light mt-4">
        We require you to finish registration, read how we use this forms{" "}
        <Link
          href={"/docs/registration-form"}
          className="text-accent font-medium hover:underline"
        >
          here
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPageIndex;
