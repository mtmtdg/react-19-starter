import { Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';

import { type CounterData, CounterDialog } from '@/components/dialogs/counter-dialog';
import { type UserEditData, UserEditDialog } from '@/components/dialogs/user-edit-dialog';
import { DialogService, ToastService } from '@/shared';

export function DialogTest() {
  const dialogHandlers = {
    alert: () => {
      DialogService.alert({
        title: '提示',
        description: '这是一个警告对话框示例',
        okText: '知道了',
        okColor: 'primary',
      });
    },

    confirm: () => {
      DialogService.confirm({
        title: '确认操作',
        description: '你确定要执行这个操作吗？',
        okText: '确认',
        okColor: 'error',
      }).then((confirmed) => {
        if (confirmed) {
          ToastService.success('你点击了确认');
        } else {
          ToastService.info('你点击了取消');
        }
      });
    },

    customContent: () => {
      const counterData: CounterData = {
        initialValue: 10,
        step: 5,
      };

      DialogService.customContent({
        title: '计数器示例',
        data: counterData,
        render: CounterDialog,
        okText: '确认',
        okColor: 'primary',
      }).then((result: unknown) => {
        ToastService.info(`计数器最终值: ${result}`);
      });
    },

    customDialog: () => {
      const userData: UserEditData = {
        title: '编辑用户信息',
        userName: '测试用户',
      };

      DialogService.custom({
        data: userData,
        render: UserEditDialog,
      }).then((result: unknown) => {
        ToastService.info(`完全自定义对话框结果: ${JSON.stringify(result)}`);
      });
    },

    multipleDialogs: () => {
      DialogService.confirm({
        title: '第一个对话框',
        description: '这是第一个对话框',
      }).then((confirmed) => {
        if (confirmed) {
          DialogService.alert({
            title: '第二个对话框',
            description: '你确认了第一个对话框，现在显示第二个',
          }).then(() => {
            ToastService.success('两个对话框都完成了');
          });
        }
      });
    },

    longContent: () => {
      DialogService.confirm({
        title: '长内容测试',
        description:
          '这是一个包含很长内容的对话框。'.repeat(10) +
          '测试对话框在处理大量文本时的表现。这个描述包含了很多重复的文字，用来验证对话框的滚动和布局是否正常工作。',
        okText: '确认',
        okColor: 'primary',
      }).then((confirmed) => {
        ToastService.info(`长内容对话框结果: ${confirmed}`);
      });
    },
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography variant='h3' component='h1' gutterBottom>
        Dialog 测试页面
      </Typography>

      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        测试各种类型的对话框组件
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            基础对话框
          </Typography>

          <Stack direction='row' spacing={2} sx={{ mb: 2 }} flexWrap='wrap'>
            <Button variant='outlined' color='primary' onClick={dialogHandlers.alert}>
              Alert 对话框
            </Button>

            <Button variant='outlined' color='warning' onClick={dialogHandlers.confirm}>
              Confirm 对话框
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            自定义对话框
          </Typography>

          <Stack direction='row' spacing={2} sx={{ mb: 2 }} flexWrap='wrap'>
            <Button variant='outlined' color='success' onClick={dialogHandlers.customContent}>
              内容自定义对话框
            </Button>

            <Button variant='outlined' color='secondary' onClick={dialogHandlers.customDialog}>
              完全自定义对话框
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
            <Button variant='outlined' onClick={dialogHandlers.multipleDialogs}>
              连续对话框
            </Button>

            <Button variant='outlined' onClick={dialogHandlers.longContent}>
              长内容对话框
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
