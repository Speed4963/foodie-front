import apiClient from './apiClient';

/**
 * Auth 관련 서비스
 * - 인터셉터가 적용된 apiClient를 사용하므로, 
 * 헤더에 토큰을 직접 넣지 않아도 서버와 안전하게 통신합니다.
 */
export const authService = {
  // 1. 회원가입
  register: async (userData: any) => {
    const response = await apiClient.post('/api/member/register', userData);
    return response.data;
  },

  // 2. 로그인 (성공 시 토큰을 받아 로컬 스토리지에 저장하는 로직 필요)
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/api/member/login', credentials);
    // 서버가 토큰을 응답으로 줄 경우, 여기서 처리하거나 
    // 호출하는 곳(컴포넌트/Context)에서 처리합니다.
    return response.data; 
  },

  // 💡 인자(token: string)를 받을 수 있도록 수정
  getCurrentUser: async (token: string) => {
    const response = await fetch("http://43.203.165.206:8080/api/member/me", {
      method: "GET",
      headers: {
        // 💡 토큰을 헤더에 실어 보냅니다
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) throw new Error("인증 실패");
    return response.json();
  },
  // 4. 로그아웃
  logout: async () => {
    await apiClient.post('/api/member/logout');
    // 로컬 스토리지 토큰 삭제는 호출부나 Context에서 수행
    localStorage.removeItem('eatpick_access_token');
  }
};