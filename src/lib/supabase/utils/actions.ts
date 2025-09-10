"use server";

import { createClient } from "./server";
import { AuthError, Session } from "@supabase/supabase-js";

export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const result: {
    success: boolean;
    code?: string;
    message?: string;
    session: Session | null;
    email?: string;
  } = {
    success: true,
    code: "",
    message: "",
    email: "",
    session: data?.session,
  };

  if (error as AuthError) {
    result.success = false;
    result.email = email;
    result.code = error?.code ?? "unknwon_error";
    result.message =
      error?.message ?? "Something went wrong, please contact our suppor team.";
  }

  return result;
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
