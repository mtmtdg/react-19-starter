import { valibotResolver } from '@hookform/resolvers/valibot';
import { Alert, Container, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import * as v from 'valibot';

import { FormFieldText, SubmitButton, useInitCheckForm } from '@/components/form-tools';
import { authService } from '@/services/auth.service';

export const loginSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
  password: v.pipe(v.string(), v.nonEmpty(), v.minLength(6)),
});

export type LoginFormData = v.InferInput<typeof loginSchema>;

export function Login() {
  const [error, setError] = useState('');

  const { control, handleSubmit } = useInitCheckForm<LoginFormData>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');

    try {
      await authService.login(data.email, data.password);
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth='xs' sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack component='form' onSubmit={handleSubmit(onSubmit)} noValidate spacing={3}>
          <Typography variant='h4' component='h2' textAlign='center' gutterBottom>
            LOGIN
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <FormFieldText
            name='email'
            control={control}
            type='email'
            label='Email'
            placeholder='Enter your email'
            required
          />

          <FormFieldText
            name='password'
            control={control}
            type='password'
            label='Password'
            placeholder='Enter your password'
            required
          />

          <SubmitButton control={control} variant='contained' size='large' sx={{ py: 1.5 }}>
            Login
          </SubmitButton>

          <Alert severity='info'>Demo: Use any email and password to login</Alert>
        </Stack>
      </Paper>
    </Container>
  );
}
