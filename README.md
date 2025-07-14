# React 19 Starter

这是一个基于 React 19 的现代前端项目启动模板，使用最新的工具链和最佳实践。

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
