import React from "react";
import Navbar from "./Navbar";

const NavbarLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <>{children}</>
    </div>
  );
};

export default NavbarLayout;
