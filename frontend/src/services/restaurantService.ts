import axios from 'axios';
import type { Restaurant, TagResponse } from '../types/restaurant';

// 1. axios 인스턴스 생성 (기본 URL 및 헤더 설정)
// 백엔드 서버 주소에 맞게 baseURL을 수정하세요.
const apiClient = axios.create({
  baseURL: 'http://43.203.165.206/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const restaurantService = {
  // 주변 맛집 목록 조회
  getNearbyRestaurants: async (): Promise<Restaurant[]> => {
    try {
      // 2. 백엔드에서 TagResponse<Restaurant[]> 형태로 데이터를 내려준다고 가정
      // axios의 제네릭 타입은 전체 응답 바디의 타입을 의미합니다.
      const response = await apiClient.get<TagResponse<Restaurant[]>>('/restaurants');
      
      // 3. restaurant.ts의 TagResponse 구조에 따라 .data.data로 접근
      // 첫 번째 .data는 axios의 응답 객체, 두 번째 .data는 TagResponse의 필드입니다.
      return response.data.data; 
    } catch (error) {
      console.error("맛집 목록을 가져오는 중 오류 발생:", error);
      // 에러 발생 시 빈 배열을 반환하여 UI가 깨지지 않게 합니다.
      return [];
    }
  }
};