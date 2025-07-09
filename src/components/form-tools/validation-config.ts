import {
  type BaseIssue,
  email,
  maxLength,
  minLength,
  nonEmpty,
  nonNullable,
  nonNullish,
  nonOptional,
  setGlobalConfig,
  setGlobalMessage,
  setSchemaMessage,
  setSpecificMessage,
} from 'valibot';

// 设置全局配置为中文
setGlobalConfig({ lang: 'zh' });

// 设置全局错误信息
setGlobalMessage(() => '输入数据无效', 'zh');

// 设置schema错误信息
setSchemaMessage(() => '数据类型不匹配', 'zh');

// 设置特定验证器的错误信息
setSpecificMessage(nonEmpty, () => '该字段必填', 'zh');
setSpecificMessage(nonNullish, () => '该字段必填', 'zh');
setSpecificMessage(nonOptional, () => '该字段必填', 'zh');
setSpecificMessage(nonNullable, () => '该字段必填', 'zh');
setSpecificMessage(email, () => '请输入正确的邮箱格式', 'zh');
setSpecificMessage(
  minLength,
  (issue: BaseIssue<unknown>) => `至少需要${(issue as { requirement: number }).requirement}个字符`,
  'zh',
);
setSpecificMessage(
  maxLength,
  (issue: BaseIssue<unknown>) => `最多${(issue as { requirement: number }).requirement}个字符`,
  'zh',
);
