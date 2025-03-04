'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, generateToken, verifyToken, USER_INFO } from '@/utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 检查是否已经登录并验证 token
    const token = localStorage.getItem('blog_auth_token');
    if (token && verifyToken(token)) {
      setIsAuthenticated(true);
    } else {
      // 如果 token 无效，清除存储
      localStorage.removeItem('blog_auth_token');
      setIsAuthenticated(false);
    }
  }, []);

  const login = (username: string, password: string) => {
    const hashedPassword = hashPassword(password);
    if (username === USER_INFO.username && hashedPassword === USER_INFO.passwordHash) {
      const token = generateToken(username);
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