import React from "react";
import { Link, NavLink } from "react-router";
import { Outlet } from "react-router";
import {
  FaHome,
  FaUserCircle,
  FaBox,
  FaMoneyBill,
  FaTruck,
  FaMotorcycle,
  FaClock,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        {/* drawer-toggle এর আইডি */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              {/* এখানে htmlFor="my-drawer-2" করতে হবে */}
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2">Dashboard</div>
          </div>

          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu space-y-3 text-xl bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/">
                <img
                  className="w-14"
                  src="../../src/assets/New folder/logo.png"
                  alt=""
                />
                <p className="text-3xl">ProFast</p>
              </Link>
            </li>

            <li>
              <NavLink to="/" className="flex items-center gap-2">
                <FaHome /> Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-2"
              >
                <FaUserCircle /> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/myParcels"
                className="flex items-center gap-2"
              >
                <FaBox /> My Parcels
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className="flex items-center gap-2"
              >
                <FaMoneyBill /> Payment History
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/track"
                className="flex items-center gap-2"
              >
                <FaTruck /> Track a Package
              </NavLink>
            </li>

            {/* 👉 New Links */}
            <li>
              <NavLink
                to="/dashboard/activeRiders"
                className="flex items-center gap-2"
              >
                <FaMotorcycle /> Active Riders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/pendingRiders"
                className="flex items-center gap-2"
              >
                <FaClock /> Pending Riders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
