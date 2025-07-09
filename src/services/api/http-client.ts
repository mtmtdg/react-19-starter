import ky from 'ky';

import { tokensAtom } from '@/atoms/auth.atoms';
import { store } from '@/atoms/store';

// 统一的 HTTP 客户端 - 根据 URL 自动选择合适的 token
export const httpClient = ky.create({
  prefixUrl: 'http://localhost:8080',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get', 'put', 'delete'],
  },
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const url = request.url.toString();
        let token: string | null = null;

        // 根据 URL 自动选择 token 类型
        if (url.includes('/api/refresh')) {
          // refresh 接口使用 refresh token
          token = store.get(tokensAtom)?.refreshToken || null;
        } else if (!url.includes('/api/login')) {
          // 除了 login 接口，其他都使用 access token
          token = store.get(tokensAtom)?.accessToken || null;
        }
        // login 接口不添加任何 token

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
