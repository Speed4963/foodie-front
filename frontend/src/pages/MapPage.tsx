import React, { useEffect, useRef, useState } from 'react';
import { restaurantService } from '../services/restaurantService';
import type { Restaurant } from '../types/restaurant';

// ✅ 1. 전역 naver 객체 선언 (TS 에러 방지)
const { naver } = window as any;

// ✅ 2. 별점 컴포넌트
const Stars = ({ rating }: { rating: number }) => (
  <span className="stars" style={{ fontSize: '12px' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{ color: i <= Math.round(rating) ? '#F59E0B' : '#E2DDD6' }}>★</span>
    ))}
  </span>
);

// ✅ 3. 지도 컴포넌트 (Props 타입을 명시하여 에러 해결)
interface NaverMapProps {
  restaurants: Restaurant[];
  selected: Restaurant | null;
  onSelect: (r: Restaurant) => void;
}

const NaverMap: React.FC<NaverMapProps> = ({ restaurants, selected, onSelect }) => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // 지도 초기화 (한 번만 실행)
  useEffect(() => {
    if (!mapElement.current || !naver) return;
    const map = new naver.maps.Map(mapElement.current, {
      center: new naver.maps.LatLng(37.5665, 126.9780),
      zoom: 14,
    });
    mapRef.current = map;
  }, []);

  // 데이터 변경 시 마커 업데이트
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    markersRef.current.forEach(m => m.setMap(null)); // 기존 마커 제거

    markersRef.current = restaurants.map(res => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(res.lat, res.lng),
        map: map,
        icon: {
          content: `<div style="width:14px; height:14px; background:#E8272A; border:2px solid white; border-radius:50%; box-shadow:0 2px 4px rgba(0,0,0,0.2);"></div>`,
          anchor: new naver.maps.Point(7, 7)
        }
      });

      naver.maps.Event.addListener(marker, 'click', () => onSelect(res));
      return marker;
    });
  }, [restaurants, onSelect]);

  // 선택된 식당 위치로 지도 이동
  useEffect(() => {
    if (selected && mapRef.current) {
      mapRef.current.panTo(new naver.maps.LatLng(selected.lat, selected.lng));
    }
  }, [selected]);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

// ✅ 4. 메인 페이지 컴포넌트
const MapPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const getNaverNavUrl = (r: Restaurant) => {
    return `https://map.naver.com/v5/directions/-/-/${encodeURIComponent(r.name)},${r.lat},${r.lng},,,ADDRESS_ALL/walk`;
  };

  useEffect(() => {
    restaurantService.getNearbyRestaurants().then(setRestaurants).catch(console.error);
  }, []);

  return (
    <div className="map-page" style={{ display: 'flex', height: 'calc(100vh - 64px)', background: '#fff' }}>
      {/* 사이드바 리스트 */}
      <aside style={{ width: '360px', borderRight: '1px solid #E2DDD6', overflowY: 'auto' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '28px', marginBottom: '24px', letterSpacing: '1px' }}>EAT PICK LIST</h2>
          {restaurants.map((r, idx) => (
            <div 
              key={r.restId || idx} 
              onClick={() => setSelected(r)}
              style={{ 
                padding: '18px', borderBottom: '1px solid #F0EDE8', cursor: 'pointer',
                background: selected?.restId === r.restId ? '#FFF0F0' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{r.name}</div>
              <div style={{ fontSize: '13px', color: '#6B6560', marginTop: '4px' }}>{r.category} · {r.address}</div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stars rating={4.5} />
                <button 
                  onClick={(e) => { e.stopPropagation(); window.open(getNaverNavUrl(r)); }}
                  style={{ background: '#E8272A', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
                >
                  길찾기
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 지도 패널 */}
      <main style={{ flex: 1, position: 'relative' }}>
        <NaverMap restaurants={restaurants} selected={selected} onSelect={setSelected} />
        
        {/* 선택 시 나타나는 하단 바 */}
        {selected && (
          <div style={{ 
            position: 'absolute', bottom: '24px', left: '24px', right: '24px', 
            background: '#fff', padding: '20px', borderRadius: '12px', 
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)', display: 'flex', 
            justifyContent: 'space-between', alignItems: 'center', zIndex: 10 
          }}>
            <div>
              <div style={{ fontWeight: '900', fontSize: '18px' }}>{selected.name}</div>
              <div style={{ fontSize: '13px', color: '#6B6560', marginTop: '4px' }}>{selected.address}</div>
            </div>
            <button 
              onClick={() => window.open(getNaverNavUrl(selected))}
              style={{ background: '#0D0D0D', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              네이버 지도 길찾기 ↗
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MapPage;