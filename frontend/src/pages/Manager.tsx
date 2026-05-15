import React, { useState } from 'react';

// 페이지 ID 타입 정의
type PageId = 'dashboard' | 'restaurants' | 'categories';

interface NavItemProps {
  id: PageId;
  activePage: PageId;
  onClick: (id: PageId) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

// 네비게이션 아이템 컴포넌트
const NavItem: React.FC<NavItemProps> = ({ id, activePage, onClick, icon, children }) => {
  const isActive = activePage === id;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(id);
      }}
      className={`flex items-center gap-3 p-3 rounded-md text-[15px] transition-all duration-300 ${
        isActive
          ? 'bg-[#3699ff] text-white font-medium'
          : 'text-[#a2a3b7] hover:bg-[#2b2b40] hover:text-white'
      }`}
    >
      {icon}
      {children}
    </a>
  );
};

export default function AdminSidebar() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans">
      {/* 사이드바 */}
      <aside className="w-[265px] bg-[#1e1e2d] text-white flex flex-col flex-shrink-0 transition-all duration-300">
        {/* 사이드바 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h1 className="text-fb font-bold text-xl tracking-tight">관리자페이지</h1>
          <span className="text-[12px] px-2 py-0.5 bg-[#3699ff]/20 text-[#3699ff] rounded font-semibold">
            Admin
          </span>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="p-6 px-4">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase text-[#a2a3b7] pl-3 mb-3 tracking-wider">
              메뉴
            </span>

            {/* 대시보드 */}
            <NavItem
              id="dashboard"
              activePage={activePage}
              onClick={setActivePage}
              icon={
                <svg className="w-5 height-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <svg className="w-5 height-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <svg className="w-5 height-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      {/* 메인 콘텐츠 영역 (페이지 전환 테스트용) */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">{activePage} 화면</h2>
        <p className="text-gray-500 mt-2">여기에 본문 내용을 개발하세요.</p>
      </main>
    </div>
  );
}
