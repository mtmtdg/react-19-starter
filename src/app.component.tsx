import 'dayjs/locale/zh-cn';
import './app.component.scss';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RedirectIfLoggedInLayout } from '@/layouts/redirect-if-logged-in/redirect-if-logged-in.layout';
import { RequireAuthLayout } from '@/layouts/require-auth/require-auth.layout';
import { Dashboard } from '@/pages/dashboard.component';
import { FormTest } from '@/pages/form-test.component';
import { Home } from '@/pages/home.component';
import { Login } from '@/pages/login/login.component';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
          padding: '20px',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          lineHeight: 1.5,
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    element: <RedirectIfLoggedInLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    element: <RequireAuthLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'form-test',
        element: <FormTest />,
      },
    ],
  },
]);

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='zh-cn'>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
