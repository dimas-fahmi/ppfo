"use client";

import React from "react";

import NavBar_Desktop from "./Desktop";
import NavBar_Mobile from "./Mobile";

const NavBar = () => {
  return (
    <>
      {/* Desktop */}
      <NavBar_Desktop />

      {/* Mobile */}
      <NavBar_Mobile />
    </>
  );
};

export default NavBar;
