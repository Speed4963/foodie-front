import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

// ⭐️ 미슐랭 카테고리: 별점 및 가이드 등급별 분류
const MICHELIN_CATEGORIES = [
  { name: '3-Star',     count: 2,   img: 'https://images.unsplash.com/photo-1550966841-3ee4ad6c10d3?w=600&q=80' },
  { name: '2-Star',     count: 15,  img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
  { name: '1-Star',     count: 48,  img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80' },
  { name: '빕 구르망',    count: 124, img: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&q=80' }, // 합리적 가격
  { name: '그린 스타',    count: 8,   img: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=600&q=80' }, // 지속 가능성
  { name: '선별된 레스토랑', count: 186, img: 'https://images.unsplash.com/photo-1551632432-c735e97994ce?w=600&q=80' },
]

// 🏆 이번 주 추천 미슐랭 스타 식당
const MICHELIN_PICKS = [
  { rank: '01', name: '가온 (Gaon)',       category: '한식 · 강남구',    rating: 5.0, dist: '3-Star', tag: '최고의 요리', tagBg: '#BD9B60', tagColor: '#fff', featured: true },
  { rank: '02', name: '밍글스 (Mingles)',  category: '컨템포러리 · 강남구', rating: 4.9, dist: '2-Star', tag: '창의적', tagBg: '#F5F5F5', tagColor: '#BD9B60', featured: false },
  { rank: '03', name: '옥동식 (Okdongsik)', category: '돼지국밥 · 마포구',  rating: 4.7, dist: 'Bib Gourmand', tag: '가성비', tagBg: '#FFF7E0', tagColor: '#B7791F', featured: false },
]

// 🗼 실시간 미식가 피드
const LIVE_FEED = [
  '정우성님이 "가온"의 테이스팅 코스에 ★5 리뷰를 남겼어요',
  '2026 서울 미슐랭 가이드에 신규 레스토랑 3곳이 추가되었습니다',
  '방금 "밍글스"의 이번 주말 예약이 마감되었습니다',
]

const MichelinPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page" style={{ backgroundColor: '#fff', color: '#1a1a1a' }}>
      {/* ── HERO: 클래식하고 우아한 분위기 ── */}
      <section className="hero" style={{ background: '#fcfcfc', borderBottom: '1px solid #eee' }}>
        <div className="hero-grid" style={{ opacity: 0.1 }} />
        <div className="hero-circle" style={{ background: 'radial-gradient(circle, #BD9B60 0%, transparent 70%)', opacity: 0.05 }} />
        <div className="hero-text">
          <div className="hero-label" style={{ color: '#E8272A', fontWeight: '600' }}>THE MICHELIN GUIDE 2026</div>
          <h1 className="hero-title" style={{ fontSize: '4rem', letterSpacing: '-2px' }}>GASTRO<br /><span style={{ color: '#BD9B60' }}>LUXE</span></h1>
          <p className="hero-subtitle" style={{ color: '#666', maxWidth: '500px' }}>
            전 세계가 인정한 미식의 정점. 미슐랭 가이드가 선정한 <br />
            서울 최고의 레스토랑을 한눈에 확인하고 예약하세요.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" style={{ background: '#1a1a1a', borderRadius: '0px' }} onClick={() => navigate('/map')}>스타 식당 찾기</button>
            <button className="btn-ghost" style={{ border: '1px solid #1a1a1a', borderRadius: '0px' }} onClick={() => navigate('/blog')}>미식 칼럼 읽기</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num" style={{ color: '#E8272A' }}>65<span>곳</span></div><div className="stat-label">스타 레스토랑</div></div>
          <div className="stat"><div className="stat-num">124<span>곳</span></div><div className="stat-label">빕 구르망</div></div>
        </div>
      </section>

      {/* ── LIVE STRIP: 공신력 있는 업데이트 느낌 ── */}
      <div className="live-strip" style={{ background: '#1a1a1a', color: '#fff' }}>
        <div className="live-dot" style={{ background: '#E8272A' }} />
        <span className="live-label" style={{ color: '#E8272A' }}>UPDATE</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => <span key={i} className="live-item" style={{ fontSize: '0.9rem' }}>{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">가이드 등급별</h2>
          <span className="section-more" onClick={() => navigate('/map')}>가이드 전문 보기 →</span>
        </div>
        <div className="cat-grid">
          {MICHELIN_CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')} style={{ borderRadius: '4px', overflow: 'hidden' }}>
              <img className="cat-img" src={cat.img} alt={cat.name} />
              <div className="cat-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))' }} />
              <span className="cat-name" style={{ fontWeight: '700' }}>{cat.name}</span>
              <span className="cat-count">{cat.count} Locations</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS: 큐레이션 ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">WEEKLY SELECTION</h2>
          <span className="section-more" onClick={() => navigate('/map')}>전체 리스트 →</span>
        </div>
        <div className="picks-row">
          {MICHELIN_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} 
                 style={{ border: p.featured ? '1px solid #BD9B60' : '1px solid #eee', boxShadow: 'none' }}
                 onClick={() => navigate('/map')}>
              <div className="pick-rank" style={{ color: '#BD9B60' }}>{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor, borderRadius: '2px' }}>{p.tag}</span>
              <div className="pick-name" style={{ fontSize: '1.2rem', fontWeight: '800' }}>{p.name}</div>
              <div className="pick-cat" style={{ color: '#888' }}>{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: '#E8272A' }}>{'★'.repeat(Math.round(p.rating))}</span>
                <span className="pick-dist" style={{ fontWeight: '600', color: '#BD9B60' }}>{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 배너들 ── */}
      <div className="map-banner" style={{ background: '#BD9B60', color: '#fff', borderRadius: '0px' }} onClick={() => navigate('/blog')}>
        <div>
          <h3 className="map-banner-title">인스펙터의 미식 평론 읽기 →</h3>
          <p className="map-banner-sub">익명의 미슐랭 조사관들이 남긴 상세한 요리평과 레스토랑 분위기</p>
        </div>
        <button className="btn-white" style={{ color: '#BD9B60', borderRadius: '0px', border: 'none' }} onClick={() => navigate('/blog')}>아카이브 보기</button>
      </div>

      <div className="map-banner" style={{ background: '#E8272A', marginTop: -12, borderRadius: '0px' }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title">미슐랭 가이드 공식 지도 열기 →</h3>
          <p className="map-banner-sub">내 근처의 빕 구르망부터 3스타 레스토랑까지 실시간 경로 안내</p>
        </div>
        <button className="btn-white" style={{ color: '#E8272A', borderRadius: '0px' }} onClick={() => navigate('/map')}>지도 바로가기</button>
      </div>
    </div>
  )
}

export default MichelinPage