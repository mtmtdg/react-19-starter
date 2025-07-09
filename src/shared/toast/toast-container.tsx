import { Stack } from '@mui/material';
import { forwardRef, type Ref, useImperativeHandle, useState } from 'react';

import { type ToastData, ToastItem } from './toast-item';

export interface IToastContainer {
  pushOne: (newToast: ToastData) => void;
}

// 一个允许将ref作为参数之一的函数式组件定义方式
export const ToastContainer = forwardRef((_props: object, ref: Ref<IToastContainer>) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const pushOne = (newToast: ToastData) => {
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeByUUID = (uuid: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.uuid !== uuid));
  };

  // 暴露 pushOne 方法给外部调用
  // 为这个ref添加pushOne方法,使用举例: ref.current?.pushOne(...)
  useImperativeHandle(ref, () => ({
    pushOne,
  }));

  return (
    <Stack sx={{ position: 'fixed', left: 'auto', right: '24px', top: '24px', zIndex: 9999 }}>
      {[...toasts].reverse().map((toast) => (
        <ToastItem key={toast.uuid} {...toast} onClose={() => removeByUUID(toast.uuid)} />
      ))}
    </Stack>
  );
});
