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

  // 💡 쿠키 방식에서는 더 이상 token을 직접 읽을 필요가 없습니다.
  const fetchMyInfo = async () => {
    setIsLoading(true);
    try {
      // 이제 브라우저가 자동으로 쿠키를 요청 헤더에 포함시킵니다.
      // authService.getCurrentUser()는 이제 인자가 없어도 됩니다.
      const data = await authService.getCurrentUser(); 
      console.log("[AuthContext] 서버로부터 유저 정보 수신 성공:", data);
      setUser(data);
    } catch (err) {
      console.error("[AuthContext] 유저 정보 조회 실패 (인증되지 않음):", err);
      setUser(null);
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

