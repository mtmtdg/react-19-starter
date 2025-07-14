# 表单处理和验证

## 决策结果
选择了 **React Hook Form + Valibot**

## 前言
表单工具应该做的:
1. 轻松和html元素集成
2. 最好是,变量名,默认值,验证规则,放在一起定义(就像angular那样)
3. 最好还能自动转换表单值的类型
   (去他妈的html标准,老旧的表单值必须是字符串类型,害人不浅,偏偏还有人追求复辟)

表单验证库要做的是
1. 能验证错误
2. 能局部或全局定义错误信息
3. 能转换类型
4. 能做跨字段验证
5. 要有明确的空值处理态度,不能无所谓

综合起来还要
1. 性能够好

react的所有表单工具都是玩具,根本没有好好做.
基础表单易用性差angular十万八千里(定义方式,验证规则表单,自动化测试)
性能还差

## 选项总览

### 表单库
| 库名                                                                  | GitHub Stars | 首次发布 | 最后更新   |
|-----------------------------------------------------------------------|--------------|----------|------------|
| [React Hook Form](https://github.com/react-hook-form/react-hook-form) | 43.5k        | 2019年   | 2024年12月 |
| [Formik](https://github.com/jaredpalmer/formik)                       | 34.3k        | 2017年   | 2023年10月 |

### 验证库
| 库名                                                | GitHub Stars | 首次发布 | 最后更新   |
|-----------------------------------------------------|--------------|----------|------------|
| [Valibot](https://github.com/fabian-hiller/valibot) | 7.8k         | 2023年   | 2024年12月 |
| [Zod](https://github.com/colinhacks/zod)            | 39.0k        | 2020年   | 2024年12月 |
| [Yup](https://github.com/jquense/yup)               | 23.5k        | 2015年   | 2024年11月 |

更新于2025-07-14

## 选项分析

### React Hook Form
**优点：**
- 仅仅是用的人多,闲话少
- 近年来多了: 能适配更多的验证库

**缺点：**
- 天天打着性能的旗号阉割功能,却不见得性能多好,对待玩具一样的态度
  - 默认等用户点击按钮才验证
  - 默认遇到错误就不再做跨字段验证
- 定制性比较差
- 总是有奇怪的bug,官方态度懒散
  - 在hook上封装hook时,必须把register内部变量获取一遍,再封装了抛出来

### Formik
**优点：**
- 设计更合理
- 可定制性高

**缺点：**
- 依赖多,包体积大,担忧供应链安全
- 可惜有点老了,更新也不勤快

### Yup
**举例**
```typescript
import * as yup from 'yup'

const schema = yup.object({
  age: yup
    .number()
    .required('年龄必填')
    .min(18, '年龄必须大于18')
    .max(100, '年龄不能超过100')
})

// 验证
schema.validate({ age: 25 })
```

**优点：**
- 老牌,功能还算稳定

**缺点：**
- 有点老了
- 不支持全局定义错误消息

### Zod
**举例**
```typescript
import { z } from 'zod'

const schema = z.object({
  age: z
    .number({ required_error: '年龄必填' })
    .min(18, '年龄必须大于18')
    .max(100, '年龄不能超过100')
})

// 验证
schema.parse({ age: 25 })
```

**优点：**
- 目前的主流,功能也算齐全,社区也算活跃
- 链式调用,但不一定真的好

**缺点：**
- 并不亮眼

### Valibot
**举例**
```typescript
import { object, number, minValue, maxValue, parse } from 'valibot'

const schema = object({
  age: number([
    minValue(18, '年龄必须大于18'),
    maxValue(100, '年龄不能超过100')
  ])
})

// 验证
parse(schema, { age: 25 })
```

**优点：**
- 体积最小,加载性能优秀,运行时性能也就那样
- 模块化设计,按需导入
- 有类型支持,提供了InferOutput,InferInput之类的方法来推断类型
- 更函数式,复用性良好

**缺点：**
- 规模比较小,RHF的集成还不成熟
