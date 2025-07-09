import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { getTokenTimeToExpiry, isTokenValid, parseJWT } from './jwt';

// 创建测试用的 JWT token（手动构造，不依赖真实签名）
const createTestToken = (payload: Record<string, unknown>): string => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerEncoded = btoa(JSON.stringify(header));
  const payloadEncoded = btoa(JSON.stringify(payload));
  return `${headerEncoded}.${payloadEncoded}.fake-signature`;
};

describe('JWT工具函数', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('parseJWT', () => {
    test('解析有效的JWT令牌', () => {
      const payload = { exp: 1234567890, iat: 1234567800, sub: 'user123' };
      const token = createTestToken(payload);

      const result = parseJWT(token);

      expect(result).toEqual(payload);
    });

    test('无效令牌返回null', () => {
      const result = parseJWT('invalid-token');

      expect(result).toBeNull();
    });

    test('支持泛型类型', () => {
      interface CustomClaims {
        userId: string;
        role: string;
      }

      const payload = { exp: 1234567890, userId: 'user123', role: 'admin' };
      const token = createTestToken(payload);

      const result = parseJWT<CustomClaims>(token);

      expect(result?.userId).toBe('user123');
      expect(result?.role).toBe('admin');
    });
  });

  describe('isTokenValid', () => {
    test('有效令牌返回true', () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1小时后过期
      const token = createTestToken({ exp: futureTime });

      const result = isTokenValid(token);

      expect(result).toBe(true);
    });

    test('过期令牌返回false', () => {
      const pastTime = Math.floor(Date.now() / 1000) - 3600; // 1小时前过期
      const token = createTestToken({ exp: pastTime });

      const result = isTokenValid(token);

      expect(result).toBe(false);
    });

    test('未到生效时间的令牌返回false', () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const futureNbf = Math.floor(Date.now() / 1000) + 1800; // 30分钟后才生效
      const token = createTestToken({ exp: futureTime, nbf: futureNbf });

      const result = isTokenValid(token);

      expect(result).toBe(false);
    });

    test('无效令牌返回false', () => {
      const result = isTokenValid('invalid-token');

      expect(result).toBe(false);
    });
  });

  describe('getTokenTimeToExpiry', () => {
    test('返回正确的剩余时间', () => {
      const currentTime = 1000000000;
      const expTime = currentTime + 3600; // 1小时后过期
      vi.setSystemTime(new Date(currentTime * 1000));

      const token = createTestToken({ exp: expTime });

      const result = getTokenTimeToExpiry(token);

      expect(result).toBe(3600);
    });

    test('过期令牌返回0', () => {
      const currentTime = 1000000000;
      const expTime = currentTime - 3600; // 1小时前过期
      vi.setSystemTime(new Date(currentTime * 1000));

      const token = createTestToken({ exp: expTime });

      const result = getTokenTimeToExpiry(token);

      expect(result).toBe(0);
    });

    test('无效令牌返回0', () => {
      const result = getTokenTimeToExpiry('invalid-token');

      expect(result).toBe(0);
    });
  });
});
