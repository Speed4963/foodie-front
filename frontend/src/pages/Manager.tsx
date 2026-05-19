// AdminSidebar.tsx
import React, { useState } from "react";
import "../assets/css/Manager.css";

// 페이지 ID 타입 정의
type PageId = "dashboard" | "restaurants" | "categories";

interface NavItemProps {
  id: PageId;
  activePage: PageId;
  onClick: (id: PageId) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

// 네비게이션 아이템 컴포넌트
const NavItem: React.FC<NavItemProps> = ({
  id,
  activePage,
  onClick,
  icon,
  children,
}) => {
  const isActive = activePage === id;

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(id);
      }}
      className={`nav-item ${isActive ? "active" : ""}`}
    >
      <span className="nav-icon">{icon}</span>
      <span>{children}</span>
    </a>
  );
};

export default function AdminSidebar() {
  const [activePage, setActivePage] =
    useState<PageId>("dashboard");

  return (
    <div className="admin-layout">
      {/* 사이드바 */}
      <aside className="sidebar">
        {/* 사이드바 헤더 */}
        <div className="sidebar-header">
          <h1 className="sidebar-title">관리자페이지</h1>

          <span className="admin-badge">
            Admin
          </span>
        </div>
        {/* 네비게이션 메뉴 */}
        <nav className="sidebar-nav">
          <div className="nav-group">
            <span className="nav-label">메뉴</span>

            {/* 대시보드 */}
            <NavItem
              id="dashboard"
              activePage={activePage}
              onClick={setActivePage}
              icon={
                <svg
                  className="icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              }
            >
              대시보드
            </NavItem>

            {/* 맛집 관리 */}
            <NavItem
              id="restaurants"
              activePage={activePage}
              onClick={setActivePage}
              icon={
                <svg
                  className="icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              }
            >
              맛집 관리
            </NavItem>

            {/* 카테고리 관리 */}
            <NavItem
              id="categories"
              activePage={activePage}
              onClick={setActivePage}
              icon={
                <svg
                  className="icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              }
            >
              카테고리 관리
            </NavItem>
          </div>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        <h2 className="main-title">
          {activePage} 화면
        </h2>

        <p className="main-description">
          여기에 본문 내용을 개발하세요.
        </p>
      </main>
    </div>
  );
}














