import { createClient } from "@/src/lib/supabase/utils/server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import EmailVerificationIndex from "./EmailVerificationIndex";

const EmailVerification = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user?.email) {
    redirect("/auth");
  }

  if (data.user.email_confirmed_at) {
    redirect("/");
  }

  return (
    <Suspense fallback={<>a moment</>}>
      <EmailVerificationIndex user={data.user} />
    </Suspense>
  );
};

export default EmailVerification;
