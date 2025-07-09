import './app.component.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RedirectIfLoggedInLayout } from '@/layouts/redirect-if-logged-in/redirect-if-logged-in.layout';
import { RequireAuthLayout } from '@/layouts/require-auth/require-auth.layout';
import { Dashboard } from '@/pages/dashboard.component';
import { Home } from '@/pages/home.component';
import { Login } from '@/pages/login/login.component';

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
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
