import React from "react";
import { Navigate } from "react-router-dom";
import { useSmartAuth } from "../context/SmartAuthContext";

function ProtectedRoute({ children, requireRole }) {
  const { user, isLoggedIn, loading } = useSmartAuth();

  if (loading) return <p className="text-center mt-5">🔐 Proveravamo pristup...</p>;

  if (!isLoggedIn) return <Navigate to="/agro-shopp/login" replace />;

  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/agro-shopp/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
