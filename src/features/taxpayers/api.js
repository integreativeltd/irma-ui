// src/features/taxpayers/api.js
import api from '../../services/api';
import { getStoredToken } from '../../utils/auth';

export const taxpayerApi = {
  createTaxpayer: async (data, tenantId, userId) => {
    try {
      const response = await api.post('/api/taxpayers', data, {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId,
          'X-User-ID': userId
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 409) {
        throw new Error(error.response.data.message || 'A taxpayer with this Tax ID already exists');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to create taxpayer. Please try again.');
      }
    }
  },

  getTaxpayers: async (tenantId) => {
    const response = await api.get('/api/taxpayers', {
      headers: {
        'Authorization': `Bearer ${getStoredToken()}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  },

  searchTaxpayers: async (tenantId, query = '') => {
    try {
      const response = await api.get('/api/taxpayers/search', {
        params: { query },
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search taxpayers');
    }
  },
  
  updateTaxpayer: async (taxpayerId, data, tenantId) => {
    try {
      const response = await api.put(`/api/taxpayers/${taxpayerId}`, data, {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update taxpayer');
    }
  }
};
