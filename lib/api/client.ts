import axios from 'axios';
import { API_BASE_URL } from '../config';

const AUTH_TOKEN_KEY = 'admin_token';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Handle 401 Unauthorized - redirect to login
      if (error.response.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem('admin_user');
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      console.error('Error:', error.message);
      throw error;
    }
  }
);

export default apiClient;

