// ============================================================
// ChefPage.tsx — 스타 셰프 테마 랜딩
// 구조: 히어로 → LIVE → 카테고리 → TOP PICK → 배너×2
// 스타일: index.css → THEME 02 CHEF (.theme-chef) + .theme-page 공통
//
// ★ 수정 가이드
// 1. 문구만 바꿀 때     → PAGE_COPY
// 2. 색·골드·배경만     → index.css "THEME 02 — CHEF" 블록
// 3. 레이아웃·그리드    → index.css ".theme-page"
// 4. style={{ }} 쓰지 말 것
// ============================================================
import { useNavigate } from 'react-router-dom'
import omakaseImg from '../assets/Image/takedahrs-sushi-5143892_1920.jpg'
import ThemeExploreLinks from '../components/ThemeExploreLinks'

type PickTagVariant = 'gold' | 'dark' | 'cream'

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

const PAGE_COPY = {
  heroLabel: '✨ MASTER CHEF SELECTION',
  heroTitleLine1: "CHEF'S",
  heroTitleAccent: 'TABLE',
  heroSubtitle:
    '화면 속 그 맛을 실제로 경험하세요. 세계 요리 경연 우승자부터\n전설적인 스타 셰프들이 직접 운영하는 검증된 맛집 큐레이션.',
  ctaMap: '셰프의 식당 지도',
  ctaBlog: '셰프 인터뷰 읽기',
  liveLabel: 'KITCHEN NOW',
  statChefs: { value: '86', unit: '명', label: '등록 스타 셰프' },
  statBooking: { value: '24', unit: '시간', label: '실시간 예약 확인' },
  sectionCategories: '분야별 명인 찾기',
  sectionCategoriesMore: '전체 라인업 보기 →',
  sectionPicks: 'TOP RATED CHEFS',
  sectionPicksMore: '지도에서 보기 →',
  bannerStoryTitle: '셰프들의 비하인드 스토리 →',
  bannerStorySub: '경연 비하인드부터 셰프가 직접 추천하는 페어링 와인까지 확인하세요.',
  bannerStoryBtn: '스토리 보기',
  bannerMapTitle: '내 주변 스타 셰프 식당 지도 →',
  bannerMapSub: '실시간 캐치테이블 예약 연동으로 빈자리 알림을 받아보세요.',
  bannerMapBtn: '지도 열기',
}

