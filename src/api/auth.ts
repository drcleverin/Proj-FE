
import axios from 'axios';

const API_URL = 'http://localhost:8093/api/auth';

const authService = {
  register: (username: string, email: string, password: string, role: string) => {
    return axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
    });
  },

  requestPasswordReset: (email: string) => {
    return axios.post(`${API_URL}/forgot-password`, {
      email,
    });
  },

  resetPassword: (token: string, newPassword: string) => {
    return axios.post(`${API_URL}/reset-password`, {
      token,
      newPassword,
    });
  },
};

export default authService;
