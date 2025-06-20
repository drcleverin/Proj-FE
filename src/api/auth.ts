
// import axios from 'axios';

// const API_URL = 'http://localhost:8093/api/auth';

// const authService = {
//   register: (username: string, email: string, password: string, role: string) => {
//     return axios.post(`${API_URL}/register`, {
//       username,
//       email,
//       password,
//       role,
//     });
//   },

//   requestPasswordReset: (email: string) => {
//     return axios.post(`${API_URL}/forgot-password`, {
//       email,
//     });
//   },

//   resetPassword: (token: string, newPassword: string) => {
//     return axios.post(`${API_URL}/reset-password`, {
//       token,
//       newPassword,
//     });
//   },
// };

// export default authService;

import axios from 'axios';

const API_URL = 'http://localhost:8093/api/auth';

interface AuthResponse {
  token: string;
  [key: string]: any;
}

const authService = {
  register: (username: string, email: string, password: string, role: string) => {
    return axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
    });
  },

  login: (username: string, password: string): Promise<AuthResponse> => {
    return axios.post(`${API_URL}/login`, { username, password }).then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('token...........', response.data);
      }
      return response.data;
    });
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: (): AuthResponse | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  requestPasswordReset: (email: string) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
  },

  resetPassword: (token: string, newPassword: string) => {
    return axios.post(`${API_URL}/reset-password`, { token, newPassword });
  },
};

export default authService;





















// import axios from 'axios';

// // Define the base URL for your authentication API
// const API_URL = 'http://localhost:8093/api/auth/';

// // 1. Define interfaces for data structures

// // Interface for the User object stored in localStorage after successful login
// interface User {
//   id?: string; // Optional, depending on what your backend returns
//   username: string;
//   email?: string; // Optional
//   token: string; // The authentication token
//   roles?: string[]; // Optional, if your user has roles
//   // Add any other properties your backend returns for a logged-in user
// }

// // Interface for the register request payload
// interface RegisterPayload {
//   username: string;
//   email: string;
//   password: string;
//   role?: string; // Role might be optional depending on your backend
// }

// // Interface for the login request payload
// interface LoginPayload {
//   username: string;
//   password: string;
// }

// // Interface for the password reset request payload
// interface RequestPasswordResetPayload {
//   email: string;
// }

// // Interface for the reset password request payload
// interface ResetPasswordPayload {
//   token: string;
//   newPassword: string;
// }

// // 2. Implement the authentication service functions with types

// /**
//  * Registers a new user.
//  * @param username - The username for the new account.
//  * @param email - The email for the new account.
//  * @param password - The password for the new account.
//  * @param role - The role of the new user (optional).
//  * @returns A Promise containing the Axios response.
//  */
// const register = (username: string, email: string, password: string, role?: string) => {
//   const payload: RegisterPayload = { username, email, password };
//   if (role) {
//     payload.role = role;
//   }
//   return axios.post(API_URL + 'register', payload);
// };

// /**
//  * Logs in a user.
//  * Stores the user data (including token) in localStorage upon successful login.
//  * @param username - The user's username.
//  * @param password - The user's password.
//  * @returns A Promise that resolves with the user data.
//  */
// const login = (username: string, password: string): Promise<User> => {
//   const payload: LoginPayload = { username, password };
//   return axios.post<User>(API_URL + 'login', payload)
//     .then((response) => {
//       // Check if a token exists in the response data before storing
//       if (response.data.token) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//       return response.data; // Return the user data from the response
//     });
// };

// /**
//  * Logs out the current user by removing their data from localStorage.
//  */
// const logout = (): void => {
//   localStorage.removeItem('user');
// };

// /**
//  * Retrieves the current user data from localStorage.
//  * @returns The User object if found in localStorage, otherwise null.
//  */
// // const getCurrentUser = (): User | null => {
// //   const userStr = localStorage.getItem('user');
// //   if (userStr) {
// //     // Parse the stored string back into a User object
// //     return JSON.parse(userStr) as User;
// //   }
// //   return null;
// // };
// const getCurrentUser = (): User | null => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) {
//     try {
//       return JSON.parse(userStr) as User;
//     } catch (error) {
//       console.error("Error parsing stored user:", error);
//       return null;
//     }
//   }
//   return null;
// };


// /**
//  * Sends a request to initiate a password reset process.
//  * @param email - The email address for which to reset the password.
//  * @returns A Promise containing the Axios response.
//  */
// const requestPasswordReset = (email: string) => {
//   const payload: RequestPasswordResetPayload = { email };
//   return axios.post(API_URL + 'request-password-reset', payload);
// };

// /**
//  * Resets the user's password using a provided token.
//  * @param token - The password reset token received (e.g., from an email link).
//  * @param newPassword - The new password for the user.
//  * @returns A Promise containing the Axios response.
//  */
// const resetPassword = (token: string, newPassword: string) => {
//   const payload: ResetPasswordPayload = { token, newPassword };
//   return axios.post(API_URL + 'reset-password', payload);
// };

// // 3. Export the authentication service functions
// const authService = {
//   register,
//   login,
//   logout,
//   getCurrentUser,
//   requestPasswordReset,
//   resetPassword,
// };

// export default authService;
