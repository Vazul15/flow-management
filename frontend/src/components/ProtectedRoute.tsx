import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isLoggedIn, userRoles} = useAuth();

  if (!isLoggedIn || (requiredRole && !userRoles.includes(requiredRole))) {
    return <Navigate to="/" replace />;
  }

  return children;
};
