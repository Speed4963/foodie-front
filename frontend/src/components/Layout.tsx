import React, { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'

// ✅ 1. Props 인터페이스 수정 (onNavigate, currentPage를 제거하여 에러 해결)
interface Props {
  children?: React.ReactNode
}

const NAV = [
  { section: '탐색', items: [
    { label: '홈',         page: 'home' },
    { label: '지도 보기',   page: 'map' },
  ]},
  { section: '카테고리', items: [
    { label: '한식',        page: 'map' },
    { label: '양식',        page: 'map' },
    { label: '카페·브런치', page: 'map' },
    { label: '안주·포차',   page: 'map' },
  ]},
  { section: '커뮤니티', items: [
    { label: '맛집 블로그',     page: 'blog' },
    { label: '맛집 커뮤니티', page: 'blog' },
  ]},
]

const Layout: React.FC<Props> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  
  // ✅ 2. 라우터에서 현재 위치와 이동 함수를 가져옵니다.
  const location = useLocation()
  const navigate = useNavigate()

  // 주소창의 경로(pathname)를 기반으로 현재 어떤 페이지인지 판단합니다.
  const currentPage = location.pathname.split('/')[1] || 'home'

  const isActive = (label: string) => {
    if (label === '홈') return currentPage === 'home' || currentPage === 'main'
    if (['지도 보기', '한식', '양식', '카페·브런치', '안주·포차'].includes(label)) return currentPage === 'map'
    if (['맛집 블로그', '맛집 커뮤니티', '맛집 토크', '추천 모아보기'].includes(label)) return currentPage === 'blog'
    return false
  }

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <div className="sidebar-logo" onClick={() => { navigate('/main'); onItemClick?.() }}>
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
              // ✅ onNavigate 대신 navigate 사용
              onClick={() => { navigate(`/${item.page}`); onItemClick?.() }}
            >
              {item.label}
            </button>
          ))}
        </React.Fragment>
      ))}
      <div className="sidebar-bottom">
        <button className="sidebar-bottom-btn" onClick={onItemClick}>
          <Link to="/login">로그인</Link>
        </button>
        <button className="sidebar-bottom-btn" onClick={onItemClick}>
          <Link to="/membership">회원가입</Link>
        </button>
      </div>
    </>
  )

  return (
    <div className="layout-root">
      <nav className="sidebar">
        <SidebarContent />
      </nav>

      {drawerOpen && (
        <div className="sidebar-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      <nav className={`sidebar sidebar--drawer ${drawerOpen ? 'open' : ''}`}>
        <SidebarContent onItemClick={() => setDrawerOpen(false)} />
      </nav>

      <div className="layout-content">
        <div className="mobile-topbar">
          <div className="mobile-logo" onClick={() => navigate('/main')}>
            잇픽 <span>EAT PICK</span>
          </div>
          <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="메뉴 열기">
            <span /><span /><span />
          </button>
        </div>
        
        {/* ✅ 3. 핵심 수정: children 대신 Outlet을 사용해 자식 컴포넌트들을 렌더링합니다. */}
        <Outlet />
      </div>
    </div>
  )
}

export default Layout