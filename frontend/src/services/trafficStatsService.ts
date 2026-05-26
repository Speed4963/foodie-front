import apiClient from './apiClient'; // 중앙화된 apiClient 임포트
import type { TrafficStatsDto, TrafficStatsResponseDto } from '../types/trafficStats';

export const trafficStatsService = {
  /**
   * 특정 날짜의 통계 조회
   */
  getStats: async (boardId: number, date: string): Promise<TrafficStatsDto[]> => {
    const response = await apiClient.get<TrafficStatsDto[]>(`/api/admin/traffic-stats`, {
      params: { boardId, date },
    });
    return response.data;
  },

  /**
   * 기간별 통계 조회
   */
  getPeriodStats: async (boardId: number, startDate: string, endDate: string): Promise<TrafficStatsResponseDto[]> => {
    const response = await apiClient.get<TrafficStatsResponseDto[]>(`/api/admin/traffic-stats/period`, {
      params: { boardId, startDate, endDate },
    });
    return response.data;
  },

  /**
   * 수동 배치 실행 (관리자용)
   */
  runManualBatch: async (date?: string): Promise<string> => {
    const response = await apiClient.post<string>(`/api/admin/traffic-stats/run`, null, {
      params: { date },
    });
    return response.data;
  }
};