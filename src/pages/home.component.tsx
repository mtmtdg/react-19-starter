import { Box, Button, Container, Typography } from '@mui/material';

export function Home() {
  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h3' component='h1' gutterBottom>
          React 19 Starter
        </Typography>

        <Typography variant='h6' color='text.secondary'>
          一个现代化的React应用模板
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button component='a' href='/login' variant='contained' size='large'>
            登录
          </Button>

          <Button component='a' href='/dashboard' variant='outlined' size='large'>
            进入应用
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
