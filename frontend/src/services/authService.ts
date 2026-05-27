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

  // 3. 내 정보 조회 (새로고침 시 자동 로그인 확인용)
  getCurrentUser: async () => {
    const response = await apiClient.get('/api/member/me');
    return response.data;
  },

  // 4. 로그아웃
  logout: async () => {
    await apiClient.post('/api/member/logout');
    // 로컬 스토리지 토큰 삭제는 호출부나 Context에서 수행
    localStorage.removeItem('eatpick_access_token');
  }
};