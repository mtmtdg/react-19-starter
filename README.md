# React 19 Starter

这是一个基于 React 19 的现代前端项目启动模板，使用最新的工具链和最佳实践。

## 初始创建

项目基于 Vite 官方模板创建：

```bash
pnpm create vite@latest react-19-starter --template react-ts
```

## 技术栈选型

### 核心框架
- **React 19** - 最新的 React 版本，支持并发特性和新的 Hooks
- **Vite** - 快速的构建工具，支持 HMR

### 状态管理
- **Jotai** - 轻量级原子化状态管理库

### 路由
- **React Router DOM** - React 应用的声明式路由

### UI 库
- **Material-UI** - Google Material Design 组件库

### 表单处理
- **React Hook Form** - 高性能表单库
- **Valibot** - 轻量级的数据验证库

### HTTP 客户端
- **Ky** - 基于 Fetch API 的现代 HTTP 客户端

### 开发工具
- **Biome** - 快速的代码格式化器和 linter，替代 ESLint 和 Prettier
- **Vitest** - 基于 Vite 的测试框架
- **Husky** - Git hooks 管理
- **lint-staged** - 暂存文件 linting
