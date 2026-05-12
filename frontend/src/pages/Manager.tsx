import React, { useState } from 'react';

// 메뉴 아이템 구조 정의
interface NavItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function ManagerLayout() {
  // 현재 선택된 페이지 상태 관리
  const [activePage, setActivePage] = useState<string>('dashboard');

  // 네비게이션 메뉴 데이터 배열
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      name: '대시보드',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
    {
      id: 'restaurants',
      name: '맛집 관리',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      ),
    },
    {
      id: 'categories',
      name: '카테고리 관리',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      ),
    },
  ];

  return (
    <div className="app">
      {/* 사이드바 */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">관리자페이지</h1>
          <span className="logo-badge">Admin</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">메뉴</span>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="btn-logout">로그아웃</button>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        {/* 상단 헤더 */}
        <header className="main-header">
          <div className="header-title">
            <h2>{navItems.find((item) => item.id === activePage)?.name || '대시보드'}</h2>
          </div>
          <div className="header-user">
            <span className="user-name">최고관리자님</span>
            <div className="user-avatar"></div>
          </div>
        </header>

        {/* 콘텐츠 본문 */}
        <div className="content-body">
          {activePage === 'dashboard' && (
            <div className="stats-grid">
              <div className="stat-card">
                <h3>전체 맛집 수</h3>
                <p className="stat-value">124개</p>
              </div>
              <div className="stat-card">
                <h3>오늘 등록된 리뷰</h3>
                <p className="stat-value">45개</p>
              </div>
            </div>
          )}
          {activePage === 'restaurants' && <div>맛집 관리 콘텐츠 내용이 들어갈 자리입니다.</div>}
          {activePage === 'categories' && <div>카테고리 관리 콘텐츠 내용이 들어갈 자리입니다.</div>}
        </div>
      </main>
    </div>
  );
}
