import NavBar from "@/src/ui/components/NavBar";
import React from "react";

const PublicLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
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
