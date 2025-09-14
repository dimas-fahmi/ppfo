"use client";

import { Button } from "@/src/ui/shadcn/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { BsDiscord, BsGithub, BsGoogle } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  CircleX,
  LoaderCircle,
} from "lucide-react";
import { useOAuth, useSignUp } from "@/src/lib/hooks/useAuth";

export const registrationSchema = z
  .object({
    email: z.email(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must include at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must include at least one special character",
      }),

    confirmation: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirmation, {
    path: ["confirmation"],
    message: "Passwords do not match",
  });

const RegisterPageIndex = ({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; message?: string }>;
}) => {
  // Router Initialization
  const router = useRouter();

  // Error Handling
  const params = use(searchParams);
  const code = decodeURIComponent(params?.code ?? "");
  const message = decodeURIComponent(params?.message ?? "");

  // Error States
  const [errorState, setErrorState] = useState<{
    code: string;
    message: string;
  } | null>(null);

  const resetError = () => {
    setErrorState(null);
    router.replace("/auth/register", undefined);
  };

  // Loading State
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);

    if (code || message) {
      setErrorState({ code, message });
    }
  }, [code, message, setErrorState, setLoading]);

  // Form Initialization
  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<{
    email: string;
    password: string;
    confirmation: string;
  }>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmation: "",
    },
  });
  const email = watch("email");
  const password = watch("password");
  const confirmation = watch("confirmation");

  // Mutation
  const signUp = useSignUp();
  const oAuth = useOAuth();

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
          {"DON'T LET THEM TAKE OUR FREEDOM, JOIN US!"}
        </h1>
        <p className="font-light">Freedom fades in silence</p>
      </header>

      {/* Error Placeholder */}
      {errorState && (
        <div className="mb-4 bg-destructive/10 p-4 rounded-md text-destructive text-sm">
          <header className="flex text-sm justify-between items-center gap-2">
            <span className="flex items-center gap-2">
              <CircleAlert /> {errorState.message}
            </span>
            <button
              onClick={resetError}
              className="cursor-pointer hover:text-destructive/50 opacity-"
            >
              <CircleX />
            </button>
          </header>
          {errorState.code === "invalid_credentials" && (
            <div className="mt-3">
              {`If you doesn't have an account, you can't use email & password just yet. You can create an account with Google, Discord and Github.`}
            </div>
          )}
        </div>
      )}

      <form
        className="grid-cols-1 grid space-y-4"
        onSubmit={handleSubmit((data) => {
          if (!isValid) return;
          setLoading(true);
          signUp.mutate(data);
          reset();
          setErrorState(null);
        })}
      >
        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <div>
              <input
                {...field}
                className={`${
                  fieldState.error && email.length > 3
                    ? "border-destructive outline-destructive"
                    : ""
                } border rounded-md px-4 py-2 w-full`}
                placeholder="Email"
                autoComplete="off"
              />
              <p
                className={`${
                  fieldState.error && email.length > 3 ? "block" : "hidden"
                } text-destructive font-light text-xs mt-0.5`}
              >
                {fieldState.error?.message}
              </p>
            </div>
          )}
        />

        {/* Passowrd */}
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <div>
              <input
                {...field}
                type="password"
                className={`${
                  fieldState.error && password.length > 3
                    ? "border-destructive outline-destructive"
                    : ""
                } border rounded-md px-4 py-2 w-full`}
                placeholder="Password"
                autoComplete="off"
              />
              <p
                className={`${
                  fieldState.error && password.length > 3 ? "block" : "hidden"
                } text-destructive font-light text-xs mt-0.5`}
              >
                {fieldState.error?.message}
              </p>
            </div>
          )}
        />

        {/* Password Confirmation */}
        <Controller
          control={control}
          name="confirmation"
          render={({ field, fieldState }) => (
            <div>
              <input
                {...field}
                type="password"
                className={`${
                  fieldState.error && confirmation.length > 3
                    ? "border-destructive outline-destructive"
                    : ""
                } border rounded-md px-4 py-2 w-full`}
                placeholder="Password Confirmation"
                autoComplete="off"
              />
              <p
                className={`${
                  fieldState.error && confirmation.length > 3
                    ? "block"
                    : "hidden"
                } text-destructive font-light text-xs mt-0.5`}
              >
                {fieldState.error?.message}
              </p>
            </div>
          )}
        />
        <Button type="submit" disabled={!isValid || loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" /> Wait a moment
            </span>
          ) : (
            <>Sign Up</>
          )}
        </Button>
        <div className="flex justify-between text-sm font-light">
          <span>Or continue with</span>
          <Link href={"/auth/recovery"}>Forgot your password?</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              oAuth.mutate("google");
            }}
          >
            <BsGoogle />
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              oAuth.mutate("github");
            }}
          >
            <BsGithub />
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              oAuth.mutate("discord");
            }}
          >
            <BsDiscord />
          </Button>
        </div>

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
      </form>
    </div>
  );
};

export default RegisterPageIndex;
