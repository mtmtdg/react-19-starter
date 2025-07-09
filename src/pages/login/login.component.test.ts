import { valibotResolver } from '@hookform/resolvers/valibot';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { useInitCheckForm } from '@/components/form-tools';

import { type LoginFormData, loginSchema } from './login.component';

function setupLoginForm() {
  return renderHook(() => {
    const form = useInitCheckForm<LoginFormData>({
      resolver: valibotResolver(loginSchema),
      defaultValues: { email: '', password: '' },
    });

    // 必须先取出来
    const { isValid, errors } = form.formState;

    return {
      ...form,
      // 再丢进去,外界获取的result.current.formState.isValid才是变化的
      // 受够了js这种隐式的subscribe机制
      formState: { isValid, errors },
    };
  });
}

describe('登录表单验证', () => {
  test('空字段无法通过验证', async () => {
    const { result } = setupLoginForm();

    await act(async () => {
      await result.current.trigger();
    });

    // formState.isValid是属性,因此受监听的困扰
    expect(result.current.formState.isValid).toBe(false);
    // 但getFieldState却不受是否监听的困扰,因为它是函数
    expect(result.current.getFieldState('email').invalid).toBe(true);
    expect(result.current.getFieldState('email').error).toBeDefined();
    expect(result.current.getFieldState('password').invalid).toBe(true);
    expect(result.current.getFieldState('password').error).toBeDefined();
  });

  test('非法邮箱格式无法通过', async () => {
    const { result } = setupLoginForm();

    await act(async () => {
      result.current.setValue('email', 'invalid-email');
      result.current.setValue('password', 'validpass123');
      await result.current.trigger();
    });

    expect(result.current.formState.isValid).toBe(false);
    expect(result.current.getFieldState('email').invalid).toBe(true);
    expect(result.current.getFieldState('email').error).toBeDefined();
    expect(result.current.getFieldState('email').error?.message).toBeTruthy();

    const invalidEmails = ['test', 'test@', '@example.com', 'test.example.com'];
    for (const email of invalidEmails) {
      await act(async () => {
        result.current.setValue('email', email);
        await result.current.trigger();
      });
      expect(result.current.getFieldState('email').invalid).toBe(true);
    }
  });

  test('密码长度不足6位无法通过', async () => {
    const { result } = setupLoginForm();

    await act(async () => {
      result.current.setValue('email', 'test@example.com');
      result.current.setValue('password', '123');
      await result.current.trigger();
    });

    expect(result.current.formState.isValid).toBe(false);
    expect(result.current.getFieldState('password').invalid).toBe(true);
    expect(result.current.getFieldState('password').error).toBeDefined();
    expect(result.current.getFieldState('password').error?.message).toBeTruthy();
  });

  test('两个字段都有效时表单验证通过', async () => {
    const { result } = setupLoginForm();

    await act(async () => {
      result.current.setValue('email', 'test@example.com');
      result.current.setValue('password', 'validpass123');
      await result.current.trigger();
    });

    expect(result.current.formState.isValid).toBe(true);
    expect(result.current.getFieldState('email').invalid).toBe(false);
    expect(result.current.getFieldState('email').error).toBeUndefined();
    expect(result.current.getFieldState('password').invalid).toBe(false);
    expect(result.current.getFieldState('password').error).toBeUndefined();
  });
});
