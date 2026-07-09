import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import apiClient from '../api/axiosClient';
import { AuthContext, type AppUser } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      try {
        const res = await apiClient.get('/auth/me');

        // backend uses a consistent envelope: { success, message, data }
        // data may be either the user object or { user }
        const user = res.data?.data?.user ?? res.data?.data ?? null;

        if (isMounted) {
          setAppUser(user);
        }
      } catch {
        if (isMounted) {
          setAppUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post('/auth/login', { email, password });
    const user = res.data?.data?.user ?? res.data?.data ?? null;
    setAppUser(user);
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // ignore
    }
    setAppUser(null);
  };

  return (
    <AuthContext.Provider value={{ appUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
