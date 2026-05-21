import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; 

// 나머지 코드는 그대로 사용하시면 됩니다.

// ─── 1. 타입 정의 (ERD 기반) ──────────────────────────────────
export type UserRole = 'USER' | 'EDITOR' | 'ADMIN';

export interface AuthUser {
  email: string;      // 유저 식별자
  nickname: string;   // 화면 표시용
  role: UserRole;     // 권한 등급
  isBanned: boolean;  // 활동 제한 여부
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isBanned: boolean;  // 간편 접근용
  isLoading: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
  refreshUser: () => Promise<void>; // 토큰 갱신 시 유저 정보 다시 조회
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isBanned: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refreshUser: async () => {},
});

// ─── 2. Provider 구현 ──────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 토큰을 통한 유저 정보 동기화 (새로고침 시 자동 로그인)
  const fetchMyInfo = async () => {
    try {
      const response = await fetch('/api/member/me', { 
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  const login = (userData: AuthUser) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    window.location.href = '/'; // 로그아웃 시 메인으로
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isBanned: user?.isBanned || false, 
      isLoading, 
      login, 
      logout,
      refreshUser: fetchMyInfo
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);