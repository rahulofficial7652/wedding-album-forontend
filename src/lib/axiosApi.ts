import axios from 'axios';

// Instance create karein
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  timeout: 10000, // 10 seconds baad request cancel ho jayegi
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors (Request): Request bhejne se pehle kuch add karna (e.g., Auth Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ya cookies se lein
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors (Response): Response milne ke baad global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logout logic ya redirect to login
      console.error("Unauthorized! Redirecting...");
    }
    return Promise.reject(error);
  }
);

export default api;