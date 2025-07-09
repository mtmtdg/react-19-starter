import { createRoot, type Root } from 'react-dom/client';

import { CustomContentDialog, type CustomContentDialogOptions } from './custom-content-dialog';
import { CustomDialog, type CustomDialogOptions } from './custom-dialog';
import { SimpleDialog, type SimpleDialogOptions } from './simple-dialog';

// 创建全局 dialog 容器
const dialogContainerDiv = document.createElement('div');
document.body.appendChild(dialogContainerDiv);

function createPlace(): { place: Root; dismiss: () => void } {
  const div = document.createElement('div');
  dialogContainerDiv.appendChild(div);

  const place = createRoot(div);
  const dismiss = () => {
    try {
      dialogContainerDiv.removeChild(div);
    } catch {
      // 如果已经被移除则忽略错误
    }
  };

  return { place, dismiss };
}

function confirm(option: SimpleDialogOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const { place, dismiss } = createPlace();

    const handleResolve = (confirmed: boolean) => {
      resolve(confirmed);
    };

    place.render(<SimpleDialog options={option} type='confirm' dismiss={dismiss} onResolve={handleResolve} />);
  });
}

function alert(option: SimpleDialogOptions): Promise<void> {
  return new Promise((resolve) => {
    const { place, dismiss } = createPlace();

    const handleResolve = () => {
      resolve();
    };

    place.render(<SimpleDialog options={option} type='alert' dismiss={dismiss} onResolve={handleResolve} />);
  });
}

function custom<T = unknown>(config: CustomDialogOptions<T>): Promise<unknown> {
  return new Promise((resolve) => {
    const { place, dismiss } = createPlace();

    const handleResolve = (result?: unknown) => {
      resolve(result);
    };

    place.render(<CustomDialog options={config} dismiss={dismiss} onResolve={handleResolve} />);
  });
}

function customContent<T = unknown>(config: CustomContentDialogOptions<T>): Promise<unknown> {
  return new Promise((resolve) => {
    const { place, dismiss } = createPlace();

    const handleResolve = (result?: unknown) => {
      resolve(result);
    };

    place.render(<CustomContentDialog options={config} dismiss={dismiss} onResolve={handleResolve} />);
  });
}

export const DialogService = {
  confirm,
  alert,
  custom,
  customContent,
};
