import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../assets/css/Home.css";

import vegetarianImg from "../assets/Image/VEGETARIANISM.png";
import mainstreamImg from "../assets/Image/MAINSTREAM.png";
import exoticImg from "../assets/Image/EXOTIC.png";
import eccentricImg from "../assets/Image/ECCENTRIC.png";
import famouschefImg from "../assets/Image/FAMOUS CHEF.png";
import michelinImg from "../assets/Image/MICHELIN .png";
import kidszoneImg from "../assets/Image/KIDS ZONE.png";
import petaccessImg from "../assets/Image/PET ACCESS.png";
import bacgroundImg from "../assets/Image/bacground.png";
import cat02Img from "../assets/Image/cat02.png";

/* ----------------------------- 슬라이드 데이터 ----------------------------- */

const slide1Items = [
  {
    label: "채식사진",
    src: vegetarianImg,
    href: "/vegetarian",
  },
  {
    label: "주류",
    src: mainstreamImg,
    href: "/alcohol",
  },
  {
    label: "이국요리",
    src: exoticImg,
    href: "/exotic",
  },
  {
    label: "괴식요리",
    src: eccentricImg,
    href: "/eccentric",
  },
  {
    label: "유명쉐프",
    src: famouschefImg,
    href: "/chef",
  },
  {
    label: "미슐랭",
    src: michelinImg,
    href: "/michelin",
  },
  {
    label: "키즈존",
    src: kidszoneImg,
    href: "/kidszone",
  },
  {
    label: "동물출입",
    src: petaccessImg,
    href: "/pet",
  },
];

const slide2Items = [
  {
    label: "유명쉐프",
    src: famouschefImg,
    href: "/chef",
  },
  {
    label: "미슐랭",
    src: michelinImg,
    href: "/michelin",
  },
  {
    label: "키즈존",
    src: kidszoneImg,
    href: "/kidszone",
  },
  {
    label: "동물출입",
    src: petaccessImg,
    href: "/pet",
  },
  {
    label: "채식사진",
    src: vegetarianImg,
    href: "/vegetarian",
  },
  {
    label: "주류",
    src: mainstreamImg,
    href: "/alcohol",
  },
  {
    label: "이국요리",
    src: exoticImg,
    href: "/exotic",
  },
  {
    label: "괴식요리",
    src: eccentricImg,
    href: "/eccentric",
  },
];

/* ----------------------------- 메뉴 데이터 ----------------------------- */

const foodNavLinks = [
  {
    label: "채식주의",
    href: "/vegetarian",
  },
  {
    label: "이국요리",
    href: "/exotic",
  },
  {
    label: "유명쉐프식당",
    href: "/chef",
  },
  {
    label: "미슐랭",
    href: "/michelin",
  },
  {
    label: "키즈존식당",
    href: "/kidszone",
  },
  {
    label: "애견동반식당",
    href: "/pet",
  },
  {
    label: "특이한괴식",
    href: "/eccentric",
  },
  {
    label: "세계주류판매",
    href: "/alcohol",
  },
];

const communityNavLinks = [
  {
    label: "KIDS ZONE",
    href: "/kidszone",
  },
  {
    label: "PET ACCESS",
    href: "/pet",
  },
  {
    label: "NOTICE",
    href: "/notice",
  },
];

const bottomLinks = [
  {
    label: "LOGIN",
    href: "/login",
  },
  {
    label: "MEMBER",
    href: "/member",
  },
  {
    label: "MANAGER",
    href: "/manager",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function EatPick() {
  const [isOpen, setIsOpen] = useState(false);

  /* ----------------------------- ESC 키 닫기 ----------------------------- */

useEffect(() => {
  const handleKey = (
    e: KeyboardEvent
  ) => {
    if (
      e.key === "Escape" &&
      isOpen
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener(
    "keydown",
    handleKey
  );

  return () => {
    document.removeEventListener(
      "keydown",
      handleKey
    );
  };
}, [isOpen]);

  /* ---------------------------------------------------------------------- */

  return (
    <main>
      {/* =========================== 메인 영역 =========================== */}

      <div className="main-container">
        {/* 배경 이미지 */}

        <img
          src={bacgroundImg}
          alt="배경 이미지"
          className="background-img"
        />

        {/* 캐릭터 */}

        <div className="character-wrap">
          <img
            src={cat02Img}
            alt="캐릭터"
            className="character-img"
          />
        </div>

        {/* 메인 타이틀 */}

        <div className="main-title">
          <h1>EATPICK</h1>
          <p>TASTE DORY</p>
        </div>

        {/* ======================= 슬라이드 1 ======================= */}

        <div className="main-slide1">
          <div className="slide-track1">
            {slide1Items.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="slide-item"
              >
                <img
                  src={item.src}
                  alt={item.label}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* ======================= 슬라이드 2 ======================= */}

        <div className="main-slide2">
          <div className="slide-track2">
            {slide2Items.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="slide-item"
              >
                <img
                  src={item.src}
                  alt={item.label}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ======================= 햄버거 버튼 ======================= */}

      <button
        className={`hamburger-btn${isOpen ? " active" : ""}`}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* ======================== 오버레이 ======================== */}

      <div
        className={`nav-overlay${isOpen ? " active" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* ======================== 사이드 메뉴 ======================== */}

      <nav className={`nav-panel${isOpen ? " active" : ""}`}>
        <div className="panel-inner">
          {/* FOOD */}

          <div className="menu-group">
            <div className="group-label">
              FOOD
            </div>

            {foodNavLinks.map((link) => (
              <Link
                key={link.label}
                className="menu-item"
                to={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* COMMUNITY */}

          <div className="menu-group">
            <div className="group-label">
              COMMUNITY
              <br />
              CENTER
            </div>

            {communityNavLinks.map((link) => (
              <Link
                key={link.label}
                className="menu-item"
                to={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 하단 메뉴 */}

        <div className="panel-bottom">
          {bottomLinks.map((link) => (
            <Link
              key={link.label}
              className="bottom-item"
              to={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}