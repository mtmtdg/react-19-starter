import { useState } from 'react';

import { authService } from '@/services/auth.service';

import styles from './login.component.module.scss';

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
    <div className={styles.container}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <h2>LOGIN</h2>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Enter your password'
              className={styles.input}
              required
              minLength={6}
            />
          </div>

          <button type='submit' className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <p>Demo: Use any email and password to login</p>
        </form>
      </div>
    </div>
  );
}
