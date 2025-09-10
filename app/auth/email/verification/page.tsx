import { createClient } from "@/src/lib/supabase/utils/server";
import { redirect } from "next/navigation";
import React from "react";

const EmailVerification = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth");
  }

  return <div>EmailVerification</div>;
};

export default EmailVerification;
