import { jwtDecode } from 'jwt-decode';

// 标准 JWT Claims (RFC 7519)
export interface StandardJWTClaims {
  iss?: string; // Issuer
  sub?: string; // Subject
  aud?: string | string[]; // Audience
  exp: number; // Expiration Time (必须)
  nbf?: number; // Not Before
  iat?: number; // Issued At
  jti?: string; // JWT ID
}

// 解析任意 JWT token，支持泛型自定义 payload
export const parseJWT = <T = Record<string, unknown>>(token: string): (T & StandardJWTClaims) | null => {
  try {
    return jwtDecode<T & StandardJWTClaims>(token);
  } catch {
    return null;
  }
};

// 获取当前时间戳（秒）
const getCurrentTime = (): number => Date.now() / 1000;

// 检查 token 是否有效（未过期且已生效）
export const isTokenValid = (token: string): boolean => {
  const decoded = parseJWT(token);
  if (!decoded) return false;

  const now = getCurrentTime();

  // 检查是否过期
  if (decoded.exp <= now) return false;

  // 检查是否还未生效
  if (decoded.nbf && decoded.nbf > now) return false;

  return true;
};

// 获取 token 剩余有效时间（秒）
export const getTokenTimeToExpiry = (token: string): number => {
  const decoded = parseJWT(token);
  if (!decoded) return 0;

  const remaining = decoded.exp - getCurrentTime();
  return Math.max(0, remaining);
};
