// // ============================================================
// // 파일: src/services/restaurantService.ts
// // 레이어: Services
// // 역할: 맛집 데이터 호출 및 비즈니스 로직 처리
// // ============================================================
// import axios from 'axios';
// import type { Restaurant, ApiResponse } from '../types/restaurant';

// const apiClient = axios.create({
//   baseURL: '/api/v1',
//   headers: { 'Content-Type': 'application/json' }
// });

// export const restaurantService = {
//   // 주변 맛집 목록 조회 (현재 지도의 바운드 영역 기준 등)
//   getNearbyRestaurants: async (): Promise<Restaurant[]> => {
//     const response = await apiClient.get<ApiResponse<Restaurant[]>>('/restaurants');
//     return response.data.data;
//   }
// };