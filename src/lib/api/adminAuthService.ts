// src/lib/api/adminAuthService.ts
import api from "@/utils/axiosConfig";

export interface LoginRequest {
  email: string;
  password: string;
  requiredRole?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

// 🧠 Đăng nhập
export async function adminLogin(payload: LoginRequest): Promise<LoginResponse> {
  const res = await api.post("/api/admin/auth/login", payload);
  return res.data;
}

// 🧠 Refresh token (nếu có)
export async function refreshToken(refreshToken?: string) {
  const res = await api.post(
    "/api/admin/auth/refresh",
    refreshToken ? { refreshToken } : {}
  );
  return res.data;
}

// 🧠 Revoke refresh token
export async function revokeRefresh() {
  return api.post("/api/admin/auth/revoke");
}
