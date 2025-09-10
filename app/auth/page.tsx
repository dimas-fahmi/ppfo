import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { Metadata } from "next";
import React, { Suspense } from "react";
import AuthPageIndex from "./AuthPageIndex";

export const metadata: Metadata = generateMetadata({
  title: "Continue to PPFO",
});

const AuthPage = ({
  searchParams,
}: {
  searchParams: Promise<{
    code?: string;
    message?: string;
    emailProps?: string;
  }>;
}) => {
  return (
    <Suspense fallback={<>...</>}>
      <AuthPageIndex searchParams={searchParams} />
    </Suspense>
  );
};

export default AuthPage;
