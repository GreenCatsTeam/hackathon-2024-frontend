import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login-page" />;
  return <Outlet />;
};

export default PrivateRoute;
