import axios from 'axios';
import type { TrafficStatsDto, TrafficStatsResponseDto } from '../types/trafficStats';

// 1. 공통 apiClient 인스턴스 생성 (restaurantService와 동일한 방식)
const apiClient = axios.create({
  baseURL: 'http://43.203.165.206:8080/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 백엔드 응답 데이터 구조에서 통계 리스트를 안전하게 추출하는 헬퍼 함수
const extractStatsContent = (resData: any): any[] => {
  if (!resData) return [];
  if (resData.content) return resData.content;   // Spring Pageable 구조일 경우
  if (resData.data) return resData.data;         // 공통 Response Wrapper 구조일 경우
  if (Array.isArray(resData)) return resData;     // 순수 배열일 경우
  return [];
};

export const trafficStatsService = {
  
  /**
   * 1. 특정 날짜의 통계 조회
   * GET /api/admin/traffic-stats?boardId={boardId}&date={date}
   */
  getStats: async (boardId: number, date: string): Promise<TrafficStatsDto[]> => {
    try {
      const response = await apiClient.get<TrafficStatsDto[]>('/api/admin/traffic-stats', {
        params: { boardId, date },
      });
      return extractStatsContent(response.data);
    } catch (error) {
      console.error(`특정 날짜 통계 로드 실패 (BoardID: ${boardId}, Date: ${date}):`, error);
      return []; // 에러 시 빈 배열 반환으로 컴포넌트 붕괴 방지
    }
  },

  /**
   * 2. 기간별 통계 조회
   * GET /api/admin/traffic-stats/period?boardId={boardId}&startDate={startDate}&endDate={endDate}
   */
  getPeriodStats: async (boardId: number, startDate: string, endDate: string): Promise<TrafficStatsResponseDto[]> => {
    try {
      const response = await apiClient.get<TrafficStatsResponseDto[]>('/api/admin/traffic-stats/period', {
        params: { boardId, startDate, endDate },
      });
      return extractStatsContent(response.data);
    } catch (error) {
      console.error(`기간별 통계 로드 실패 (BoardID: ${boardId}):`, error);
      return [];
    }
  },

  /**
   * 3. 수동 배치 실행 (관리자용)
   * POST /api/admin/traffic-stats/run?date={date}
   */
  runManualBatch: async (date?: string): Promise<string> => {
    try {
      const response = await apiClient.post<string>('/api/admin/traffic-stats/run', null, {
        params: date ? { date } : {},
      });
      return response.data; // 백엔드에서 리턴하는 "집계 완료" 메시지 문자열
    } catch (error) {
      console.error("수동 배치 실행 실패:", error);
      throw error; // 배치가 실패했음을 UI(컴포넌트) 단에 알려주기 위해 예외를 던짐
    }
  }
};