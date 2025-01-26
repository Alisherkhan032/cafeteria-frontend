import React from "react";
import { Link } from "react-router-dom";
import LeftNavbar from "./LeftNavbar";
import RightNavbar from "./RightNavbar";

const Navbar = () => {


  return (
    <div className="navbar flex items-center justify-between px-4 py-2 border border-black bg-gray-100">
      <LeftNavbar />

      <div className="flex items-center space-x-4">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin Panel</Link>
        <Link to="/merchant">Merchant Panel</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <RightNavbar />

    </div>
  );
};

export default Navbar;
