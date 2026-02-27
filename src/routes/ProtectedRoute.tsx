import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

function hasToken() {
  return Boolean(localStorage.getItem("token"));
}

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();

  if (!hasToken()) {
    const from = encodeURIComponent(location.pathname);
    return <Navigate to={`/auth?mode=login&from=${from}`} replace />;
  }

  return children;
}