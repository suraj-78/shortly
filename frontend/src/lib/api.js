import axios from 'axios';

// Get the backend API URL from environment variables
// VITE_API_URL will be "http://localhost:8080/api" in your .env file
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create a central 'api' client
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This is CRITICAL for sending/receiving auth cookies
});

// --- API Error Handling ---
// This interceptor standardizes error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Try to get the error message from the backend response
    const message = error.response?.data?.message || error.message;
    // We throw a new Error with the backend's message
    // This allows our components to catch it and show it in the toast
    return Promise.reject(new Error(message));
  }
);

// --- Auth API Definitions ---
// This is the authApi object your context uses
export const authApi = {
  /**
   * @param {object} data - { email, password }
   */
  login: (data) => api.post('/user/login', data),
  
  /**
   * @param {object} data - { name, email, password }
   */
  register: (data) => api.post('/user/register', data),
  
  /**
   * Logs out the user
   */
  logout: () => api.get('/user/logout'),
};

// You can add your other API calls here
export const urlApi = {
  /**
   * @param {number} limit
   * @param {number} offset
   */
  getUrls: (limit, offset) => 
    api.get(`/url?limit=${limit}&offset=${offset}`),
  
  /**
   * @param {string} long_url
   */
  createUrl: (long_url) => 
    api.post('/url/create', { long_url }),
  
  // ... and so on for delete, update, etc.
};

export default api;