// // ============================================================
// // 파일: src/components/map/MapContainer.tsx
// // 레이어: React-Component / 역할: 네이버 지도 및 경로 시각화
// // ============================================================
// import React, { useEffect, useRef } from 'react';
// import type { Restaurant } from '../../types/restaurant'; // 정확한 경로 확인
//  // 정확한 경로 확인
// import { directionApi } from '../../api/directionApi';

// interface Props {
//   restaurants: Restaurant[];
//   selectedRestaurant: Restaurant | null;
// }

// const MapContainer: React.FC<Props> = ({ restaurants, selectedRestaurant }) => {
//   const mapRef = useRef<any>(null);
//   const polylineRef = useRef<any>(null);

//   // 초기 지도 로드
//   useEffect(() => {
//     if (!window.naver) {
//       console.error("Naver Maps 스크립트가 로드되지 않았습니다.");
//       return;
//     }

//     const mapOptions = {
//       center: new window.naver.maps.LatLng(37.5665, 126.9780),
//       zoom: 14,
//     };
    
//     mapRef.current = new window.naver.maps.Map('map', mapOptions);
//   }, []);

//   // 식당 선택 시 경로 그리기
//   useEffect(() => {
//     if (selectedRestaurant && mapRef.current) {
//       drawRoute(selectedRestaurant);
//     }
//   }, [selectedRestaurant]);

//   const drawRoute = async (target: Restaurant) => {
//     try {
//       const start = "126.9780,37.5665"; // 출발지 (현위치)
//       const goal = `${target.location.lng},${target.location.lat}`;

//       const data = await directionApi.getDrivingRoute(start, goal);
//       // API 응답 구조에 따라 path 데이터 추출 (Naver Directions 5 기준)
//       const pathData = data.route.traoptimal[0].path; 

//       if (polylineRef.current) polylineRef.current.setMap(null);

//       const naverPath = pathData.map((coords: number[]) => 
//         new window.naver.maps.LatLng(coords[1], coords[0])
//       );

//       polylineRef.current = new window.naver.maps.Polyline({
//         map: mapRef.current,
//         path: naverPath,
//         strokeColor: '#007AFF',
//         strokeWeight: 5
//       });

//       mapRef.current.panToBounds(polylineRef.current.getBounds());
//     } catch (error) {
//       console.error("Route drawing error:", error);
//     }
//   };

//   return <div id="map" className="w-full h-full min-h-[500px]" />;
// };

// export default MapContainer;