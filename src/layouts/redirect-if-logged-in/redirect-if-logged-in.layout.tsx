import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

import { isAuthenticatedAtom } from '@/atoms/auth.atoms';

export function RedirectIfLoggedInLayout() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
}
