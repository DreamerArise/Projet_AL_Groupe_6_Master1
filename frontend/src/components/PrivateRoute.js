import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// roleRequired est optionnel ("admin", "editeur"...)
const PrivateRoute = ({ children, roleRequired }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
