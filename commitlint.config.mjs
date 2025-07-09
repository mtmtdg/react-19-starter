/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type 相关规则
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档更新
        'style', // 代码格式修改
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建相关
        'ci', // CI/CD 相关
        'chore', // 其他修改
        'revert', // 回滚
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], // type 必须小写
    'type-empty': [2, 'never'], // type 不能为空

    // Subject 相关规则
    'subject-empty': [2, 'never'], // subject 不能为空
    'subject-full-stop': [2, 'never', '.'], // subject 不能以句号结尾
    'subject-max-length': [2, 'always', 100], // subject 最大长度

    // Header 相关规则
    'header-max-length': [2, 'always', 120], // 整个 header 最大长度

    // Body 相关规则
    'body-leading-blank': [2, 'always'], // body 前必须有空行
    'body-max-line-length': [2, 'always', 120], // body 每行最大长度

    // Footer 相关规则
    'footer-leading-blank': [2, 'always'], // footer 前必须有空行
  },
};
