"use client";

import { useSession } from "@/src/lib/hooks/useSession";
import NavBar from "@/src/ui/components/NavBar";
import React from "react";

const PublicLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  // Fetch
  const _session = useSession();

  return (
    <>
      {/* NavBar */}
      <NavBar />

      {/* Body */}
      {children}

      {/* Footer */}
      <footer></footer>
    </>
  );
};

export default PublicLayout;
