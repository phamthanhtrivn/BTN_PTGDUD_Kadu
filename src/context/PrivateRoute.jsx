import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
  //code cũ
  // const user = useAuth();
  // if (!user.token) return <Navigate to="/login" />;
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
};
export default PrivateRoute;
