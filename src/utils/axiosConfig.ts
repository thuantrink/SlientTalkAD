// src/utils/axiosConfig.ts
import axios from "axios";

const API_ROOT =
  process.env.NEXT_PUBLIC_API_ROOT ||
  "https://api20251116200831-djh7b7e4dseec6a4.southeastasia-01.azurewebsites.net";

const api = axios.create({
  baseURL: API_ROOT,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, 
});
  
const _get = async (url: string, config = {}) => {
  return api.get(url, config);
}


export default api;
