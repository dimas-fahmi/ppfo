import React, { Suspense } from "react";
import EmailVerificationIndex from "./EmailVerificationIndex";
import { Metadata } from "next";
import { generateMetadata } from "@/src/lib/utils/generateMetadata";

export const metadata: Metadata = generateMetadata({
  title: "Email Verification",
});

const EmailVerification = async () => {
  return (
    <Suspense fallback={<>a moment</>}>
      <EmailVerificationIndex />
    </Suspense>
  );
};

export default EmailVerification;
