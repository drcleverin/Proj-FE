import { createContext, useState, useEffect, ReactNode } from 'react';

// 1. Updated User Interface: Matches backend LoginResponse
interface User {
  username: string;
  role: 'CUSTOMER' | 'ADMIN' | 'CSR' | 'Underwriter'; // Ensure roles match backend exactly (case-sensitive)
}

interface AuthContextType {
  user: User | null;
  // Updated login function signature: It should return a Promise<User> on success, or reject with an Error on failure.
  // This allows the calling component (Login.tsx) to catch errors.
  login: (usernameOrEmail: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  // Default dummy functions for the context - these are overwritten by the Provider's actual implementation
  login: async () => { throw new Error('Login function not implemented'); },
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Failed to parse stored user data from localStorage:', error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user); // Set isAuthenticated based on initial user state

  // Define your backend API URL here
  const BACKEND_API_BASE_URL = 'http://localhost:8093'; 

  // The useEffect for initial localStorage check is now integrated into useState initialization.
  // This ensures isAuthenticated is set correctly from the start.

  const login = async (usernameOrEmail: string, password: string): Promise<User> => {
    try {
      const response = await fetch(`${BACKEND_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // <--- Crucial header for 406 Not Acceptable error
        },
        body: JSON.stringify({ usernameOrEmail, password }), // Use usernameOrEmail as per DTO
      });

      console.log(response, "Login response...");

      if (!response.ok) {
        // Parse error response from backend (e.g., { "error": "Login Failed", "message": "Invalid password." })
        const errorData = await response.json();
        const errorMessage = errorData.message || "Login failed due to unexpected error.";
        throw new Error(errorMessage); // Throw an error that Login.tsx can catch
      }

      // Extract JSON response properly (LoginResponse DTO)
      const data: User = await response.json(); // Backend returns { username, role }
      console.log("Parsed response data:", data);

      // Store user data in state and local storage
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data));
      
      return data; // Return the user data
    } catch (error: any) {
      console.error("Login error:", error);
      // Re-throw the error so calling components can handle it
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    // Optionally, send a request to your backend to invalidate any session/token if applicable (though you've removed JWT)
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;