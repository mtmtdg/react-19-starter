# Go 后端 API 服务

使用 Echo 框架构建的 Go 后端服务，提供用户登录和 JWT token 管理功能。

## 启动服务

```bash
cd backend
go run main.go
```

服务将在 `http://localhost:8080` 启动。

## 技术栈

- **框架:** Echo v4
- **JWT:** golang-jwt/jwt/v5 + echo-jwt/v4
- **特性:**
  - 内置 CORS 支持
  - 请求日志记录
  - 错误恢复中间件
  - echo-jwt 官方 JWT 中间件

## API 接口

### 1. 用户登录

**URL:** `POST /api/login`

**请求体:**
```json
{
  "username": "user123",
  "password": "user123"
}
```

**响应:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Token 刷新

**URL:** `POST /api/refresh`

**请求头:**
```
Authorization: Bearer <refresh_token>
```

**说明:** 只接受 `token_type: "refresh"` 的 JWT token

**响应:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. 用户登出 (受保护)

**URL:** `POST /api/logout`

**请求头:**
```
Authorization: Bearer <access_token>
```

**说明:** 只接受 `token_type: "access"` 的 JWT token

**响应:**
```json
{
  "message": "Logout successful"
}
```

### 4. Hello API (受保护)

**URL:** `GET /api/hello`

**请求头:**
```
Authorization: Bearer <access_token>
```

**说明:** 只接受 `token_type: "access"` 的 JWT token

**响应:**
```json
{
  "message": "Hi!"
}
```

## 用户验证规则

**简化的验证逻辑:** 用户名和密码必须相同

示例有效登录:
- `user123` / `user123`
- `admin` / `admin`
- `test` / `test`

## JWT Token 结构

**Access Token 包含:**
```json
{
  "user": {
    "id": "user123",
    "email": "user123@example.com",
    "name": "user123"
  },
  "tokenType": "access",
  "exp": 1234567890,
  "iat": 1234567890
}
```

**Refresh Token 包含:**
```json
{
  "user": {
    "id": "user123",
    "email": "user123@example.com",
    "name": "user123"
  },
  "tokenType": "refresh",
  "exp": 1234567890,
  "iat": 1234567890
}
```

## 使用 curl 测试

### 登录
```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user123","password":"user123"}'
```

### 刷新 Token
```bash
curl -X POST http://localhost:8080/api/refresh \
  -H "Authorization: Bearer YOUR_REFRESH_TOKEN"
```

### 登出
```bash
curl -X POST http://localhost:8080/api/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 测试受保护的 API
```bash
curl -X GET http://localhost:8080/api/hello \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 使用 xh 测试

### 登录
```bash
xh POST localhost:8080/api/login username=user123 password=user123
```

### 刷新 Token
```bash
xh POST localhost:8080/api/refresh Authorization:"Bearer YOUR_REFRESH_TOKEN"
```

### 登出
```bash
xh POST localhost:8080/api/logout Authorization:"Bearer YOUR_ACCESS_TOKEN"
```

### 测试受保护的 API
```bash
xh GET localhost:8080/api/hello Authorization:"Bearer YOUR_ACCESS_TOKEN"
```

## Token 有效期

- Access Token: 1 小时
- Refresh Token: 24 小时

## 设计原则

### Token 类型分离
- **Access Token:** 用于访问业务 API（较短有效期）
- **Refresh Token:** 仅用于刷新 token（较长有效期）
- 通过 `token_type` 字段严格区分用途

### 安全设计
- 移除 `expires_in` 字段避免信息重复和不一致攻击
- Refresh API 不使用 JWT 中间件，手动验证 token 类型
- 严格验证 refresh token 的 `token_type` 字段
- 登录接口故意添加1秒延迟，模拟真实场景

## 架构优势

使用 Echo 框架带来的优势：

1. **更简洁的代码:** 使用 Echo 的 context 和内置功能
2. **更好的错误处理:** 使用 echo.HTTPError 统一错误响应
3. **灵活的路由设计:** 公开和受保护的端点分离
4. **更好的性能:** Echo 在某些场景下性能优于 Gin
5. **标准化 JWT 处理:** 区分不同类型的 token

## 注意事项

- 生产环境请修改 `jwtSecret` 为安全的随机字符串
- 当前使用简化的用户验证逻辑（用户名=密码）
- 服务已配置 CORS 支持跨域请求
- Token 类型严格分离，refresh token 只能用于刷新操作
- 可通过修改全局变量调整 token 有效期进行测试
- 登出功能由于JWT无状态特性，主要由客户端清除token实现
