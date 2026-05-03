// ============================================================
// 파일: src/types/restaurant.ts
// 레이어: React-Types / 역할: 식당 데이터 타입 정의 및 내보내기
// ============================================================

export interface Location {
  lat: number;
  lng: number;
}

// ⚠️ 핵심: 반드시 앞에 'export'가 있어야 다른 파일에서 import { Restaurant } 가 가능합니다.
export interface Restaurant {
  id: number;
  name: string;
  address: string;
  location: Location;
  category: string;
}