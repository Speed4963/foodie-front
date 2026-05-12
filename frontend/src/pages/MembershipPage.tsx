import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import './LoginPage.css'; // 로그인과 동일한 디자인 스타일 사용

export default function Membership() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);

  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // 타이틀 애니메이션 (로그인 페이지와 통일감)
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const text = "JOIN US";
    title.innerHTML = "";
    [...text].forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char === " " ? "\u00A0" : char;
      title.appendChild(span);
    });
    setTimeout(() => title.classList.add("active"), 100);
  }, []);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, nickname, password, confirmPassword } = formData;

    // 간단한 유효성 검사
    if (!email || !nickname || !password || !confirmPassword) {
      return alert("모든 항목을 입력해주세요.");
    }
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    setIsLoading(true);

    // 회원가입 처리 시뮬레이션
    console.log("회원가입 데이터:", formData);

    setTimeout(() => {
      setIsLoading(false);
      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate('/login'); // 가입 성공 후 로그인으로 이동
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="background-overlay" />

      <div className="login-content">
        <h1 ref={titleRef} className="login-title">JOIN US</h1>
        
        <div className="login-card">
          <form onSubmit={handleSignup} className="login-form">
            <div className="input-field">
              <input 
                name="email"
                type="email"
                placeholder="이메일 주소" 
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-field">
              <input 
                name="nickname"
                type="text"
                placeholder="닉네임" 
                value={formData.nickname}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-field">
              <input 
                name="password"
                type="password" 
                placeholder="비밀번호" 
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-field">
              <input 
                name="confirmPassword"
                type="password" 
                placeholder="비밀번호 확인" 
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "처리 중..." : "SIGN UP"}
            </button>

            <div className="form-footer">
              <button 
                type="button" 
                onClick={() => navigate('/login')} 
                className="link-btn"
              >
                이미 계정이 있으신가요? 로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}