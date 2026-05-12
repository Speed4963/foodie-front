
import React from 'react'
import { useNavigate } from 'react-router-dom' // ✅ useNavigate 임포트

// ✅ Props 인터페이스를 비워서 더 이상 밖에서 onNavigate를 받지 않도록 합니다.
interface Props {}

const CATEGORIES = [
  { name: '고기 · 구이',    count: 84,  img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' },
  { name: '국밥 · 탕',      count: 61,  img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80' },
  { name: '카페 · 브런치', count: 213, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
  { name: '안주 · 포차',    count: 97,  img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80' },
  { name: '전통 · 분식',    count: 142, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80' },
  { name: '양식 · 파스타', count: 178, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
]

const TOP_PICKS = [
  { rank: '01', name: '용산 순대국밥',    category: '국밥·탕 · 용산구',   rating: 4.9, dist: '1.8km', tag: '찐맛집', tagBg: '#E8272A', tagColor: '#fff',     featured: true },
  { rank: '02', name: '을지로 골뱅이',    category: '안주·포차 · 중구',   rating: 4.8, dist: '350m',  tag: '인기',    tagBg: '#FFF0F0', tagColor: '#E8272A', featured: false },
  { rank: '03', name: '광장시장 빈대떡', category: '전통·분식 · 종로구', rating: 4.6, dist: '720m',  tag: '맛집',    tagBg: '#FFF7E0', tagColor: '#B7791F', featured: false },
]

const LIVE_FEED = [
  '김민준님이 을지로 골뱅이에 ★5 리뷰를 남겼어요',
  '이서연님이 용산 순대국밥을 즐겨찾기했어요',
  '박지호님이 연남동 브런치 방문 인증!',
]

const MainPage: React.FC<Props> = () => {
  // ✅ useNavigate 훅 선언
  const navigate = useNavigate();

  // 기존의 onNavigate('경로') 호출을 navigate('/경로')로 대체하여 작동하게 합니다.
  return (
    <div className="main-page">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-circle" />
        <div className="hero-bg" />
        <div className="hero-text">
          <div className="hero-label">🍽 지금 내 주변 맛집 탐색 중</div>
          <h1 className="hero-title">EAT<br /><span>PICK</span></h1>
          <p className="hero-subtitle">
            서울 어디서든, 지금 바로 근처 최고의 맛집을 찾아드려요.<br />
            실시간 리뷰와 지도로 더 쉽고 빠르게.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => navigate('/map')}>지도에서 찾기</button>
            <button className="btn-ghost"   onClick={() => navigate('/blog')}>리뷰 보러 가기</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">1<span>,240</span></div><div className="stat-label">등록 맛집</div></div>
          <div className="stat"><div className="stat-num">43<span>명</span></div><div className="stat-label">지금 보는 중</div></div>
        </div>
      </section>

      {/* ── LIVE STRIP ── */}
      <div className="live-strip">
        <div className="live-dot" />
        <span className="live-label">실시간</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => <span key={i} className="live-item">{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">카테고리</h2>
          <span className="section-more" onClick={() => navigate('/map')}>전체 보기 →</span>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')}>
              <img className="cat-img" src={cat.img} alt={cat.name} />
              <div className="cat-overlay" />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count}곳</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">이번 주 TOP PICK</h2>
          <span className="section-more" onClick={() => navigate('/map')}>지도에서 보기 →</span>
        </div>
        <div className="picks-row">
          {TOP_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} onClick={() => navigate('/map')}>
              <div className="pick-rank">{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
              <div className="pick-name">{p.name}</div>
              <div className="pick-cat">{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars">{'★'.repeat(Math.round(p.rating))} {p.rating}</span>
                <span className="pick-dist">{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 블로그 배너 ── */}
      <div className="map-banner" style={{ cursor: 'pointer' }} onClick={() => navigate('/blog')}>
        <div>
          <h3 className="map-banner-title">맛집 리뷰 블로그 바로 가기 →</h3>
          <p className="map-banner-sub">직접 다녀온 맛집 후기를 공유하고, 다른 사람들의 리뷰도 확인해보세요</p>
        </div>
        <button className="btn-white" onClick={() => navigate('/blog')}>블로그 보기</button>
      </div>

      {/* ── 지도 배너 ── */}
      <div className="map-banner" style={{ background: '#0D0D0D', marginTop: -12 }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title">지금 내 주변 맛집 지도 열기 →</h3>
          <p className="map-banner-sub">네이버 지도 연동으로 실시간 위치 기반 길찾기까지 한 번에</p>
        </div>
        <button className="btn-white" style={{ color: '#0D0D0D' }} onClick={() => navigate('/map')}>지도 바로 가기</button>
      </div>
    </div>
  )
}

export default MainPage