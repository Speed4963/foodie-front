import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

// ✅ 채식 테마에 맞춘 카테고리 데이터
const CATEGORIES = [
  { name: '완전 비건',    count: 42,  img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80' },
  { name: '베지테리언',    count: 85,  img: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=600&q=80' },
  { name: '비건 베이커리', count: 120, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80' },
  { name: '사찰 음식',    count: 24,  img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80' },
  { name: '샐러드 · 볼',   count: 156, img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80' },
  { name: '비건 옵션 식당', count: 210, img: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=600&q=80' },
]

// ✅ 채식 맛집 데이터
const TOP_PICKS = [
  { rank: '01', name: '그린 가든 망원',    category: '비건 양식 · 마포구',   rating: 4.9, dist: '1.2km', tag: '유기농', tagBg: '#2D6A4F', tagColor: '#fff',     featured: true },
  { rank: '02', name: '뿌리깊은 채식',    category: '한식 뷔페 · 종로구',   rating: 4.8, dist: '850m',  tag: '가성비',  tagBg: '#F1F8E9', tagColor: '#2D6A4F', featured: false },
  { rank: '03', name: '오트밀 라떼 하우스', category: '디저트 카페 · 서대문구', rating: 4.7, dist: '2.1km', tag: '반려동물', tagBg: '#FFF7E0', tagColor: '#B7791F', featured: false },
]

// ✅ 실시간 피드 문구 변경
const LIVE_FEED = [
  '이영희님이 그린 가든 망원에 "최고의 비건 파스타" 리뷰를 남겼어요',
  '박지민님이 비건 베이커리 지도를 업데이트했습니다',
  '지금 성수동 근처 비건 옵션 식당 5곳이 새로 등록되었어요!',
]

const VegaPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-circle" style={{ background: 'rgba(45, 106, 79, 0.1)' }} />
        <div className="hero-bg" />
        <div className="hero-text">
          <div className="hero-label">🌿 지구와 몸을 살리는 한 끼</div>
          <h1 className="hero-title">VEGAN<br /><span style={{ color: '#2D6A4F' }}>PICK</span></h1>
          <p className="hero-subtitle">
            나의 지향에 맞는 채식 식당을 가장 쉽게 찾는 방법.<br />
            비건부터 플렉시테리언까지, 모두를 위한 식탁을 만나보세요.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" style={{ background: '#2D6A4F' }} onClick={() => navigate('/map')}>비건 지도 보기</button>
            <button className="btn-ghost" onClick={() => navigate('/blog')}>채식 레시피 & 리뷰</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">850<span>곳</span></div><div className="stat-label">비건 식당</div></div>
          <div className="stat"><div className="stat-num">12<span>톤</span></div><div className="stat-label">탄소 절감량</div></div>
        </div>
      </section>

      {/* ── LIVE STRIP ── */}
      <div className="live-strip" style={{ borderTop: '1px solid #E8F5E9' }}>
        <div className="live-dot" style={{ background: '#2D6A4F' }} />
        <span className="live-label" style={{ color: '#2D6A4F' }}>LIVE</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => <span key={i} className="live-item">{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">유형별 탐색</h2>
          <span className="section-more" onClick={() => navigate('/map')}>모든 식단 보기 →</span>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')}>
              <img className="cat-img" src={cat.img} alt={cat.name} />
              <div className="cat-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(45, 106, 79, 0.7))' }} />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count}개의 장소</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">이달의 인기 비건 스팟</h2>
          <span className="section-more" onClick={() => navigate('/map')}>전체 랭킹 →</span>
        </div>
        <div className="picks-row">
          {TOP_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} 
                 style={p.featured ? { borderColor: '#2D6A4F' } : {}}
                 onClick={() => navigate('/Fpage')}>
              <div className="pick-rank" style={p.featured ? { color: '#2D6A4F' } : {}}>{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
              <div className="pick-name">{p.name}</div>
              <div className="pick-cat">{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: '#2D6A4F' }}>{'★'.repeat(Math.round(p.rating))} {p.rating}</span>
                <span className="pick-dist">{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 블로그 배너 ── */}
      <div className="map-banner" style={{ cursor: 'pointer', background: '#F1F8E9' }} onClick={() => navigate('/blog')}>
        <div style={{ color: '#2D6A4F' }}>
          <h3 className="map-banner-title" style={{ color: '#1B4332' }}>채식 라이프스타일 매거진 →</h3>
          <p className="map-banner-sub">지속 가능한 삶을 위한 비건 레시피와 제로웨이스트 팁을 만나보세요</p>
        </div>
        <button className="btn-white" style={{ color: '#2D6A4F' }} onClick={() => navigate('/blog')}>매거진 읽기</button>
      </div>

      {/* ── 지도 배너 ── */}
      <div className="map-banner" style={{ background: '#2D6A4F', marginTop: -12 }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title">내 주변 비건 옵션 식당 찾기 →</h3>
          <p className="map-banner-sub">현재 위치를 기반으로 비건 메뉴가 있는 가장 가까운 식당을 안내합니다</p>
        </div>
        <button className="btn-white" style={{ color: '#2D6A4F' }} onClick={() => navigate('/map')}>지도 열기</button>
      </div>
    </div>
  )
}

export default VegaPage