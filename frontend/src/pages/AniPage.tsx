// ============================================================
// AniPage.tsx — 반려동물 동반 출입 가능 식당 테마 랜딩
// 구조·반응형 유지 / 이미지·글자·컬러만 변경
// ============================================================

import { useNavigate } from 'react-router-dom'
import dogImg from '../assets/Image/ciaorioris-dog-8805286-1920.jpg';
import dogcakeImg from '../assets/Image/helpinghounds-birthday-8632723_1920.jpg';

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
  heroLabel: '🐾 반려동물과 함께하는 특별한 한 끼',
  heroTitleLine1: 'PET',
  heroTitleAccent: 'DINING',

  heroSubtitle:
    '우리 아이도 손님입니다.\n놀이·훈련·먹이·간식까지 갖춘 펫프렌들리 식당을 한눈에.',

  ctaMap: '펫 식당 지도 보기',
  ctaBlog: '방문 후기 읽기',

  statRestaurants: {
    value: '840',
    unit: '곳',
    label: '동반 가능 식당',
  },

  statCarbon: {
    value: '56',
    unit: '개',
    label: '전용 메뉴 보유',
  },

  sectionCategories: '테마별 펫프렌들리 공간',
  sectionCategoriesMore: '모든 공간 보기 →',

  sectionPicks: '이번 주 인기 펫 다이닝',
  sectionPicksMore: '전체 랭킹 →',

  bannerMagTitle: '펫 다이닝 매거진 탐험 →',

  bannerMagSub:
    '강아지 전용 메뉴부터 고양이 카페, 운동장까지 — 선배 펫엄빠들의 찐 리뷰.',

  bannerMagBtn: '리뷰 보러가기',

  bannerMapTitle: '내 주변 반려동물 동반 식당 찾기 →',

  bannerMapSub:
    '실시간 위치 기반으로 동반 가능 식당과 펫 전용 좌석 여부를 바로 확인하세요.',

  bannerMapBtn: '지도 열기',
}

// ─── 카테고리 ────────────────────────────────────────────────
const CATEGORIES: CategoryItem[] = [
  {
    name: '강아지 전용 메뉴',
    count: 42,
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80',
  },
  {
    name: '천연잔디 운동장',
    count: 28,
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
  },
  {
    name: '멍푸치노 카페',
    count: 156,
    img: dogImg,
  },
  {
    name: '훈련·교육 프로그램',
    count: 19,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
  },
  {
    name: '고양이 동반존',
    count: 12,
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80',
  },
  {
    name: '펫 간식 & 케이크',
    count: 34,
    img: dogcakeImg,
  },
]

// ─── 인기 스팟 ───────────────────────────────────────────────
const TOP_PICKS: TopPickItem[] = [
  {
    rank: '01',
    name: '스테이 위드 미',
    category: '펫 다이닝 · 용산구',
    rating: 4.9,
    dist: '1.2km',
    tag: '전용메뉴',
    tagVariant: 'primary',
    featured: true,
  },
  {
    rank: '02',
    name: '초록뜰 가든',
    category: '바베큐 · 남양주',
    dist: '1,000평 운동장',
    rating: 4.8,
    tag: '대형견OK',
    tagVariant: 'soft',
    featured: false,
  },
  {
    rank: '03',
    name: '멍카페 연남',
    category: '카페 · 마포구',
    rating: 4.7,
    dist: '포토존 맛집',
    tag: '멍푸치노',
    tagVariant: 'warm',
    featured: false,
  },
]

// ─── LIVE FEED ──────────────────────────────────────────────
const LIVE_FEED = [
  '초코맘님이 "스테이 위드 미"에서 멍스테이크 먹방 인증! 🥩',
  '연남동 "멍카페"에 귀여운 리트리버 친구들이 모여있어요 🐕',
  '김하늘님이 남양주 "초록뜰 가든" 실시간 예약 완료!',
]

