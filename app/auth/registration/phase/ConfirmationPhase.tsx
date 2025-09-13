import { useProfile } from "@/src/lib/hooks/useProfile";
import { useMutateUser } from "@/src/lib/hooks/useUser";
import Loader from "@/src/ui/components/Loader";
import { Avatar, AvatarImage } from "@/src/ui/shadcn/components/ui/avatar";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import React from "react";

const ConfirmationPhase = () => {
  const { data: profile, isLoading } = useProfile();
  const userMutation = useMutateUser();

  return isLoading ? (
    <div className="relative">
      <Loader classes={{ mediaClassNames: "w-48" }} />
    </div>
  ) : (
    <div className="bg-secondary p-4 rounded-md">
      {/* Header */}
      <div className="flex flex-col justify-center items-center">
        {/* Image */}
        <Avatar className="w-28 h-28">
          {profile?.avatar && (
            <AvatarImage
              src={profile?.avatar}
              alt={`${profile?.firstName}'s Avatar`}
            />
          )}
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
