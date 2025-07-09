import { Alert, type AlertColor, AlertTitle, Snackbar, type SnackbarOrigin } from '@mui/material';
import { type SyntheticEvent, useEffect, useState } from 'react';

// Toast关闭原因类型（基于MUI Snackbar + 自定义扩展）
export type ToastCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown' | 'alertClose';

// Toast 数据结构（用于存储和传递）
export interface ToastData {
  uuid: string;
  severity: AlertColor;
  content: string;
  title?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  autoHideDuration?: number | null;
  anchorOrigin?: SnackbarOrigin;
  resolvePromise?: (reason: ToastCloseReason) => void;
}

// ToastItem 组件的 Props（需要 onClose 回调）
export interface ToastItemProps extends ToastData {
  onClose: () => void;
}

export function ToastItem({
  severity,
  content,
  title,
  variant = 'filled',
  autoHideDuration = 3000,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  resolvePromise,
  onClose,
}: ToastItemProps) {
  const [open, setOpen] = useState(true);
  const [closeReason, setCloseReason] = useState<ToastCloseReason | null>(null);

  const handleSnackbarClose = (_event: SyntheticEvent<Element, Event> | Event, reason: string) => {
    // 接受所有MUI Snackbar的关闭原因
    if (reason === 'timeout' || reason === 'clickaway' || reason === 'escapeKeyDown') {
      setCloseReason(reason as ToastCloseReason);
      setOpen(false);
    }
  };

  const handleAlertClose = () => {
    // Alert组件的关闭按钮点击，设置为alertClose原因
    setCloseReason('alertClose');
    setOpen(false);
  };

  // 关闭视图时通知外部删除配置并解析Promise
  useEffect(() => {
    if (!open) {
      if (closeReason) {
        resolvePromise?.(closeReason);
      }
      onClose();
    }
  }, [open, closeReason, resolvePromise, onClose]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      onClose={handleSnackbarClose}
      sx={{ position: 'unset' }}
    >
      <Alert variant={variant} severity={severity} onClose={handleAlertClose}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {content}
      </Alert>
    </Snackbar>
  );
}
