import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

// 🎈 영유아 맞춤형 카테고리 (놀이방, 이유식 메뉴 등)
const KIDS_CATEGORIES = [
  { name: '대형 놀이방',    count: 34,  img: 'https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?w=600&q=80' },
  { name: '이유식 완비',    count: 18,  img: 'https://images.unsplash.com/photo-1596263576925-d90d63691097?w=600&q=80' },
  { name: '캐릭터 카페',    count: 52,  img: 'https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?w=600&q=80' },
  { name: '동물 체험 식당',  count: 21,  img: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=600&q=80' },
  { name: '정원 · 야외활동', count: 45,  img: 'https://images.unsplash.com/photo-1502086223501-7ea2443d844d?w=600&q=80' },
  { name: '수유실 보유',    count: 89,  img: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=600&q=80' },
]

// 🧸 이번 주 인기 키즈존 TOP PICK
const KIDS_PICKS = [
  { rank: '01', name: '꼬마요정 숲속식당',   category: '양식 · 송파구',   rating: 4.9, dist: '놀이방 최고', tag: '강력추천', tagBg: '#FF6B6B', tagColor: '#fff', featured: true },
  { rank: '02', name: '튼튼 베어 베이커리', category: '카페 · 용산구',   rating: 4.8, dist: '유기농간식', tag: '인기폭발', tagBg: '#FFD93D', tagColor: '#533E2D', featured: false },
  { rank: '03', name: '둥둥 구름 파스타',   category: '양식 · 종로구',   rating: 4.7, dist: '색칠놀이제공', tag: '친절해요', tagBg: '#6BCB77', tagColor: '#fff', featured: false },
]

// 🐥 실시간 육아맘/대디 피드
const LIVE_FEED = [
  '지우맘님이 "꼬마요정 숲속식당"에서 생일파티 중이에요! 🎂',
  '지금 "튼튼 베어"에 아기 의자 여유분 3개 남아있어요 🪑',
  '민수파파님이 유모차 진입이 편한 식당 리스트를 공유했습니다!',
]

const KidsCarePage: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page" style={{ backgroundColor: '#FFFDF7' }}>
      {/* ── HERO: 아이들의 꿈이 펼쳐지는 공간 ── */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, #FFEFBA 0%, #FFFFFF 100%)' }}>
        <div className="hero-grid" style={{ opacity: 0.1 }} />
        <div className="hero-circle" style={{ background: 'radial-gradient(circle, #FFD93D 0%, transparent 70%)', opacity: 0.2 }} />
        <div className="hero-text">
          <div className="hero-label" style={{ color: '#FF6B6B', borderColor: '#FF6B6B', fontWeight: 'bold' }}>🍭 우리 아이 첫 외식 나들이</div>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', color: '#533E2D' }}>KIDS<br /><span style={{ color: '#FF6B6B' }}>EATS</span></h1>
          <p className="hero-subtitle" style={{ color: '#7A6B5D' }}>
            눈치 보지 말고 즐겁게! 아이는 신나게 놀고 부모님은 편안하게 식사하세요.<br />
            유모차 진입로, 수유실 정보까지 꼼꼼하게 챙겨드려요.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" style={{ background: '#FF6B6B', borderRadius: '50px' }} onClick={() => navigate('/map')}>놀이방 식당 찾기</button>
            <button className="btn-ghost" style={{ borderColor: '#6BCB77', color: '#6BCB77', borderRadius: '50px' }} onClick={() => navigate('/blog')}>방문후기 보기</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num" style={{ color: '#FFD93D' }}>450<span>곳</span></div><div className="stat-label">예스키즈존</div></div>
          <div className="stat"><div className="stat-num" style={{ color: '#4D96FF' }}>12<span>명</span></div><div className="stat-label">친절맘 제보중</div></div>
        </div>
      </section>

      {/* ── LIVE STRIP: 생생한 육아 정보 ── */}
      <div className="live-strip" style={{ background: '#FFD93D', color: '#533E2D' }}>
        <div className="live-dot" style={{ background: '#FF6B6B' }} />
        <span className="live-label" style={{ fontWeight: '800' }}>실시간 소식</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => <span key={i} className="live-item" style={{ fontSize: '0.95rem' }}>{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">어떤 곳을 찾으시나요?</h2>
          <span className="section-more" style={{ color: '#FF6B6B' }} onClick={() => navigate('/map')}>전체 테마 보기 →</span>
        </div>
        <div className="cat-grid">
          {KIDS_CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')} style={{ borderRadius: '20px', border: '3px solid #FFF' }}>
              <img className="cat-img" src={cat.img} alt={cat.name} />
              <div className="cat-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(83,62,45,0.6))' }} />
              <span className="cat-name" style={{ fontWeight: '700' }}>{cat.name}</span>
              <span className="cat-count">{cat.count}곳의 놀이터</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS: 맘카페 추천 랭킹 ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">이번 주 인기 급상승 ✨</h2>
          <span className="section-more" onClick={() => navigate('/map')}>지도에서 보기 →</span>
        </div>
        <div className="picks-row">
          {KIDS_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} 
                 style={{ borderRadius: '20px', background: '#fff', border: p.featured ? '2px solid #FF6B6B' : '1px solid #eee' }}
                 onClick={() => navigate('/map')}>
              <div className="pick-rank" style={{ color: p.featured ? '#FF6B6B' : '#CCC' }}>{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
              <div className="pick-name" style={{ fontSize: '1.2rem', color: '#533E2D' }}>{p.name}</div>
              <div className="pick-cat" style={{ color: '#999' }}>{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: '#FFD93D' }}>{'★'.repeat(Math.round(p.rating))} {p.rating}</span>
                <span className="pick-dist" style={{ color: '#FF6B6B', fontWeight: 'bold' }}>{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 블로그 배너 ── */}
      <div className="map-banner" style={{ background: '#E8F9FD', color: '#533E2D', borderRadius: '30px' }} onClick={() => navigate('/blog')}>
        <div>
          <h3 className="map-banner-title">선배 맘/대디들의 찐 후기 →</h3>
          <p className="map-banner-sub">유모차 진입 가능여부, 아기 의자 위생 상태까지 꼼꼼 리뷰!</p>
        </div>
        <button className="btn-white" style={{ color: '#4D96FF', borderRadius: '20px' }} onClick={() => navigate('/blog')}>후기 보러가기</button>
      </div>

      {/* ── 지도 배너 ── */}
      <div className="map-banner" style={{ background: '#FF6B6B', marginTop: -12, borderRadius: '30px' }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title">지금 내 근처 '예스키즈존' 지도 열기 →</h3>
          <p className="map-banner-sub">기저귀 갈이대와 수유실이 있는 가장 가까운 식당을 바로 안내해요</p>
        </div>
        <button className="btn-white" style={{ color: '#FF6B6B', borderRadius: '20px' }} onClick={() => navigate('/map')}>지도 바로가기</button>
      </div>
    </div>
  )
}

export default KidsCarePage