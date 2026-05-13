// ============================================================
// src/pages/Home.tsx
// 자체 햄버거 메뉴 보유 — Layout의 FAB 버튼은 숨겨짐
// ============================================================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Home.css";
import vegetarianImg  from "../assets/Image/VEGETARIANISM.png";
import mainstreamImg  from "../assets/Image/MAINSTREAM.png";
import exoticImg      from "../assets/Image/EXOTIC.png";
import eccentricImg   from "../assets/Image/ECCENTRIC.png";
import famouschefImg  from "../assets/Image/FAMOUS CHEF.png";
import michelinImg    from "../assets/Image/MICHELIN .png";
import kidszoneImg    from "../assets/Image/KIDS ZONE.png";
import petaccessImg   from "../assets/Image/PET ACCESS.png";
import bacgroundimg   from "../assets/Image/bacground.png";
import catImg         from "../assets/Image/cat.png";

const slide1Items = [
  { label: "채식사진", src: vegetarianImg,  path: "/VegaPage" },
  { label: "주류",     src: mainstreamImg,  path: "/map" },
  { label: "이국요리", src: exoticImg,      path: "/ExotPage" },
  { label: "괴식요리", src: eccentricImg,   path: "/StranPage" },
  { label: "유명쉡",   src: famouschefImg,  path: "/ChefPage" },
  { label: "미슐랭",   src: michelinImg,    path: "/MichPage" },
  { label: "키즈존",   src: kidszoneImg,    path: "/KidsPage" },
  { label: "동물출입", src: petaccessImg,   path: "/AniPage"  },
]

const slide2Items = [
  { label: "유명쉡",   src: famouschefImg },
  { label: "미슐랭",   src: michelinImg   },
  { label: "키즈존",   src: kidszoneImg   },
  { label: "동물출입", src: petaccessImg  },
  { label: "채식사진", src: vegetarianImg },
  { label: "주류",     src: mainstreamImg },
  { label: "이국요리", src: exoticImg     },
  { label: "괴식요리", src: eccentricImg  },
]

const foodNavLinks = [
  { label: "채식주의",    path: "/VegaPage"  },
  { label: "이국요리",    path: "/ExotPage"  },
  { label: "유명쉐프식당",path: "/ChefPage"  },
  { label: "미슐렝",      path: "/MichPage"  },
  { label: "키즈존식당",  path: "/KidsPage"  },
  { label: "애견동반식당",path: "/AniPage"   },
  { label: "특이한괴식",  path: "/StranPage" },
  { label: "세계주류판매",path: "/LiquPage"  },
]

const communityNavLinks = [
  { label: "지도 보기",   path: "/map"  },
  { label: "맛집 블로그", path: "/blog" },
  { label: "커뮤니티",    path: "/blog" },
]

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false) }
    document.addEventListener("keydown", h)
    return () => document.removeEventListener("keydown", h)
  }, [])

  const go = (path: string) => { navigate(path); setIsOpen(false) }

  return (
    <main>
      <div className="main-container">
        <img src={bacgroundimg} alt="background" />

    {/* ✅ 캐릭터와 타이틀을 하나의 div로 감쌉니다 */}
    <div className="center-content-group">
      <div className="character-wrap">
        <img src={catImg} alt="cat chef" className="character-img" />
      </div>
      <div className="main-title">
        <h1>EATPICK</h1>
        <span>TASTE DORY</span>
      </div>
    </div>
        {/* 배경 이미지 */}
        <img src={bacgroundimg} alt="배경" />

        {/* 캐릭터 */}
        <div className="character-wrap">
          <img src={catImg} alt="캐릭터" className="character-img" />
        </div>

        {/* 메인 타이틀 */}
        <div className="main-title">
          <h1>EATPICK</h1>
          <span>TASTE DORY</span>
        </div>

        {/* 슬라이드 1 */}
        <div className="main-slide1">
          <div className="slide-track1">
            {/* 무한 루프를 위해 두 번 렌더링 */}
            {[...slide1Items, ...slide1Items].map((item, i) => (
              <button key={i} className="slide-item-btn" onClick={() => go(item.path)}>
                <img src={item.src} alt={item.label} />
              </button>
            ))}
          </div>
        </div>

        {/* 슬라이드 2 */}
        <div className="main-slide2">
          <div className="slide-track2">
            {[...slide2Items, ...slide2Items].map((item, i) => (
              <button key={i} className="slide-item-btn">
                <img src={item.src} alt={item.label} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 자체 햄버거 버튼 ── */}
      <button
        className={`home-hamburger${isOpen ? " active" : ""}`}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setIsOpen(v => !v)}
      >
        <span /><span /><span />
      </button>

      {/* 오버레이 */}
      <div
        className={`nav-overlay${isOpen ? " active" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* 슬라이드 패널 */}
      <nav className={`nav-panel${isOpen ? " active" : ""}`}>
        <div className="panel-inner">
          <div className="menu-group">
            <div className="group-label">FOOD</div>
            {foodNavLinks.map(link => (
              <button key={link.label} className="menu-item" onClick={() => go(link.path)}>
                {link.label}
              </button>
            ))}
          </div>

          <div className="menu-group">
            <div className="group-label">COMMUNITY<br />CENTER</div>
            {communityNavLinks.map(link => (
              <button key={link.label} className="menu-item" onClick={() => go(link.path)}>
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-bottom">
          <button className="bottom-item" onClick={() => go('/membership')}>LOGIN</button>
          <button className="bottom-item" onClick={() => go('/membership')}>MEMBER</button>
        </div>
      </nav>
    </main>
  )
}