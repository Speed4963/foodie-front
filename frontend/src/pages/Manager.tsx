import React, { useState } from 'react';
import "../assets/css/Manager.css";


type PageId = 'dashboard' | 'restaurants' | 'categories' | 'reviews' | 'members' | 'settings';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
}

// 2-1. 대시보드 콘텐츠 뷰
interface DashboardViewProps {
  onNavigate: (id: PageId) => void;
}

function DashboardView({ onNavigate }: DashboardViewProps) {
  return (
    <section id="dashboard" className="page active">
      <div className="page-header">
        <h2 className="page-title">대시보드</h2>
        <p className="page-subtitle">맛집 사이트 현황을 한눈에 확인하세요</p>
      </div>      
      <div className="stats-grid">
        <div className="stat-card" onClick={() => onNavigate('restaurants')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">128</span>
            <span className="stat-label">등록된 맛집</span>
          </div>
          <span className="stat-change positive">+12%</span>
        </div>        
        <div className="stat-card" onClick={() => onNavigate('reviews')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">1,847</span>
            <span className="stat-label">총 리뷰</span>
          </div>
          <span className="stat-change positive">+8%</span>
        </div>
        
        <div className="stat-card" onClick={() => onNavigate('members')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">3,294</span>
            <span className="stat-label">가입 회원</span>
          </div>
          <span className="stat-change positive">+23%</span>
        </div>
      </div>
    </section>
  );
}

// 2-2. 공통 페이지 프레임 뷰 (나머지 임시 페이지 컴포넌트)
function GenericView({ title, description }: { title: string; description: string }) {
  return (
    <section className="page active">
      <div className="page-header">
        <h2 className="page-title">{title}</h2>
        <p className="page-subtitle">{description}</p>
      </div>
      <div className="page-body" style={{ padding: '20px 0' }}>
        <p>현재 페이지 준비 중이거나 가공된 본문 데이터 컴포넌트가 들어올 공간입니다.</p>
      </div>
    </section>
  );
}


export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // 메뉴 그룹 1: 관리 영역
  const managementMenu: NavItem[] = [
    {
      id: 'dashboard',
      label: '대시보드',
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
      label: '맛집 관리',
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
      label: '카테고리',
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
    {
      id: 'reviews',
      label: '리뷰 관리',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      id: 'members',
      label: '회원 관리',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  // 메뉴 그룹 2: 설정 영역
  const settingsMenu: NavItem[] = [
    {
      id: 'settings',
      label: '설정',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
    },
  ];

  // 조건부로 알맞은 메인 본문 페이지 렌더링
  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardView onNavigate={(id) => setCurrentPage(id)} />;
      case 'restaurants':
        return <GenericView title="맛집 관리" description="가맹 업체를 추가하거나 수정, 숨김 처리할 수 있습니다." />;
      case 'categories':
        return <GenericView title="카테고리 관리" description="한식, 양식, 카페 등 업종 분류 코드를 관리합니다." />;
      case 'reviews':
        return <GenericView title="리뷰 관리" description="스팸성 악성 리뷰나 평점 조작 의심 게시글을 검토합니다." />;
      case 'members':
        return <GenericView title="회원 관리" description="가입 사용자의 정보 조회가 가능합니다." />;
      case 'settings':
        return <GenericView title="시스템 설정" description="권한 정책 및 사이트의 전반적 사양 환경설정 페이지입니다." />;
      default:
        return <DashboardView onNavigate={(id) => setCurrentPage(id)} />;
    }
  };

  // 공통 메뉴 버튼 생성 렌더러
  const renderNavButton = (item: NavItem) => (
    <button
      key={item.id}
      type="button"
      className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
      onClick={() => setCurrentPage(item.id)}
      style={{
        background: 'none',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {item.icon}
      <span>{item.label}</span>
    </button>
  );

  return (
    <div className={`app ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
      {/* 1. 사이드바 */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">관리자페이지</h1>
          <span className="logo-badge">Admin</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">메뉴</span>
            {managementMenu.map(renderNavButton)}
          </div>
          
          <div className="nav-section">
            <span className="nav-section-title">설정</span>
            {settingsMenu.map(renderNavButton)}
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">관</div>
            <div className="user-details">
              <span className="user-name">관리자</span>
              <span className="user-email">admin@matjip.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. 메인 콘텐츠 영역 */}
      <main className="main-content">
        {/* 상단 헤더 바 */}
        <header className="header">
          <div className="header-left">
            <button 
              className="menu-toggle" 
              id="menuToggle" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                type="text" 
                placeholder="검색..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="header-right">
            <button className="header-btn" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">3</span>
            </button>
          </div>
        </header>

        {/* 메인 동적 페이지 본문 콘텐츠 */}
        <div className="page-content">
          {renderPageContent()}
        </div>
      </main>
    </div>
  );
}