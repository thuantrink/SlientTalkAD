'use client';

import * as React from 'react';
import type { User } from '@/types/user';
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
  setUser?: (user: User | null) => void; // <--- thêm đây
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  // expose a stable setUser function
  const setUser = React.useCallback((user: User | null) => {
    setState((prev) => ({ ...prev, user }));
  }, []);

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      if (!token) {
        setState({ user: null, error: null, isLoading: false });
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/admin/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        logger.error(`checkSession failed with status ${res.status}`);
        setState({ user: null, error: 'Unauthorized', isLoading: false });
        return;
      }

      const data = await res.json();
      setState({ user: data, error: null, isLoading: false });
    } catch (error: any) {
      logger.error(error);
      setState({ user: null, error: 'Something went wrong', isLoading: false });
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((error) => {
      logger.error(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkSession]);

  return (
    <UserContext.Provider value={{ ...state, checkSession, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
