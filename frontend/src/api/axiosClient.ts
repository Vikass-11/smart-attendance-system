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

    return Promise.reject(error);
  }
);

export default apiClient;