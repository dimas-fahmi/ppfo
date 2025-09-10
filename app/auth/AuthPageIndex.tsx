"use client";

import { Button } from "@/src/ui/shadcn/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsDiscord, BsGithub, BsGoogle } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  CircleX,
  LoaderCircle,
} from "lucide-react";
import { useSignIn } from "@/src/lib/hooks/useAuth";

const anything = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const AuthPageIndex = () => {
  // Router Initialization
  const router = useRouter();

  // Error Handling
  const params = useSearchParams();
  const code = decodeURIComponent(params.get("code") ?? "");
  const message = decodeURIComponent(params.get("message") ?? "");

  // Error States
  const [errorState, setErrorState] = useState<{
    code: string;
    message: string;
  } | null>(null);

  const resetError = () => {
    setErrorState(null);
    router.replace("/auth", undefined);
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
  }>({
    resolver: zodResolver(anything),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const email = watch("email");
  const password = watch("password");

  // Mutation
  const signIn = useSignIn();

  return (
    <div className="max-w-md px-4 overflow-y-scroll scrollbar-none h-full max-h-dvh">
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
          BREAK THE SHACKLES, RELEASE YOUR VOICES!
        </h1>
        <p className="font-light">Freedom fades in silence</p>
      </header>

      {/* Error Placeholder */}
      {errorState && (
        <div
          className={`${
            errorState.code.includes("success")
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          } mb-4 p-4 rounded-md text-sm`}
        >
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
          signIn.mutate(data);
          reset();
          setErrorState(null);
        })}
      >
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
        <div>
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
        </div>
        <Button type="submit" disabled={!isValid || loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" /> Wait a moment
            </span>
          ) : (
            <>Sign In</>
          )}
        </Button>
        <div className="flex justify-between text-sm font-light">
          <span>Or continue with</span>
          <Link href={"/auth/recovery"}>Forgot your password?</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button type="button" variant={"outline"}>
            <BsGoogle />
          </Button>
          <Button type="button" variant={"outline"}>
            <BsGithub />
          </Button>
          <Button type="button" variant={"outline"}>
            <BsDiscord />
          </Button>
        </div>

        <div className="text-sm flex justify-between items-center">
          <Link href={"/"} className="flex hover:underline items-center gap-2">
            <ArrowLeft />
            Homepage
          </Link>
          <Link
            href={"/auth/register"}
            className="flex hover:underline items-center gap-2"
          >
            Sign Up
            <ArrowRight />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthPageIndex;
