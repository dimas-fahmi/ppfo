import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { Metadata } from "next";
import React from "react";
import AuthPageIndex from "./AuthPageIndex";

export const metadata: Metadata = generateMetadata({
  title: "Continue to PPFO",
});

const AuthPage = () => {
  return (
    <div className="">
      <AuthPageIndex />
    </div>
  );
};

export default AuthPage;
