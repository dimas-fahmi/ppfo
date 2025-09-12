import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { Metadata } from "next";
import React from "react";
import RegistrationPageIndex from "./RegistrationPageIndex";

export const metadata: Metadata = generateMetadata({
  title: "Tell Us More About You | Registration Phase",
});

const RegistrationPage = () => {
  return <RegistrationPageIndex />;
};

export default RegistrationPage;
