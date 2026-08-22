import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(AdminContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;