import { UsersProfilePatchRequest } from "@/app/api/users/profiles/patch";
import { fetchUserByUsername } from "@/src/lib/fetchers/fetchUserByUsername";
import { useProfileMutate } from "@/src/lib/hooks/useProfile";
import { useSession } from "@/src/lib/hooks/useSession";
import { profileSchema } from "@/src/lib/zodSchema/profileSchema";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const NamePhase = () => {
  // Session
  const { data: session } = useSession();

  // Form
  const {
    control,
    handleSubmit,
    watch,
    getFieldState,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(
      profileSchema.pick({ firstName: true, lastName: true, username: true })
    ),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
    },
  });

  const username = watch("username");

  // Query Username availability
  const [availability, setAvailability] = useState(false);
  const [usernameKey, setUsernameKey] = useState("");

  // Debouncer
  useEffect(() => {
    const debouncer = setTimeout(() => {
      setUsernameKey(username);
    }, 700);

    return () => clearTimeout(debouncer);
  }, [username, setUsernameKey]);

  // Query
  const { data, isFetching } = useQuery({
    queryKey: ["username", usernameKey],
    queryFn: () => fetchUserByUsername(usernameKey),
    enabled: usernameKey.length > 3 && !getFieldState("username")?.error,
    retry: 0,
  });

  useEffect(() => {
    if (getFieldState("username").error || isFetching || usernameKey.length < 3)
      return;
    if (!data?.result) {
      setAvailability(true);
    } else {
      setAvailability(false);
    }
  }, [
    data,
    setUsernameKey,
    setAvailability,
    getFieldState,
    isFetching,
    usernameKey,
  ]);

  // Mutation
  const { mutate } = useProfileMutate();

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((data) => {
        if (!session || !isValid) return;
        const request: UsersProfilePatchRequest = {
          id: session.user.id,
          newValues: { ...data, registrationPhase: "avatar" },
        };

        mutate(request);
      })}
    >
      {/* First & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState }) => (
            <div>
              <input
                {...field}
                className={`${
                  fieldState?.error
                    ? "border-destructive outline-destructive"
                    : ""
                } border rounded-md px-4 py-2 w-full`}
                placeholder="First Name"
                name="first_name"
                autoComplete="off"
              />
              <p
                className={`${
                  fieldState?.error ? "block" : "hidden"
                } text-destructive font-light text-xs mt-0.5`}
              >
                {fieldState?.error?.message}
              </p>
            </div>
          )}
        />

        {/* Last Name */}
        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState }) => (
            <div>
              <input
                {...field}
                className={`${
                  fieldState?.error
                    ? "border-destructive outline-destructive"
                    : ""
                } border rounded-md px-4 py-2 w-full`}
                placeholder="Last Name"
                name="last_name"
                autoComplete="off"
              />
              <p
                className={`${
                  fieldState?.error ? "block" : "hidden"
                } text-destructive font-light text-xs mt-0.5`}
              >
                {fieldState?.error?.message}
              </p>
            </div>
          )}
        />
      </div>

      {/* Full Name */}
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState }) => (
          <div>
            <input
              {...field}
              className={`${
                fieldState?.error
                  ? "border-destructive outline-destructive"
                  : ""
              } border rounded-md px-4 py-2 w-full`}
              placeholder="Username"
              name="username"
              autoComplete="off"
            />
            <p
              className={`${
                fieldState?.error ? "block" : "hidden"
              } text-destructive font-light text-xs mt-0.5`}
            >
              {fieldState?.error?.message}
            </p>
            {isFetching && usernameKey.length > 3 && !fieldState?.error && (
              <p className={`text-yellow-700 font-light text-xs mt-0.5`}>
                Checking username availability
              </p>
            )}

            {!isFetching &&
              usernameKey.length > 3 &&
              !fieldState?.error &&
              availability && (
                <p className={`block text-green-700 font-light text-xs mt-0.5`}>
                  Username is available
                </p>
              )}

            {!isFetching &&
              usernameKey.length > 3 &&
              !fieldState?.error &&
              !availability && (
                <p
                  className={`block text-destructive font-light text-xs mt-0.5`}
                >
                  Username is taken
                </p>
              )}
          </div>
        )}
      />
      <Button
        className="w-full"
        type="submit"
        disabled={!isValid || !availability}
      >
        Continue
      </Button>
    </form>
  );
};

export default NamePhase;
