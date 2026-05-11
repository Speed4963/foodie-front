import type { Key } from "react";

// 1. 카테고리 타입 정의 (백엔드 Enum과 일치)
export type CategoryType = 
  | 'VEGAN' | 'BIZARRE' | 'EXOTIC' | 'CULTURE' 
  | 'FAMOUS_CHEF' | 'MICHELIN' | 'WORLD_LIQUOR' 
  | 'THEME' | 'ANIMAL';

// 2. 메뉴 및 이미지 상세 타입
export interface MenuResponse {
  menuId: number;
  pname: string;
  price: number;
  isRepresentative: boolean;
}

export interface ImageResponse {
  imgId: number;
  imgUrl: string;
  thumbUrl?: string;
  category?: string;
}

export interface TagResponse<T = any> {
  category: CategoryType; 
  customTag: string;
  data: T;   // ✅ 여기에 실제 식당 목록(Restaurant[])이 들어갈 자리를 만듭니다.
}

// 3. 식당 인터페이스 (백엔드 RestaurantDto와 완벽 일치)
export interface Restaurant {
  id: Key | null | undefined;
  location: any;
  restId: number;         // id -> restId
  name: string;
  category: CategoryType; // string -> CategoryType
  address: string;
  lat: number;            // location 객체에서 꺼내서 평면으로
  lng: number;
  geohash: string;
  avgPrice: number;
  minPrice?: number;
  maxPrice?: number;
  
  // 상세 조회 시 포함되는 필드들
  menus?: MenuResponse[];
  images?: ImageResponse[];
  tags?: TagResponse[];
  createdAt?: string;
}

// 4. 스프링 페이지 응답 타입 (Pageable 대응)
export interface PageResponse<T> {
  content: T[];
  pageable: any;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
}