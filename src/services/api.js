import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8082'
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add tenant ID header
    // For registration and login, use 'default' tenant
    if (config.url.includes('/auth/')) {
      config.headers['X-Tenant-ID'] = 'default';
    } else {
      // For other requests, get tenant from localStorage or use default
      const tenant = localStorage.getItem('tenantId') || 'default';
      config.headers['X-Tenant-ID'] = tenant;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // If this is a successful auth response, store the tenant ID
    if (response.config.url.includes('/auth/') && response.data.tenantId) {
      localStorage.setItem('tenantId', response.data.tenantId);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('tenantId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
