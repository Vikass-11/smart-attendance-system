import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // send HttpOnly cookies
});

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