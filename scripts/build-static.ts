import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildStatic(): Promise<void> {
  // 需要预渲染的页面列表
  const pagesToPrerender = ['/', '/login'];

  // 读取构建后的HTML模板
  const template = readFileSync(resolve(__dirname, '../dist/index.html'), 'utf-8');

  // 动态导入服务端渲染模块
  const { render } = await import('../dist-ssr/page-router.js');

  // 为每个页面生成静态HTML
  for (const url of pagesToPrerender) {
    const { html: appHtml } = render(url);

    // 将渲染后的HTML注入到模板中
    const html = template.replace('<!--ssr-outlet-->', appHtml);

    // 确保目录存在
    const fileName = url === '/' ? '/index.html' : `${url}.html`;
    const filePath = resolve(__dirname, `../dist${fileName}`);
    mkdirSync(dirname(filePath), { recursive: true });

    // 写入文件
    writeFileSync(filePath, html, 'utf-8');

    console.log(`Generated static HTML for ${url}`);
  }
}

buildStatic();
