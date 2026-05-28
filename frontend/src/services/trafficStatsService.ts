import apiClient from './apiClient'; // 공통 apiClient만 남겨두고 중복 선언 제거

export const trafficStatsService = {
  // 1. 전체 통계 조회 (GET /api/admin/traffic-stats/all)
  getAllStats: async (page: number = 0, size: number = 10): Promise<any> => {
    const response = await apiClient.get('/api/admin/traffic-stats/all', {
      params: { page, size }
    });
    return response.data;
  },

  // 2. 날짜별 통계 조회 (GET /api/admin/traffic-stats/date)
  getAllStatsByDate: async (date: string, page: number = 0, size: number = 10): Promise<any> => {
    const response = await apiClient.get('/api/admin/traffic-stats/date', {
      params: { date, page, size }
    });
    return response.data;
  },
}