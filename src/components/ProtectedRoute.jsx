import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
        <p className="text-sm text-muted-foreground">Checking your account...</p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({
  fallback = <LoadingFallback />,
  unauthenticatedElement,
}) {
  const location = useLocation();
  const { user, isLoadingAuth, authChecked } = useAuth();

  if (isLoadingAuth || !authChecked) return fallback;
  if (user) return <Outlet />;
  if (unauthenticatedElement) return unauthenticatedElement;

  return (
    <Navigate
      to="/login"
      replace
      state={{ from: location.pathname }}
    />
  );
}
