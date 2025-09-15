import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="article-width p-4 md:p-16">{children}</div>;
};

export default ProtectedLayout;
