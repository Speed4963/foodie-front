// import React, { useState } from "react";
import { useState } from "react";
import "../assets/css/Cus.css";

// --- 1. 1:1 문의 폼 데이터 타입 정의 ---
interface InquiryForm {
  category: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function CustomerService() {
  // --- 2. 상태 관리 변수 설정 (State) ---
  const [formData, setFormData] = useState<InquiryForm>({
    category: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // FAQ 아코디언 토글 트래킹용 상태 변수 (key: 인덱스 번호, value: 열림 여부)
  const [openFaq, setOpenFaq] = useState<{ [key: number]: boolean }>({});

  // --- 3. 비즈니스 로직 핸들러 ---
  
  // 폼 입력값 체인지 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FAQ 개별 토글 함수
  const handleToggleFaq = (index: number) => {
    setOpenFaq((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 1:1 문의 양식 최종 서브밋 처리
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 가상 SPA 환경을 위해 기본 동기식 라우팅 차단

    const { category, name, email, subject, message } = formData;

    // 빈 값 검증 유효성 래퍼
    if (category === "") {
      alert("문의 유형을 선택해 주세요.");
      return;
    }
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      alert("모든 필수 입력 필드를 채워주세요.");
      return;
    }

    alert("접수완료되었습니다. 기재해주신 이메일로 빠르게 답변드리겠습니다.");
    
    // 서브밋 완료 후 폼 초기화
    setFormData({
      category: "",
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* 1. 상단 고객센터 헤더 영역 */}
      <header className="cs-header">
        <div className="header-content">
          <h2 className="logo">
            <span>Eat Pick</span> 고객센터
          </h2>
          <div className="welcome-box">
            <h3>안녕하세요, 어떤 도움이 필요하신가요?</h3>
            <p>Eat Pick 서비스 이용 중 불편한 점이나 제안하고 싶은 내용을 자유롭게 남겨주세요.</p>
          </div>
          {/* 원본 마크업의 누락된 닫는 태그 구조 완벽 보정 */}
          <div className="cs-search-bar">
            <input type="text" placeholder="검색어를 입력하세요." />
          </div>
        </div>
      </header>

      {/* 2. 퀵 네비게이션 가이드 메뉴바 */}
      <section className="quick-menu-container">
        <a href="#faq-item01" className="quick-card">
          <h4>자주하는 질문 (FAQ)</h4>
          <p>회원님들이 가장 많이 찾는 질문을 모았습니다.</p>
        </a>
        <a
          href="#inquiryAnchor"
          className="quick-card"
          onClick={() => {
            const subjectInput = document.getElementById("subject");
            if (subjectInput) subjectInput.focus();
          }}
        >
          <h4>1:1 이메일 문의</h4>
          <p>24시간 접수 가능하며 순차적으로 답변드립니다.</p>
        </a>
        <a href="tel:1588-0000"  className="quick-card">
          <h4>긴급 상담원 연결</h4>
          <p>운영 시간 내 유선 통화 연결이 가능합니다.</p>
        </a>
      </section>

      {/* 3. 하단 스코프 메인 2단 그리드 래퍼 */}
      <div className="main-layout-wrapper">
        
        {/* 좌측 컬럼: 운영 시간 안내 & FAQ */}
        <div className="left-column">
          <div className="content-card">
            <div className="card-title">Eat Pick 고객센터 안내</div>
            <div className="info-details">
              <h4>전화번호</h4>
              <div className="phone-number">1588 - 0000</div>
              <h4>운영시간</h4>
              <p>평일: 09:30 ~ 18:30</p>
              <p style={{ color: "#999", fontSize: "12px" }}>(점심시간 12:30 ~ 13:30)</p>
              <p style={{ marginTop: "5px", fontWeight: 500 }}>토, 일, 공휴일 휴무</p>
            </div>
            <a href="tel:1588-0000" className="btn-call">
              상담원 전화 연결하기
            </a>
          </div>

          <div className="content-card" id="faq-item01">
            <div className="card-title">자주하는 질문 (FAQ)</div>

            {/* FAQ Item 0 */}
            <div className="faq-item">
              <div
                className="faq-trigger"
                onClick={() => handleToggleFaq(0)}
                style={{ color: openFaq[0] ? "var(--primary-red)" : "var(--text-main)" }}
              >
                당일 예약 취소 및 환불 기준이 어떻게 되나요? <span>{openFaq[0] ? "▲" : "▼"}</span>
              </div>
              {openFaq[0] && (
                <div className="faq-content" style={{ display: "block" }}>
                  방문 3시간 전까지 취소 시 100% 환불이 가능하며, 이후 취소 시 매장 정책에 따라 노쇼 위약금이 발생할 수 있습니다.
                </div>
              )}
            </div>

            {/* FAQ Item 1 */}
            <div className="faq-item">
              <div
                className="faq-trigger"
                onClick={() => handleToggleFaq(1)}
                style={{ color: openFaq[1] ? "var(--primary-red)" : "var(--text-main)" }}
              >
                서비스 오류 제보는 어디로 하나요? <span>{openFaq[1] ? "▲" : "▼"}</span>
              </div>
              {openFaq[1] && (
                <div className="faq-content" style={{ display: "block" }}>
                  우측 1:1 문의 양식에서 '서비스 오류 제보' 유형을 선택해 화면 캡처 링크와 함께 보내주시면 즉시 수정 조치하겠습니다.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="faq-item">
              <div
                className="faq-trigger"
                onClick={() => handleToggleFaq(2)}
                style={{ color: openFaq[2] ? "var(--primary-red)" : "var(--text-main)" }}
              >
                회원 탈퇴 및 데이터 삭제 방법 <span>{openFaq[2] ? "▲" : "▼"}</span>
              </div>
              {openFaq[2] && (
                <div className="faq-content" style={{ display: "block" }}>
                  마이페이지 ➔ 회원정보 수정 최하단 [회원 탈퇴] 버튼을 통해 즉시 처리가 가능하며, 결제 내역은 법정 보존 기한 후 파기됩니다.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 우측 컬럼: 1:1 이메일 소통 창구 양식 */}
        <div className="content-card" id="inquiryAnchor">
          <div className="card-title">📮 Eat Pick 1:1 문의하기</div>
          <form id="csForm" onSubmit={handleFormSubmit}>
            
            <div className="form-group">
              <label htmlFor="category">문의 유형</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">유형을 선택해주세요</option>
                <option value="일반문의">일반문의</option>
                <option value="예약/방문">예약 및 방문 문의</option>
                <option value="오류제보">서비스 오류 제보</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div  className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="성함을 입력해주세요"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일 주소</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="답변받으실 이메일을 입력해주세요"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">문의 제목</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="제목을 입력해주세요"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              {/* 잘못된 마크업 요소를 수정한 표준 리액트 HTML 연동구조 */}
              <label htmlFor="message">문의 내용</label>
              <textarea
                id="message"
                name="message"
                placeholder="불편하신 점이나 제안 사항을 상세히 기술해 주시면 보다 빠른 답변이 가능합니다."
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              온라인 문의 제출하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
}