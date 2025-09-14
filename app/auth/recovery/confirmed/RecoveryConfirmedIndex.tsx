"use client";

import { createClient } from "@/src/lib/supabase/utils/client";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { registrationSchema } from "../../register/RegisterPageIndex";
import { useMutation } from "@tanstack/react-query";
import { useSignOut } from "@/src/lib/hooks/useAuth";

const RecoveryConfirmedIndex = () => {
  // Initialize Supabase
  const supabase = createClient();

  //   Initialize Router
  const router = useRouter();

  //   Listen To OnAuthStateChange
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const decoded: any = jwtDecode(session?.access_token!);

      //   Validate Recovery Session
      const method = decoded?.amr?.[0]?.method;
      if (method !== "recovery") {
        router.push("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  // Form
  const {
    control,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      email: "default@default.com",
      password: "",
      confirmation: "",
    },
  });

  // Watch
  const password = watch("password");
  const confirmation = watch("confirmation");

  // UseAuth
  const signout = useSignOut();

  // Query
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      signout.mutate(undefined, {
        onSuccess: () => {
          router.push(
            `/auth?code=reset_success&message=${encodeURIComponent(
              "Successfully reset the password, you can login now"
            )}`
          );
        },
      });
    },
  });

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
        <h1 className="font-header uppercase text-3xl font-black mb-2">
          {`HERE YOU GO, MAKE A STRONGER PASSWORD NOW`}
        </h1>
        <p className="font-light">Do not use the same password</p>
      </header>

      <form
        className="grid-cols-1 grid space-y-4"
        onSubmit={handleSubmit(() => {
          if (!isValid || isPending) return;

          mutate();
        })}
        suppressHydrationWarning
      >
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <div>
              <input
                type="password"
                {...field}
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
                placeholder="Confirmation"
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

        <Button type="submit" disabled={!isValid || isPending}>
          {isPending ? "Processing" : "Save"}
        </Button>

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

export default RecoveryConfirmedIndex;
