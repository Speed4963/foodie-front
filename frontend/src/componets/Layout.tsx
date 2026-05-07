// ============================================================
// Layout.tsx — 잇픽 공통 레이아웃 (사이드바 + 컨텐츠)
// ============================================================
import React from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

const NAV_SECTIONS = [
  {
    label: '탐색',
    items: [
      { path: '/',      label: '홈'          },
      { path: '/map',   label: '지도 보기'    },
      { path: '/map',   label: '실시간 리뷰'  },
    ],
  },
  {
    label: '카테고리',
    items: [
      { path: '/map', label: '한식'        },
      { path: '/map', label: '양식'        },
      { path: '/map', label: '카페·브런치' },
      { path: '/map', label: '안주·포차'   },
    ],
  },
  {
    label: '커뮤니티',
    items: [
      { path: '/map', label: '맛집 토크'      },
      { path: '/map', label: '추천 모아보기'  },
    ],
  },
]

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="layout-root">
      {/* ── Sidebar ── */}
      <nav className="sidebar">
        <div className="sidebar-logo" onClick={() => navigate('/')}>
          <div className="sidebar-logo-kr">잇픽</div>
          <div className="sidebar-logo-en">EAT PICK</div>
        </div>

        {NAV_SECTIONS.map((section) => (
          <React.Fragment key={section.label}>
            <div className="nav-section-label">{section.label}</div>
            {section.items.map((item, idx) => (
              <button
                key={idx}
                className={`nav-item ${location.pathname === item.path && item.label === '홈' ? 'on' : ''}`}
                onClick={() => navigate(item.path)}
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

      {/* ── Page Content ── */}
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout