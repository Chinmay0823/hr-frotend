// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://hr-backend-silk.vercel.app/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;