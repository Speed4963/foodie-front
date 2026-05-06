// ============================================================
// 파일: src/types/restaurant.ts
// 레이어: Types
// 역할: 식당 정보 및 네이버 지도 좌표 타입 정의
// ============================================================

export interface Location {
  lat: number;
  lng: number;
}

export interface LatLng {
  lat: number; // 위도
  lng: number; // 경도
}

export interface Restaurant {
  tagColor: string;
  distance: ReactNode;
  tag: import("react/jsx-runtime").JSX.Element;
  id: number;
  name: string;
  category: string;
  address: string;
  phone: string;
  ratingAvg: number;
  location: LatLng;
  naverPlaceId?: string; // 네이버 길찾기 연동용 ID
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}