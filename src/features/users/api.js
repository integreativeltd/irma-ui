import api from '../../services/api';
import { getStoredToken } from '../../utils/auth';

export const userApi = {
  getUsers: async (tenantId) => {
    try {
      const response = await api.get('/api/users', {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  createUser: async (userData, tenantId) => {
    try {
      const response = await api.post('/api/users', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        roles: userData.roles,
        isActive: true
      }, {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 409) {
        throw new Error('A user with this email already exists');
      }
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },

  updateUserRoles: async (userId, roles, tenantId) => {
    try {
      const response = await api.put(`/api/users/${userId}/roles`, {
        roles
      }, {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user roles');
    }
  },

  toggleUserStatus: async (userId, isActive, tenantId) => {
    try {
      const response = await api.put(`/api/users/${userId}/status`, {
        isActive
      }, {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user status');
    }
  },

  getUserById: async (userId, tenantId) => {
    try {
      const response = await api.get(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  }
};