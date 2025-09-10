"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut, signUp } from "../supabase/utils/actions";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: (session) => {
      queryClient.setQueryData(["session"], session);
    },
  });
}

export function useSignUp() {
  const router = useRouter();
  return useMutation({
    mutationFn: (req: {
      email: string;
      password: string;
      confirmation: string;
    }) => signUp(req),
    onSuccess: (_, data) => {
      router.push(
        `/auth/email/verification?code=registration_success&message=${encodeURIComponent(
          "We've send verification email, please check your inbox"
        )}&email=${data.email}`
      );
    },
    onError: (error) => {
      if (error instanceof AuthError) {
        router.push(
          `/auth/register?code=${error.code}&message=${encodeURIComponent(
            error.message ?? "undefined"
          )}`
        );
      } else {
        router.push(
          `/auth/register?code=unknown_error&message=${encodeURIComponent(
            "Something went wrong please contact our support team"
          )}`
        );
      }
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.setQueryData(["session"], null);
    },
  });
}
