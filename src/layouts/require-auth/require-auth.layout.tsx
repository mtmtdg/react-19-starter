import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { isAuthenticatedAtom } from '@/atoms/auth.atoms';
import { authService } from '@/services/auth.service';

export function RequireAuthLayout() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const [hasTriedRefresh, setHasTriedRefresh] = useState(false);
  const isRefreshInProgress = useRef(false);

  useEffect(() => {
    if (isAuthenticated) {
      setHasTriedRefresh(false);
      isRefreshInProgress.current = false;
      return;
    }

    if (hasTriedRefresh || isRefreshInProgress.current) {
      return;
    }

    isRefreshInProgress.current = true;
    authService.tryRefresh().finally(() => {
      isRefreshInProgress.current = false;
      setHasTriedRefresh(true);
    });
  }, [isAuthenticated, hasTriedRefresh]);

  // 未认证
  if (!isAuthenticated) {
    // 但还未尝试刷新，等待
    if (!hasTriedRefresh) {
      return <div>is checking</div>;
    }

    // 尝试过还步行,则跳转到login
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
