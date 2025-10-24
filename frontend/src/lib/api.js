import axios from 'axios';

// Get the backend API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
// Get the base URL (without /api) for redirects
const BASE_URL = API_BASE_URL.replace('/api', '');

// Create a central 'api' client for protected routes
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This is CRITICAL for sending/receiving auth cookies
});

// Create a separate client for public requests (like the redirect)
const publicApi = axios.create({
  baseURL: BASE_URL, // Use the base URL
});

// --- API Error Handling (for protected routes) ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

// --- Auth API Definitions ---
export const authApi = {
  login: (data) => api.post('/user/login', data),
  register: (data) => api.post('/user/register', data),
  logout: () => api.get('/user/logout'),
  getMe: () => api.get('/user/me'),
};

// --- URL API Definitions ---
export const urlApi = {
  getUrls: (limit, offset) =>
    api.get(`/url?limit=${limit}&offset=${offset}`),

  createUrl: (long_url) =>
    api.post('/url/create', { long_url }),

  updateUrl: (id, new_url) => // Changed arguments
    api.patch('/url/update', { id, new_url }), // Send ID in body

  deleteUrl: (id) =>
    api.delete(`/url/${id}`),

  getAnalytics: (shortCode) => // Changed arguments
    api.get(`/url/analytics/${shortCode}`),

  // --- NEW FUNCTION ---
  /**
   * Fetches the long URL for redirection (uses public client)
   * Note: This hits the backend's GET /{shortCode} endpoint directly,
   * which handles the redirect logic itself (incrementing count, etc.).
   * The backend's response *should* be the long URL string.
   * However, the backend currently redirects immediately (302).
   * We need to adjust the backend or this function.
   * For now, let's assume we hit the /api/{shortCode} to just GET the URL.
   * @param {string} shortCode
   */
  redirect: (shortCode) => publicApi.get(`/api/${shortCode}`), // Use the /api endpoint for now
};

export default api; // Export the authenticated client by default

