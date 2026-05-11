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
    { label: '홈',          page: 'home' as PageType },
    { label: '지도 보기',   page: 'map'  as PageType },
  ]},
  { section: '카테고리', items: [
    { label: '한식',        page: 'map' as PageType },
    { label: '양식',        page: 'map' as PageType },
    { label: '카페·브런치', page: 'map' as PageType },
    { label: '안주·포차',   page: 'map' as PageType },
  ]},
  { section: '커뮤니티', items: [
    { label: '맛집 블로그',     page: 'blog' as PageType },
    { label: '맛집 커뮤니티', page: 'blog' as PageType },
  ]},
]

const Layout: React.FC<Props> = ({ currentPage, onNavigate, children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  // ✅ itemPage 파라미터 제거 — currentPage와 label로 활성 상태 판단
  const isActive = (label: string) => {
    if (label === '홈') return currentPage === 'home'
    if (label === '지도 보기' || label === '한식' || label === '양식' || label === '카페·브런치' || label === '안주·포차') return currentPage === 'map'
    if (label === '맛집 블로그' || label === '맛집 토크' || label === '추천 모아보기') return currentPage === 'blog'
    return false
  }

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <div className="sidebar-logo" onClick={() => { onNavigate('home'); onItemClick?.() }}>
        <div className="sidebar-logo-kr">잇픽</div>
        <div className="sidebar-logo-en">EAT PICK</div>
      </div>
      {NAV.map(sec => (
        <React.Fragment key={sec.section}>
          <div className="nav-section-label">{sec.section}</div>
          {sec.items.map(item => (
            <button
              key={item.label}
              className={`nav-item ${isActive(item.label) ? 'on' : ''}`}
              onClick={() => { onNavigate(item.page); onItemClick?.() }}
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
    </>
  )

  return (
    <div className="layout-root">
      {/* PC / 태블릿 사이드바 */}
      <nav className="sidebar">
        <SidebarContent />
      </nav>

      {/* 모바일 드로어 오버레이 */}
      {drawerOpen && (
        <div className="sidebar-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* 모바일 드로어 */}
      <nav className={`sidebar sidebar--drawer ${drawerOpen ? 'open' : ''}`}>
        <SidebarContent onItemClick={() => setDrawerOpen(false)} />
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