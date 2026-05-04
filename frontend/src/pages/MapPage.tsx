// ============================================================
// 파일: src/pages/MapPage.tsx
// 레이어: Pages
// 역할: 네이버 지도 렌더링, 맛집 마커 표시, 경로 안내 실행
// ============================================================
import React, { useEffect, useRef, useState } from 'react';
import type { Restaurant } from '../types/restaurant';
import { restaurantService } from '../services/restaurantService';

const MapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [naverMap, setNaverMap] = useState<any>(null);

  useEffect(() => {
    // 1. 데이터 로드
    restaurantService.getNearbyRestaurants().then(setRestaurants);

    // 2. 네이버 지도 초기화
    if (mapRef.current && window.naver) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울 중심
        zoom: 14,
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);
    }
  }, []);

  // 마커 생성 및 이벤트 바인딩
  useEffect(() => {
    if (!naverMap || restaurants.length === 0) return;

    restaurants.forEach((res) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(res.location.lat, res.location.lng),
        map: naverMap,
        title: res.name,
      });

      // 마커 클릭 시 길찾기 안내 (웹/앱 연동)
      window.naver.maps.Event.addListener(marker, 'click', () => {
        handleRouteGuidance(res);
      });
    });
  }, [naverMap, restaurants]);

  // 🚗 네이버 길찾기 연동 (URL Scheme 방식)
  const handleRouteGuidance = (res: Restaurant) => {
    // 도보/자동차 등 선택이 가능하도록 네이버 맵 길찾기 URL 생성
    // dname: 도착지 명칭, dlat: 도착지 위도, dlng: 도착지 경도
    const url = `https://map.naver.com/v5/directions/-/-/${res.name},${res.location.lat},${res.location.lng},,,ADDRESS_ALL/walk?c=15,0,0,0,dh`;
    
    if (window.confirm(`${res.name}으로 가는 길을 안내받으시겠습니까?`)) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-green-600">주변 맛집 지도</h2>
        <p className="text-sm text-gray-500">마커를 클릭하면 길찾기가 시작됩니다.</p>
      </div>
    </div>
  );
};

export default MapPage;