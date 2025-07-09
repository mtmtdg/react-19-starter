import type { Control } from 'react-hook-form';

// 表单字段的基础属性
export interface BaseFormFieldProps {
  name: string;
  // biome-ignore lint/suspicious/noExplicitAny: 为降低类型声明复杂度
  control: Control<any>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

// 文本输入字段特有的属性
export interface TextFormFieldProps {
  type?: string;
  placeholder?: string;
}

// 选择类组件的通用属性
export interface SelectionFormFieldProps {
  items: Record<string, unknown>[];
  bindValue: string;
  bindLabel: string;
}
