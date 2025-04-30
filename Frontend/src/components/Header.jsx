import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start"><a className="btn btn-ghost text-xl"><Logo/></a></div>
      <div className="navbar-end">
        <Link className="font-bold" to="/">Home</Link>
      </div>
    </div>
  );
};

export default Header;
