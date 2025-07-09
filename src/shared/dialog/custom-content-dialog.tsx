import { Button, type ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { type ReactElement, useState } from 'react';

import { defaultPaperStyle, lighterBackdrop } from './default-style';

// 内容自定义dialog的render props - 用户只能自定义内容，不能自定义按钮
export interface CustomContentRenderProps<T = unknown> {
  data: T;
  setValue: (value: unknown) => void;
}

// 用户调用dialogService.customContent()时的参数类型 - 内容自定义
export interface CustomContentDialogOptions<T = unknown> {
  title: string;
  okText?: string;
  okColor?: ButtonProps['color'];
  data: T;
  render: (props: CustomContentRenderProps<T>) => ReactElement;
}

interface CustomContentDialogProps<T = unknown> {
  options: CustomContentDialogOptions<T>;
  dismiss: () => void;
  onResolve: (result?: unknown) => void;
}

// CustomContentDialog组件 - 内容自定义，保持DialogTitle和DialogActions的统一样式
export function CustomContentDialog<T = unknown>({ options, dismiss, onResolve }: CustomContentDialogProps<T>) {
  const [isOpen, setIsOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customValue, setCustomValue] = useState<unknown>(undefined);

  const handleCancel = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsOpen(false);
    onResolve(false);
    dismiss();
  };

  const handleConfirm = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsOpen(false);
    onResolve(customValue);
    dismiss();
  };

  const renderProps: CustomContentRenderProps<T> = {
    data: options.data,
    setValue: setCustomValue,
  };

  return (
    <Dialog open={isOpen} sx={lighterBackdrop} slotProps={{ paper: { sx: defaultPaperStyle } }}>
      <DialogTitle>{options.title}</DialogTitle>

      <DialogContent>{options.render(renderProps)}</DialogContent>

      <DialogActions>
        <Button color='inherit' onClick={handleCancel} disabled={isProcessing}>
          Cancel
        </Button>

        <Button color={options.okColor || 'warning'} onClick={handleConfirm} disabled={isProcessing}>
          {options.okText || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
