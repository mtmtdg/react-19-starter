import { Dialog } from '@mui/material';
import { type ReactElement, useState } from 'react';

import { defaultPaperStyle, lighterBackdrop } from './default-style';

// 用户基于此定义自定义组件,严格来说<Dialog>才是dialog组件
// 用户写的,叫CustomDialogRender
export interface CustomDialogRenderProps<T = unknown> {
  data: T;
  close: (result?: unknown) => void;
}

// 用户调用dialogService.custom()时的参数类型 - 完全自定义
export interface CustomDialogOptions<T = unknown> {
  data: T;
  render: (props: CustomDialogRenderProps<T>) => ReactElement;
}

interface CustomDialogProps<T = unknown> {
  options: CustomDialogOptions<T>;
  dismiss: () => void;
  onResolve: (result?: unknown) => void;
}

// CustomDialog组件 - 完全自定义
export function CustomDialog<T = unknown>({ options, dismiss, onResolve }: CustomDialogProps<T>) {
  const [isOpen, setIsOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = (result?: unknown) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsOpen(false);
    onResolve(result);
    dismiss();
  };

  const renderProps: CustomDialogRenderProps<T> = {
    data: options.data,
    close: handleClose,
  };

  // render是一个函数式组件,可以接收参数
  // 这里CustomDialog在参数中放入两个东西
  // data: 用户提供的数据
  // close: CustomDialog提前准备好的close函数,在关闭后能将数据传递给外部的promise
  return (
    <Dialog open={isOpen} sx={lighterBackdrop} slotProps={{ paper: { sx: defaultPaperStyle } }}>
      {options.render(renderProps)}
    </Dialog>
  );
}
