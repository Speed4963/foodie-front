import axios from 'axios';

// 백엔드 주소
const API_BASE_URL = 'http://43.203.165.206:8080/api/member';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 로그인 후 서버에서 내려주는 쿠키(JWT)를 브라우저가 자동 저장하게 함
});

export const memberService = {
  /**
   * 회원가입
   * @param data { email, password, nickname }
   */
  register: async (data: any) => {
    // 백엔드 MemberDto의 필드와 일치해야 함
    return await apiClient.post('/register', {
      email: data.email,
      password: data.password,
      nickname: data.nickname
    });
  },

  /**
   * 로그인
   * @param credentials { email, password }
   */
  login: async (credentials: any) => {
    // 백엔드 login() 메서드에서 MemberDto의 email, password를 요구함
    return await apiClient.post('/login', credentials);
  },

  /**
   * 현재 사용자 정보 조회 (JWT 쿠키가 자동으로 헤더에 포함됨)
   */
  getCurrentUser: async () => {
    return await apiClient.get('/me');
  },

  /**
   * 로그아웃
   */
  logout: async () => {
    return await apiClient.post('/logout');
  }
};