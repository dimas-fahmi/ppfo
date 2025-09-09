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

  // type-casting here for convenience
  // in practice, you should validate your inputs
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

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
