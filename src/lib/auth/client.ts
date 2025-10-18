'use client';

import axios from 'axios';
import type { User } from '@/types/user';

const API_ROOT =
  process.env.NEXT_PUBLIC_API_ROOT ||
  'https://transphysical-charlotte-doomfully.ngrok-free.dev';

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const res = await axios.post(`${API_ROOT}/api/admin/auth/login`, {
        email: params.email,
        password: params.password,
      });

      // ✅ lưu token vào localStorage
      const { accessToken, refreshToken } = res.data;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      return {};
    } catch (err: any) {
      console.error('Login error:', err);
      return { error: err.response?.data?.message || 'Login failed' };
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return { data: null };

      const res = await axios.get(`${API_ROOT}/api/admin/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { data: res.data };
    } catch (err: any) {
      console.error('GetUser error:', err);
      return { data: null, error: err.response?.data?.message || 'Unauthorized' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    try {
      const token = localStorage.getItem('refreshToken');
      await axios.post(`${API_ROOT}/api/admin/auth/revoke`, token ? { refreshToken: token } : {});
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return {};
  }
}

export const authClient = new AuthClient();
