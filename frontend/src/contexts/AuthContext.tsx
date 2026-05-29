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
  // 🌟 1. 새로고침 시 로그인이 풀리지 않도록, localStorage에서 유저 정보를 꺼내 초기값으로 설정합니다.
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('eatpick_user_data');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyInfo = async () => {
    const token = localStorage.getItem('eatpick_access_token');
    
    if (!token) {
      setUser(null);
      localStorage.removeItem('eatpick_user_data'); // 싱크 맞추기
      setIsLoading(false);
      return;
    }

    try {
      const data = await authService.getCurrentUser(token); 
      console.log("[AuthContext] 서버로부터 유저 정보 수신 성공:", data);
      
      setUser(data);
      // 🌟 서버에서 받아온 최신 정보로 localStorage 갱신
      localStorage.setItem('eatpick_user_data', JSON.stringify(data));
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

  const login = (userData: AuthUser) => {
    setUser(userData);
    // 🌟 2. 로그인할 때 유저 정보를 localStorage에 문자열로 백업합니다.
    localStorage.setItem('eatpick_user_data', JSON.stringify(userData));
    setIsLoading(false); 
  };

  const logout = () => {
    authService.logout(); 
    setUser(null);
    // 🌟 3. 로그아웃 시 토큰과 유저 정보를 모두 깔끔하게 지웁니다.
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
      loginContext: login,       // LoginPage에서 사용하는 함수 그대로 유지!
      logoutContext: logout      // LoginPage에서 사용하는 함수 그대로 유지!
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