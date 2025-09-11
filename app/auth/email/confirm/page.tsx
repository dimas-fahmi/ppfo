import { redirect } from "next/navigation";
import React, { Suspense, use } from "react";
import ConfirmPageIndex from "./ConfirmPageIndex";

const ConfirmPage = ({
  searchParams,
}: {
  searchParams: Promise<{ confirmationURL?: string; email?: string }>;
}) => {
  const params = use(searchParams);

  if (!params?.confirmationURL) {
    redirect("/auth");
  }

  const _confirmationURL = new URL(params.confirmationURL);
  const origin = _confirmationURL.origin;
  const pathname = _confirmationURL.pathname;
  const _confirmationURL_params = Object.fromEntries(
    _confirmationURL.searchParams.entries()
  );
  const { token, type } = _confirmationURL_params;

  const app_origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ppfo.dimasfahmi.pro";

  const processed_url = `${origin}${pathname}?token=${token}&type=${type}&redirect_to=${app_origin}/auth/email/confirmed?email=${params?.email}`;

  return (
    <Suspense fallback={<>...</>}>
      <ConfirmPageIndex
        processed_url={processed_url}
        email={params?.email ?? "undefined"}
      />
    </Suspense>
  );
};

export default ConfirmPage;
