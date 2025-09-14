import { DEFAULT_AVATAR_PLACEHOLDER } from "@/src/lib/configs/app";
import { useProfile } from "@/src/lib/hooks/useProfile";
import { useMutateUser } from "@/src/lib/hooks/useUser";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/ui/shadcn/components/ui/avatar";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const ConfirmationPhase = () => {
  const params = useSearchParams();
  const preview = params.get("preview");

  return (
    <Suspense>
      <ConfirmationPhaseIndex preview={preview} />
    </Suspense>
  );
};

const ConfirmationPhaseIndex = ({ preview }: { preview: string | null }) => {
  const { data: profile } = useProfile();
  const userMutation = useMutateUser();

  return (
    <div className="bg-secondary p-4 rounded-md">
      {/* Header */}
      <div className="flex flex-col justify-center items-center">
        {/* Image */}
        <Avatar>
          <AvatarImage
            width={320}
            height={320}
            src={preview ?? DEFAULT_AVATAR_PLACEHOLDER}
            alt={`${profile?.firstName}s Avatar`}
          />
          <AvatarFallback>
            {profile?.firstName ?? "N"}
            {profile?.lastName ?? "A"}
          </AvatarFallback>
        </Avatar>

        {/* Information */}
        <div className="text-center">
          <h1 className="font-header text-xl">
            {profile?.firstName} {profile?.lastName}
          </h1>
          <p className="text-sm font-light">{profile?.username}</p>
        </div>

        <Button
          className="mt-4 block w-full"
          onClick={() => {
            if (!profile) return;
            userMutation.mutate({ data: { registration_phase: "completed" } });
          }}
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPhase;
