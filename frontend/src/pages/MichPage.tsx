import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

const MICHELIN_CATEGORIES = [
  { name: '3-Star', count: 2, img: 'https://images.unsplash.com/photo-1550966841-3ee4ad6c10d3?w=600&q=80' },
  { name: '2-Star', count: 15, img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
  { name: '1-Star', count: 48, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80' },
  { name: '빕 구르망', count: 124, img: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&q=80' },
  { name: '그린 스타', count: 8, img: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=600&q=80' },
  { name: '선별된 레스토랑', count: 186, img: 'https://images.unsplash.com/photo-1551632432-c735e97994ce?w=600&q=80' },
]

const MICHELIN_PICKS = [
  {
    rank: '01',
    name: '가온 (Gaon)',
    category: '한식 · 강남구',
    rating: 5.0,
    dist: '3-Star',
    tag: '최고의 요리',
    tagBg: '#C6A46C',
    tagColor: '#111827',
    featured: true,
  },
  {
    rank: '02',
    name: '밍글스 (Mingles)',
    category: '컨템포러리 · 강남구',
    rating: 4.9,
    dist: '2-Star',
    tag: '창의적',
    tagBg: '#2A3441',
    tagColor: '#C6A46C',
    featured: false,
  },
  {
    rank: '03',
    name: '옥동식 (Okdongsik)',
    category: '돼지국밥 · 마포구',
    rating: 4.7,
    dist: 'Bib Gourmand',
    tag: '가성비',
    tagBg: '#2A3441',
    tagColor: '#E7C98B',
    featured: false,
  },
]

const LIVE_FEED = [
  '정우성님이 "가온"의 테이스팅 코스에 ★5 리뷰를 남겼어요',
  '2026 서울 미슐랭 가이드에 신규 레스토랑 3곳이 추가되었습니다',
  '방금 "밍글스"의 이번 주말 예약이 마감되었습니다',
]

const MichPage: React.FC<Props> = () => {
  const navigate = useNavigate()

  return (
    <div
      className="main-page"
      style={{
        backgroundColor: '#0F1720',
        color: '#F5F1E8',
        minHeight: '100vh',
      }}
    >
      {/* HERO */}
      <section
        className="hero"
        style={{
          background: 'linear-gradient(180deg, #111827 0%, #0F1720 100%)',
          borderBottom: '1px solid rgba(198,164,108,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="hero-grid"
          style={{
            opacity: 0.04,
          }}
        />

        <div
          className="hero-circle"
          style={{
            background:
              'radial-gradient(circle, rgba(198,164,108,0.4) 0%, transparent 70%)',
            opacity: 0.2,
          }}
        />

        <div className="hero-text">
          <div
            className="hero-label"
            style={{
              color: '#D62828',
              fontWeight: '700',
              letterSpacing: '2px',
            }}
          >
            THE MICHELIN GUIDE 2026
          </div>

          <h1
            className="hero-title"
            style={{
              fontSize: '4rem',
              letterSpacing: '-2px',
              lineHeight: 0.95,
              marginTop: '12px',
            }}
          >
            GASTRO
            <br />
            <span style={{ color: '#C6A46C' }}>LUXE</span>
          </h1>

          <p
            className="hero-subtitle"
            style={{
              color: '#B8B2A7',
              maxWidth: '520px',
              lineHeight: 1.8,
              marginTop: '20px',
            }}
          >
            전 세계가 인정한 미식의 정점.
            <br />
            미슐랭 가이드가 선정한 서울 최고의 레스토랑을
            <br />
            한눈에 확인하고 예약하세요.
          </p>

          <div className="hero-cta" style={{ marginTop: '32px' }}>
            <button
              className="btn-primary"
              style={{
                background: '#C6A46C',
                color: '#111827',
                borderRadius: '2px',
                border: 'none',
                fontWeight: 700,
                padding: '14px 28px',
              }}
              onClick={() => navigate('/map')}
            >
              스타 식당 찾기
            </button>

            <button
              className="btn-ghost"
              style={{
                border: '1px solid #C6A46C',
                color: '#F5F1E8',
                background: 'transparent',
                borderRadius: '2px',
                padding: '14px 28px',
                marginLeft: '12px',
              }}
              onClick={() => navigate('/blog')}
            >
              미식 칼럼 읽기
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div
              className="stat-num"
              style={{
                color: '#D62828',
              }}
            >
              65<span>곳</span>
            </div>
            <div
              className="stat-label"
              style={{
                color: '#B8B2A7',
              }}
            >
              스타 레스토랑
            </div>
          </div>

          <div className="stat">
            <div
              className="stat-num"
              style={{
                color: '#C6A46C',
              }}
            >
              124<span>곳</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#B8B2A7',
              }}
            >
              빕 구르망
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STRIP */}
      <div
        className="live-strip"
        style={{
          background: '#111827',
          color: '#F5F1E8',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="live-dot"
          style={{
            background: '#D62828',
          }}
        />

        <span
          className="live-label"
          style={{
            color: '#D62828',
            fontWeight: 700,
          }}
        >
          UPDATE
        </span>

        <div className="live-items">
          {LIVE_FEED.map((msg, i) => (
            <span
              key={i}
              className="live-item"
              style={{
                fontSize: '0.92rem',
                color: '#E5E0D8',
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
              color: '#F5F1E8',
            }}
          >
            가이드 등급별
          </h2>

          <span
            className="section-more"
            style={{
              color: '#C6A46C',
            }}
            onClick={() => navigate('/map')}
          >
            가이드 전문 보기 →
          </span>
        </div>

        <div className="cat-grid">
          {MICHELIN_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="cat-card"
              onClick={() => navigate('/map')}
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                background: '#18212B',
              }}
            >
              <img className="cat-img" src={cat.img} alt={cat.name} />

              <div
                className="cat-overlay"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(0,0,0,0.82))',
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
                  color: '#D4CEC3',
                }}
              >
                {cat.count} Locations
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PICKS */}
      <section
        className="section"
        style={{
          paddingTop: 0,
        }}
      >
        <div className="section-head">
          <h2
            className="section-title"
            style={{
              color: '#F5F1E8',
            }}
          >
            WEEKLY SELECTION
          </h2>

          <span
            className="section-more"
            style={{
              color: '#C6A46C',
            }}
            onClick={() => navigate('/map')}
          >
            전체 리스트 →
          </span>
        </div>

        <div className="picks-row">
          {MICHELIN_PICKS.map((p, i) => (
            <div
              key={i}
              className={`pick-card ${p.featured ? 'featured' : ''}`}
              style={{
                background: '#18212B',
                border: p.featured
                  ? '1px solid #C6A46C'
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                borderRadius: '8px',
              }}
              onClick={() => navigate('/map')}
            >
              <div
                className="pick-rank"
                style={{
                  color: '#C6A46C',
                }}
              >
                {p.rank}
              </div>

              <span
                className="pick-tag"
                style={{
                  background: p.tagBg,
                  color: p.tagColor,
                  borderRadius: '3px',
                  padding: '6px 10px',
                  fontWeight: 700,
                }}
              >
                {p.tag}
              </span>

              <div
                className="pick-name"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  color: '#F5F1E8',
                }}
              >
                {p.name}
              </div>

              <div
                className="pick-cat"
                style={{
                  color: '#B8B2A7',
                }}
              >
                {p.category}
              </div>

              <div className="pick-bottom">
                <span
                  className="pick-stars"
                  style={{
                    color: '#D62828',
                  }}
                >
                  {'★'.repeat(Math.round(p.rating))}
                </span>

                <span
                  className="pick-dist"
                  style={{
                    fontWeight: '600',
                    color: '#C6A46C',
                  }}
                >
                  {p.dist}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER 1 */}
      <div
        className="map-banner"
        style={{
          background: 'linear-gradient(135deg, #1F2937, #111827)',
          color: '#F5F1E8',
          border: '1px solid rgba(198,164,108,0.2)',
          borderRadius: '6px',
        }}
        onClick={() => navigate('/blog')}
      >
        <div>
          <h3
            className="map-banner-title"
            style={{
              color: '#F5F1E8',
            }}
          >
            인스펙터의 미식 평론 읽기 →
          </h3>

          <p
            className="map-banner-sub"
            style={{
              color: '#D2CCC2',
            }}
          >
            익명의 미슐랭 조사관들이 남긴 상세한 요리평과 레스토랑 분위기
          </p>
        </div>

        <button
          className="btn-white"
          style={{
            color: '#111827',
            background: '#C6A46C',
            borderRadius: '2px',
            border: 'none',
            fontWeight: 700,
          }}
          onClick={() => navigate('/blog')}
        >
          아카이브 보기
        </button>
      </div>

      {/* BANNER 2 */}
      <div
        className="map-banner"
        style={{
          background: 'linear-gradient(135deg, #7F1D1D, #991B1B)',
          marginTop: -12,
          borderRadius: '6px',
          color: '#fff',
        }}
        onClick={() => navigate('/map')}
      >
        <div>
          <h3 className="map-banner-title">
            미슐랭 가이드 공식 지도 열기 →
          </h3>

          <p
            className="map-banner-sub"
            style={{
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            내 근처의 빕 구르망부터 3스타 레스토랑까지 실시간 경로 안내
          </p>
        </div>

        <button
          className="btn-white"
          style={{
            color: '#991B1B',
            borderRadius: '2px',
            border: 'none',
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

export default MichPage