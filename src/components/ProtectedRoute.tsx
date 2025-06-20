import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // Assuming this path is correct

interface ProtectedRouteProps {
  roles?: string[]; // Optional: if you want to protect based on roles
}

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth(); // Assuming useAuth provides isAuthenticated and user (with roles)

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Optional: Check for roles if specified
  if (roles && user && user.roles) {
    const hasRequiredRole = roles.some(role => user.roles.includes(role));
    if (!hasRequiredRole) {
      // User is authenticated but doesn't have the required role, redirect to a forbidden page or dashboard
      return <Navigate to="/dashboard" replace />; // Or a dedicated /forbidden page
    }
  }

  // User is authenticated (and has the correct role if specified), render the child routes
  return <Outlet />;
};

export default ProtectedRoute;