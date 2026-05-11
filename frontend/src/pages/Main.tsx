import { useState, useEffect } from "react";
import "../assets/css/Main.css";
import  vegetarianImg from "../assets/Image/VEGETARIANISM.png";
import mainstreamImg from "../assets/Image/MAINSTREAM.png";
import exoticImg from "../assets/Image/EXOTIC.png";
import eccentricImg from "../assets/Image/ECCENTRIC.png";
import famouschefImg from "../assets/Image/FAMOUS CHEF.png";
import michelinImg from "../assets/Image/MICHELIN .png";
import kidszoneImg from "../assets/Image/KIDS ZONE.png";
import petaccessImg from "../assets/Image/PET ACCESS.png";
import bacgroundimg from "../assets/Image/bacground.png";
import dogImg from "../assets/Image/dog.png";

const slide1Items = [
  { label: "채식사진", src:vegetarianImg, href: "./02_main2.html" },
  { label: "주류", src:mainstreamImg, href: "#" },
  { label: "이국요리", src:exoticImg, href: "#" },
  { label: "괴식요리", src:eccentricImg, href: "#" },
  { label: "유명쉡", src:famouschefImg, href: "#" },
  { label: "미슐랭", src:michelinImg, href: "#" },
  { label: "키즈존", src:kidszoneImg, href: "#" },
  { label: "동물출입", src:petaccessImg , href: "#" },
];

const slide2Items = [
  { label: "유명쉡", src:famouschefImg },
  { label: "미슐랭", src:michelinImg },
  { label: "키즈존", src:kidszoneImg},
  { label: "동물출입", src:petaccessImg },
  { label: "채식사진", src:vegetarianImg },
  { label: "주류", src:mainstreamImg },
  { label: "이국요리", src:exoticImg },
  { label: "괴식요리", src:eccentricImg },
];

const foodNavLinks = [
  { label: "채식주의", href: "./02_main2.html" },
  { label: "이국요리", href: "#" },
  { label: "유명쉐프식당", href: "#" },
  { label: "미슐렝", href: "#" },
  { label: "키즈존식당", href: "#" },
  { label: "애견동반식당", href: "#" },
  { label: "특이한괴식", href: "#" },
  { label: "세계주류판매", href: "#" },
];

const communityNavLinks = [
  { label: "KIDS ZONE", href: "#" },
  { label: "PET ACCESS", href: "#" },
  { label: "NOTICE", href: "#" },
];

const bottomLinks = [
  { label: "LOGIN", href: "#" },
  { label: "MEMBER", href: "#" },
  { label: "MANNAGER", href: "#" },
];

export default function EatPick() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <main>
      <div className="main-container">
        {/* 메인 이미지 */}
        <img src={bacgroundimg} />

        {/* 캐릭터 */}
        <div className="character-wrap">
          <img src={dogImg} alt="캐릭터" className="character-img" />
        </div>

        {/* 메인 타이틀 */}
        <div className="main-title">
          <h1>EATPICK</h1>
          <a>TASTE DORY</a>
        </div>
        
        {/* 슬라이드 1 */}
        <div className="main-slide1">
          <div className="slide-track1">
            {slide1Items.map((item) => (
              <a key={item.label} href={item.href}>
                <img src={item.src} />
              </a>
            ))}
          </div>
        </div>

        {/* 슬라이드 2 */}
        <div className="main-slide2">
          <div className="slide-track2">
            {slide2Items.map((item) => (
              <a key={item.label} href="#">
                <img src={item.src} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 햄버거 버튼 */}
      <button
        className={`hamburger-btn${isOpen ? " active" : ""}`}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
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
            {foodNavLinks.map((link) => (
              <a key={link.label} className="menu-item" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="menu-group">
            <div className="group-label">
              COMMUNITY<br />CENTER
            </div>
            {communityNavLinks.map((link) => (
              <a key={link.label} className="menu-item" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="panel-bottom">
          {bottomLinks.map((link) => (
            <a key={link.label} className="bottom-item" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </main>
  );
}