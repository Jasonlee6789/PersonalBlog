'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, generateToken, verifyToken, USER_INFO } from '@/utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setMounted(true);
      const token = localStorage.getItem('blog_auth_token');
      if (token && await verifyToken(token)) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('blog_auth_token');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const hashedPassword = hashPassword(password);
    if (username === USER_INFO.username && hashedPassword === USER_INFO.passwordHash) {
      const token = await generateToken(username);
      setIsAuthenticated(true);
      localStorage.setItem('blog_auth_token', token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('blog_auth_token');
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}