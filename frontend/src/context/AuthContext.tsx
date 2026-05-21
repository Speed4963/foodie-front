import React, { createContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  email: string;
  nickname: string;
}

interface AuthContextType {
  user: User | null;
  loginContext: (userData: User) => void;
  logoutContext: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. 초기값 설정: 브라우저에 저장된 데이터가 있으면 가져오고, 없으면 null로 시작
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    console.log("저장된 유저 확인:", savedUser); // 💡 콘솔에 로그가 찍히는지 확인해보세요!
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. 로그인 시: 데이터를 바구니에 담고, localStorage에도 저장
  const loginContext = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  // 3. 로그아웃 시: 바구니를 비우고, localStorage에서도 삭제
  const logoutContext = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};