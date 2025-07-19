/**
 * SSR 开发环境 Web 服务器
 *
 * 这是一个基于 Express.js 的 Web 服务器（类似于 Go 的 Gin、Echo 框架），
 * 专门用于开发环境的服务端渲染（SSR）。
 *
 * 主要特性：
 * - 集成 Vite 开发服务器，支持热模块替换（HMR）
 * - 实时编译和转换 TypeScript/JSX 代码
 * - 所有页面都进行实时 SSR 渲染，无预渲染缓存
 * - 提供开发友好的错误堆栈和调试信息
 *
 * 使用场景：开发环境 SSR 调试和开发
 * 启动命令：pnpm dev:ssr
 *
 * 对比 server-prod.ts：
 * - server.ts：开发环境，集成 Vite，实时编译，全部 SSR
 * - server-prod.ts：生产环境，无 Vite，预渲染优先，性能优化
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  // SSR处理 - 放在最后，让Vite先处理静态资源
  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. 读取 index-ssr.html
      let template = readFileSync(resolve(__dirname, 'index-ssr.html'), 'utf-8');

      // 2. 应用 Vite HTML 转换
      template = await vite.transformIndexHtml(url, template);

      // 3. 加载服务器端入口
      const { render } = await vite.ssrLoadModule('/src/page-router.tsx');

      // 4. 渲染应用的 HTML
      const { html: appHtml } = render(url);

      // 5. 将渲染后的 HTML 注入到模板中
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 6. 返回渲染后的 HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
  });
}

createServer();
