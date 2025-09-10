import React, { Suspense } from "react";
import RegisterPageIndex from "./RegisterPageIndex";

const RegisterPage = ({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; message?: string }>;
}) => {
  return (
    <Suspense fallback={<>...</>}>
      <RegisterPageIndex searchParams={searchParams} />
    </Suspense>
  );
};

export default RegisterPage;
