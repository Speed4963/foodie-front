import axios from 'axios';
import type { TrafficStatsDto, TrafficStatsResponseDto } from '../types/trafficStats';

const API_BASE_URL = '/api/admin/traffic-stats';

export const trafficStatsService = {
  /**
   * 특정 날짜의 통계 조회
   * GET /api/admin/traffic-stats?boardId={boardId}&date={date}
   */
  getStats: async (boardId: number, date: string): Promise<TrafficStatsDto[]> => {
    const response = await axios.get<TrafficStatsDto[]>(`${API_BASE_URL}`, {
      params: { boardId, date },
    });
    return response.data;
  },

  /**
   * 기간별 통계 조회
   * GET /api/admin/traffic-stats/period?boardId={boardId}&startDate={startDate}&endDate={endDate}
   */
  getPeriodStats: async (boardId: number, startDate: string, endDate: string): Promise<TrafficStatsResponseDto[]> => {
    const response = await axios.get<TrafficStatsResponseDto[]>(`${API_BASE_URL}/period`, {
      params: { boardId, startDate, endDate },
    });
    return response.data;
  },

  /**
   * 수동 배치 실행 (관리자용)
   * POST /api/admin/traffic-stats/run?date={date}
   */
  runManualBatch: async (date?: string): Promise<string> => {
    const response = await axios.post<string>(`${API_BASE_URL}/run`, null, {
      params: { date },
    });
    return response.data;
  }
};