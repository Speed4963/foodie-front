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
  data: T;   
}

// 3. 식당 인터페이스 (백엔드 RestaurantDto와 완벽 일치)
export interface Restaurant {
  // ✅ id는 선택사항으로 두거나, 사용하지 않는다면 생략해도 됩니다.
  // 실제 백엔드에서 식당 고유 번호로 내려오는 restId를 메인 식별자로 사용하세요.
  id?: Key | null; 
  restId: number;         // 실제 식당 PK (id -> restId)
  name: string;
  category: CategoryType; 
  address: string;
  lat: number;            
  lng: number;
  geohash: string;
  avgPrice: number;
  minPrice?: number;
  maxPrice?: number;
  
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