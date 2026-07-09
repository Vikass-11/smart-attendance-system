import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import apiClient from '../api/axiosClient';
import { getAccessToken, setAccessToken } from '../store/authStore';
import { AuthContext, type AppUser } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      const token = getAccessToken();

      if (!token) {
        if (isMounted) {
          setLoading(false);
        }
        return;
      }

      try {
        const res = await apiClient.get('/auth/me');

        if (isMounted) {
          setAppUser(res.data.user);
        }
      } catch {
        setAccessToken(null);

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
    setAccessToken(res.data.accessToken);
    setAppUser(res.data.user);
  };

  const logout = async () => {
    setAccessToken(null);
    setAppUser(null);
  };

  return (
    <AuthContext.Provider value={{ appUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
