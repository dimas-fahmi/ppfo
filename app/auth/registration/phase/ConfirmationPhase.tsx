import { DEFAULT_AVATAR_PLACEHOLDER } from "@/src/lib/configs/app";
import { useProfile } from "@/src/lib/hooks/useProfile";
import { useMutateUser } from "@/src/lib/hooks/useUser";
import Loader from "@/src/ui/components/Loader";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import Image from "next/image";
import React from "react";

const ConfirmationPhase = ({ avatar }: { avatar: string | null }) => {
  const { data: profile } = useProfile();
  const userMutation = useMutateUser();

  return !profile?.avatar ? (
    <div className="relative">
      <Loader classes={{ mediaClassNames: "w-48" }} />
    </div>
  ) : (
    <div className="bg-secondary p-4 rounded-md">
      {/* Header */}
      <div className="flex flex-col justify-center items-center">
        {/* Image */}
        {profile?.avatar && (
          <Image
            placeholder="blur"
            blurDataURL={DEFAULT_AVATAR_PLACEHOLDER}
            className="w-28 h-28 rounded-full"
            width={320}
            height={320}
            src={profile?.avatar ?? avatar ?? DEFAULT_AVATAR_PLACEHOLDER}
            alt={`${profile?.firstName}s Avatar`}
          />
        )}

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
