import { Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { userAtom } from '@/atoms/auth.atoms';
import { authService } from '@/services/auth.service';

export function Dashboard() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
  };

  const navigationHandlers = {
    formTest: () => navigate('/form-test'),
  };

  return (
    <Container maxWidth='md' sx={{ py: 2 }}>
      <Typography variant='h3' component='h1' gutterBottom>
        Dashboard
      </Typography>

      <Typography variant='h5' gutterBottom>
        Welcome, {user?.name || user?.email}!
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            User Info:
          </Typography>
          <Typography variant='body1'>ID: {user?.id}</Typography>
          <Typography variant='body1'>Email: {user?.email}</Typography>
          <Typography variant='body1'>Name: {user?.name}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            测试页面导航:
          </Typography>

          <Stack direction='row' spacing={2} sx={{ mb: 3 }}>
            <Button variant='contained' color='success' onClick={navigationHandlers.formTest}>
              Form 测试页面
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Button variant='contained' color='primary' onClick={handleLogout} sx={{ mt: 3 }}>
        Logout
      </Button>
    </Container>
  );
}
