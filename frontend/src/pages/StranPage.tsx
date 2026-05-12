import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

// 🧪 괴식 카테고리: 도전 정신을 자극하는 메뉴들
const STRANGE_CATEGORIES = [
  { name: '상상초월 혼종',    count: 12,  img: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&q=80' }, // 독특한 비주얼 음식
  { name: '극한의 매운맛',    count: 28,  img: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=600&q=80' }, // 고추, 캡사이신
  { name: '이색 식재료',      count: 15,  img: 'https://images.unsplash.com/photo-1508611158210-32118836c568?w=600&q=80' }, // 곤충이나 특이한 재료 느낌
  { name: '디저트 빌런',      count: 22,  img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80' }, // 단짠의 괴상한 조합
  { name: '냄새 끝판왕',      count: 9,   img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&q=80' }, // 취두부, 홍어 등
  { name: '비주얼 쇼크',      count: 31,  img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&q=80' }, // 파란색 커리 등
]

// 🏆 이번 주 괴식 TOP PICK
const WEIRD_PICKS = [
  { rank: '01', name: '민트초코 떡볶이',    category: '혼종 · 홍대',     rating: 3.2, dist: '500m',  tag: '충격', tagBg: '#00FFD1', tagColor: '#000',     featured: true },
  { rank: '02', name: '대왕 불지옥 라면',    category: '매운맛 · 신촌',   rating: 4.1, dist: '1.2km', tag: '도전', tagBg: '#FF4D00', tagColor: '#fff',     featured: false },
  { rank: '03', name: '두리안 피자',        category: '이색 · 강남',     rating: 2.5, dist: '3.5km', tag: '매니아', tagBg: '#D4FF00', tagColor: '#000',     featured: false },
]

// 🚨 실시간 도전 현황
const CHALLENGE_FEED = [
  '닉네임 "용사"님이 민트초코 떡볶이 완식에 성공했습니다!',
  '방금 서울 관악구에서 "취두부 파스타" 새로운 제보가 들어왔어요.',
  '이서준님이 "불지옥 라면" 5단계 도전 실패... 다음 기회에!',
]

const Manager: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
      {/* ── HERO: 사이버펑크/이색 느낌 ── */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}>
        <div className="hero-grid" style={{ opacity: 0.2 }} />
        <div className="hero-circle" style={{ background: 'radial-gradient(circle, #D4FF00 0%, transparent 70%)', opacity: 0.1 }} />
        <div className="hero-text">
          <div className="hero-label" style={{ color: '#D4FF00', borderColor: '#D4FF00' }}>⚠️ 미식과 괴식 사이 그 어딘가</div>
          <h1 className="hero-title" style={{ color: '#fff' }}>WEIRD<br /><span style={{ color: '#D4FF00' }}>HUNTER</span></h1>
          <p className="hero-subtitle" style={{ color: '#aaa' }}>
            평범한 맛집은 지루하신가요? 당신의 혀를 시험할 전국의 괴식을 찾아드립니다.<br />
            진정한 맛의 모험가를 위한 실시간 괴식 지도.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" style={{ background: '#D4FF00', color: '#000', fontWeight: 'bold' }} onClick={() => navigate('/map')}>괴식 지도 탐사</button>
            <button className="btn-ghost" style={{ color: '#fff', borderColor: '#fff' }} onClick={() => navigate('/blog')}>생존 리뷰 보기</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num" style={{ color: '#D4FF00' }}>142<span>개</span></div><div className="stat-label">발견된 괴식</div></div>
          <div className="stat"><div className="stat-num" style={{ color: '#FF4D00' }}>8<span>명</span></div><div className="stat-label">현재 도전 중</div></div>
        </div>
      </section>

      {/* ── LIVE FEED ── */}
      <div className="live-strip" style={{ background: '#D4FF00', color: '#000' }}>
        <div className="live-dot" style={{ background: '#ff0000' }} />
        <span className="live-label" style={{ fontWeight: '900' }}>WARNING</span>
        <div className="live-items">
          {CHALLENGE_FEED.map((msg, i) => <span key={i} className="live-item" style={{ color: '#000' }}>{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title" style={{ color: '#fff' }}>도전 카테고리</h2>
          <span className="section-more" style={{ color: '#D4FF00' }} onClick={() => navigate('/map')}>위험 지역 전체 보기 →</span>
        </div>
        <div className="cat-grid">
          {STRANGE_CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')} style={{ border: '1px solid #333' }}>
              <img className="cat-img" src={cat.img} alt={cat.name} style={{ filter: 'grayscale(30%)' }} />
              <div className="cat-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))' }} />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count}개의 타겟</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS: 괴식 랭킹 ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">이번 주 최악(?)의 인기 괴식</h2>
          <span className="section-more" onClick={() => navigate('/map')}>전설의 맛 보기 →</span>
        </div>
        <div className="picks-row">
          {WEIRD_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} 
                 style={{ background: '#1a1a1a', border: p.featured ? '2px solid #D4FF00' : '1px solid #333' }}
                 onClick={() => navigate('/map')}>
              <div className="pick-rank" style={{ color: p.featured ? '#D4FF00' : '#555' }}>{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
              <div className="pick-name" style={{ color: '#fff' }}>{p.name}</div>
              <div className="pick-cat" style={{ color: '#888' }}>{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: '#FF4D00' }}>{'💀'.repeat(Math.floor(p.rating))} {p.rating}</span>
                <span className="pick-dist">{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 배너들 ── */}
      <div className="map-banner" style={{ background: '#D4FF00', color: '#000' }} onClick={() => navigate('/blog')}>
        <div>
          <h3 className="map-banner-title" style={{ color: '#000' }}>생존자의 리뷰 블로그 가기 →</h3>
          <p className="map-banner-sub">"생각보다 먹을만함"과 "절대 가지 마시오" 사이의 진실</p>
        </div>
        <button className="btn-white" style={{ background: '#000', color: '#D4FF00', border: 'none' }} onClick={() => navigate('/blog')}>리뷰 읽기</button>
      </div>

      <div className="map-banner" style={{ background: '#111', border: '1px solid #D4FF00', marginTop: -12 }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title" style={{ color: '#D4FF00' }}>내 주변 위험 식당 레이더 가동 →</h3>
          <p className="map-banner-sub">용기 있는 자만이 지도를 열 수 있습니다. (네이버 지도 연동)</p>
        </div>
        <button className="btn-white" style={{ color: '#000', background: '#D4FF00' }} onClick={() => navigate('/map')}>레이더 작동</button>
      </div>
    </div>
  )
}

export default Manager