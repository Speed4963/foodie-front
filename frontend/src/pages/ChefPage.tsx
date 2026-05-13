import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

// 👨‍🍳 셰프들의 주종목 및 수상 경력별 카테고리
const CHEF_CATEGORIES = [
  { name: '미슐랭 스타 셰프',   count: 12,  img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
  { name: '서바이벌 우승자',   count: 8,   img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80' },
  { name: '중식의 거장',       count: 15,  img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80' },
  { name: '이탈리안 마스터',   count: 24,  img: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=600&q=80' },
  { name: '일식 오마카세 명인', count: 19,  img: 'https://images.unsplash.com/photo-1579027989536-b7b2187a593d?w=600&q=80' },
  { name: '월드 클래스 페이스트리', count: 7,  img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80' },
]

// 🏆 지금 가장 핫한 스타 셰프의 식당 TOP PICK
const CHEF_PICKS = [
  { rank: '01', name: '트리플 스타의 주방', category: '컨템포러리 · 강남구', rating: 4.9, dist: '예약난이도: 최상', tag: '우승자식당', tagBg: '#D4AF37', tagColor: '#fff', featured: true },
  { rank: '02', name: '철가방 요리사 본점', category: '중식 · 종로구',   rating: 4.8, dist: '이색 퍼포먼스', tag: 'TV방영', tagBg: '#1a1a1a', tagColor: '#fff', featured: false },
  { rank: '03', name: '나폴리 맛피아 식당', category: '이탈리안 · 용산구', rating: 4.7, dist: '정통 파스타', tag: '월드우승', tagBg: '#fdfcf0', tagColor: '#B7791F', featured: false },
]

// 🎙 실시간 셰프 소식 피드
const LIVE_FEED = [
  '철가방 요리사 셰프님이 오늘 새로운 시즌 메뉴를 공개했습니다! 🔥',
  '방금 "나폴리 맛피아" 식당의 이번 달 예약이 마감되었습니다.',
  '이영희님이 "트리플 스타"에서 인생 다이닝을 경험하고 별 5개를 남겼어요.',
]

const ChefPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
      {/* ── HERO: 거장들의 무대 ── */}
      <section className="hero" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-grid" style={{ opacity: 0.05 }} />
        <div className="hero-text">
          <div className="hero-label" style={{ color: '#D4AF37', borderColor: '#D4AF37' }}>✨ MASTER CHEF SELECTION</div>
          <h1 className="hero-title" style={{ fontSize: '4rem', letterSpacing: '-2px' }}>CHEF'S<br /><span style={{ color: '#D4AF37' }}>TABLE</span></h1>
          <p className="hero-subtitle" style={{ color: '#aaa', maxWidth: '600px' }}>
            화면 속 그 맛을 실제로 경험하세요. 세계 요리 경연 우승자부터<br />
            전설적인 스타 셰프들이 직접 운영하는 검증된 맛집 큐레이션.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" style={{ background: '#D4AF37', color: '#000', fontWeight: 'bold' }} onClick={() => navigate('/map')}>셰프의 식당 지도</button>
            <button className="btn-ghost" style={{ borderColor: '#D4AF37', color: '#D4AF37' }} onClick={() => navigate('/blog')}>셰프 인터뷰 읽기</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num" style={{ color: '#D4AF37' }}>86<span>명</span></div><div className="stat-label">등록 스타 셰프</div></div>
          <div className="stat"><div className="stat-num">24<span>시간</span></div><div className="stat-label">실시간 예약 확인</div></div>
        </div>
      </section>

      {/* ── LIVE STRIP: 실시간 주방 소식 ── */}
      <div className="live-strip" style={{ background: '#D4AF37', color: '#000' }}>
        <div className="live-dot" style={{ background: '#000' }} />
        <span className="live-label" style={{ fontWeight: 'bold' }}>KITCHEN NOW</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => <span key={i} className="live-item" style={{ fontWeight: 500 }}>{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="section-head">
          <h2 className="section-title" style={{ color: '#fff' }}>분야별 명인 찾기</h2>
          <span className="section-more" style={{ color: '#D4AF37' }} onClick={() => navigate('/map')}>전체 라인업 보기 →</span>
        </div>
        <div className="cat-grid">
          {CHEF_CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')} style={{ border: '1px solid #333' }}>
              <img className="cat-img" src={cat.img} alt={cat.name} />
              <div className="cat-overlay" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }} />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count" style={{ color: '#D4AF37' }}>{cat.count} Restaurants</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS: 이번 달의 스페셜 셰프 ── */}
      <section className="section" style={{ paddingTop: 0, backgroundColor: '#0a0a0a' }}>
        <div className="section-head">
          <h2 className="section-title" style={{ color: '#fff' }}>TOP RATED CHEFS</h2>
          <span className="section-more" onClick={() => navigate('/map')}>지도에서 보기 →</span>
        </div>
        <div className="picks-row">
          {CHEF_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} 
                 style={{ background: '#1a1a1a', border: p.featured ? '1px solid #D4AF37' : '1px solid #333' }}
                 onClick={() => navigate('/map')}>
              <div className="pick-rank" style={{ color: p.featured ? '#D4AF37' : '#444' }}>{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
              <div className="pick-name" style={{ color: '#fff' }}>{p.name}</div>
              <div className="pick-cat" style={{ color: '#888' }}>{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: '#D4AF37' }}>{'★'.repeat(Math.round(p.rating))} {p.rating}</span>
                <span className="pick-dist" style={{ color: '#D4AF37' }}>{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 블로그 배너: 테이스팅 노트 ── */}
      <div className="map-banner" style={{ background: '#1a1a1a', border: '1px solid #D4AF37', cursor: 'pointer' }} onClick={() => navigate('/blog')}>
        <div>
          <h3 className="map-banner-title" style={{ color: '#D4AF37' }}>셰프들의 비하인드 스토리 →</h3>
          <p className="map-banner-sub">경연 비하인드부터 셰프가 직접 추천하는 페어링 와인까지 확인하세요.</p>
        </div>
        <button className="btn-white" style={{ background: '#D4AF37', color: '#000', border: 'none' }} onClick={() => navigate('/blog')}>스토리 보기</button>
      </div>

      {/* ── 지도 배너: 실시간 예약 및 위치 ── */}
      <div className="map-banner" style={{ background: '#D4AF37', marginTop: -12 }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title" style={{ color: '#000' }}>내 주변 스타 셰프 식당 지도 →</h3>
          <p className="map-banner-sub" style={{ color: '#333' }}>실시간 캐치테이블 예약 연동으로 빈자리 알림을 받아보세요.</p>
        </div>
        <button className="btn-white" style={{ background: '#000', color: '#fff', border: 'none' }} onClick={() => navigate('/map')}>지도 열기</button>
      </div>
    </div>
  )
}

export default ChefPage