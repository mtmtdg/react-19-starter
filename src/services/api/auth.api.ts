import { httpClient } from './http-client';

import type { AuthTokens, LoginResponse } from '@/core/types';

async function login(username: string, password: string): Promise<AuthTokens> {
  // 自动不带 token（因为是 /api/login）
  return httpClient
    .post('api/login', {
      json: { username, password },
    })
    .json<LoginResponse>();
}

async function refreshTokens(): Promise<AuthTokens> {
  // 自动使用 refresh token（因为是 /api/refresh）
  return httpClient.post('api/refresh').json<LoginResponse>();
}

async function logout(): Promise<void> {
  // 调用后端注销接口
  await httpClient.post('api/logout');
}

export const AuthApi = {
  login,
  refreshTokens,
  logout,
};
