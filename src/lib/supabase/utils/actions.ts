"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./server";
import { AuthError } from "@supabase/supabase-js";

export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.session;
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
    )}&email=${encodeURIComponent(email)}`
  );
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
