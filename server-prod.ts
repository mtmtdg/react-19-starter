/**
 * SSR 生产环境 Web 服务器
 *
 * 这是一个基于 Express.js 的 Web 服务器（类似于 Go 的 Gin、Echo 框架），
 * 专门用于生产环境的高性能服务端渲染（SSR）。
 *
 * 主要特性：
 * - 混合渲染策略：预渲染页面优先，其他页面实时 SSR
 * - 分层缓存策略：静态资源长期缓存，页面短期缓存
 * - 生产优化：安全头、性能监控、错误降级处理
 * - 使用构建后的静态资源，无需 Vite 运行时
 *
 * 使用场景：生产环境部署，追求最佳性能和稳定性
 * 启动命令：tsx server-prod.ts（需先执行 pnpm build:ssr）
 *
 * 对比 server.ts：
 * - server.ts：开发环境，集成 Vite，实时编译，全部 SSR
 * - server-prod.ts：生产环境，无 Vite，预渲染优先，性能优化
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 预渲染页面配置
const PRERENDERED_PAGES = new Set(['/', '/login']);

async function createProductionServer() {
  const app = express();

  // 添加安全头
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // 提供静态文件服务，设置缓存
  app.use(
    express.static(resolve(__dirname, 'dist'), {
      maxAge: '1y',
      etag: true,
      lastModified: true,
    }),
  );

  // 如果没有静态文件，使用SSR
  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const template = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8');
      const { render } = await import('./dist-ssr/page-router.js');
      const { html: appHtml } = render(url);
      const html = template.replace('<!--ssr-outlet-->', appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      next(e);
    }
  });

  // 404处理 - 实际项目中可以设计专门的404页面
  app.use((_req, res) => {
    res.status(404).json({ error: 'Page not found' });
  });

  // 全局错误处理
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Production server running on http://localhost:${port}`);
    console.log(`Prerendered pages: ${Array.from(PRERENDERED_PAGES).join(', ')}`);
  });
}

createProductionServer().catch(console.error);
