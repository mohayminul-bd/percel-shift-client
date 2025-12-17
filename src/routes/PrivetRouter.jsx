import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  // const from = location
  console.log(location);
  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }

  return children;
};

export default PrivetRouter;
