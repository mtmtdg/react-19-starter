import { Alert, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { authService } from '@/services/auth.service';

export function Login() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await authService.login(email, password);
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth='xs' sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack component='form' onSubmit={handleSubmit} noValidate spacing={3}>
          <Typography variant='h4' component='h2' textAlign='center' gutterBottom>
            LOGIN
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField name='email' type='email' label='Email' placeholder='Enter your email' required fullWidth />

          <TextField
            name='password'
            type='password'
            label='Password'
            placeholder='Enter your password'
            required
            fullWidth
          />

          <Button type='submit' variant='contained' size='large' disabled={isSubmitting} sx={{ py: 1.5 }}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <Alert severity='info'>Demo: Use any email and password to login</Alert>
        </Stack>
      </Paper>
    </Container>
  );
}
