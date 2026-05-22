// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; 

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
  isLoading: true, // 기본값은 로딩 중
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
    // ✅ FIX 1: BlogPage와 동일하게 'eatpick_access_token'으로 통일
    const token = localStorage.getItem('eatpick_access_token');
    
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/member/me', { 
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("[AuthContext] /api/member/me 서버 응답 데이터:", data);
        setUser(data);
      } else {
        console.warn("[AuthContext] 유저 정보 조회 실패 (Status):", response.status);
        setUser(null);
      }
    } catch (err) {
      console.error("[AuthContext] 유저 정보 조회 중 에러 발생:", err);
      setUser(null);
    } finally {
      setIsLoading(false); // 어떤 경우에도 로딩은 확실히 종료
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  // ✅ FIX 2: 수동 로그인 시에도 로딩 상태를 확실히 false로 변경
  const login = (userData: AuthUser) => {
    setUser(userData);
    setIsLoading(false); 
  };

  const logout = () => {
    setUser(null);
    // ✅ FIX 1 적용: 삭제할 때도 동일한 키 삭제
    localStorage.removeItem('eatpick_access_token');
    window.location.href = '/'; 
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