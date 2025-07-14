# 网络请求库

## 决策结果
选择了 **Ky**

## 前言
网络请求库应该能完成
1. 请求
2. 设置base_url
3. 类似拦截器的功能
4. 请求取消
5. 超时
6. 重试
7. 上传进度

react生态唯一的体面(但context处理依然拉胯).
但也面临非常艰难的抉择: 要不要拥抱rxjs.
前端Promise向Observable转变还要多久(不光网络请求需要,DOM事件也需要啊)
IE什么时候灭亡

## 选项总览

| 库名                                                | GitHub Stars | 首次发布 | 最后更新   |
|-----------------------------------------------------|--------------|----------|------------|
| [Ky](https://github.com/sindresorhus/ky)            | 15.1k        | 2019年   | 2024年12月 |
| [Axios](https://github.com/axios/axios)             | 107.0k       | 2014年   | 2024年12月 |
| [TanStack Query](https://github.com/TanStack/query) | 45.8k        | 2019年   | 2024年12月 |

更新于2025-07-14

## 选项分析

### Axios
**举例**
```typescript
import axios from 'axios'

// 创建实例
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000
})

// 请求拦截器
api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// 发送请求
const response = await api.get('/users')
const user = await api.post('/users', { name: 'John' })
```

**优点：**
- 目前主流,功能完善,没有太大毛病
- 浏览器兼容性好，支持 IE
- 可以显示上传进度

**缺点：**
- 包体积相对较大

### Ky
**举例**
```typescript
import ky from 'ky'

// 创建实例
const api = ky.create({
  prefixUrl: 'https://api.example.com',
  timeout: 5000,
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('Authorization', `Bearer ${token}`)
      }
    ]
  }
})

// 发送请求
const users = await api.get('users').json()
const user = await api.post('users', { json: { name: 'John' } }).json()
```

**优点：**
- 包体积小
- 功能还算丰富

**缺点：**
- 不支持IE
- 不支持上传进度

### TanStack Query (React Query)
并不是网络请求库,但常常和网络请求库一同被提到,
通常面向需要频繁更新数据的使用场景(比如股票大盘)

功能
- 封装了isLoading, isError, Result这样的结果
- 无感知复用结果(如果两个组件同时做类似请求,会用缓存结果代替)
- 自动重试失败请求,支持指数退避策略
- 后台自动重新获取数据,保持数据新鲜度
- 窗口焦点重新获取,用户回到页面时自动刷新
- 网络重连时自动重新获取
- 分页和无限查询支持
- 乐观更新,立即更新UI后同步到服务器
- 离线支持,网络断开时仍能工作
- 请求去重,相同请求只发送一次
- 内存和垃圾回收管理
- 支持SSR和水合
