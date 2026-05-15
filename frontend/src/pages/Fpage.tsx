import { useEffect } from 'react'
import "../assets/css/Fpage.css";
import img01 from "../assets/Image/크림파스타.jpg"
import img02 from "../assets/Image/채끝 스테이크.jpg"


// --- TypeScript를 위한 카카오 맵 전역 객체 타입 선언 ---
declare global {
  interface Window {
    kakao: any;
  }
}

export default function StoreDetail() {
  
  useEffect(() => {
    // 1. 카카오 맵 스크립트가 도큐먼트에 이미 존재하는지 ID 기반으로 조회
    const existingScript = document.getElementById("kakao-map-script");
    
    const initializeMap = () => {
      if (window.kakao && window.kakao.maps) {
        // 비동기 로드를 안전하게 보장하기 위해 maps.load() 콜백 함수 안에서 지도 초기화
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(37.5012, 127.0396), // 역삼역 인근 좌표
            level: 3,
          };
          // 지도 객체 바인딩 생성
          new window.kakao.maps.Map(container, options);
        });
      }
    };

    if (!existingScript) {
      // 2. 스크립트가 없다면 동적으로 엘리먼트를 생성하여 헤더에 주입
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.type = "text/javascript";
      script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6fc788f54cd9b387a90cf9edbaa8ff93&autoload=false";

      script.onload = () => initializeMap();
      document.head.appendChild(script);
    } else {
      // 3. 컴포넌트 재진입 시 이미 스크립트 돔이 존재한다면 즉시 지도 초기화 실행
      initializeMap();
    }
  }, []);

  return (
    <>
      {/* 1. 상단 히어로 배너 영역 */}
      <div className="hero-banner">
        <div className="hero-text">
          <p>파스타 & 와인</p>
          <h1>무드 인 다이닝</h1>
        </div>
      </div>

      {/* 2. 메인 컨텐츠 래퍼 레이아웃 */}
      <div className="wrapper">
        <main className="content-card">
          <div className="section-header">
            <h2>Chef's Selection</h2>
            <div className="price-tag">
              Price <span className="min">18,000원</span> ~ <span className="max">45,000원</span>
            </div>
          </div>
          <p className="uploaddate">
            등록일 : <span>2026.05.11</span>
          </p><br />
          <p style={{ color: "#666", lineHeight: 2 }}>
            직접 재배한 허브와 당일 공수한 신선한 재료만을 사용합니다.
            단순한 한 끼가 아닌, 기억에 남는 미식 경험을 선사하는 것이 저희의 철학입니다.
          </p>
          <br />
          <br />
          
          <p>
            평균 음식 가격 : <span className="avg">31,500원</span>
          </p>
          <br />

          {/* 대표 메뉴 영역 */}
          <h3>대표 메뉴</h3><br />
          <div className="menu-grid">
            <div className="menu-box-img">
              <img src={img01} alt="대표사진01" className="img01" />
            </div>
            <div className="menu-box-img">
              <img src={img02} alt="대표사진02" className="img02" />
            </div>
            <div className="menu-box">
              <div style={{ fontWeight: 700 }}>트러플 크림 파스타</div>
              <div style={{ color: "var(--red)", fontSize: "14px" }}>22,000원</div>
            </div>
            <div className="menu-box">
              <div style={{ fontWeight: 700 }}>수비드 채끝 스테이크</div>
              <div style={{ color: "var(--red)", fontSize: "14px" }}>38,000원</div>
            </div>
          </div><br /><br />


          <h3>메뉴 소개</h3><br />
          <p className="pricedate">
            가격 수정일 : <span>2026.05.11</span>
          </p>
          <br />
          <div className="menu-grid02">
            <div className="info-item">
              <span>트러플 크림 파스타</span> 
              <span>----</span>
              <span>22,000</span>
            </div>
            <div className="info-item">
              <span>수비드 채끝 스테이크</span>
              <span>----</span>
              <span>38,000</span>
            </div>
            <div className="info-item">
              <span>까르보나라</span>
              <span>----</span>
              <span>18,000</span>
            </div>
            <div className="info-item">
              <span>토마토 파스타</span>
              <span>----</span>
              <span>18,000</span>
            </div>
            <div className="info-item">
              <span>알리오올리오</span>
              <span>----</span>
              <span>18,000</span>
            </div>
            <div className="info-item">
              <span>부채살 스테이크</span>
              <span>----</span>
              <span>45,000</span>
            </div>
            <div className="info-item">
              <span>샐러드</span>
              <span>----</span>
              <span>24,000</span>
            </div>
            <div className="info-item">
              <span>시카고 피자</span>
              <span>----</span>
              <span>29,000</span>
            </div>
          </div>

          <h3 style={{ marginTop: "40px" }}>가게 위치</h3><br />
          <div className="map-area">
            <div id="map" style={{ width: "100%", maxWidth: "700px", height: "300px" }}></div>
          </div><br />
        </main>


        <aside className="sidebar-box">
          <h3>Store Info</h3>
          <div className="info-item">
            <label>Address</label>
            <span>서울 강남구 테헤란로 12길 34</span>
          </div>
          <div className="info-item">
            <label>Parking</label>
            <span>주차가능</span>
          </div>
          <div className="info-item">
            <label>Phone</label>
            <span>02-000-0000</span>
            <span className="call">
              <a href="tel:02-000-0000">📞통화하기</a>
            </span>
          </div>
          <div className="info-item">
            <label>Hours</label>
            <span>
              12:00 - 22:00 <br />
              (Break 15:00-17:00)
            </span>
          </div>
          <div className="info-item">
            <label>Holiday</label>
            <span>연중무휴</span>
          </div>
          <div className="info-item">
            <label>폐업여부</label>
            <span className="closedate">해당없음</span>
          </div>
          <div className="info-item">
            <label>인스타그램 및 블로그</label>
            <a href="#" className="insta-btn">
              <p className="insta">Instagram @mood_dining</p>
            </a>
          </div>
          
          <div className="info-item-hash">
            <label>키워드</label>
            <br />
            <br />
            <span className="hash">#파스타</span>
            <span className="hash">#스테이크</span>
            <span className="hash">#신선한 재료</span>
          </div>
        </aside>
      </div><br /><br /><br />
    </>
  );
}