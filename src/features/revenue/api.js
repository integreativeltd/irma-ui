import api from '../../services/api';
import { getStoredToken } from '../../utils/auth';

export const revenueApi = {
  getRevenueStreams: async (tenantId) => {
    const response = await api.get('/api/revenue-streams', {
      headers: {
        'Authorization': `Bearer ${getStoredToken()}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  },

  searchRevenueStreams: async (tenantId, query = '') => {
    const response = await api.get('/api/revenue-streams/search', {
      params: { q: query },
      headers: {
        'Authorization': `Bearer ${getStoredToken()}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  },

  updateRevenueStream: async (id, data, tenantId) => {
    const response = await api.put(`/api/revenue-streams/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${getStoredToken()}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  },

  createRevenueStream: async (data, tenantId) => {
    const response = await api.post('/api/revenue-streams', data, {
      headers: {
        'Authorization': `Bearer ${getStoredToken()}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  },

  importFromCSV: async (filePath, tenantId) => {
    const response = await api.post('/api/revenue-streams/import', null, {
      params: { filePath },
      headers: {
        'Authorization': `Bearer ${getStoredToken()}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  }
};