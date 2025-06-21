import { createContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'CUSTOMER' | 'ADMIN' | 'CSR' | 'Underwriter';
  userId: number; // Add userId
}

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { throw new Error('Login function not implemented'); },
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const BACKEND_API_BASE_URL = 'http://localhost:8093';

  const login = async (usernameOrEmail: string, password: string): Promise<User> => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Login failed due to unexpected error.";
      throw new Error(errorMessage);
    }

    // Get username and role from login response
    const data: { username: string; role: User['role'] } = await response.json();

    // Fetch userId using the username
    const userIdResponse = await fetch(`${BACKEND_API_BASE_URL}/api/user-role/id-by-username/${data.username}`);
    if (!userIdResponse.ok) {
      throw new Error('Failed to fetch userId');
    }
    const userIdData = await userIdResponse.json();
    const userId = userIdData.userId;

    const userWithId: User = {
      username: data.username,
      role: data.role,
      userId,
    };

    setUser(userWithId);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userWithId));
    console.log('User logged in:', userWithId);
    return userWithId;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
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