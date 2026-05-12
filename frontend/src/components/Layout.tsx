// ============================================================
// src/components/Layout.tsx
// react-router-dom 기반 — Outlet 사용
// 햄버거 버튼으로 사이드바 토글
// ============================================================
import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const NAV = [
  { section: '탐색', items: [
    { label: '홈',          path: '/'     },
    { label: '지도 보기',   path: '/map'  },
    { label: '맛집 블로그', path: '/blog' },
  ]},
  { section: '카테고리', items: [
    { label: '한식',        path: '/map' },
    { label: '양식',        path: '/map' },
    { label: '카페·브런치', path: '/map' },
    { label: '안주·포차',   path: '/map' },
  ]},
  { section: '커뮤니티', items: [
    { label: '맛집 블로그',   path: '/blog' },
    { label: '맛집 커뮤니티', path: '/blog' },
  ]},
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  // ESC 키로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // 페이지 이동 시 사이드바 닫기
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleNav = (path: string) => {
    navigate(path)
    setSidebarOpen(false)
  }

  return (
    <div className="layout-root">

      {/* ── 드로어 오버레이 ── */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── 사이드바 드로어 ── */}
      <nav className={`sidebar--drawer ${sidebarOpen ? 'open' : ''}`}>
        {/* 로고 + 닫기 */}
        <div className="sidebar-logo-row">
          <div className="sidebar-logo" onClick={() => handleNav('/')}>
            <div className="sidebar-logo-kr">잇픽</div>
            <div className="sidebar-logo-en">EAT PICK</div>
          </div>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="닫기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* 네비게이션 */}
        {NAV.map(sec => (
          <div key={sec.section}>
            <div className="nav-section-label">{sec.section}</div>
            {sec.items.map(item => (
              <button
                key={item.label}
                className={`nav-item ${isActive(item.path) ? 'on' : ''}`}
                onClick={() => handleNav(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}

        <div className="sidebar-bottom">
          <button className="sidebar-bottom-btn" onClick={() => handleNav('/membership')}>
            로그인
          </button>
          <button className="sidebar-bottom-btn" onClick={() => handleNav('/membership')}>
            회원가입
          </button>
        </div>
      </nav>

      {/* ── 메인 콘텐츠 ── */}
      <div className="layout-content">
        {/* 글로벌 탑바 */}
        <div className="global-topbar">
          <button
            className={`hamburger-btn ${sidebarOpen ? 'is-open' : ''}`}
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="메뉴"
          >
            <span /><span /><span />
          </button>

          <div className="global-logo" onClick={() => handleNav('/')}>
            잇픽 <span>EAT PICK</span>
          </div>

          {/* 우측 균형용 */}
          <div style={{ width: 40 }} />
        </div>

        {/* 페이지 콘텐츠 */}
        <Outlet />
      </div>
    </div>
  )
}