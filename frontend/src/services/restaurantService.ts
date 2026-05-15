// src/services/restaurantService.ts
import axios from 'axios';
import type { Restaurant } from '../types/restaurant';

const apiClient = axios.create({
  // ✅ 1. Vite Proxy를 쓴다면 상대 경로로 충분합니다. 
  // 백엔드 컨트롤러 주소에 /api가 붙어있다면 '/api'로 설정하세요.
  baseURL: 'http://43.203.165.206/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const restaurantService = {
  getNearbyRestaurants: async (): Promise<Restaurant[]> => {
    try {
      // ✅ 2. 백엔드 주소 확인 (컨트롤러가 /api/restaurants 라면 '/api/restaurants')
      const response = await apiClient.get('/api/restaurants'); 
      
      const resData = response.data;

      // ✅ 3. 서버 응답 형태에 따른 유연한 데이터 추출
      // Case 1: 서버가 { data: [...] } 구조로 줄 때
      if (resData && resData.data) return resData.data;
      
      // Case 2: 서버가 { content: [...] } (Spring Page) 구조로 줄 때
      if (resData && resData.content) return resData.content;
      
      // Case 3: 서버가 그냥 [...] (배열)만 보낼 때
      if (Array.isArray(resData)) return resData;

      return [];
    } catch (error) {
      console.error("맛집 목록 로드 실패:", error);
      return [];
    }
  }
};