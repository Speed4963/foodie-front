import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

// 🐾 반려동물 맞춤형 카테고리 (전용 메뉴, 운동장 유무 등)
const PET_CATEGORIES = [
  { name: '강아지 스테이크', count: 42,  img: 'https://images.unsplash.com/photo-1589924691106-073b138d0b27?w=600&q=80' },
  { name: '천연잔디 운동장', count: 28,  img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80' },
  { name: '카페 · 멍푸치노', count: 156, img: 'https://images.unsplash.com/photo-1544433480-e442df224a9a?w=600&q=80' },
  { name: '개별 프라이빗룸', count: 19,  img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80' },
  { name: '동반 가능 바베큐', count: 34,  img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80' },
  { name: '고양이 동반존',   count: 12,  img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80' },
]

// 🏆 이번 주 펫팸족 선정 TOP PICK
const PET_PICKS = [
  { rank: '01', name: '스테이 위드 미', category: '양식 · 용산구', rating: 4.9, dist: '강아지 의자 보유', tag: '전용메뉴', tagBg: '#FF8E2B', tagColor: '#fff', featured: true },
  { rank: '02', name: '초록뜰 가든',    category: '바베큐 · 남양주', rating: 4.8, dist: '1,000평 운동장', tag: '대형견가능', tagBg: '#FFF0F0', tagColor: '#FF8E2B', featured: false },
  { rank: '03', name: '멍카페 연남',    category: '카페 · 마포구', rating: 4.7, dist: '포토존 맛집', tag: '멍푸치노', tagBg: '#FFF7E0', tagColor: '#B7791F', featured: false },
]

// 🐩 실시간 펫 다이어리 피드
const LIVE_FEED = [
  '초코맘님이 "스테이 위드 미"에서 멍스테이크 먹방 중! 🥩',
  '오늘 연남동 "멍카페"에 귀여운 리트리버 친구들이 모여있어요',
  '김하늘님이 남양주 운동장 식당 "초록뜰" 실시간 재고 확인 완료!',
]

const AniPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page" style={{ backgroundColor: '#FFFAF5' }}>
      {/* ── HERO: 댕댕이와 함께하는 행복한 식사 ── */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, #FFF5E6 0%, #FFFFFF 100%)' }}>
        <div className="hero-grid" style={{ opacity: 0.1 }} />
        <div className="hero-circle" style={{ background: 'radial-gradient(circle, #FF8E2B 0%, transparent 70%)', opacity: 0.15 }} />
        <div className="hero-text">
          <div className="hero-label" style={{ color: '#FF8E2B', borderColor: '#FF8E2B' }}>🐶 댕냥이와 함께 떠나는 미식 여행</div>
          <h1 className="hero-title" style={{ color: '#4A321F' }}>PET<br /><span>PICK</span></h1>
          <p className="hero-subtitle" style={{ color: '#6B4F3B' }}>
            눈치 보지 말고 우리 아이와 함께 맛있게 즐기세요.<br />
            실시간 동반 가능 여부부터 펫 전용 메뉴 정보까지 한눈에.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" style={{ background: '#FF8E2B' }} onClick={() => navigate('/map')}>동반 식당 지도</button>
            <button className="btn-ghost" style={{ borderColor: '#FF8E2B', color: '#FF8E2B' }} onClick={() => navigate('/blog')}>방문 후기/꿀팁</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num" style={{ color: '#FF8E2B' }}>840<span>곳</span></div><div className="stat-label">동반 가능 매장</div></div>
          <div className="stat"><div className="stat-num">56<span>곳</span></div><div className="stat-label">전용 메뉴 판매</div></div>
        </div>
      </section>

      {/* ── LIVE STRIP ── */}
      <div className="live-strip" style={{ background: '#FF8E2B', color: '#fff' }}>
        <div className="live-dot" style={{ background: '#fff' }} />
        <span className="live-label">실시간 펫 피드</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => <span key={i} className="live-item">{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">우리 아이 취향저격 테마</h2>
          <span className="section-more" onClick={() => navigate('/map')}>전체 보기 →</span>
        </div>
        <div className="cat-grid">
          {PET_CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')} style={{ borderRadius: '20px' }}>
              <img className="cat-img" src={cat.img} alt={cat.name} />
              <div className="cat-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(74,50,31,0.7))' }} />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count}개의 공간</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">이번 주 인기 펫프렌들리 존</h2>
          <span className="section-more" onClick={() => navigate('/map')}>지도 보기 →</span>
        </div>
        <div className="picks-row">
          {PET_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} 
                 style={{ background: '#fff', border: p.featured ? '2px solid #FF8E2B' : '1px solid #eee' }}
                 onClick={() => navigate('/map')}>
              <div className="pick-rank" style={{ color: p.featured ? '#FF8E2B' : '#ddd' }}>{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
              <div className="pick-name" style={{ color: '#4A321F' }}>{p.name}</div>
              <div className="pick-cat">{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: '#FF8E2B' }}>{'★'.repeat(Math.round(p.rating))} {p.rating}</span>
                <span className="pick-dist" style={{ fontWeight: '700', color: '#FF8E2B' }}>{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 커뮤니티/블로그 배너 ── */}
      <div className="map-banner" style={{ background: '#F0E6DD', color: '#4A321F' }} onClick={() => navigate('/blog')}>
        <div>
          <h3 className="map-banner-title">반려동물 동반 매너 & 꿀팁 보러가기 →</h3>
          <p className="map-banner-sub">유모차 대여 여부부터 펫 티켓(Petiquette)까지 선배 펫엄빠들의 생생 리뷰</p>
        </div>
        <button className="btn-white" style={{ color: '#4A321F' }} onClick={() => navigate('/blog')}>리뷰 읽기</button>
      </div>

      {/* ── 지도 배너 ── */}
      <div className="map-banner" style={{ background: '#4A321F', marginTop: -12 }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title">지금 내 주변 반려동물 동반 지도 →</h3>
          <p className="map-banner-sub">강아지 전용 의자가 있는 가장 가까운 식당을 바로 안내해 드려요</p>
        </div>
        <button className="btn-white" style={{ color: '#4A321F' }} onClick={() => navigate('/map')}>지도 열기</button>
      </div>
    </div>
  )
}

export default AniPage