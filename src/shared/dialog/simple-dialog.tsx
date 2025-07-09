import {
  Button,
  type ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

import { defaultPaperStyle, lighterBackdrop } from './default-style';

export interface SimpleDialogOptions {
  title: string;
  description?: string;
  okColor?: ButtonProps['color'];
  okText?: string;
}

interface SimpleDialogProps {
  options: SimpleDialogOptions;
  type: 'confirm' | 'alert';
  dismiss: () => void;
  onResolve: (result: boolean) => void;
}

export function SimpleDialog({ options, type, dismiss, onResolve }: SimpleDialogProps) {
  const [open, setOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // 防止双击按钮时多次执行
  const handleCancel = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setOpen(false);
    onResolve(false);
    dismiss();
  };

  const handleConfirm = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setOpen(false);
    onResolve(true);
    dismiss();
  };

  return (
    <Dialog open={open} sx={lighterBackdrop} slotProps={{ paper: { sx: defaultPaperStyle } }}>
      <DialogTitle>{options.title}</DialogTitle>

      {options.description && (
        <DialogContent>
          <DialogContentText>{options.description}</DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        {type === 'confirm' && (
          <Button color='inherit' onClick={handleCancel} disabled={isProcessing}>
            Cancel
          </Button>
        )}

        <Button color={options.okColor || 'warning'} onClick={handleConfirm} disabled={isProcessing}>
          {options.okText || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