const CATEGORIES: CategoryItem[] = [
  { name: '미슐랭 스타 셰프', count: 12, img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
  { name: '서바이벌 우승자', count: 8, img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80' },
  { name: '중식의 거장', count: 15, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80' },
  { name: '이탈리안 마스터', count: 24, img: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=600&q=80' },
  { name: '일식 오마카세 명인', count: 19, img: omakaseImg },
  { name: '월드 클래스 페이스트리', count: 7, img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80' },
]

const TOP_PICKS: TopPickItem[] = [
  { rank: '01', name: '트리플 스타의 주방', category: '컨템포러리 · 강남구', rating: 4.9, dist: '예약난이도: 최상', tag: '우승자식당', tagVariant: 'gold', featured: true },
  { rank: '02', name: '철가방 요리사 본점', category: '중식 · 종로구', rating: 4.8, dist: '이색 퍼포먼스', tag: 'TV방영', tagVariant: 'dark', featured: false },
  { rank: '03', name: '나폴리 맛피아 식당', category: '이탈리안 · 용산구', rating: 4.7, dist: '정통 파스타', tag: '월드우승', tagVariant: 'cream', featured: false },
]

const LIVE_FEED = [
  '철가방 요리사 셰프님이 오늘 새로운 시즌 메뉴를 공개했습니다! 🔥',
  '방금 "나폴리 맛피아" 식당의 이번 달 예약이 마감되었습니다.',
  '이영희님이 "트리플 스타"에서 인생 다이닝을 경험하고 별 5개를 남겼어요.',
]

export default function ChefPage() {
  const navigate = useNavigate()

  return (
    <div className="main-page theme-page theme-chef">

      <section className="hero theme-hero">
        <div className="hero-grid" aria-hidden />
        <div className="hero-circle" aria-hidden />
        <div className="hero-bg" aria-hidden />
        <div className="hero-text">
          <div className="hero-label theme-hero-label">{PAGE_COPY.heroLabel}</div>
          <h1 className="hero-title theme-hero-title">
            {PAGE_COPY.heroTitleLine1}<br />
            <span>{PAGE_COPY.heroTitleAccent}</span>
          </h1>
          <p className="hero-subtitle theme-hero-subtitle">
            {PAGE_COPY.heroSubtitle.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
          <div className="hero-cta">
            <button type="button" className="btn-primary theme-primary" onClick={() => navigate('/map?theme=chef')}>
              {PAGE_COPY.ctaMap}
            </button>
            <button type="button" className="btn-ghost theme-ghost" onClick={() => navigate('/blog?theme=chef')}>
              {PAGE_COPY.ctaBlog}
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{PAGE_COPY.statChefs.value}<span>{PAGE_COPY.statChefs.unit}</span></div>
            <div className="stat-label">{PAGE_COPY.statChefs.label}</div>
          </div>
          <div className="stat">
            <div className="stat-num">{PAGE_COPY.statBooking.value}<span>{PAGE_COPY.statBooking.unit}</span></div>
            <div className="stat-label">{PAGE_COPY.statBooking.label}</div>
          </div>
        </div>
      </section>

      <div className="live-strip theme-live" role="status">
        <div className="live-dot" aria-hidden />
        <span className="live-label">{PAGE_COPY.liveLabel}</span>
        <div className="live-items">
          {LIVE_FEED.map((msg, i) => (
            <span key={i} className="live-item">{msg}</span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">{PAGE_COPY.sectionCategories}</h2>
          <button type="button" className="section-more" onClick={() => navigate('/map?theme=chef')}>
            {PAGE_COPY.sectionCategoriesMore}
          </button>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((cat) => (
            <article
              key={cat.name}
              className="cat-card theme-cat-card"
              onClick={() => navigate('/map?theme=chef')}
              role="button"
              tabIndex={0}
            >
              <img className="cat-img" src={cat.img} alt={cat.name} loading="lazy" />
              <div className="cat-overlay" aria-hidden />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count} Restaurants</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tight">
        <div className="section-head">
          <h2 className="section-title">{PAGE_COPY.sectionPicks}</h2>
          <button type="button" className="section-more" onClick={() => navigate('/map?theme=chef')}>
            {PAGE_COPY.sectionPicksMore}
          </button>
        </div>
        <div className="picks-row">
          {TOP_PICKS.map((p) => (
            <article
              key={p.rank}
              className={`pick-card theme-pick-card ${p.featured ? 'featured' : ''}`}
              onClick={() => navigate('/map?theme=chef')}
              role="button"
              tabIndex={0}
            >
              <div className="pick-rank">{p.rank}</div>
              <span className={`pick-tag pick-tag--${p.tagVariant}`}>{p.tag}</span>
              <div className="pick-name">{p.name}</div>
              <div className="pick-cat">{p.category}</div>
              <div className="pick-bottom">
                <span className="pick-stars">{'★'.repeat(Math.round(p.rating))} {p.rating}</span>
                <span className="pick-dist">{p.dist}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="theme-banners">
        <div
          className="map-banner theme-banner theme-banner--outline"
          onClick={() => navigate('/blog?theme=chef')}
          role="button"
          tabIndex={0}
        >
          <div>
            <h3 className="map-banner-title">{PAGE_COPY.bannerStoryTitle}</h3>
            <p className="map-banner-sub">{PAGE_COPY.bannerStorySub}</p>
          </div>
          <button type="button" className="btn-white" onClick={(e) => { e.stopPropagation(); navigate('/blog?theme=chef') }}>
            {PAGE_COPY.bannerStoryBtn}
          </button>
        </div>

        <div
          className="map-banner theme-banner theme-banner--primary"
          onClick={() => navigate('/map?theme=chef')}
          role="button"
          tabIndex={0}
        >
          <div>
            <h3 className="map-banner-title">{PAGE_COPY.bannerMapTitle}</h3>
            <p className="map-banner-sub">{PAGE_COPY.bannerMapSub}</p>
          </div>
          <button type="button" className="btn-white" onClick={(e) => { e.stopPropagation(); navigate('/map?theme=chef') }}>
            {PAGE_COPY.bannerMapBtn}
          </button>
        </div>
      </div>

      <ThemeExploreLinks current="chef" />
    </div>
  )
}