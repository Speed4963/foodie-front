// ============================================================
// MichelinPage.tsx — 미슐랭 가이드 테마 랜딩
// 구조 / 반응형 유지
// 수정 사항:
// 1. 미슐랭 컨셉 문구 변경
// 2. 미슐랭 분위기 이미지 변경
// 3. 고급 다이닝 컬러 테마 적용
// ============================================================

import { useNavigate } from 'react-router-dom'

// ─── 타입 ────────────────────────────────────────────────────
type PickTagVariant = 'primary' | 'soft' | 'warm'

interface CategoryItem {
  name: string
  count: number
  img: string
}

interface TopPickItem {
  rank: string
  name: string
  category: string
  rating: number
  dist: string
  tag: string
  tagVariant: PickTagVariant
  featured: boolean
}

// ─── 페이지 카피 ─────────────────────────────────────────────
const PAGE_COPY = {
  heroLabel: 'THE MICHELIN GUIDE SEOUL 2026',

  heroTitleLine1: 'MICHELIN',
  heroTitleAccent: 'DINING',

  heroSubtitle:
    '세계 최고의 미식 경험을 한곳에서.\n미슐랭 스타 레스토랑과 셰프들의 특별한 다이닝을 만나보세요.',

  ctaMap: '미슐랭 지도 보기',
  ctaBlog: '미식 칼럼 읽기',

  statRestaurants: {
    value: '65',
    unit: '곳',
    label: '스타 레스토랑',
  },

  statCarbon: {
    value: '124',
    unit: '곳',
    label: '빕 구르망',
  },

  sectionCategories: '가이드 카테고리',
  sectionCategoriesMore: '전체 가이드 보기 →',

  sectionPicks: 'WEEKLY MICHELIN PICKS',
  sectionPicksMore: '전체 랭킹 →',

  bannerMagTitle: '미슐랭 인스펙터 칼럼 읽기 →',

  bannerMagSub:
    '셰프 인터뷰부터 다이닝 철학까지, 미식가를 위한 깊이 있는 스토리를 만나보세요.',

  bannerMagBtn: '칼럼 보기',

  bannerMapTitle: '내 주변 미슐랭 레스토랑 찾기 →',

  bannerMapSub:
    '현재 위치를 기반으로 가장 가까운 스타 레스토랑과 빕 구르망 식당을 안내합니다.',

  bannerMapBtn: '지도 열기',
}

// ─── 카테고리 ────────────────────────────────────────────────
const CATEGORIES: CategoryItem[] = [
  {
    name: '3 STAR',
    count: 2,
    img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80',
  },

  {
    name: '2 STAR',
    count: 15,
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },

  {
    name: '1 STAR',
    count: 48,
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
  },

  {
    name: 'BIB GOURMAND',
    count: 124,
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
  },

  {
    name: 'GREEN STAR',
    count: 8,
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
  },

  {
    name: 'SELECTED',
    count: 186,
    img: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80',
  },
]

// ─── 인기 스팟 ───────────────────────────────────────────────
const TOP_PICKS: TopPickItem[] = [
  {
    rank: '01',
    name: '가온 (Gaon)',
    category: '한식 파인다이닝 · 강남구',
    rating: 5.0,
    dist: '3 STAR',
    tag: 'SIGNATURE',
    tagVariant: 'primary',
    featured: true,
  },

  {
    rank: '02',
    name: '밍글스 (Mingles)',
    category: '컨템포러리 · 강남구',
    rating: 4.9,
    dist: '2 STAR',
    tag: 'CREATIVE',
    tagVariant: 'soft',
    featured: false,
  },

  {
    rank: '03',
    name: '옥동식 (Okdongsik)',
    category: '빕 구르망 · 마포구',
    rating: 4.8,
    dist: 'BIB',
    tag: 'LOCAL',
    tagVariant: 'warm',
    featured: false,
  },
]

// ─── LIVE FEED ──────────────────────────────────────────────
const LIVE_FEED = [
  '미슐랭 서울 2026 신규 스타 레스토랑 3곳이 추가되었습니다',
  '밍글스의 디너 코스 예약이 이번 주 마감되었습니다',
  '가온 셰프 인터뷰가 미식 아카이브에 업로드되었습니다',
]

