import { createRef } from 'react';
import { createRoot } from 'react-dom/client';

import { type IToastContainer, ToastContainer } from './toast-container';

import type { AlertColor, SnackbarOrigin } from '@mui/material';
import type { ToastCloseReason } from './toast-item';

interface ToastConfig {
  autoHideDuration?: number | null; // null表示不关闭
  anchorOrigin?: SnackbarOrigin;
}

// 创建全局 toast 容器
const toastContainerDiv = document.createElement('div');
document.body.appendChild(toastContainerDiv);
const containerRoot = createRoot(toastContainerDiv);
const containerRef = createRef<IToastContainer>();

// 渲染 toast 容器
containerRoot.render(<ToastContainer ref={containerRef} />);

function pushOne(
  severity: AlertColor,
  content: string,
  title?: string,
  config?: ToastConfig,
): Promise<ToastCloseReason> {
  return new Promise((resolve) => {
    containerRef.current?.pushOne({
      uuid: crypto.randomUUID(),
      severity,
      content,
      title,
      ...config,
      resolvePromise: resolve,
    });
  });
}

function info(content: string, title?: string, config?: ToastConfig): Promise<ToastCloseReason> {
  return pushOne('info', content, title, config);
}

function success(content: string, title?: string, config?: ToastConfig): Promise<ToastCloseReason> {
  return pushOne('success', content, title, config);
}

function warning(content: string, title?: string, config?: ToastConfig): Promise<ToastCloseReason> {
  return pushOne('warning', content, title, config);
}

function error(content: string, title?: string, config?: ToastConfig): Promise<ToastCloseReason> {
  return pushOne('error', content, title, config);
}

export const ToastService = {
  info,
  success,
  warning,
  error,
};

export type { ToastCloseReason };
