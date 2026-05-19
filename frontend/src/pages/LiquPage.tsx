// ============================================================
// LiquorWorldPage.tsx — 세계 주류 셀렉트샵 테마 랜딩
// 구조 / 반응형 유지
// 수정 사항:
// 1. 세계 주류 컨셉 문구 변경
// 2. 위스키 · 와인 · 사케 이미지 변경
// 3. 고급 바 & 라운지 컬러 테마 적용
// ============================================================

import { useNavigate } from 'react-router-dom'
import sakeImg from '../assets/Image/5558721-rice-wine-8550095_1920.jpg';
import whiskeyImg from '../assets/Image/detonart-whiskey-3874925_1920.jpg';
import ginImg from '../assets/Image/cocktailtime-gin-tonic-4468653.jpg';

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
  heroLabel: 'WORLD PREMIUM LIQUOR COLLECTION',

  heroTitleLine1: 'LIQUOR',
  heroTitleAccent: 'ATLAS',

  heroSubtitle:
    '세계 각국을 대표하는 프리미엄 주류를 한곳에서.\n위스키, 와인, 사케, 럼 그리고 희귀 한정판 컬렉션을 만나보세요.',

  ctaMap: '주류 매장 보기',
  ctaBlog: '테이스팅 가이드',

  statRestaurants: {
    value: '320',
    unit: '종',
    label: '프리미엄 주류',
  },

  statCarbon: {
    value: '48',
    unit: '개국',
    label: '수입 국가',
  },

  sectionCategories: '주류 카테고리',
  sectionCategoriesMore: '전체 컬렉션 보기 →',

  sectionPicks: '이번 주 인기 셀렉션',
  sectionPicksMore: '전체 랭킹 →',

  bannerMagTitle: '마스터 바텐더 추천 컬렉션 →',

  bannerMagSub:
    '싱글몰트부터 빈티지 와인까지, 전문가가 추천하는 최고의 한 병.',

  bannerMagBtn: '추천 보기',

  bannerMapTitle: '내 주변 프리미엄 바 & 주류샵 찾기 →',

  bannerMapSub:
    '현재 위치 기반으로 위스키 바와 와인 셀러를 빠르게 탐색해보세요.',

  bannerMapBtn: '지도 열기',
}

// ─── 카테고리 ────────────────────────────────────────────────
const CATEGORIES: CategoryItem[] = [
  {
    name: '싱글 몰트 위스키',
    count: 86,
    img: whiskeyImg,
  },

  {
    name: '프리미엄 와인',
    count: 142,
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
  },

  {
    name: '일본 사케',
    count: 58,
    img: sakeImg,
  },

  {
    name: '크래프트 진',
    count: 37,
    img: ginImg,
  },

  {
    name: '프리미엄 럼',
    count: 44,
    img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80',
  },

  {
    name: '한정판 컬렉션',
    count: 19,
    img: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=80',
  },
]

// ─── 인기 셀렉션 ─────────────────────────────────────────────
const TOP_PICKS: TopPickItem[] = [
  {
    rank: '01',
    name: '맥캘란 18년',
    category: '싱글몰트 위스키 · 스코틀랜드',
    rating: 5.0,
    dist: 'LIMITED',
    tag: 'BEST',
    tagVariant: 'primary',
    featured: true,
  },

  {
    rank: '02',
    name: '돔 페리뇽 빈티지',
    category: '샴페인 · 프랑스',
    rating: 4.9,
    dist: 'PREMIUM',
    tag: 'VINTAGE',
    tagVariant: 'soft',
    featured: false,
  },

  {
    rank: '03',
    name: '닷사이 23',
    category: '준마이 다이긴죠 · 일본',
    rating: 4.8,
    dist: 'SAKE',
    tag: 'RARE',
    tagVariant: 'warm',
    featured: false,
  },
]

