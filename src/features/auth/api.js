import api from '../../services/api';

export const authApi = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials');
      } else if (error.response?.status === 403) {
        throw new Error('Account is inactive. Please contact administrator.');
      }
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        roles: userData.roles || ['TAX_OFFICER'] // Default role for new registrations
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 409) {
        throw new Error('Email already exists');
      }
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to process forgot password request');
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Current password is incorrect');
      }
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }
};