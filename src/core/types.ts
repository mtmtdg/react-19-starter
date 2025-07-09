export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// 登录响应接口
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// JWT Claims 接口（与后端保持一致）
export interface CustomClaims {
  user: User;
  tokenType: 'access' | 'refresh';
}