export default function AniPage() {
  const navigate = useNavigate()

  // ── 컬러 토큰 ────────────────────────────────────────────
  const accent   = '#FF8E2B'   // 따뜻한 오렌지 — 주 강조색
  const accentSub= '#4CAF82'   // 초록 — 보조 강조색
  const pageBg   = '#FFF8F2'   // 크림 배경
  const heroBg1  = '#FFF3E8'
  const heroBg2  = '#FFFFFF'
  const darkBg   = '#3A2410'   // 배너 다크

  return (
    <div
      className="main-page theme-page"
      style={{ background: pageBg, color: '#3A2410' }}
    >

      {/* ── HERO ── */}
      <section
        className="hero theme-hero"
        style={{
          background: `linear-gradient(180deg, ${heroBg1} 0%, ${heroBg2} 100%)`,
          borderBottom: `1px solid rgba(255,142,43,0.15)`,
        }}
      >
        <div className="hero-grid" aria-hidden style={{ opacity: 0.04 }} />

        <div
          className="hero-circle"
          aria-hidden
          style={{
            background: `radial-gradient(circle, rgba(255,142,43,0.28) 0%, transparent 70%)`,
          }}
        />

        <div
          className="hero-bg"
          aria-hidden={true}
          style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('/src/assets/Image/Copilot_20260519_135952.png')`,  // ← 여기
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
            style={{ color: accent, letterSpacing: '2px', fontWeight: 800 }}
          >
            {PAGE_COPY.heroLabel}
          </div>

          <h1 className="hero-title" style={{ color: darkBg }}>
            {PAGE_COPY.heroTitleLine1}
            <br />
            <span style={{ color: accent }}>{PAGE_COPY.heroTitleAccent}</span>
          </h1>

          <p className="hero-subtitle" style={{ color: '#FFFFFF' }}>
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
              style={{ background: accent, color: '#FFFFFF', border: 'none' }}
              onClick={() => navigate('/map?theme=ani')}
            >
              {PAGE_COPY.ctaMap}
            </button>

            <button
              type="button"
              className="btn-ghost"
              style={{ border: `1px solid ${accent}`, color: accent, background: 'transparent' }}
              onClick={() => navigate('/blog?theme=ani')}
            >
              {PAGE_COPY.ctaBlog}
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num" style={{ color: accent }}>
              {PAGE_COPY.statRestaurants.value}
              <span>{PAGE_COPY.statRestaurants.unit}</span>
            </div>
            <div className="stat-label" style={{ color: '#8B6A52' }}>
              {PAGE_COPY.statRestaurants.label}
            </div>
          </div>

          <div className="stat">
            <div className="stat-num" style={{ color: accentSub }}>
              {PAGE_COPY.statCarbon.value}
              <span>{PAGE_COPY.statCarbon.unit}</span>
            </div>
            <div className="stat-label" style={{ color: '#8B6A52' }}>
              {PAGE_COPY.statCarbon.label}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE STRIP ── */}
      <div
        className="live-strip"
        style={{
          background: accent,
          borderTop: `1px solid rgba(255,142,43,0.2)`,
          borderBottom: `1px solid rgba(255,142,43,0.2)`,
        }}
      >
        <div className="live-dot" aria-hidden style={{ background: '#fff' }} />
        <span className="live-label" style={{ color: '#fff' }}>실시간 펫 피드</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => (
            <span key={i} className="live-item" style={{ color: '#fff' }}>
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title" style={{ color: darkBg }}>
            {PAGE_COPY.sectionCategories}
          </h2>
          <button
            type="button"
            className="section-more"
            style={{ color: accent }}
            onClick={() => navigate('/map?theme=ani')}
          >
            {PAGE_COPY.sectionCategoriesMore}
          </button>
        </div>

        <div className="cat-grid">
          {CATEGORIES.map((cat) => (
            <article
              key={cat.name}
              className="cat-card"
              onClick={() => navigate('/map?theme=ani')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/map?theme=ani')}
              role="button"
              tabIndex={0}
              style={{
                border: `1px solid rgba(255,142,43,0.12)`,
                background: '#FFF3E8',
                borderRadius: '20px',
              }}
            >
              <img className="cat-img" src={cat.img} alt={cat.name} loading="lazy" />

              <div
                className="cat-overlay"
                aria-hidden
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(58,36,16,0.78))',
                }}
              />

              <span className="cat-name" style={{ color: '#FFFFFF' }}>
                {cat.name}
              </span>

              <span className="cat-count" style={{ color: '#FFD8A8', background: 'rgba(255,142,43,0.75)' }}>
                {cat.count}개의 공간
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ── TOP PICKS ── */}
      <section className="section section--tight">
        <div className="section-head">
          <h2 className="section-title" style={{ color: darkBg }}>
            {PAGE_COPY.sectionPicks}
          </h2>
          <button
            type="button"
            className="section-more"
            style={{ color: accent }}
            onClick={() => navigate('/map?theme=ani')}
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
                background: p.featured ? darkBg : '#FFFFFF',
                border: p.featured
                  ? `1px solid ${accent}`
                  : '1px solid rgba(58,36,16,0.10)',
              }}
            >
              <div className="pick-rank" style={{ color: p.featured ? accent : '#D4B99A' }}>
                {p.rank}
              </div>

              <span
                className={`pick-tag pick-tag--${p.tagVariant}`}
                style={{
                  background:
                    p.tagVariant === 'primary'
                      ? accent
                      : p.tagVariant === 'soft'
                      ? '#E8F5EE'
                      : '#FFF3E0',
                  color:
                    p.tagVariant === 'primary'
                      ? '#FFFFFF'
                      : p.tagVariant === 'soft'
                      ? accentSub
                      : '#B76B00',
                }}
              >
                {p.tag}
              </span>

              <div className="pick-name" style={{ color: p.featured ? '#FFFFFF' : darkBg }}>
                {p.name}
              </div>

              <div className="pick-cat" style={{ color: p.featured ? '#C8A882' : '#8B6A52' }}>
                {p.category}
              </div>

              <div className="pick-bottom">
                <span className="pick-stars" style={{ color: accent }}>
                  {'★'.repeat(Math.round(p.rating))} {p.rating}
                </span>
                <span className="pick-dist" style={{ color: p.featured ? '#FFD8A8' : '#B87A3A' }}>
                  {p.dist}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── BANNERS ── */}
      <div className="theme-banners">
        {/* 블로그 배너 */}
        <div
          className="map-banner"
          style={{
            background: `linear-gradient(135deg, #FFF0E0, #FFE4C4)`,
            border: `1px solid rgba(255,142,43,0.2)`,
          }}
          onClick={() => navigate('/blog?theme=ani')}
          role="button"
          tabIndex={0}
        >
          <div>
            <h3 className="map-banner-title" style={{ color: darkBg }}>
              {PAGE_COPY.bannerMagTitle}
            </h3>
            <p className="map-banner-sub" style={{ color: '#7A5540' }}>
              {PAGE_COPY.bannerMagSub}
            </p>
          </div>
          <button
            type="button"
            className="btn-white"
            style={{ background: accent, color: '#FFFFFF', border: 'none' }}
          >
            {PAGE_COPY.bannerMagBtn}
          </button>
        </div>

        {/* 지도 배너 */}
        <div
          className="map-banner"
          style={{
            background: `linear-gradient(135deg, ${darkBg}, #5C3820)`,
            border: `1px solid rgba(255,142,43,0.18)`,
          }}
          onClick={() => navigate('/map?theme=ani')}
          role="button"
          tabIndex={0}
        >
          <div>
            <h3 className="map-banner-title" style={{ color: '#FFFFFF' }}>
              {PAGE_COPY.bannerMapTitle}
            </h3>
            <p className="map-banner-sub" style={{ color: '#D6CAC1' }}>
              {PAGE_COPY.bannerMapSub}
            </p>
          </div>
          <button
            type="button"
            className="btn-white"
            style={{ background: accentSub, color: '#FFFFFF', border: 'none' }}
          >
            {PAGE_COPY.bannerMapBtn}
          </button>
        </div>
      </div>

    </div>
  )
}