import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Keep sending HttpOnly cookies if backend requires them
});

// 👉 ADDED: Request interceptor to dynamically inject the absolute freshest token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Grabs the token of whoever is currently logged in
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // logout will be handled by AuthProvider when receiving 401
    }
    if (error.response?.data?.error && typeof error.response.data.error === 'object') {
      error.message = error.response.data.error.message || 'An error occurred';
    } else if (typeof error.response?.data?.error === 'string') {
      error.message = error.response.data.error;
    }

    return Promise.reject(error);
  }
);

export default apiClient;