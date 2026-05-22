// ============================================================
// FreakFoodPage.tsx — 괴식(Freak Food) 테마 랜딩
// 구조 유지 / 반응형 유지
// 수정 사항:
// 1. 텍스트 변경
// 2. 이미지 변경
// 3. 컬러 테마 변경
// ============================================================

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { restaurantService } from '../services/restaurantService';


// ─── 타입 ────────────────────────────────────────────────────


interface CategoryItem {
  name: string
  count: number
  img: string
}

// ─── 페이지 카피 ─────────────────────────────────────────────
const PAGE_COPY = {
  heroLabel: '☠ 세상에서 가장 기괴한 미식 컬렉션',
  heroTitleLine1: 'FREAK',
  heroTitleAccent: 'BITE',

  heroSubtitle:
    '상식을 벗어난 식재료와 충격적인 비주얼.\n세계 각국의 괴식과 금지된 미식을 만나보세요.',

  ctaMap: '괴식 지도 보기',
  ctaBlog: '괴식 리뷰 읽기',

  statRestaurants: {
    value: '666',
    unit: '곳',
    label: '괴식 레스토랑',
  },

  statCarbon: {
    value: '31',
    unit: '개국',
    label: '세계 괴식 국가',
  },

  sectionCategories: '괴식 카테고리',
  sectionCategoriesMore: '모든 괴식 보기 →',

  sectionPicks: '이번 주 인기 괴식',
  sectionPicksMore: '전체 랭킹 →',

  bannerMagTitle: '세계 괴식 아카이브 탐험 →',

  bannerMagSub:
    '곤충 요리부터 발효 상어까지, 인간의 상상을 뛰어넘는 요리를 기록합니다.',

  bannerMagBtn: '괴식 도감 보기',

  bannerMapTitle: '내 주변 괴식 식당 찾기 →',

  bannerMapSub:
    '서울에서 가장 충격적인 메뉴를 판매하는 식당들을 탐험해보세요.',

  bannerMapBtn: '지도 열기',
}

// ─── 카테고리 ────────────────────────────────────────────────
const CATEGORIES: CategoryItem[] = [
  {
    name: '곤충 요리',
    count: 42,
    img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600&q=80',
  },

  {
    name: '발효 괴식',
    count: 18,
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  },

  {
    name: '극한 매운맛',
    count: 67,
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  },

  {
    name: '동물 특수부위',
    count: 93,
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
  },

  {
    name: '비주얼 쇼크',
    count: 128,
    img: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=600&q=80',
  },

  {
    name: '도전 음식',
    count: 211,
    img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&q=80',
  },
]

// ─── 인기 스팟 (초기 데이터 유지용) ───────────────────────────────────────────────
const INITIAL_PICKS: any[] = [
  {
    rank: '01',
    name: '블러드 키친',
    category: '괴식 바 · 이태원',
    rating: 4.9,
    dist: '4.2km',
    tag: '충격주의',
    tagVariant: 'primary',
    featured: true,
  },

  {
    rank: '02',
    name: '인섹트 다이닝',
    category: '곤충 코스요리 · 성수',
    rating: 4.7,
    dist: '2.8km',
    tag: '곤충',
    tagVariant: 'soft',
    featured: false,
  },

  {
    rank: '03',
    name: '헬파이어 누들',
    category: '극한 매운맛 · 홍대',
    rating: 4.8,
    dist: '5.1km',
    tag: '🔥 도전',
    tagVariant: 'warm',
    featured: false,
  },
]

// ─── LIVE FEED ──────────────────────────────────────────────
const LIVE_FEED = [
  '김민수님이 "헬파이어 누들" 5단계를 완주했습니다',
  '새로운 괴식 메뉴 "전갈 튀김 플래터"가 추가되었습니다',
  '이태원 블러드 키친의 예약이 모두 마감되었습니다',
]

