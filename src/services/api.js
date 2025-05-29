import axios from 'axios';

// Base URL could also be set using an environment variable (recommended)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Optional: Attach tenant ID to every request header
  const host = window.location.hostname;
  const subdomain = host.split('.')[0];
  if (subdomain) {
    config.headers['X-Tenant-ID'] = subdomain;
  }

  return config;
});

export default api;
