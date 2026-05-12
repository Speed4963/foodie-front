import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

// 🍾 주류 카테고리: 전 세계 인기 주류별 분류
const LIQUOR_CATEGORIES = [
  { name: '싱글몰트 위스키',  count: 124, img: 'https://images.unsplash.com/photo-1527281405159-35d5b5bc7650?w=600&q=80' },
  { name: '내추럴 와인',      count: 86,  img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80' },
  { name: '프리미엄 사케',    count: 42,  img: 'https://images.unsplash.com/photo-1613062348505-1df30e844c8b?w=600&q=80' },
  { name: '크래프트 진 · 보드카', count: 57,  img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?w=600&q=80' },
  { name: '빈티지 샴페인',    count: 31,  img: 'https://images.unsplash.com/photo-1594460754671-f0ca89995441?w=600&q=80' },
  { name: '희귀 소품종 전통주', count: 94,  img: 'https://images.unsplash.com/photo-1528499919447-fbff69e7146c?w=600&q=80' },
]

// 🏆 이번 주 핫 보틀 (인기 주류 판매점 정보)
const BOTTLE_PICKS = [
  { rank: '01', name: '더 위스키 한남',    category: '위스키 · 용산구', rating: 4.9, dist: '신규 입고', tag: '재고있음', tagBg: '#1A2A6C', tagColor: '#fff', featured: true },
  { rank: '02', name: '포도클럽 성수',      category: '와인 · 성동구',   rating: 4.8, dist: '3.2km',   tag: '할인중',   tagBg: '#F8F1FF', tagColor: '#6B4E71', featured: false },
  { rank: '03', name: '사케야 역삼',        category: '사케 · 강남구',   rating: 4.7, dist: '800m',    tag: '시음가능', tagBg: '#FFF7E0', tagColor: '#B7791F', featured: false },
]

// 🥂 실시간 보틀 피드
const LIVE_FEED = [
  '최지훈님이 "더 위스키 한남"에서 맥캘란 18년산 구매 인증!',
  '실시간 인기: 지금 성수동 와인숍 "내추럴 빈" 예약이 몰리고 있어요',
  '방금 "발베니 21년" 한정 수량이 강남구 보틀숍 3곳에 입고되었습니다',
]

const BottleShopPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page" style={{ backgroundColor: '#fcfcfc' }}>
      {/* ── HERO: 클래식한 바/보틀숍 느낌 ── */}
      <section className="hero" style={{ background: '#0a0d14', color: '#fff' }}>
        <div className="hero-grid" style={{ opacity: 0.15 }} />
        <div className="hero-circle" style={{ background: 'radial-gradient(circle, #b19470 0%, transparent 70%)', opacity: 0.1 }} />
        <div className="hero-text">
          <div className="hero-label" style={{ color: '#b19470', borderColor: '#b19470' }}>🍷 전 세계 희귀 주류 큐레이션</div>
          <h1 className="hero-title" style={{ letterSpacing: '2px' }}>BOTTLE<br /><span style={{ color: '#b19470' }}>PICK</span></h1>
          <p className="hero-subtitle" style={{ color: '#a0a0a0' }}>
            찾기 힘든 한정판 위스키부터 트렌디한 내추럴 와인까지.<br />
            지금 바로 근처 보틀숍의 실시간 재고와 가격을 확인하세요.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" style={{ background: '#b19470', color: '#fff' }} onClick={() => navigate('/map')}>보틀숍 지도 열기</button>
            <button className="btn-ghost" style={{ borderColor: '#b19470', color: '#b19470' }} onClick={() => navigate('/blog')}>테이스팅 노트</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num" style={{ color: '#b19470' }}>3<span>,420</span></div><div className="stat-label">등록 보틀</div></div>
          <div className="stat"><div className="stat-num">89<span>곳</span></div><div className="stat-label">전국 제휴 매장</div></div>
        </div>
      </section>

      {/* ── LIVE STRIP ── */}
      <div className="live-strip" style={{ background: '#b19470', color: '#fff' }}>
        <div className="live-dot" style={{ background: '#fff' }} />
        <span className="live-label">LIVE STOCK</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => <span key={i} className="live-item" style={{ fontWeight: 500 }}>{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">주종별 탐색</h2>
          <span className="section-more" onClick={() => navigate('/map')}>장르 전체 보기 →</span>
        </div>
        <div className="cat-grid">
          {LIQUOR_CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')} style={{ borderRadius: '12px' }}>
              <img className="cat-img" src={cat.img} alt={cat.name} />
              <div className="cat-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,13,20,0.8))' }} />
              <span className="cat-name" style={{ fontSize: '1rem' }}>{cat.name}</span>
              <span className="cat-count">{cat.count} Bottles</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">WEEKLY HOT BOTTLE-SHOP</h2>
          <span className="section-more" onClick={() => navigate('/map')}>실시간 순위 →</span>
        </div>
        <div className="picks-row">
          {BOTTLE_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} 
                 style={p.featured ? { border: '2px solid #b19470', boxShadow: '0 10px 30px rgba(177,148,112,0.2)' } : {}}
                 onClick={() => navigate('/map')}>
              <div className="pick-rank" style={{ color: p.featured ? '#b19470' : '#ddd' }}>{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor, fontWeight: 600 }}>{p.tag}</span>
              <div className="pick-name" style={{ fontSize: '1.2rem' }}>{p.name}</div>
              <div className="pick-cat" style={{ color: '#666' }}>{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: '#b19470' }}>{'★'.repeat(Math.round(p.rating))} {p.rating}</span>
                <span className="pick-dist" style={{ color: '#b19470', fontWeight: 'bold' }}>{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 블로그 배너 ── */}
      <div className="map-banner" style={{ background: '#f4f1ee', color: '#2d2d2d' }} onClick={() => navigate('/blog')}>
        <div>
          <h3 className="map-banner-title" style={{ color: '#1a1a1a' }}>전문 소믈리에의 테이스팅 노트 →</h3>
          <p className="map-banner-sub">실패 없는 구매를 위한 주종별 가이드와 페어링 안주 추천</p>
        </div>
        <button className="btn-white" style={{ background: '#1a1a1a', color: '#fff', border: 'none' }} onClick={() => navigate('/blog')}>칼럼 읽기</button>
      </div>

      {/* ── 지도 배너 ── */}
      <div className="map-banner" style={{ background: '#0a0d14', marginTop: -12 }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title">내 주변 보틀숍 재고 지도 →</h3>
          <p className="map-banner-sub">방문 전 전화 문의 필요 없이, 앱에서 바로 실시간 재고를 확인하세요</p>
        </div>
        <button className="btn-white" style={{ color: '#0a0d14' }} onClick={() => navigate('/map')}>지도 확인하기</button>
      </div>
    </div>
  )
}

export default BottleShopPage