export default function FreakFoodPage() {
  const navigate = useNavigate()
  
  // ✅ 상태 관리 추가
  const [picks, setPicks] = useState<any[]>(INITIAL_PICKS);

  // ✅ 데이터 호출 추가
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await restaurantService.getRestaurantListByCategory("ECCENTRIC", 0, 3);
        if (data && data.length > 0) {
          setPicks(data);
        }
      } catch (e) {
        console.error("데이터 로드 실패:", e);
      }
    };
    loadData();
  }, []);

  return (
    <div
      className="main-page theme-page theme-stran"
      style={{
        background: '#090909',
        color: '#F3E9DC',
      }}
    >

      {/* HERO */}
      <section
        className="hero theme-hero"
        style={{
          background:
            'linear-gradient(180deg, #120909 0%, #090909 100%)',
          borderBottom: '1px solid rgba(255,0,76,0.15)',
        }}
      >

        <div
          className="hero-grid"
          aria-hidden
          style={{
            opacity: 0.04,
          }}
        />

        <div
          className="hero-circle"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle, rgba(255,0,76,0.35) 0%, transparent 70%)',
          }}
        />

        <div
          className="hero-bg"
          aria-hidden={true}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 50%), url('/src/assets/Image/stran_20260518_172147.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'normal',
            height: 'auto',
            width: '100%',
          }}
        />

        <div className="hero-text">

          <div
            className="hero-label"
            style={{
              color: '#D1C7BE',
              letterSpacing: '2px',
              fontWeight: 800,
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
                color: '#FF004C',
              }}
            >
              {PAGE_COPY.heroTitleAccent}
            </span>
          </h1>

          <p
            className="hero-subtitle"
            style={{
              color: '#D1C7BE',
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
                background: '#FF004C',
                color: '#FFFFFF',
                border: 'none',
              }}
              onClick={() => 
                navigate('/map?theme=stran')}
              
            >
              {PAGE_COPY.ctaMap}
            </button>

            <button
              type="button"
              className="btn-ghost"
              style={{
                border: '1px solid #FF004C',
                color: '#FFFFFF',
                background: 'transparent',
              }}
              onClick={() => navigate('/blog?theme=stran')}
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
                color: '#FF004C',
              }}
            >
              {PAGE_COPY.statRestaurants.value}
              <span>{PAGE_COPY.statRestaurants.unit}</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#B9ACA1',
              }}
            >
              {PAGE_COPY.statRestaurants.label}
            </div>

          </div>

          <div className="stat">

            <div
              className="stat-num"
              style={{
                color: '#FF7B00',
              }}
            >
              {PAGE_COPY.statCarbon.value}
              <span>{PAGE_COPY.statCarbon.unit}</span>
            </div>

            <div
              className="stat-label"
              style={{
                color: '#B9ACA1',
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
          background: '#111111',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >

        <div
          className="live-dot"
          aria-hidden
          style={{
            background: '#FF004C',
          }}
        />

        <span
          className="live-label"
          style={{
            color: '#FF004C',
          }}
        >
          LIVE
        </span>

        <div className="live-items">
          {LIVE_FEED.map((msg, i) => (
            <span
              key={i}
              className="live-item"
              style={{
                color: '#E7DED5',
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
              color: '#FF004C',
            }}
            onClick={() => navigate('/map?theme=stran')}
          >
            {PAGE_COPY.sectionCategoriesMore}
          </button>

        </div>

        <div className="cat-grid">

          {CATEGORIES.map((cat) => (
            <article
              key={cat.name}
              className="cat-card"
              onClick={() => navigate('/map?theme=stran')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/map?theme=stran')}
              role="button"
              tabIndex={0}
              style={{
                border: '1px solid rgba(255,255,255,0.05)',
                background: '#141414',
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
                    'linear-gradient(to bottom, transparent, rgba(0,0,0,0.92))',
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
                  color: '#FF9A75',
                }}
              >
                {cat.count}개의 장소
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
              color: '#FF004C',
            }}
           onClick={() => navigate('/map?theme=ECCENTRIC')}
          >
            {PAGE_COPY.sectionPicksMore}
          </button>
        </div>
        <div className="picks-row">

          {/* ✅ map 함수 교체 및 속성 변경 */}
          {picks.map((p, index) => (
            <article
              key={p.restId || p.rank} // DB 데이터면 restId, 초기값이면 rank
              className={`pick-card ${index === 0 ? 'featured' : ''}`}
             onClick={(e) => {
             e.stopPropagation(); // ✅ 클릭 이벤트가 부모로 퍼지지 않게 차단
             p.restId ? navigate(`/fpage/${p.restId}`) : navigate('/Fpage'); }}
              onKeyDown={(e) => e.key === 'Enter' && navigate(p.restId ? `/store/${p.restId}` : '/Fpage')}
              role="button"
              tabIndex={0}
              style={{
                background: '#141414',
                border: index === 0
                  ? '1px solid #FF004C'
                  : '1px solid rgba(255,255,255,0.05)',
              }}
            >

              <div
                className="pick-rank"
                style={{
                  color: '#FF004C',
                }}
              >
                {(index + 1).toString().padStart(2, '0')}
              </div>

              <span
                className={`pick-tag pick-tag--${p.tagVariant || 'primary'}`}
                style={{
                  background:
                    (p.tagVariant || 'primary') === 'primary'
                      ? '#FF004C'
                      : (p.tagVariant || 'primary') === 'soft'
                      ? '#2A1A1F'
                      : '#3A1600',

                  color:
                    (p.tagVariant || 'primary') === 'primary'
                      ? '#FFFFFF'
                      : (p.tagVariant || 'primary') === 'soft'
                      ? '#FF8FB0'
                      : '#FFB067',
                }}
              >
                {p.customTag || p.tag || '추천'}
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
                  color: '#C5B7AA',
                }}
              >
                {p.address || p.category}
              </div>

              <div className="pick-bottom">

                <span
                  className="pick-stars"
                  style={{
                    color: '#FF7B00',
                  }}
                >
                  {'★'.repeat(Math.round(p.rating || 5))} {p.rating || 4.9}
                </span>

                <span
                  className="pick-dist"
                  style={{
                    color: '#FF9A75',
                  }}
                >
                  {p.dist || '1.2km'}
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
              'linear-gradient(135deg, #1A1014, #2A0F18)',
            border: '1px solid rgba(255,0,76,0.15)',
          }}
          onClick={() => navigate('/blog?theme=stran')}
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
                color: '#D6CAC1',
              }}
            >
              {PAGE_COPY.bannerMagSub}
            </p>

          </div>

          <button
            type="button"
            className="btn-white"
            style={{
              background: '#FF004C',
              color: '#FFFFFF',
              border: 'none',
            }}
          >
            {PAGE_COPY.bannerMagBtn}
          </button>

        </div>

        <div
          className="map-banner"
          style={{
            background:
              'linear-gradient(135deg, #2B0909, #150909)',
            border: '1px solid rgba(255,123,0,0.18)',
          }}
          onClick={() => navigate('/map?theme=stran')}
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
                color: '#D6CAC1',
              }}
            >
              {PAGE_COPY.bannerMapSub}
            </p>

          </div>

          <button
            type="button"
            className="btn-white"
            style={{
              background: '#FF7B00',
              color: '#FFFFFF',
              border: 'none',
            }}
          >
            {PAGE_COPY.bannerMapBtn}
          </button>

        </div>

      </div>
    </div>
  )
}