// ============================================================
// KidsDiningPage.tsx — 키즈 & 패밀리 레스토랑 랜딩
// 구조 유지 / 컬러 & 이미지 & 문구만 변경
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

// ─── 페이지 카피 ──────────────────────────────────────────────
const PAGE_COPY = {
  heroLabel: '🧸 아이와 부모 모두 행복한 공간',
  heroTitleLine1: 'KIDS',
  heroTitleAccent: 'DINING',
  heroSubtitle:
    '놀이와 식사를 함께 즐기는 프리미엄 키즈 레스토랑.\n건강한 유아식과 안전한 놀이 공간을 한 번에 만나보세요.',
  ctaMap: '키즈 식당 찾기',
  ctaBlog: '육아 맛집 리뷰',
  statRestaurants: { value: '420', unit: '곳', label: '패밀리 식당' },
  statCarbon: { value: '85', unit: '%', label: '친환경 식재료' },
  sectionCategories: '테마별 키즈 레스토랑',
  sectionCategoriesMore: '전체 카테고리 보기 →',
  sectionPicks: '이번 주 인기 패밀리 맛집',
  sectionPicksMore: '전체 랭킹 →',
  bannerMagTitle: '우리 아이 건강 식단 가이드 →',
  bannerMagSub: '영양 균형을 고려한 유아식과 인기 키즈 메뉴를 소개합니다',
  bannerMagBtn: '가이드 보기',
  bannerMapTitle: '내 주변 키즈 프렌들리 식당 찾기 →',
  bannerMapSub: '수유실·놀이방·유아 의자까지 갖춘 가족 맞춤 식당을 추천합니다',
  bannerMapBtn: '지도 열기',
}

// ─── 카테고리 ────────────────────────────────────────────────
const CATEGORIES: CategoryItem[] = [
  {
    name: '놀이방 레스토랑',
    count: 58,
    img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
  },
  {
    name: '유아 건강식',
    count: 96,
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  },
  {
    name: '키즈 카페',
    count: 134,
    img: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=600&q=80',
  },
  {
    name: '패밀리 브런치',
    count: 76,
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80',
  },
  {
    name: '친환경 식당',
    count: 41,
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  },
  {
    name: '베이비 전용 메뉴',
    count: 88,
    img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&q=80',
  },
]

// ─── 인기 스팟 ───────────────────────────────────────────────
const TOP_PICKS: TopPickItem[] = [
  {
    rank: '01',
    name: '리틀 포레스트 키친',
    category: '유아 건강식 · 성동구',
    rating: 4.9,
    dist: '1.1km',
    tag: '놀이존',
    tagVariant: 'primary',
    featured: true,
  },
  {
    rank: '02',
    name: '베이비 브런치 하우스',
    category: '패밀리 브런치 · 송파구',
    rating: 4.8,
    dist: '850m',
    tag: '친환경',
    tagVariant: 'soft',
    featured: false,
  },
  {
    rank: '03',
    name: '키즈 테이블',
    category: '유아식 전문 · 강서구',
    rating: 4.7,
    dist: '2.0km',
    tag: '무첨가',
    tagVariant: 'warm',
    featured: false,
  },
]

// ─── LIVE 피드 ──────────────────────────────────────────────
const LIVE_FEED = [
  '김하린님이 리틀 포레스트 키친에 "아이가 정말 좋아했어요!" 리뷰를 남겼어요',
  '잠실 지역 키즈 브런치 레스토랑 4곳이 새롭게 등록되었습니다',
  '오늘 가장 인기 있는 키즈 메뉴는 "유기농 토마토 파스타" 입니다',
]

