import React, { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

// 페이지 타입 정의
export type PageType = 'HOME' | 'MAP' | 'LOGIN' | 'COMMUNITY' | 'BLOG' | 'COMMU' | 'FPAGE';

const NAV = [
  { section: '탐색', items: [
    { label: '테마 목록',    page: 'main' },
    { label: '지도 보기',    page: 'map' },
  ]},
  { section: '카테고리', items: [
    { label: '채식',        page: 'map' },
    { label: '주류',        page: 'map' },
    { label: '이국요리',    page: 'map' },
    { label: '괴식요리',    page: 'map' },
    { label: '유명쉐프',    page: 'map' },
    { label: '미슐랭',      page: 'map' },
    { label: '키즈존',      page: 'map' },
    { label: '동물출입',    page: 'map' },
  ]},
  { section: '커뮤니티', items: [
    { label: '맛집 블로그',      page: 'blog' },
    { label: '맛집 커뮤니티',    page: 'commu' },
    { label: '맛집 상세페이지',  page: 'fpage' },
  ]},
]

const Layout: React.FC<Props> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // 현재 경로 확인 로직
  const path = location.pathname.split('/')[1] || 'main'
  const isHomePage = path === 'home' || path === 'main' || path === ''
  const isLoginPage = path === 'login'

  // 활성화 탭 표시 로직
  const isActive = (label: string) => {
    if (label === '테마 목록') return path === 'main' || path === 'home'
    if (['지도 보기', '채식', '주류', '이국요리', '괴식요리', '유명쉐프', '미슐랭', '키즈존', '동물출입'].includes(label)) return path === 'map'
    if (['맛집 블로그', '맛집 커뮤니티', '맛집 상세페이지'].includes(label)) return ['blog', 'commu', 'fpage'].includes(path)
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
    <div className={`layout-root ${path}`}>
      {/* ✅ 1. 홈(main)이나 로그인 페이지가 아닐 때만 PC 사이드바 표시 */}
      {!isHomePage && !isLoginPage && (
        <nav className="sidebar">
          <SidebarContent />
        </nav>
      )}

      {/* 모바일 오버레이 및 드로어 */}
      {drawerOpen && (
        <div className="sidebar-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      <nav className={`sidebar sidebar--drawer ${drawerOpen ? 'open' : ''}`}>
        <SidebarContent onItemClick={() => setDrawerOpen(false)} />
      </nav>

      <div className="layout-content">
        {/* 모바일 탑바 (필요에 따라 홈에서는 숨길 수 있음) */}
        <div className="mobile-topbar">
          <div className="mobile-logo" onClick={() => navigate('/main')}>
            잇픽 <span>EAT PICK</span>
          </div>
          <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="메뉴 열기">
            <span /><span /><span />
          </button>
        </div>
        
        {/* 실제 자식 컴포넌트(Home, MapPage 등)가 렌더링되는 곳 */}
        <Outlet />
      </div>
    </div>
  )
}

export default Layout