"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut, signUp } from "../supabase/utils/actions";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function useSignIn() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const result = await signIn(email, password);

      if (!result.success) {
        throw result;
      }

      return result.session;
    },
    onMutate: () => {
      router.replace("/auth");
    },
    onSuccess: (session) => {
      queryClient.setQueryData(["auth", "session"], session);
      router.push("/");
    },
    onSettled: (_data) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "session"],
      });
    },
    onError: (error: AuthError & { email: string }) => {
      router.replace(
        `/auth?code=${
          error?.code ?? "unknown_error"
        }&message=${encodeURIComponent(error?.message ?? "undefined")}&email=${
          error?.email
        }`
      );
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
        exact: false,
      });
    },
  });
}