export default function KidsDiningPage() {
  const navigate = useNavigate()

  return (
    <div
      className="main-page theme-page"
      style={{
        background: '#FFF8F1',
        color: '#4A3428',
      }}
    >
      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        className="hero theme-hero"
        style={{
          background:
            'linear-gradient(135deg, #FFE7CC 0%, #FFF5E9 45%, #FFFDF8 100%)',
        }}
      >
        <div
          className="hero-grid"
          aria-hidden
          style={{ opacity: 0.05 }}
        />

        <div
          className="hero-circle"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle, rgba(255,180,120,0.35) 0%, transparent 70%)',
          }}
        />

        <div className="hero-bg" aria-hidden />

        <div className="hero-text">
          <div
            className="hero-label theme-hero-label"
            style={{
              color: '#FF8A4C',
              fontWeight: 700,
            }}
          >
            {PAGE_COPY.heroLabel}
          </div>

          <h1
            className="hero-title theme-hero-title"
            style={{
              color: '#3B2A22',
            }}
          >
            {PAGE_COPY.heroTitleLine1}
            <br />
            <span style={{ color: '#FFB347' }}>
              {PAGE_COPY.heroTitleAccent}
            </span>
          </h1>

          <p
            className="hero-subtitle theme-hero-subtitle"
            style={{
              color: '#7A6253',
              lineHeight: 1.8,
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
              className="btn-primary theme-primary"
              style={{
                background: '#FFB347',
                color: '#3B2A22',
                border: 'none',
              }}
              onClick={() => navigate('/map')}
            >
              {PAGE_COPY.ctaMap}
            </button>

            <button
              type="button"
              className="btn-ghost theme-ghost"
              style={{
                border: '1px solid #FFB347',
                color: '#5B4335',
                background: '#FFF7EF',
              }}
              onClick={() => navigate('/blog')}
            >
              {PAGE_COPY.ctaBlog}
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div
              className="stat-num"
              style={{ color: '#FF8A4C' }}
            >
              {PAGE_COPY.statRestaurants.value}
              <span>{PAGE_COPY.statRestaurants.unit}</span>
            </div>

            <div
              className="stat-label"
              style={{ color: '#7A6253' }}
            >
              {PAGE_COPY.statRestaurants.label}
            </div>
          </div>

          <div className="stat">
            <div
              className="stat-num"
              style={{ color: '#FFB347' }}
            >
              {PAGE_COPY.statCarbon.value}
              <span>{PAGE_COPY.statCarbon.unit}</span>
            </div>

            <div
              className="stat-label"
              style={{ color: '#7A6253' }}
            >
              {PAGE_COPY.statCarbon.label}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE STRIP ─────────────────────────────────────── */}
      <div
        className="live-strip theme-live"
        role="status"
        aria-live="polite"
        style={{
          background: '#FFF0DF',
          borderTop: '1px solid #FFD8B0',
          borderBottom: '1px solid #FFD8B0',
        }}
      >
        <div
          className="live-dot"
          aria-hidden
          style={{ background: '#FF9B54' }}
        />

        <span
          className="live-label"
          style={{
            color: '#FF8A4C',
            fontWeight: 700,
          }}
        >
          LIVE
        </span>

        <div className="live-items">
          {LIVE_FEED.map((msg, i) => (
            <span
              key={i}
              className="live-item"
              style={{ color: '#6E5547' }}
            >
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ─────────────────────────────────────── */}
      <section className="section">
        <div className="section-head">
          <h2
            className="section-title"
            style={{ color: '#4A3428' }}
          >
            {PAGE_COPY.sectionCategories}
          </h2>

          <button
            type="button"
            className="section-more"
            style={{ color: '#FF8A4C' }}
            onClick={() => navigate('/map')}
          >
            {PAGE_COPY.sectionCategoriesMore}
          </button>
        </div>

        <div className="cat-grid">
          {CATEGORIES.map((cat) => (
            <article
              key={cat.name}
              className="cat-card theme-cat-card"
              style={{
                background: '#FFFFFF',
                border: '1px solid #FFE0BF',
              }}
              onClick={() => navigate('/map')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/map')}
              role="button"
              tabIndex={0}
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
                    'linear-gradient(to bottom, transparent, rgba(60,40,20,0.75))',
                }}
              />

              <span
                className="cat-name"
                style={{ color: '#fff' }}
              >
                {cat.name}
              </span>

              <span
                className="cat-count"
                style={{ color: '#FFEAD7' }}
              >
                {cat.count}개의 장소
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS ──────────────────────────────────────── */}
      <section className="section section--tight">
        <div className="section-head">
          <h2
            className="section-title"
            style={{ color: '#4A3428' }}
          >
            {PAGE_COPY.sectionPicks}
          </h2>

          <button
            type="button"
            className="section-more"
            style={{ color: '#FF8A4C' }}
            onClick={() => navigate('/map')}
          >
            {PAGE_COPY.sectionPicksMore}
          </button>
        </div>

        <div className="picks-row">
          {TOP_PICKS.map((p) => (
            <article
              key={p.rank}
              className={`pick-card theme-pick-card ${
                p.featured ? 'featured' : ''
              }`}
              style={{
                background: '#FFFFFF',
                border: p.featured
                  ? '1px solid #FFB347'
                  : '1px solid #FFE5CA',
                boxShadow: '0 10px 25px rgba(255,170,90,0.08)',
              }}
              onClick={() => navigate('/Fpage')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/Fpage')}
              role="button"
              tabIndex={0}
            >
              <div
                className="pick-rank"
                style={{ color: '#FF8A4C' }}
              >
                {p.rank}
              </div>

              <span
                className={`pick-tag pick-tag--${p.tagVariant}`}
                style={{
                  background:
                    p.tagVariant === 'primary'
                      ? '#FFE0B5'
                      : p.tagVariant === 'soft'
                      ? '#FFF1DD'
                      : '#FFD6C2',
                  color: '#6B452C',
                }}
              >
                {p.tag}
              </span>

              <div
                className="pick-name"
                style={{
                  color: '#3B2A22',
                  fontWeight: 800,
                }}
              >
                {p.name}
              </div>

              <div
                className="pick-cat"
                style={{ color: '#7A6253' }}
              >
                {p.category}
              </div>

              <div className="pick-bottom">
                <span
                  className="pick-stars"
                  style={{ color: '#FFB347' }}
                >
                  {'★'.repeat(Math.round(p.rating))} {p.rating}
                </span>

                <span
                  className="pick-dist"
                  style={{ color: '#A06D4E' }}
                >
                  {p.dist}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 하단 배너 ───────────────────────────────────────── */}
      <div className="theme-banners">
        <div
          className="map-banner theme-banner theme-banner--soft"
          style={{
            background:
              'linear-gradient(135deg, #FFE7CC, #FFF5EA)',
            border: '1px solid #FFD7AE',
            color: '#4A3428',
          }}
          onClick={() => navigate('/blog')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/blog')}
          role="button"
          tabIndex={0}
        >
          <div>
            <h3 className="map-banner-title">
              {PAGE_COPY.bannerMagTitle}
            </h3>

            <p
              className="map-banner-sub"
              style={{ color: '#7A6253' }}
            >
              {PAGE_COPY.bannerMagSub}
            </p>
          </div>

          <button
            type="button"
            className="btn-white"
            style={{
              background: '#FFB347',
              color: '#3B2A22',
              border: 'none',
            }}
            onClick={(e) => {
              e.stopPropagation()
              navigate('/blog')
            }}
          >
            {PAGE_COPY.bannerMagBtn}
          </button>
        </div>

        <div
          className="map-banner theme-banner theme-banner--primary"
          style={{
            background:
              'linear-gradient(135deg, #FFB870, #FFA25B)',
            color: '#fff',
          }}
          onClick={() => navigate('/map')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/map')}
          role="button"
          tabIndex={0}
        >
          <div>
            <h3 className="map-banner-title">
              {PAGE_COPY.bannerMapTitle}
            </h3>

            <p
              className="map-banner-sub"
              style={{
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              {PAGE_COPY.bannerMapSub}
            </p>
          </div>

          <button
            type="button"
            className="btn-white"
            style={{
              background: '#FFF7EF',
              color: '#D46A1F',
              border: 'none',
            }}
            onClick={(e) => {
              e.stopPropagation()
              navigate('/map')
            }}
          >
            {PAGE_COPY.bannerMapBtn}
          </button>
        </div>
      </div>
    </div>
  )
}