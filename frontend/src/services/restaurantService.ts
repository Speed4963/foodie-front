import axios from 'axios';
import type { Restaurant } from '../types/restaurant';


const apiClient = axios.create({
  // baseURL: 'http://43.203.165.206/', 
   baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 스프링 투 페이징(Page) 응답 구조나 일반 배열 구조에서 content를 안전하게 추출하는 헬퍼 함수
const extractContent = (resData: any): Restaurant[] => {
  if (resData && resData.content) return resData.content;   // Spring Pageable 구조
  if (resData && resData.data) return resData.data;         // { data: [...] } 구조
  if (Array.isArray(resData)) return resData;               // 일반 배열 구조
  return [];
};

export const restaurantService = {
  
  // --- [ 유저 / 공용 기능 ] ---

  /**
   * 1. 식당 전체 조회 (검색어 및 페이징 파라미터 지원)
   */
  getRestaurantList: async (searchKeyword?: string, page = 0, size = 10): Promise<Restaurant[]> => {
    try {
      const response = await apiClient.get('/api/restaurants', {
        params: { searchKeyword, page, size }
      });
      return extractContent(response.data);
    } catch (error) {
      console.error("식당 목록 로드 실패:", error);
      return [];
    }
  },

  /**
   * 2. 카테고리별 식당 목록 조회
   */
  getRestaurantListByCategory: async (category: string, page = 0, size = 10): Promise<Restaurant[]> => {
    try {
      const response = await apiClient.get(`/api/restaurants/category/${category}`, {
        params: { page, size }
      });
      return extractContent(response.data);
    } catch (error) {
      console.error(`카테고리(${category}) 식당 목록 로드 실패:`, error);
      return [];
    }
  },

  /**
   * 3. 식당 단건 상세 조회
   */
  getRestaurantDetail: async (id: number): Promise<Restaurant | null> => {
    try {
      const response = await apiClient.get(`/api/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`식당 상세 조회 실패 (ID: ${id}):`, error);
      return null;
    }
  },


  // --- [ 관리자 전용 기능 ] ---

  /**
   * 4. 식당 신규 등록 (성공 시 생성된 restId 리턴)
   */
  createRestaurant: async (createDto: any): Promise<number | null> => {
    try {
      const response = await apiClient.post('/api/restaurants', createDto);
      return response.data; // 백엔드에서 리턴하는 restId (Integer)
    } catch (error) {
      console.error("식당 신규 등록 실패:", error);
      return null;
    }
  },

  /**
   * 5. 식당 정보 수정
   */
  updateRestaurant: async (id: number, updateDto: any): Promise<boolean> => {
    try {
      await apiClient.put(`/api/restaurants/${id}`, updateDto);
      return true;
    } catch (error) {
      console.error(`식당 정보 수정 실패 (ID: ${id}):`, error);
      return false;
    }
  },

  /**
   * 6. 식당 삭제 (Soft Delete)
   */
  deleteRestaurant: async (id: number): Promise<boolean> => {
    try {
      await apiClient.delete(`/api/restaurants/${id}`);
      return true;
    } catch (error) {
      console.error(`식당 삭제 실패 (ID: ${id}):`, error);
      return false;
    }
  },

  /**
   * 7. 카테고리 마스터 정보 수정 (Query Parameter 방식으로 전달)
   */
  updateCategoryInfo: async (tagId: number, customTag: string): Promise<boolean> => {
    try {
      // 백엔드가 @RequestParam으로 받으므로 params 옵션으로 쿼리스트링 전달
      await apiClient.put(`/api/restaurants/categories/${tagId}`, null, {
        params: { customTag }
      });
      return true;
    } catch (error) {
      console.error(`카테고리 마스터 정보 수정 실패 (TagID: ${tagId}):`, error);
      return false;
    }
  }
};