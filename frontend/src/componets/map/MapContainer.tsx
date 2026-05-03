// ============================================================
// 파일: src/components/map/MapContainer.tsx
// 레이어: Components / 역할: 네이버 지도 렌더링 및 노선 그리기 로직
// ============================================================
import React, { useEffect, useRef } from 'react';
import type { Restaurant } from '../../types/restaurant';
import { directionApi } from '../../api/directionApi';

interface Props {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
}

const MapContainer: React.FC<Props> = ({ restaurants, selectedRestaurant }) => {
  const mapRef = useRef<any>(null);
  const polylineRef = useRef<any>(null); // 현재 그려진 노선 보관

  useEffect(() => {
    // 지도 초기화 (서울 중심)
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5665, 126.9780),
      zoom: 14,
    };
    mapRef.current = new window.naver.maps.Map('map', mapOptions);
  }, []);

  // 식당이 선택될 때마다 경로를 그림
  useEffect(() => {
    if (selectedRestaurant && mapRef.current) {
      drawRoute(selectedRestaurant);
    }
  }, [selectedRestaurant]);

  const drawRoute = async (target: Restaurant) => {
    try {
      // 1. 임시 출발지(현위치 가정) -> 목적지(식당)
      const start = "126.9780,37.5665";
      const goal = `${target.location.lng},${target.location.lat}`;

      const data = await directionApi.getDrivingRoute(start, goal);
      const pathData = data.route.traoptimal[0].path;

      // 2. 기존 노선 제거
      if (polylineRef.current) polylineRef.current.setMap(null);

      // 3. 네이버 LatLng 객체 배열로 변환
      const naverPath = pathData.map(coords => new window.naver.maps.LatLng(coords[1], coords[0]));

      // 4. 지도에 폴리라인 그리기
      polylineRef.current = new window.naver.maps.Polyline({
        map: mapRef.current,
        path: naverPath,
        strokeColor: '#007AFF', // 핵심 노선 색상
        strokeWeight: 6,
        strokeOpacity: 0.8,
        clickable: true
      });

      // 5. 경로가 다 보이도록 지도 범위 조정
      mapRef.current.panToBounds(polylineRef.current.getBounds());

    } catch (error) {
      alert("경로를 불러올 수 없습니다.");
    }
  };

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default MapContainer;