// ─── LIVE FEED ──────────────────────────────────────────────
const LIVE_FEED = [
  '한정판 야마자키 18년이 신규 입고되었습니다',
  '프랑스 보르도 와인 컬렉션 예약 판매가 시작되었습니다',
  '강남 프리미엄 위스키 바 TOP10 리스트가 업데이트되었습니다',
]

export default function LiquorWorldPage() {
  const navigate = useNavigate()

  return (
    <div
      className="main-page theme-page"
      style={{
        background: '#0B0B0F',
        color: '#F5EFE6',
      }}
    >

      {/* HERO */}
      <section
        className="hero theme-hero"
        style={{
          background:
            'linear-gradient(180deg, #16111A 0%, #0B0B0F 100%)',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
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
              'radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 70%)',
          }}
        />

        <div
  className="hero-bg"
  aria-hidden={true}
  style={{
    backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.1)), url('/src/assets/Image/Copilot_20260519_114958.png')`,  // ← 여기
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
              color: '#D4AF37',
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
                color: '#D4AF37',
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
                background: '#D4AF37',
                color: '#111111',
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
                border: '1px solid #D4AF37',
                color: '#F5EFE6',
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
                color: '#C58B2A',
              }}
            >
              {PAGE_COPY.statRestaurants.value}
              <span>{PAGE_COPY.statRestaurants.unit}</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#B8ADA1',
              }}
            >
              {PAGE_COPY.statRestaurants.label}
            </div>

          </div>

          <div className="stat">

            <div
              className="stat-num"
              style={{
                color: '#D4AF37',
              }}
            >
              {PAGE_COPY.statCarbon.value}
              <span>{PAGE_COPY.statCarbon.unit}</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#B8ADA1',
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
          background: '#121217',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >

        <div
          className="live-dot"
          aria-hidden
          style={{
            background: '#D4AF37',
          }}
        />

        <span
          className="live-label"
          style={{
            color: '#D4AF37',
            fontWeight: 700,
          }}
        >
          NEW ARRIVAL
        </span>

        <div className="live-items">
          {LIVE_FEED.map((msg, i) => (
            <span
              key={i}
              className="live-item"
              style={{
                color: '#E4DDD4',
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
              color: '#D4AF37',
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
                background: '#17171D',
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
                }}
              >
                {cat.name}
              </span>

              <span
                className="cat-count"
                style={{
                  color: '#D8C7A0',
                }}
              >
                {cat.count} Collections
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
              color: '#D4AF37',
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
                background: '#17171D',
                border: p.featured
                  ? '1px solid #D4AF37'
                  : '1px solid rgba(255,255,255,0.05)',
              }}
            >

              <div
                className="pick-rank"
                style={{
                  color: '#D4AF37',
                }}
              >
                {p.rank}
              </div>

              <span
                className={`pick-tag pick-tag--${p.tagVariant}`}
                style={{
                  background:
                    p.tagVariant === 'primary'
                      ? '#D4AF37'
                      : p.tagVariant === 'soft'
                      ? '#2A2133'
                      : '#3B2415',

                  color:
                    p.tagVariant === 'primary'
                      ? '#111111'
                      : p.tagVariant === 'soft'
                      ? '#D8C7A0'
                      : '#F0B97A',
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
                  color: '#BFB4A8',
                }}
              >
                {p.category}
              </div>

              <div className="pick-bottom">

                <span
                  className="pick-stars"
                  style={{
                    color: '#D4AF37',
                  }}
                >
                  {'★'.repeat(Math.round(p.rating))} {p.rating}
                </span>

                <span
                  className="pick-dist"
                  style={{
                    color: '#E0C36A',
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
              'linear-gradient(135deg, #1D1823, #131117)',
            border: '1px solid rgba(212,175,55,0.15)',
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
                color: '#D5CCC0',
              }}
            >
              {PAGE_COPY.bannerMagSub}
            </p>

          </div>

          <button
            type="button"
            className="btn-white"
            style={{
              background: '#D4AF37',
              color: '#111111',
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
              'linear-gradient(135deg, #3B1F12, #24120C)',
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
              color: '#3B1F12',
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