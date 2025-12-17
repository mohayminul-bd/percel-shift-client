import React from "react";
import { Link, Outlet } from "react-router";
import authimage from "../../src/assets/New folder/authImage.png";
import logo from "../../src/assets/New folder/logo.png";

const AuthLayout = () => {
  return (
    <div className=" p-12 bg-base-200">
      <Link to="/">
        <div className="flex">
          <img src={logo} alt="" />
          <h2>profost</h2>
        </div>
      </Link>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authimage} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
