"use server";

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
    throw new AuthError("Missing mandatory credentials", 400, "bad_request");
  }

  if (password !== confirmation) {
    throw new AuthError(
      "Confirmation password did not match provided password",
      400,
      "bad_request"
    );
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
