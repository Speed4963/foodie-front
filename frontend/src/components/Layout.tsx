// ============================================================
// src/components/Layout.tsx
// ✅ Home.css의 사이드바 클래스명 그대로 사용
//    nav-panel, panel-inner, menu-group, group-label,
//    menu-item, panel-bottom, bottom-item, nav-overlay
// ============================================================
import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const NAV = [
  { section: 'EXPLORE', items: [
    { label: '홈',          path: '/'         },
    { label: '지도 보기',   path: '/map'      },
    { label: '맛집 블로그', path: '/blog'     },
  ]},
  { section: 'FOOD', items: [
    { label: '채식주의',     path: '/VegaPage'  },
    { label: '이국요리',     path: '/ExotPage'  },
    { label: '유명쉐프식당', path: '/ChefPage'  },
    { label: '미슐랭',       path: '/MichPage'  },
    { label: '키즈존식당',   path: '/KidsPage'  },
    { label: '애견동반식당', path: '/AniPage'   },
    { label: '특이한괴식',   path: '/StranPage' },
    { label: '세계주류판매', path: '/LiquPage'  },
  ]},
  { section: 'COMMUNITY\nCENTER', items: [
    { label: '맛집 블로그',   path: '/blog'  },
    { label: '맛집 커뮤니티', path: '/commu' },
  ]},
]

export default function Layout() {
  const [open, setOpen]   = useState(false)
  const navigate          = useNavigate()
  const location          = useLocation()

  // Home('/')에서는 햄버거 버튼 숨김 (Home 자체 버튼 사용)
  const isHome = location.pathname === '/'

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const go = (path: string) => { navigate(path); setOpen(false) }

  return (
    <div className="layout-root">

      {/* ── 햄버거 버튼 — Home에서만 숨김 ── */}
      {!isHome && (
        <button
          className={`home-hamburger${open ? ' active' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label="메뉴"
        >
          <span /><span /><span />
        </button>
      )}

      {/* ── 오버레이 ── */}
      <div
        className={`nav-overlay${open ? ' active' : ''}`}
        onClick={() => setOpen(false)}
      />

      {/* ── 사이드바 — Home.css 클래스명 그대로 ── */}
      <nav className={`nav-panel${open ? ' active' : ''}`}>
        <div className="panel-inner">

          {NAV.map(sec => (
            <div key={sec.section} className="menu-group">
              <div className="group-label">
                {sec.section.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < sec.section.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
              {sec.items.map(item => (
                <button
                  key={item.label}
                  className={`menu-item${isActive(item.path) ? ' menu-item--active' : ''}`}
                  onClick={() => go(item.path)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}

        </div>

        <div className="panel-bottom">
          <button className="bottom-item" onClick={() => go('/login')}>LOGIN</button>
          <button className="bottom-item" onClick={() => go('/membership')}>MEMBER</button>
          <button className="bottom-item" onClick={() => go('/cus')}>SUPPORT</button>
        </div>
      </nav>

      {/* ── 페이지 콘텐츠 ── */}
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  )
}
