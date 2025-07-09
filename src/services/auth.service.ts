import { tokensAtom } from '@/atoms/auth.atoms';
import { store } from '@/atoms/store';
import { isTokenValid, parseJWT } from '@/utils/jwt';

import { AuthApi } from './api/auth.api';

import type { AuthTokens } from '@/core/types';

let timer: NodeJS.Timeout | null;
let isLoggedOut = false;

async function login(email: string, password: string): Promise<void> {
  try {
    isLoggedOut = false;
    const tokens = await AuthApi.login(email, password);
    setTokensAndStartTimer(tokens);
  } catch {
    throw new Error('Login failed');
  }
}

async function logout(): Promise<void> {
  // 设置logout标志，防止正在进行的refresh覆盖logout
  isLoggedOut = true;
  // 清理计时器
  clearTimer();

  try {
    await AuthApi.logout();
  } finally {
    // 清理atom
    store.set(tokensAtom, null);
  }
}

function setTokensAndStartTimer(tokens: AuthTokens): void {
  store.set(tokensAtom, tokens);
  clearTimer();

  // 解析剩余时间并设置计时器
  const timeLeft = getTimeUntilRefresh(tokens.accessToken);

  if (timeLeft <= 0) {
    return;
  }

  // setTimeout可以调用异步函数，但不会等待其完成
  timer = setTimeout(async () => {
    await tryRefresh();
  }, timeLeft);
}

async function tryRefresh(): Promise<void> {
  const refreshToken = store.get(tokensAtom)?.refreshToken;

  // 没有refreshToken或者过期就放弃
  if (!refreshToken || !isTokenValid(refreshToken)) {
    return;
  }

  try {
    const tokens = await AuthApi.refreshTokens();

    // 防止竟态条件: 如果refresh请求发出,用户退出,refresh请求返回,直接设置token
    if (isLoggedOut) {
      return;
    }

    setTokensAndStartTimer(tokens);
  } catch {
    // 刷新失败，清理所有状态
    await logout();
  }
}

// 工具函数
function getTimeUntilRefresh(accessToken: string): number {
  try {
    const decoded = parseJWT(accessToken);
    if (!decoded) {
      return 0;
    }

    const expirationTime = decoded.exp * 1000;
    const refreshTime = expirationTime - 5 * 1000; // 提前5秒刷新
    return Math.max(0, refreshTime - Date.now());
  } catch {
    return 0;
  }
}

function clearTimer(): void {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

export const authService = {
  login,
  logout,
  tryRefresh,
};
