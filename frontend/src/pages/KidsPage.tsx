import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

const KIDS_CATEGORIES = [
  { name: '대형 놀이방', count: 34, img: 'https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?w=600&q=80' },
  { name: '이유식 완비', count: 18, img: 'https://images.unsplash.com/photo-1596263576925-d90d63691097?w=600&q=80' },
  { name: '캐릭터 카페', count: 52, img: 'https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?w=600&q=80' },
  { name: '동물 체험 식당', count: 21, img: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=600&q=80' },
  { name: '정원 · 야외활동', count: 45, img: 'https://images.unsplash.com/photo-1502086223501-7ea2443d844d?w=600&q=80' },
  { name: '수유실 보유', count: 89, img: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=600&q=80' },
]

const KIDS_PICKS = [
  {
    rank: '01',
    name: '꼬마요정 숲속식당',
    category: '양식 · 송파구',
    rating: 4.9,
    dist: '놀이방 최고',
    tag: '강력추천',
    tagBg: '#FF6B6B',
    tagColor: '#fff',
    featured: true,
  },
  {
    rank: '02',
    name: '튼튼 베어 베이커리',
    category: '카페 · 용산구',
    rating: 4.8,
    dist: '유기농간식',
    tag: '인기폭발',
    tagBg: '#FFD166',
    tagColor: '#3A312B',
    featured: false,
  },
  {
    rank: '03',
    name: '둥둥 구름 파스타',
    category: '양식 · 종로구',
    rating: 4.7,
    dist: '색칠놀이제공',
    tag: '친절해요',
    tagBg: '#6BCB77',
    tagColor: '#fff',
    featured: false,
  },
]

const LIVE_FEED = [
  '지우맘님이 "꼬마요정 숲속식당"에서 생일파티 중이에요! 🎂',
  '지금 "튼튼 베어"에 아기 의자 여유분 3개 남아있어요 🪑',
  '민수파파님이 유모차 진입이 편한 식당 리스트를 공유했습니다!',
]

const KidsPage: React.FC<Props> = () => {
  const navigate = useNavigate()

  return (
    <div
      className="main-page"
      style={{
        backgroundColor: '#F4F6F8',
        color: '#2B2B2B',
        minHeight: '100vh',
      }}
    >
      {/* HERO */}
      <section
        className="hero"
        style={{
          background: 'linear-gradient(135deg, #FFF3E2 0%, #FFFFFF 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="hero-grid" style={{ opacity: 0.05 }} />

        <div
          className="hero-circle"
          style={{
            background:
              'radial-gradient(circle, rgba(255,214,102,0.5) 0%, transparent 70%)',
            opacity: 0.3,
          }}
        />

        <div className="hero-text">
          <div
            className="hero-label"
            style={{
              color: '#FF6B6B',
              fontWeight: '800',
            }}
          >
            🍭 우리 아이 첫 외식 나들이
          </div>

          <h1
            className="hero-title"
            style={{
              fontSize: '3.5rem',
              color: '#2D2A26',
              lineHeight: 0.95,
            }}
          >
            KIDS
            <br />
            <span style={{ color: '#FF6B6B' }}>EATS</span>
          </h1>

          <p
            className="hero-subtitle"
            style={{
              color: '#5E5A55',
              lineHeight: 1.8,
              marginTop: '18px',
              maxWidth: '560px',
            }}
          >
            눈치 보지 말고 즐겁게!
            <br />
            아이는 신나게 놀고 부모님은 편안하게 식사하세요.
            <br />
            유모차 진입로, 수유실 정보까지 꼼꼼하게 챙겨드려요.
          </p>

          <div className="hero-cta" style={{ marginTop: '28px' }}>
            <button
              className="btn-primary"
              style={{
                background: '#FF6B6B',
                borderRadius: '999px',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                padding: '14px 26px',
              }}
              onClick={() => navigate('/map')}
            >
              놀이방 식당 찾기
            </button>

            <button
              className="btn-ghost"
              style={{
                borderColor: '#6BCB77',
                color: '#2B2B2B',
                background: '#fff',
                borderRadius: '999px',
                marginLeft: '12px',
                fontWeight: 700,
                padding: '14px 26px',
              }}
              onClick={() => navigate('/blog')}
            >
              방문후기 보기
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div
              className="stat-num"
              style={{
                color: '#FFB703',
              }}
            >
              450<span>곳</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#5E5A55',
              }}
            >
              예스키즈존
            </div>
          </div>

          <div className="stat">
            <div
              className="stat-num"
              style={{
                color: '#4D96FF',
              }}
            >
              12<span>명</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#5E5A55',
              }}
            >
              친절맘 제보중
            </div>
          </div>
        </div>
      </section>

      {/* LIVE */}
      <div
        className="live-strip"
        style={{
          background: '#FFFFFF',
          color: '#2B2B2B',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div
          className="live-dot"
          style={{
            background: '#FF6B6B',
          }}
        />

        <span
          className="live-label"
          style={{
            fontWeight: '800',
            color: '#FF6B6B',
          }}
        >
          실시간 소식
        </span>

        <div className="live-items">
          {LIVE_FEED.map((msg, i) => (
            <span
              key={i}
              className="live-item"
              style={{
                fontSize: '0.95rem',
                color: '#4F4B46',
              }}
            >
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <section className="section">
        <div className="section-head">
          <h2
            className="section-title"
            style={{
              color: '#2D2A26',
            }}
          >
            어떤 곳을 찾으시나요?
          </h2>

          <span
            className="section-more"
            style={{
              color: '#FF6B6B',
              fontWeight: 700,
            }}
            onClick={() => navigate('/map')}
          >
            전체 테마 보기 →
          </span>
        </div>

        <div className="cat-grid">
          {KIDS_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="cat-card"
              onClick={() => navigate('/map')}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                background: '#fff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <img className="cat-img" src={cat.img} alt={cat.name} />

              <div
                className="cat-overlay"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(0,0,0,0.55))',
                }}
              />

              <span
                className="cat-name"
                style={{
                  fontWeight: '700',
                  color: '#fff',
                }}
              >
                {cat.name}
              </span>

              <span
                className="cat-count"
                style={{
                  color: '#F2F2F2',
                }}
              >
                {cat.count}곳의 놀이터
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PICKS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2
            className="section-title"
            style={{
              color: '#2D2A26',
            }}
          >
            이번 주 인기 급상승 ✨
          </h2>

          <span
            className="section-more"
            style={{
              color: '#FF6B6B',
            }}
            onClick={() => navigate('/map')}
          >
            지도에서 보기 →
          </span>
        </div>

        <div className="picks-row">
          {KIDS_PICKS.map((p, i) => (
            <div
              key={i}
              className={`pick-card ${p.featured ? 'featured' : ''}`}
              style={{
                borderRadius: '20px',
                background: '#fff',
                border: p.featured
                  ? '2px solid #FF6B6B'
                  : '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              }}
              onClick={() => navigate('/map')}
            >
              <div
                className="pick-rank"
                style={{
                  color: p.featured ? '#FF6B6B' : '#B0B0B0',
                }}
              >
                {p.rank}
              </div>

              <span
                className="pick-tag"
                style={{
                  background: p.tagBg,
                  color: p.tagColor,
                  fontWeight: 700,
                }}
              >
                {p.tag}
              </span>

              <div
                className="pick-name"
                style={{
                  fontSize: '1.2rem',
                  color: '#2D2A26',
                  fontWeight: 800,
                }}
              >
                {p.name}
              </div>

              <div
                className="pick-cat"
                style={{
                  color: '#777',
                }}
              >
                {p.category}
              </div>

              <div className="pick-bottom">
                <span
                  className="pick-stars"
                  style={{
                    color: '#FFB703',
                    fontWeight: 700,
                  }}
                >
                  {'★'.repeat(Math.round(p.rating))} {p.rating}
                </span>

                <span
                  className="pick-dist"
                  style={{
                    color: '#FF6B6B',
                    fontWeight: 'bold',
                  }}
                >
                  {p.dist}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG BANNER */}
      <div
        className="map-banner"
        style={{
          background: '#DFF4FF',
          color: '#2D2A26',
          borderRadius: '30px',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
        onClick={() => navigate('/blog')}
      >
        <div>
          <h3 className="map-banner-title">
            선배 맘/대디들의 찐 후기 →
          </h3>

          <p
            className="map-banner-sub"
            style={{
              color: '#333333',
            }}
          >
            유모차 진입 가능여부, 아기 의자 위생 상태까지 꼼꼼 리뷰!
          </p>
        </div>

        <button
          className="btn-white"
          style={{
            color: '#4D96FF',
            borderRadius: '20px',
            fontWeight: 700,
          }}
          onClick={() => navigate('/blog')}
        >
          후기 보러가기
        </button>
      </div>

      {/* MAP BANNER */}
      <div
        className="map-banner"
        style={{
          background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
          marginTop: -12,
          borderRadius: '30px',
          color: '#fff',
        }}
        onClick={() => navigate('/map')}
      >
        <div>
          <h3 className="map-banner-title">
            지금 내 근처 '예스키즈존' 지도 열기 →
          </h3>

          <p
            className="map-banner-sub"
            style={{
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            기저귀 갈이대와 수유실이 있는 가장 가까운 식당을 바로 안내해요
          </p>
        </div>

        <button
          className="btn-white"
          style={{
            color: '#FF6B6B',
            borderRadius: '20px',
            fontWeight: 700,
          }}
          onClick={() => navigate('/map')}
        >
          지도 바로가기
        </button>
      </div>
    </div>
  )
}

export default KidsPage