export default function MichelinPage() {
  const navigate = useNavigate()

  return (
    <div
      className="main-page theme-page"
      style={{
        background: '#0E1116',
        color: '#F8F5EF',
      }}
    >

      {/* HERO */}
      <section
        className="hero theme-hero"
        style={{
          background:
            'linear-gradient(180deg, #111827 0%, #0B0E13 100%)',
          borderBottom: '1px solid rgba(201,169,97,0.18)',
        }}
      >

        <div
          className="hero-grid"
          aria-hidden
          style={{
            opacity: 0.03,
          }}
        />

        <div
          className="hero-circle"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle, rgba(201,169,97,0.28) 0%, transparent 70%)',
          }}
        />

        <div
  className="hero-bg"
  aria-hidden={true}
  style={{
    backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.1)), url('/src/assets/Image/Copilot_20260519_114408.png')`,  // ← 여기
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
    height: 'auto',
    width: '100%',
  }}
/>

        <div className="hero-text">

          <div
            className="hero-label"
            style={{
              color: '#C9A961',
              letterSpacing: '2px',
              fontWeight: 700,
            }}
          >
            {PAGE_COPY.heroLabel}
          </div>

          <h1
            className="hero-title"
            style={{
              color: '#FFFFFF',
            }}
          >
            {PAGE_COPY.heroTitleLine1}
            <br />

            <span
              style={{
                color: '#C9A961',
              }}
            >
              {PAGE_COPY.heroTitleAccent}
            </span>
          </h1>

          <p
            className="hero-subtitle"
            style={{
              color: '#FFFFFF',
            }}
          >
            {PAGE_COPY.heroSubtitle.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="hero-cta">

            <button
              type="button"
              className="btn-primary"
              style={{
                background: '#C9A961',
                color: '#111827',
                border: 'none',
                fontWeight: 700,
              }}
              onClick={() => navigate('/map')}
            >
              {PAGE_COPY.ctaMap}
            </button>

            <button
              type="button"
              className="btn-ghost"
              style={{
                border: '1px solid #C9A961',
                color: '#F8F5EF',
                background: 'transparent',
              }}
              onClick={() => navigate('/blog')}
            >
              {PAGE_COPY.ctaBlog}
            </button>

          </div>
        </div>

        {/* STATS */}
        <div className="hero-stats">

          <div className="stat">

            <div
              className="stat-num"
              style={{
                color: '#D62828',
              }}
            >
              {PAGE_COPY.statRestaurants.value}
              <span>{PAGE_COPY.statRestaurants.unit}</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#BFB7AA',
              }}
            >
              {PAGE_COPY.statRestaurants.label}
            </div>

          </div>

          <div className="stat">

            <div
              className="stat-num"
              style={{
                color: '#C9A961',
              }}
            >
              {PAGE_COPY.statCarbon.value}
              <span>{PAGE_COPY.statCarbon.unit}</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#BFB7AA',
              }}
            >
              {PAGE_COPY.statCarbon.label}
            </div>

          </div>

        </div>
      </section>

      {/* LIVE */}
      <div
        className="live-strip"
        style={{
          background: '#131820',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >

        <div
          className="live-dot"
          aria-hidden
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
          GUIDE UPDATE
        </span>

        <div className="live-items">
          {LIVE_FEED.map((msg, i) => (
            <span
              key={i}
              className="live-item"
              style={{
                color: '#E5DED3',
              }}
            >
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="section">

        <div className="section-head">

          <h2
            className="section-title"
            style={{
              color: '#FFFFFF',
            }}
          >
            {PAGE_COPY.sectionCategories}
          </h2>

          <button
            type="button"
            className="section-more"
            style={{
              color: '#C9A961',
            }}
            onClick={() => navigate('/map')}
          >
            {PAGE_COPY.sectionCategoriesMore}
          </button>

        </div>

        <div className="cat-grid">

          {CATEGORIES.map((cat) => (
            <article
              key={cat.name}
              className="cat-card"
              onClick={() => navigate('/map')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/map')}
              role="button"
              tabIndex={0}
              style={{
                background: '#161B22',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >

              <img
                className="cat-img"
                src={cat.img}
                alt={cat.name}
                loading="lazy"
              />

              <div
                className="cat-overlay"
                aria-hidden
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(0,0,0,0.88))',
                }}
              />

              <span
                className="cat-name"
                style={{
                  color: '#FFFFFF',
                  fontWeight: 700,
                }}
              >
                {cat.name}
              </span>

              <span
                className="cat-count"
                style={{
                  color: '#D8CDB8',
                }}
              >
                {cat.count} Restaurants
              </span>

            </article>
          ))}

        </div>
      </section>

      {/* PICKS */}
      <section className="section section--tight">

        <div className="section-head">

          <h2
            className="section-title"
            style={{
              color: '#FFFFFF',
            }}
          >
            {PAGE_COPY.sectionPicks}
          </h2>

          <button
            type="button"
            className="section-more"
            style={{
              color: '#C9A961',
            }}
            onClick={() => navigate('/map')}
          >
            {PAGE_COPY.sectionPicksMore}
          </button>

        </div>

        <div className="picks-row">

          {TOP_PICKS.map((p) => (
            <article
              key={p.rank}
              className={`pick-card ${p.featured ? 'featured' : ''}`}
              onClick={() => navigate('/Fpage')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/Fpage')}
              role="button"
              tabIndex={0}
              style={{
                background: '#161B22',
                border: p.featured
                  ? '1px solid #C9A961'
                  : '1px solid rgba(255,255,255,0.05)',
              }}
            >

              <div
                className="pick-rank"
                style={{
                  color: '#C9A961',
                }}
              >
                {p.rank}
              </div>

              <span
                className={`pick-tag pick-tag--${p.tagVariant}`}
                style={{
                  background:
                    p.tagVariant === 'primary'
                      ? '#C9A961'
                      : p.tagVariant === 'soft'
                      ? '#1E293B'
                      : '#2A1B12',

                  color:
                    p.tagVariant === 'primary'
                      ? '#111827'
                      : p.tagVariant === 'soft'
                      ? '#D8CDB8'
                      : '#E8B36B',
                }}
              >
                {p.tag}
              </span>

              <div
                className="pick-name"
                style={{
                  color: '#FFFFFF',
                }}
              >
                {p.name}
              </div>

              <div
                className="pick-cat"
                style={{
                  color: '#BFB7AA',
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
                  {'★'.repeat(Math.round(p.rating))} {p.rating}
                </span>

                <span
                  className="pick-dist"
                  style={{
                    color: '#C9A961',
                    fontWeight: 700,
                  }}
                >
                  {p.dist}
                </span>

              </div>

            </article>
          ))}

        </div>
      </section>

      {/* BANNERS */}
      <div className="theme-banners">

        <div
          className="map-banner"
          style={{
            background:
              'linear-gradient(135deg, #1B2430, #111827)',
            border: '1px solid rgba(201,169,97,0.15)',
          }}
          onClick={() => navigate('/blog')}
          role="button"
          tabIndex={0}
        >

          <div>

            <h3
              className="map-banner-title"
              style={{
                color: '#FFFFFF',
              }}
            >
              {PAGE_COPY.bannerMagTitle}
            </h3>

            <p
              className="map-banner-sub"
              style={{
                color: '#D6D0C5',
              }}
            >
              {PAGE_COPY.bannerMagSub}
            </p>

          </div>

          <button
            type="button"
            className="btn-white"
            style={{
              background: '#C9A961',
              color: '#111827',
              border: 'none',
              fontWeight: 700,
            }}
          >
            {PAGE_COPY.bannerMagBtn}
          </button>

        </div>

        <div
          className="map-banner"
          style={{
            background:
              'linear-gradient(135deg, #7A1010, #A11212)',
          }}
          onClick={() => navigate('/map')}
          role="button"
          tabIndex={0}
        >

          <div>

            <h3
              className="map-banner-title"
              style={{
                color: '#FFFFFF',
              }}
            >
              {PAGE_COPY.bannerMapTitle}
            </h3>

            <p
              className="map-banner-sub"
              style={{
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              {PAGE_COPY.bannerMapSub}
            </p>

          </div>

          <button
            type="button"
            className="btn-white"
            style={{
              background: '#FFFFFF',
              color: '#A11212',
              border: 'none',
              fontWeight: 700,
            }}
          >
            {PAGE_COPY.bannerMapBtn}
          </button>

        </div>

      </div>
    </div>
  )
}