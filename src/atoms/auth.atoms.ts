import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { isTokenValid, parseJWT } from '@/utils/jwt';

import type { AuthTokens, CustomClaims, User } from '@/core/types';

// 持久化存储的tokens atom
export const tokensAtom = atomWithStorage<AuthTokens | null>('auth-tokens', null);

// 从token解析用户信息的派生atom
export const userAtom = atom<User | null>((get) => {
  const tokens = get(tokensAtom);
  if (!tokens?.accessToken) {
    return null;
  }

  const parsed = parseJWT<CustomClaims>(tokens.accessToken);
  if (!parsed) return null;

  // 直接返回 JWT 中的用户信息
  return parsed.user;
});

// 认证状态的派生atom
export const isAuthenticatedAtom = atom<boolean>((get) => {
  const tokens = get(tokensAtom);
  if (!tokens?.accessToken) {
    return false;
  }

  return isTokenValid(tokens.accessToken);
});
