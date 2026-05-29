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
  // 🌟 1. 새로고침 시 상태 초기값을 로컬 스토리지에서 바로 꺼내옵니다.
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('eatpick_user_data');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyInfo = async () => {
    const token = localStorage.getItem('eatpick_access_token');
    
    if (!token) {
      setUser(null);
      localStorage.removeItem('eatpick_user_data'); // 토큰 없으면 유저 정보도 삭제
      setIsLoading(false);
      return;
    }

    try {
      // 서버에서 최신 정보 확인
      const data = await authService.getCurrentUser(token); 
      setUser(data);
      localStorage.setItem('eatpick_user_data', JSON.stringify(data)); // 최신화
    } catch (err) {
      console.error("[AuthContext] 유저 정보 조회 실패:", err);
      setUser(null);
      localStorage.removeItem('eatpick_access_token'); 
      localStorage.removeItem('eatpick_user_data'); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  // 🌟 2. 로그인 함수 호출 시 유저 정보 백업 추가
  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem('eatpick_user_data', JSON.stringify(userData));
    setIsLoading(false); 
  };

  // 🌟 3. 로그아웃 시 백업된 데이터도 함께 삭제
  const logout = () => {
    authService.logout(); 
    setUser(null);
    localStorage.removeItem('eatpick_access_token');
    localStorage.removeItem('eatpick_user_data');
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
      loginContext: login,       // LoginPage에서 기존 방식 그대로 사용 가능
      logoutContext: logout      // LoginPage에서 기존 방식 그대로 사용 가능
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