# React 19 Starter

这是一个基于 React 19 的现代前端项目启动模板，使用最新的工具链和最佳实践。支持 **SPA** 和 **SSR** 两种渲染模式。

## 初始创建

项目基于 Vite 官方模板创建：

```bash
pnpm create vite@latest react-19-starter --template react-ts
```

## 技术栈

- **React 19** + **TypeScript** + **Vite**
- **Jotai** 状态管理 + **React Router** 路由
- **Material-UI** 组件库 + **React Hook Form** + **Valibot** 验证
- **Ky** 网络请求 + **JWT** 认证
- **Express** SSR 服务器 + **服务端渲染**
- **Biome** 代码检查 + **Vitest** 测试 + **Husky** Git hooks

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 启动后端服务 (http://localhost:8080)
cd backend && go run main.go

# 3. 启动前端开发服务器 (http://localhost:5173)
cd .. && pnpm dev

# 4. 代码检查和格式化
pnpm typecheck        # TypeScript 类型检查
pnpm lint            # 代码检查
pnpm format          # 代码格式化

# 5. 运行测试
pnpm test            # 运行测试
pnpm test:watch      # 监听模式测试

# 6. 生产构建
pnpm build
```

## 核心功能

- **JWT 认证系统** - 登录/登出、路由保护
- **表单处理** - React Hook Form + Valibot 验证
- **弹窗服务** - 统一的 Dialog 管理
- **消息通知** - Toast 服务
- **后端 API** - Go 示例服务器 (`backend/` 目录)
- **SSR/SPA 兼容** - 支持服务端渲染和单页应用两种模式

## SSR 服务端渲染

项目原先使用 SPA 模式 (`pnpm dev` / `pnpm build`)，现在新增了 SSR 支持：

```bash
# SSR 开发服务器 (http://localhost:3000)
pnpm dev:ssr

# SSR 生产构建和部署
pnpm build:ssr        # 构建 SSR 版本 (替代原先的 pnpm build)
tsx server-prod.ts    # 启动生产服务器
```

### 渲染模式对比

| 特性           | SPA 模式           | SSR 模式           |
|----------------|--------------------|--------------------|
| **首屏加载**   | 客户端渲染，较慢   | 服务端预渲染，快速 |
| **SEO 友好**   | 需要额外配置       | 天然支持           |
| **服务器负载** | 低                 | 中等               |
| **开发复杂度** | 简单               | 中等               |
| **适用场景**   | 管理后台、工具应用 | 官网、博客、电商   |

### SSR 文件结构

```
├── server.ts              # 开发环境 SSR 服务器
├── server-prod.ts         # 生产环境 SSR 服务器
├── index-ssr.html         # SSR HTML 模板
├── scripts/
│   └── build-static.ts    # 静态页面预渲染脚本
└── src/
    ├── index-ssr.tsx      # SSR 客户端水合入口
    └── page-router.tsx    # SSR 页面路由器
```

### SSR 工作流程

1. **开发环境** (`pnpm dev:ssr`)
   - 使用 Vite 中间件模式集成 Express
   - 实时编译 TypeScript/JSX
   - 支持热模块替换 (HMR)
   - 所有页面实时 SSR 渲染

2. **生产环境** (`pnpm build:ssr`)
   - 构建客户端和服务端代码
   - 预渲染静态页面 (/, /login)
   - 混合渲染：静态页面优先，其他页面实时 SSR
   - 优化缓存策略和安全头

### 页面渲染策略

- **预渲染页面**: `/`, `/login` - 构建时生成静态 HTML
- **动态 SSR**: 其他页面 - 请求时服务端渲染
- **客户端水合**: 所有页面都支持客户端交互
