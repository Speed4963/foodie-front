// ============================================================
// src/components/Layout.tsx
// 헤더 제거 — 햄버거 버튼만 좌상단 고정 floating
// ============================================================
import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
 
const NAV = [
  { section: '탐색', items: [
    { label: '🏠 홈',          path: '/'     },
    { label: '🗺 지도 보기',   path: '/map'  },
    { label: '✍️ 맛집 블로그', path: '/blog' },
  ]},
  { section: '카테고리', items: [
    { label: '채식요리',        path: '/VegaPage' },
    { label: '이국요리',        path: '/ExotPage' },
    { label: '유명쉐프식당', path: '/ChefPage' },
    { label: '미슐랭',   path: '/MichPage' },
    { label: '키즈존식당',   path: '/KidsPage' },
    { label: '애견동반식당',   path: '/AniPage' },
    { label: '특이한괴식',   path: '/StranPage' },
    { label: '세계주류판매',   path: '/LiquPage' },
  ]},
   { section: '커뮤니티', items: [
    { label: '📝 맛집 블로그',   path: '/blog' },
    { label: '💬 맛집 커뮤니티', path: '/commu' },
  ]},
]
 
export default function Layout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
 
  // ✅ Home 페이지('/')에서는 FAB 버튼 숨김
  const isHome = location.pathname === '/'
 
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
 
  // ESC로 닫기
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])
 
  // 라우트 변경 시 닫기
  useEffect(() => { setOpen(false) }, [location.pathname])
 
  const go = (path: string) => { navigate(path); setOpen(false) }
 
  return (
    <div className="layout-root">
 
      {/* ── FAB 햄버거 버튼 — Home에서는 숨김 ── */}
      {!isHome && (
        <button
          className={`fab-hamburger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label="메뉴"
        >
          <span /><span /><span />
        </button>
      )}
 
      {/* ── 오버레이 ── */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}
 
      {/* ── 사이드바 드로어 ── */}
      <nav className={`sidebar--drawer ${open ? 'open' : ''}`}>
        <div className="sidebar-logo-row">
          <div className="sidebar-logo" onClick={() => go('/')}>
            <div className="sidebar-logo-kr">잇픽</div>
            <div className="sidebar-logo-en">EAT PICK</div>
          </div>
          <button
            className="sidebar-close-btn"
            onClick={() => setOpen(false)}
            aria-label="닫기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
 
        {NAV.map(sec => (
          <div key={sec.section}>
            <div className="nav-section-label">{sec.section}</div>
            {sec.items.map(item => (
              <button
                key={item.label}
                className={`nav-item ${isActive(item.path) ? 'on' : ''}`}
                onClick={() => go(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
 
        <div className="sidebar-bottom">
          <button className="sidebar-bottom-btn" onClick={() => go('/login')}>로그인</button>
          <button className="sidebar-bottom-btn" onClick={() => go('/membership')}>회원가입</button>
          <button className="sidebar-bottom-btn" onClick={() => go('/cus')}>고객센터</button>
        </div>
      </nav>
 
      {/* ── 페이지 콘텐츠 ── */}
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  )
}