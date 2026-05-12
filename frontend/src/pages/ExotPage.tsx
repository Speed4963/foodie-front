import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

// 🌎 세계 각국의 이국적인 요리 카테고리
const WORLD_CATEGORIES = [
  { name: '멕시칸 · 타코',    count: 42,  img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80' },
  { name: '중동 · 팔라펠',    count: 15,  img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80' },
  { name: '베트남 · 분짜',    count: 128, img: 'https://images.unsplash.com/photo-1503764654157-72d979d9af73?w=600&q=80' },
  { name: '태국 · 똠양꿍',    count: 76,  img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
  { name: '인도 · 커리',      count: 54,  img: 'https://images.unsplash.com/photo-1585937421612-70a0f2455f75?w=600&q=80' },
  { name: '스페인 · 빠에야',  count: 31,  img: 'https://images.unsplash.com/photo-1534080564677-6eec0fd21457?w=600&q=80' },
]

// ✈️ 이번 주 가장 핫한 글로벌 맛집 TOP PICK
const GLOBAL_PICKS = [
  { rank: '01', name: '엘 피노 323',      category: '멕시칸 · 용산구',   rating: 4.9, dist: '이국적 분위기', tag: '현지의맛', tagBg: '#006341', tagColor: '#fff', featured: true },
  { rank: '02', name: '페트라 (Petra)',    category: '중동요리 · 용산구',  rating: 4.8, dist: '이태원역 근처', tag: '비건옵션', tagBg: '#F4A460', tagColor: '#fff', featured: false },
  { rank: '03', name: '소이연남',          category: '태국요리 · 마포구',  rating: 4.7, dist: '웨이팅맛집',   tag: '웨이팅필수', tagBg: '#FFF7E0', tagColor: '#B7791F', featured: false },
]

// 🛰 실시간 고메 피드
const LIVE_FEED = [
  '박서윤님이 "엘 피노 323"의 오리지널 타코에 ★5 리뷰를 남겼어요',
  '지금 연남동 "태국 골목"에 신규 맛집 3곳이 오픈했어요 🍜',
  '이정우님이 스페인 빠에야 맛집 "세비야 식당" 방문 인증!',
]

const GlobalGourmetPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page" style={{ backgroundColor: '#f9f7f2' }}>
      {/* ── HERO: 미식 여행의 설렘 ── */}
      <section className="hero" style={{ background: 'linear-gradient(to right, #1a1a1a, #333)' }}>
        <div className="hero-grid" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.1 }} />
        <div className="hero-circle" style={{ background: '#E8272A', opacity: 0.1, filter: 'blur(100px)' }} />
        <div className="hero-text">
          <div className="hero-label" style={{ color: '#FFD700', border: '1px solid #FFD700' }}>📍 서울에서 즐기는 세계 일주</div>
          <h1 className="hero-title" style={{ color: '#fff' }}>GLOBAL<br /><span>GOURMET</span></h1>
          <p className="hero-subtitle" style={{ color: '#ccc' }}>
            비행기 티켓 없이 떠나는 미식 여행. 이태원의 향신료 가득한 중동 요리부터<br />
            연남동의 정통 타이 푸드까지, 숨겨진 이국적 맛집을 찾아보세요.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" style={{ background: '#E8272A' }} onClick={() => navigate('/map')}>이국적 맛집 지도</button>
            <button className="btn-ghost" style={{ color: '#fff', borderColor: '#fff' }} onClick={() => navigate('/blog')}>미식가 컬럼 보기</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num" style={{ color: '#FFD700' }}>32<span>개국</span></div><div className="stat-label">다양한 요리</div></div>
          <div className="stat"><div className="stat-num">850<span>곳</span></div><div className="stat-label">엄선된 레스토랑</div></div>
        </div>
      </section>

      {/* ── LIVE STRIP ── */}
      <div className="live-strip" style={{ background: '#1a1a1a', borderTop: '1px solid #333' }}>
        <div className="live-dot" style={{ background: '#FFD700' }} />
        <span className="live-label" style={{ color: '#FFD700' }}>실시간 탐방</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => <span key={i} className="live-item" style={{ color: '#eee' }}>{msg}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">국가별 미식 탐험</h2>
          <span className="section-more" onClick={() => navigate('/map')}>전체 국가 보기 →</span>
        </div>
        <div className="cat-grid">
          {WORLD_CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate('/map')} style={{ borderRadius: '4px' }}>
              <img className="cat-img" src={cat.img} alt={cat.name} />
              <div className="cat-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))' }} />
              <span className="cat-name" style={{ letterSpacing: '1px' }}>{cat.name}</span>
              <span className="cat-count">{cat.count}개의 명소</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">이번 주 추천 현지인 맛집</h2>
          <span className="section-more" onClick={() => navigate('/map')}>전체 랭킹 보기 →</span>
        </div>
        <div className="picks-row">
          {GLOBAL_PICKS.map((p, i) => (
            <div key={i} className={`pick-card ${p.featured ? 'featured' : ''}`} onClick={() => navigate('/map')} style={{ background: '#fff' }}>
              <div className="pick-rank" style={{ color: p.featured ? '#E8272A' : '#ddd' }}>{p.rank}</div>
              <span className="pick-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
              <div className="pick-name" style={{ color: '#1a1a1a', fontWeight: '800' }}>{p.name}</div>
              <div className="pick-cat">{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: '#FFD700' }}>{'★'.repeat(Math.round(p.rating))} {p.rating}</span>
                <span className="pick-dist" style={{ fontWeight: '600' }}>{p.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 컬럼 배너 ── */}
      <div className="map-banner" style={{ background: '#2c3e50', cursor: 'pointer' }} onClick={() => navigate('/blog')}>
        <div>
          <h3 className="map-banner-title">월드 고메 다이어리 읽기 →</h3>
          <p className="map-banner-sub">숨겨진 로컬 맛집부터 주방장님이 들려주는 요리 이야기까지</p>
        </div>
        <button className="btn-white" style={{ color: '#2c3e50' }} onClick={() => navigate('/blog')}>컬럼 읽기</button>
      </div>

      {/* ── 지도 배너 ── */}
      <div className="map-banner" style={{ background: '#E8272A', marginTop: -12 }} onClick={() => navigate('/map')}>
        <div>
          <h3 className="map-banner-title">내 주변 글로벌 맛집 지도 열기 →</h3>
          <p className="map-banner-sub">가장 가까운 곳에서 만날 수 있는 이국적인 저녁 식사를 안내합니다</p>
        </div>
        <button className="btn-white" style={{ color: '#E8272A' }} onClick={() => navigate('/map')}>지도 확인</button>
      </div>
    </div>
  )
}

export default GlobalGourmetPage