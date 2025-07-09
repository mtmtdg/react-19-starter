import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import type { CustomDialogRenderProps } from '@/shared/dialog';

// 简化的数据类型
export interface UserEditData {
  title: string;
  userName: string;
}

// 简化的用户编辑对话框组件
export function UserEditDialog({ data, close }: CustomDialogRenderProps<UserEditData>) {
  return (
    <>
      <DialogTitle>{data.title}</DialogTitle>

      <DialogContent>
        <Typography variant='body1'>用户: {data.userName}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => close()} color='inherit'>
          取消
        </Button>
        <Button variant='contained' onClick={() => close({ action: 'confirmed', data: data.userName })}>
          确认
        </Button>
      </DialogActions>
    </>
  );
}
