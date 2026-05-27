import apiClient from './apiClient';

/**
 * Auth 관련 서비스
 * - credentials: "include" 또는 axios의 withCredentials: true 설정을 통해
 * 브라우저가 자동으로 쿠키를 서버로 보냅니다.
 */
export const authService = {
  // 1. 회원가입
  register: async (userData: any) => {
    const response = await apiClient.post('/api/member/register', userData);
    return response.data;
  },

  // 2. 로그인
  login: async (credentials: { email: string; password: string }) => {
    // apiClient 사용 시 withCredentials: true가 설정되어 있어야 쿠키가 저장됩니다.
    const response = await apiClient.post('/api/member/login', credentials);
    return response.data;
  },

  // 3. 유저 정보 조회 (인자 없이 호출!)
  getCurrentUser: async () => {
    // 이제 토큰을 직접 인자로 받거나 헤더에 실을 필요가 없습니다.
    // 브라우저가 자동으로 쿠키를 포함합니다.
    const response = await apiClient.get('/api/member/me');
    return response.data;
  },

  // 4. 로그아웃
  logout: async () => {
    await apiClient.post('/api/member/logout');
    // 이제 localStorage를 직접 지울 필요가 없습니다 (서버가 쿠키를 삭제함)
  }
};