"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./server";
import { AuthError } from "@supabase/supabase-js";

export async function signIn({
  email,
  password,
}: {
  email?: string;
  password?: string;
}) {
  const supabase = await createClient();

  if (!email || !password) {
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log(error);
    if (error instanceof AuthError) {
      redirect(
        `/auth?code=${encodeURIComponent(
          error.code ?? "undefined"
        )}&message=${encodeURIComponent(error.message ?? "undefined")}`
      );
    } else {
      redirect("/auth");
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp({
  email,
  password,
  confirmation,
}: {
  email?: string;
  password?: string;
  confirmation?: string;
}) {
  const supabase = await createClient();

  if (!email || !password || !confirmation) {
    return redirect("/auth/register?code=invalid_mandatory_values");
  }

  if (password !== confirmation) {
    return redirect("/auth/register?code=invalid_pw_confirmation");
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    if (error instanceof AuthError) {
      redirect(
        `/auth/register?code=${encodeURIComponent(
          error.code ?? "undefined"
        )}&message=${encodeURIComponent(error.message ?? "undefined")}`
      );
    } else {
      redirect("/auth/register");
    }
  }

  revalidatePath("/", "layout");
  redirect(
    `/auth/email/verification?code=registration_success&message=${encodeURIComponent(
      "We send you a verification email, please check your inbox."
    )}`
  );
}
