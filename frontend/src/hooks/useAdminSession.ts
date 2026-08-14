import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetCurrentUserQuery } from '../store/api/authApi';
import { clearToken } from '../store/slices/authSlice';
import { useAppDispatch } from '../store/hooks';

/** Shared guard for protected admin pages: loads the current user and, if the session
 * turns out to be invalid/expired (401), clears it and bounces to the login page. */
export function useAdminSession() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isError) {
      dispatch(clearToken());
      navigate({ to: '/admin/login' });
    }
  }, [isError, dispatch, navigate]);

  return { user, isLoading: isLoading || isError };
}
