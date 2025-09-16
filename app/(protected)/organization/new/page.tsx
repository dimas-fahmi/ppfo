import { generateMetadata } from "@/src/lib/utils/generateMetadata";
import { Metadata } from "next";
import React from "react";
import NewOrganizationIndex from "./NewOrganizationIndex";

export const metadata: Metadata = generateMetadata({
  title: "Create New Organization | PPFO",
});

const NewOrganizationPage = () => {
  return <NewOrganizationIndex />;
};

export default NewOrganizationPage;
