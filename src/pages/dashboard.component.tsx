import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';

import { userAtom } from '@/atoms/auth.atoms';
import { authService } from '@/services/auth.service';

export function Dashboard() {
  const user = useAtomValue(userAtom);

  const handleLogout = async () => {
    await authService.logout();
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

      <Button variant='contained' color='primary' onClick={handleLogout} sx={{ mt: 3 }}>
        Logout
      </Button>
    </Container>
  );
}
