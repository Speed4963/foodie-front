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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 💡 수정: fetch 대신 authService.getCurrentUser() 사용
  const fetchMyInfo = async () => {
    const token = localStorage.getItem('eatpick_access_token');
    
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // 이제 통신 로직은 서비스 파일이 전담합니다.
      const data = await authService.getCurrentUser();
      console.log("[AuthContext] 서버로부터 유저 정보 수신 성공:", data);
      setUser(data);
    } catch (err) {
      console.error("[AuthContext] 유저 정보 조회 실패:", err);
      setUser(null);
      localStorage.removeItem('eatpick_access_token'); // 에러 시 토큰 정리
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
    setIsLoading(false); 
  };

  const logout = () => {
    // 💡 수정: 로그아웃 로직도 서비스 호출로 변경
    authService.logout(); 
    setUser(null);
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