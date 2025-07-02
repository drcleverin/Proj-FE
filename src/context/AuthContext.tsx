// import { createContext, useState, ReactNode } from 'react';

// interface User {
//   username: string;
//   role: 'CUSTOMER' | 'ADMIN' ;
//   userId: number; // Add userId
// }

// interface AuthContextType {
//   user: User | null;
//   login: (usernameOrEmail: string, password: string) => Promise<User>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: async () => { throw new Error('Login function not implemented'); },
//   logout: () => {},
//   isAuthenticated: false,
// });

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(() => {
//     const storedUser = localStorage.getItem('user');
    
//     if (storedUser) {
//       try {
//         console.log(user," ............");
//         return JSON.parse(storedUser);
//       } catch (error) {
//         localStorage.removeItem('user');
//       }
//     }
//     return null;
//   });

//   const [isAuthenticated, setIsAuthenticated] = useState(!!user);

//   const BACKEND_API_BASE_URL = 'http://localhost:8093';

//   const login = async (usernameOrEmail: string, password: string): Promise<User> => {
//     const response = await fetch(`${BACKEND_API_BASE_URL}/api/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({ usernameOrEmail, password }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       const errorMessage = errorData.message || "Login failed due to unexpected error.";
//       throw new Error(errorMessage);
//     }

//     // Get username and role from login response
//     const data: { username: string; role: User['role'] } = await response.json();

//     // Fetch userId using the username
//     const userIdResponse = await fetch(`${BACKEND_API_BASE_URL}/api/user-role/id-by-username/${data.username}`);
//     if (!userIdResponse.ok) {
//       throw new Error('Failed to fetch userId');
//     }
//     const userIdData = await userIdResponse.json();
//     const userId = userIdData.userId;

//     const userWithId: User = {
//       username: data.username,
//       role: data.role,
//       userId,
//     };

//     setUser(userWithId);
//     setIsAuthenticated(true);
//     localStorage.setItem('user', JSON.stringify(userWithId));
//     console.log('User logged in:', userWithId);
//     return userWithId;
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('user');
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     isAuthenticated
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


import { createContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  // Updated role type to include all potential roles used in the application
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
        // console.log(user," ............"); // This line would refer to the 'user' state before it's set, can be removed or modified.
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('user'); // Clear corrupted data
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
      // If fetching userId fails, log it but don't prevent login with available data
      console.error('Failed to fetch userId for user:', data.username);
      // You might want to handle this more robustly depending on if userId is critical for immediate operations.
      // For now, setting it to a placeholder if not found.
    }
    const userIdData = await userIdResponse.json();
    const userId = userIdData.userId || 0; // Provide a default or handle case where userId isn't returned

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
    console.log('User logged out.');
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
