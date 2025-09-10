import { User } from "@supabase/supabase-js";
import React from "react";

const EmailVerificationIndex = ({ user }: { user: User }) => {
  return <div>{user.email_confirmed_at}</div>;
};

export default EmailVerificationIndex;
