// src/utils/axiosConfig.ts
import axios from "axios";

// axiosConfig.ts (Next.js)
const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || "https://transphysical-charlotte-doomfully.ngrok-free.dev";

const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: false // nếu BE dùng cookie cho refresh => true
});

// request interceptor: attach access token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminAccessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
