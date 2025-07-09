import { useEffect } from 'react';
import { type UseFormProps, type UseFormReturn, useForm } from 'react-hook-form';

/**
 * 封装了 React Hook Form 的自定义 hook
 * - 自动在初始化时触发验证
 * - 使用 onTouched 模式（触摸后验证）
 * - 统一应用的表单行为
 */
export function useInitCheckForm<TFieldValues extends Record<string, unknown> = Record<string, unknown>>(
  props?: UseFormProps<TFieldValues>,
): UseFormReturn<TFieldValues> {
  const form = useForm<TFieldValues>({
    mode: 'all',
    shouldUseNativeValidation: false, // 禁用html自带验证
    criteriaMode: 'all', // 不要在收集到第一个错误时就停止
    ...props,
  });

  // 初始化时触发验证
  // biome-ignore lint/correctness/useExhaustiveDependencies: 仅仅希望初始化时执行
  useEffect(() => {
    void form.trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return form;
}
