# 状态管理

## 决策结果
选择了 **Jotai**

## 前言
状态管理本质上是对一个属性的
- 保存
- getter(要求还能监听变化)
- setter(要求有类似 `set = (current) => next` 的效果)

理论上做好这3点即可.如果可行,再添加一点
- 有比较完善的持久化方案

受redux恶劣作风和官方不作为和前端门槛低受蛊惑容易等因素影响,前端充斥着反模式
- 刻意搞单一数据中心(有些状态就是局部的,完全没有必要全局访问),单一数据中心太大还要搞slice
- 刻意封装异步请求(异步请求的 isLoading, isError, Result 全都保存在全局状态中)

另外setter可能有多种,不同库使用了不同对待方式
一些库将对同一个状态的setter包裹在一起,强调聚合(比如: Zustand)
一些库不主动管这些,可以由程序员自己使用文件组织体现聚合(比如: Jotai)
还有一些库走出了不同的路:不需要setter,用的时候直接操作(Valtio)

## 选项总览

| 库名                                                      | GitHub Stars | 首次发布 | 最后更新   |
|-----------------------------------------------------------|--------------|----------|------------|
| [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) | 11.0k        | 2019年   | 2025年5月  |
| [Zustand](https://github.com/pmndrs/zustand)              | 53.5k        | 2019年   | 2024年6月  |
| [Jotai](https://github.com/pmndrs/jotai)                  | 20.2k        | 2020年   | 2024年5月  |
| [Valtio](https://github.com/pmndrs/valtio)                | 9.7k         | 2020年   | 2024年5月  |
| [Recoil](https://github.com/facebookexperimental/Recoil)  | 19.6k        | 2020年   | 2024年4月  |

更新于2024-07-14

## 选项分析

### Jotai

**示例**
```typescript
// 定义原子状态
const countAtom = atom(0)
const userAtom = atom({ name: 'John', age: 25 })

// 派生状态
const doubleCountAtom = atom(get => get(countAtom) * 2)

// 写操作
const incrementAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1)
})

// 在组件中使用
function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const doubleCount = useAtomValue(doubleCountAtom)
  const increment = useSetAtom(incrementAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={increment}>+1</button>
    </div>
  )
}
```

**优点**
1. 理念数量少,容易理解,不再吞其他库的口水(xxxStore)
2. 细粒度控制,可以控制哪些状态存到storage,哪些就临时放在内存
2. 粒度足够细的同时能由用户自行内聚,自由度高
3. 支持派生状态,类似计算属性,还带缓存效果
2. 自带持久化工具,且自由度高

**缺点**
- 相对较新
- 官网依然给出了反模式(异步状态)的写法

### Zustand

**示例**
```typescript
// 定义store
const useCountStore = create<{
  count: number
  increment: () => void
  decrement: () => void
}>((set, get) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}))

// 在组件中使用
const count = useCountStore(state => state.count)
const increment = useCountStore(state => state.increment)
```

**优点：**
- 还算简便,把同一个属性的不同内容封装在一起也不能算过错
- 有相对成熟的持久化方案

**缺点：**
- 受到redux遗留影响颇多(store的概念,聚合在一起定义action的风格等),改变不够彻底
- 持久化方案还是一刀切(要么全存,要么全不存)

### Valtio

**示例**
```typescript
// 定义状态
const state = proxy({
  count: 0,
  user: { name: 'John', age: 25 }
})

// 定义操作
const increment = () => {
  state.count++
}

const updateUser = (newUser: { name: string, age: number }) => {
  state.user = newUser
}

// 在组件中使用
const snap = useSnapshot(state)
```

**优点：**
- 无需定义actions,直接修改状态

**缺点：**
- 既然都已经proxy了,为什么还需要useSnapshot?
  如果Proxy完成不了这个使命,还发明proxy干什么?
- 生态小,甚至没有持久化方案

### Recoil
概念上Jotai类似Recoil
官方已经抛弃了Recoil(2025年1月1日仓库被归档)，我也抛弃它

### Redux Toolkit
老旧的内容,直接抛弃

**缺点：**
- 过度工程化
