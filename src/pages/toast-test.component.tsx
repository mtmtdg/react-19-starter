import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';

import { ToastService } from '@/shared';

export function ToastTest() {
  const toastHandlers = {
    info: () => ToastService.info('这是一个信息提示', '信息'),
    success: () => ToastService.success('操作成功！', '成功'),
    warning: () => ToastService.warning('请注意！', '警告'),
    error: () => ToastService.error('发生错误！', '错误'),
    longMessage: () =>
      ToastService.info(
        '这是一个非常长的消息，用来测试Toast在显示长文本时的表现效果。这条消息包含了很多文字，可以看到Toast组件如何处理长内容。',
        '长消息测试',
      ),
    customDuration: () => ToastService.success('这条消息会显示5秒', '自定义持续时间'),
    multipleToasts: () => {
      ToastService.info('第一条消息', '批量测试');
      setTimeout(() => ToastService.warning('第二条消息', '批量测试'), 500);
      setTimeout(() => ToastService.success('第三条消息', '批量测试'), 1000);
    },
    testPromise: async () => {
      // biome-ignore lint/suspicious/noConsole: 测试功能需要输出到控制台
      console.log('显示Promise测试Toast...');
      const reason = await ToastService.info('请手动关闭或等待自动关闭', 'Promise测试');
      const reasonText = {
        timeout: '自动超时关闭',
        clickaway: '点击外部区域关闭',
        alertClose: '点击关闭按钮关闭',
        escapeKeyDown: '按ESC键关闭',
      }[reason];
      ToastService.success(`上一个Toast的关闭原因: ${reasonText}`, '关闭原因');
    },
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography variant='h3' component='h1' gutterBottom>
        Toast 测试页面
      </Typography>

      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        测试各种类型的Toast通知消息
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            基础类型
          </Typography>

          <Stack direction='row' spacing={2} sx={{ mb: 2 }} flexWrap='wrap'>
            <Button variant='outlined' color='info' onClick={toastHandlers.info}>
              信息提示
            </Button>

            <Button variant='outlined' color='success' onClick={toastHandlers.success}>
              成功提示
            </Button>

            <Button variant='outlined' color='warning' onClick={toastHandlers.warning}>
              警告提示
            </Button>

            <Button variant='outlined' color='error' onClick={toastHandlers.error}>
              错误提示
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            特殊情况测试
          </Typography>

          <Stack direction='row' spacing={2} flexWrap='wrap'>
            <Button variant='outlined' onClick={toastHandlers.longMessage}>
              长消息测试
            </Button>

            <Button variant='outlined' onClick={toastHandlers.customDuration}>
              自定义持续时间
            </Button>

            <Button variant='outlined' onClick={toastHandlers.multipleToasts}>
              批量消息测试
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            Promise功能测试
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            测试Toast返回Promise功能，可以区分不同的关闭原因：
            <br />• 点击关闭按钮 → alertClose
            <br />• 点击外部区域 → clickaway
            <br />• 等待自动关闭 → timeout
            <br />• 按ESC键 → escapeKeyDown
          </Typography>

          <Stack direction='row' spacing={2} flexWrap='wrap'>
            <Button variant='contained' color='primary' onClick={toastHandlers.testPromise}>
              Promise测试
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant='body2' color='text.secondary' align='center'>
          点击按钮测试不同类型的Toast通知。Promise测试会在控制台输出关闭原因。
        </Typography>
      </Box>
    </Container>
  );
}
