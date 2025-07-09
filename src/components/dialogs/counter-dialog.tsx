import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import type { CustomContentRenderProps } from '@/shared/dialog';

// 计数器对话框的数据类型
export interface CounterData {
  initialValue: number;
  step: number;
}

// 计数器组件 - 演示setValue的使用
export function CounterDialog({ data, setValue }: CustomContentRenderProps<CounterData>) {
  const [count, setCount] = useState(data.initialValue);

  // 使用useEffect在count变化时自动setValue，避免污染原有逻辑
  useEffect(() => {
    setValue(count);
  }, [count, setValue]);

  const handleIncrement = () => {
    setCount(count + data.step);
  };

  const handleDecrement = () => {
    setCount(count - data.step);
  };

  const handleReset = () => {
    setCount(data.initialValue);
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant='h4' sx={{ mb: 3 }}>
        {count}
      </Typography>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        点击按钮改变计数，关闭对话框时会返回当前值
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant='outlined' onClick={handleDecrement}>
          -{data.step}
        </Button>

        <Button variant='outlined' onClick={handleReset}>
          重置
        </Button>

        <Button variant='outlined' onClick={handleIncrement}>
          +{data.step}
        </Button>
      </Box>
    </Box>
  );
}
