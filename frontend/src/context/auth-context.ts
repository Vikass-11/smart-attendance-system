import { createContext } from 'react';

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  departmentId: number | null;
}

export interface AuthContextType {
  appUser: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
