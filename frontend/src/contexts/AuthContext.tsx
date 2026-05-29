// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService'; 

export type UserRole = 'USER' | 'EDITOR' | 'ADMIN';

export interface AuthUser {
  email: string;
  nickname: string;
  role: UserRole;
  isBanned: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isBanned: boolean;
  isLoading: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loginContext: (userData: AuthUser) => void;
  logoutContext: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isBanned: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refreshUser: async () => {},
  loginContext: () => {},
  logoutContext: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // 1. 유저 정보를 localStorage에 저장하지 않고 null로 시작합니다.
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyInfo = async () => {
    const token = localStorage.getItem('eatpick_access_token');
    
    // 토큰이 없으면 로그아웃 상태로 처리
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // 2. 오직 토큰만으로 서버에 내 정보 조회 요청
      const data = await authService.getCurrentUser(token); 
      setUser(data);
    } catch (err) {
      console.error("[AuthContext] 유저 정보 조회 실패 (토큰 만료 등):", err);
      // 토큰이 유효하지 않다면 로컬 스토리지 정리
      setUser(null);
      localStorage.removeItem('eatpick_access_token'); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  // 3. 로그인 시에는 토큰만 관리
  const login = (userData: AuthUser) => {
    setUser(userData);
    // 토큰은 이미 로그인 페이지(LoginPage)에서 저장하고 있으므로 여기선 생략 가능
    setIsLoading(false); 
  };

  const logout = () => {
    authService.logout(); 
    setUser(null);
    localStorage.removeItem('eatpick_access_token');
  };

  const isAuthenticated = !!user;
  const isBanned = user?.isBanned || false;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated,
      isBanned,
      isLoading, 
      login, 
      logout, 
      refreshUser: fetchMyInfo,
      loginContext: login,
      logoutContext: logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 반드시 AuthProvider 안에서 사용되어야 합니다.');
  }
  return context;
};