import React, { Suspense } from "react";
import RegisterPageIndex from "./RegisterPageIndex";
import Loader from "@/src/ui/components/Loader";

const RegisterPage = ({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; message?: string }>;
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <RegisterPageIndex searchParams={searchParams} />
    </Suspense>
  );
};

export default RegisterPage;
