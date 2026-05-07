// ============================================================
// src/components/Layout.tsx
// ============================================================
import React, { useState } from 'react'
import type { PageType } from '../App'

interface Props {
  currentPage: PageType
  onNavigate: (page: PageType) => void
  children: React.ReactNode
}

const NAV = [
  { section: '탐색', items: [
    { label: '홈',         page: 'home' as PageType },
    { label: '지도 보기',  page: 'map'  as PageType },
    { label: '실시간 리뷰',page: 'map'  as PageType },
  ]},
  { section: '카테고리', items: [
    { label: '한식',       page: 'map' as PageType },
    { label: '양식',       page: 'map' as PageType },
    { label: '카페·브런치',page: 'map' as PageType },
    { label: '안주·포차',  page: 'map' as PageType },
  ]},
  { section: '커뮤니티', items: [
    { label: '맛집 토크',    page: 'map' as PageType },
    { label: '추천 모아보기',page: 'map' as PageType },
  ]},
]

const Layout: React.FC<Props> = ({ currentPage, onNavigate, children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const Sidebar = () => (
    <nav className="sidebar">
      <div className="sidebar-logo" onClick={() => onNavigate('home')}>
        <div className="sidebar-logo-kr">잇픽</div>
        <div className="sidebar-logo-en">EAT PICK</div>
      </div>
      {NAV.map(sec => (
        <React.Fragment key={sec.section}>
          <div className="nav-section-label">{sec.section}</div>
          {sec.items.map(item => (
            <button
              key={item.label}
              className={`nav-item ${currentPage === item.page && item.label === '홈' && currentPage === 'home' ? 'on' : currentPage === 'map' && item.label === '지도 보기' && currentPage === 'map' ? 'on' : ''}`}
              onClick={() => { onNavigate(item.page); setDrawerOpen(false) }}
            >
              {item.label}
            </button>
          ))}
        </React.Fragment>
      ))}
      <div className="sidebar-bottom">
        <button className="sidebar-bottom-btn">로그인</button>
        <button className="sidebar-bottom-btn">회원가입</button>
      </div>
    </nav>
  )

  return (
    <div className="layout-root">
      {/* PC / 태블릿 사이드바 */}
      <Sidebar />

      {/* 모바일 드로어 오버레이 */}
      {drawerOpen && (
        <div className="sidebar-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* 모바일 드로어 */}
      <nav className={`sidebar sidebar--drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" onClick={() => { onNavigate('home'); setDrawerOpen(false) }}>
          <div className="sidebar-logo-kr">잇픽</div>
          <div className="sidebar-logo-en">EAT PICK</div>
        </div>
        {NAV.map(sec => (
          <React.Fragment key={sec.section}>
            <div className="nav-section-label">{sec.section}</div>
            {sec.items.map(item => (
              <button
                key={item.label}
                className="nav-item"
                onClick={() => { onNavigate(item.page); setDrawerOpen(false) }}
              >
                {item.label}
              </button>
            ))}
          </React.Fragment>
        ))}
        <div className="sidebar-bottom">
          <button className="sidebar-bottom-btn">로그인</button>
          <button className="sidebar-bottom-btn">회원가입</button>
        </div>
      </nav>

      <div className="layout-content">
        {/* 모바일 탑바 */}
        <div className="mobile-topbar">
          <div className="mobile-logo" onClick={() => onNavigate('home')}>
            잇픽 <span>EAT PICK</span>
          </div>
          <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="메뉴 열기">
            <span /><span /><span />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default Layout
