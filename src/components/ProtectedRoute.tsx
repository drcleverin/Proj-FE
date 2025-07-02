

// src/components/ProtectedRoute.tsx
import { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '@/context/AuthContext'; // Ensure this path is correct

/**
 * Defines the possible user roles that can be used for access control.
 * Updated to include 'CSR' and 'Underwriter' for consistency across the app.
 */
type UserRole = 'CUSTOMER' | 'ADMIN' | 'CSR' | 'Underwriter';

interface ProtectedRouteProps {
  /**
   * The child components (the route content) to render if access is granted.
   * Using ReactNode to allow for any valid React child.
   */
  children: ReactNode;
  /**
   * An optional array of roles that are allowed to access this route.
   * If this prop is not provided, any authenticated user can access the route.
   */
  allowedRoles?: UserRole[];
}

/**
 * A wrapper component for routes that require authentication and/or specific roles.
 * It checks the user's authentication status and role against the allowed roles.
 *
 * If the user is not authenticated, they are redirected to the login page.
 * If 'allowedRoles' are specified and the authenticated user's role is not
 * among them, they are redirected to their appropriate dashboard based on their role.
 *
 * @param {ProtectedRouteProps} { children, allowedRoles } - Destructures children and allowedRoles from props.
 * @returns {JSX.Element | null} The children component if authorized, or a Navigate component for redirection.
 */
const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  // Access authentication context to get user and authentication status
  // We need both 'isAuthenticated' to check login status, and 'user' to get the role.
  const { isAuthenticated, user } = useContext(AuthContext);

  // 1. Check Authentication Status:
  // If the user is not authenticated (i.e., isAuthenticated is false),
  // redirect them immediately to the login page. The 'replace' prop ensures
  // that the current location is replaced in the history stack, preventing
  // the user from navigating back to the protected route via the browser's back button.
  if (!isAuthenticated) {
    console.log('ProtectedRoute: User not authenticated, redirecting to /login.');
    return <Navigate to="/login" replace />;
  }

  // 2. Check Role-Based Authorization (if allowedRoles are specified):
  // This block executes only if the user is authenticated.
  // It checks if the 'allowedRoles' prop has been provided and if the 'user' object exists.
  if (allowedRoles && user) {
    // If the authenticated user's role is NOT found in the 'allowedRoles' array,
    // it means they do not have permission to access this route.
    console.warn(
      `ProtectedRoute: User '${user.username}' (Role: '${user.role}') attempted to access a route restricted to roles: [${allowedRoles.join(', ')}].`
    );

    if (!allowedRoles.includes(user.role)) {
      // Determine redirection path based on the user's role
      let redirectToPath: string;
      switch (user.role) {
        case 'ADMIN':
          // If an ADMIN tries to access a non-admin page they are not allowed on, redirect to /admin
          redirectToPath = '/admin';
          console.log(`ProtectedRoute: Redirecting ADMIN user to ${redirectToPath}.`);
          break;
        case 'CUSTOMER':
          // If a CUSTOMER tries to access a non-customer page they are not allowed on, redirect to /dashboard
          redirectToPath = '/dashboard';
          console.log(`ProtectedRoute: Redirecting CUSTOMER user to ${redirectToPath}.`);
          break;
        // Add more cases for other roles (e.g., 'CSR', 'Underwriter') if they have specific landing pages
        case 'CSR':
          redirectToPath = '/dashboard'; // Or a specific CSR dashboard path
          console.log(`ProtectedRoute: Redirecting CSR user to ${redirectToPath}.`);
          break;
        case 'Underwriter':
          redirectToPath = '/dashboard'; // Or a specific Underwriter dashboard path
          console.log(`ProtectedRoute: Redirecting Underwriter user to ${redirectToPath}.`);
          break;
        default:
          // Fallback for any other unauthorized role, or if role is undefined (shouldn't happen with User type)
          redirectToPath = '/dashboard';
          console.log(`ProtectedRoute: Redirecting unknown/other unauthorized user to ${redirectToPath}.`);
          break;
      }
      return <Navigate to={redirectToPath} replace />;
    }
  }

  // 3. Grant Access:
  // If the user is authenticated, and either no specific roles were required (allowedRoles was undefined),
  // or their role matches one of the 'allowedRoles', then access is granted.
  // The children (the actual route component) are rendered.
  console.log(`ProtectedRoute: Access granted for user '${user?.username}' (Role: '${user?.role || 'N/A'}').`);
  return <>{children}</>;
};

export default ProtectedRoute;
