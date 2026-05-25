import axios from 'axios';

// 1. 공통 API 주소를 /api까지만 설정하거나, 
//    각 서비스에서 정확한 엔드포인트를 호출하도록 수정합니다.
const apiClient = axios.create({
  baseURL: 'http://43.203.165.206:8080', 
  withCredentials: true,
});

export const memberService = {
  // --- 기존 인증 관련 ---
  register: async (data: any) => await apiClient.post('/api/member/register', data),
  login: async (credentials: any) => await apiClient.post('/api/member/login', credentials),
  getCurrentUser: async () => await apiClient.get('/api/member/me'),
  logout: async () => await apiClient.post('/api/member/logout'),

  // --- 회원 관리 관련 (컨트롤러 @RequestMapping("/api/members") 기준) ---
  
  // 전체 회원 목록 조회 (Pageable 대응)
  getMemberList: async (page = 0, size = 10) => {
    const response = await apiClient.get(`/api/member`, {
      params: { page, size }
    });
    return response.data;
  },

  // 특정 회원 상세 조회
  getMemberDetail: async (email: string) => {
    const response = await apiClient.get(`/api/member/${email}`);
    return response.data;
  },

  // 회원 상태 변경 (경고/정지 등)
  updateMemberStatus: async (email: string, status: string) => {
    return await apiClient.patch(`/api/members/${email}/status`, { status });
  },
updateStatus: async (email: string, isSuspend: boolean) => {
    return await apiClient.patch(`/api/member/${email}/status?isSuspend=${isSuspend}`);
  }
};