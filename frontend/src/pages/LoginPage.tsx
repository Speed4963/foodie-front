import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 라우터 이동을 위한 훅 임포트
// import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate(); // 페이지 이동 함수 초기화
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 타이틀 한 글자씩 나타나는 애니메이션 로직
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    
    const originalText = title.innerText;
    title.innerHTML = ""; 
    
    [...originalText].forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char === " " ? "\u00A0" : char;
      title.appendChild(span);
    });

    setTimeout(() => title.classList.add("active"), 100);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("이메일과 비밀번호를 모두 입력해주세요.");
    
    setIsLoading(true);
    
    // 로그인 처리 시뮬레이션
    console.log("로그인 시도 데이터:", { email, password });
    
    setTimeout(() => {
      setIsLoading(false);
      alert("로그인 되었습니다.");
      
      // ✅ 라우터의 navigate를 사용하여 홈('/')으로 이동
      navigate('/'); 
    }, 600);
  };

  return (
    <div className="login-container">
      <div className="background-overlay" />

      <div className="login-content">
        <h1 ref={titleRef} className="login-title">WELCOME</h1>
        
        <div className="login-card">
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-field">
              <input 
                type="email"
                placeholder="이메일" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-field">
              <input 
                type="password" 
                placeholder="비밀번호" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                disabled={isLoading}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "연결 중..." : "LOGIN"}
            </button>

            <div className="form-footer">
              <button 
                type="button" 
                onClick={() => navigate('/membership')} // ✅ 회원가입 경로로 이동
                className="link-btn"
              >
                아직 회원이 아니신가요? 회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}