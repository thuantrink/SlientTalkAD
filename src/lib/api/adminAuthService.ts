// src/lib/api/adminAuthService.ts
import axios from 'axios';

const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || 'https://transphysical-charlotte-doomfully.ngrok-free.dev';
const api = axios.create({
  baseURL: API_ROOT,
  withCredentials: false // nếu BE set HttpOnly cookie cho refresh: true
});

export interface LoginRequest {
  email: string;
  password: string;
  requiredRole?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  // optionally: user profile
}

export async function adminLogin(payload: LoginRequest): Promise<LoginResponse> {
  const res = await api.post('/api/admin/auth/login', payload);
  return res.data;
}

export async function refreshToken(refreshToken?: string) {
  const res = await api.post('/api/admin/auth/refresh', refreshToken ? { refreshToken } : {});
  return res.data;
}

export async function revokeRefresh() {
  return api.post('/api/admin/auth/revoke');
}

export async function getProfile() {
  const res = await api.get('/api/admin/auth/me');
  return res.data;
}
