import React, { useState } from 'react';
import { Mail, Lock, Loader2, AlertCircle, CheckCircle2, LogOut } from 'lucide-react';

// 1. 사용자 데이터의 타입을 정의합니다.
interface UserData {
  name: string;
  email: string;
}

// 상태(Status) 값들의 타입을 명확하게 지정합니다.
type Status = 'idle' | 'loading' | 'success' | 'error';

// 분리된 CSS 스타일
const cssStyles = `
/* 실제 프로젝트에서는 이 내용을 App.css 파일로 옮기고 
   최상단에 import './App.css'; 를 선언해서 사용하세요! */
.page-container {
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.login-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 28rem;
  border: 1px solid #f3f4f6;
}
.text-center { text-align: center; }
.mb-8 { margin-bottom: 2rem; }
.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}
.subtitle { color: #6b7280; }

.error-alert {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  align-items: flex-start;
}
.error-icon {
  color: #ef4444;
  margin-right: 0.75rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}
.error-text {
  font-size: 0.875rem;
  color: #b91c1c;
  line-height: 1.25;
}

.form-group { margin-bottom: 1.25rem; }
.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}
.input-wrapper { position: relative; }
.input-icon-wrapper {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  padding-left: 0.75rem;
  display: flex;
  align-items: center;
  pointer-events: none;
}
.input-icon { color: #9ca3af; width: 1.25rem; height: 1.25rem; }
.input-field {
  display: block;
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;
  box-sizing: border-box;
}
.input-field:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}
.input-field:disabled { opacity: 0.7; cursor: not-allowed; }

.options-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.checkbox-wrapper { display: flex; align-items: center; }
.checkbox-input {
  height: 1rem; width: 1rem;
  accent-color: #dc2626;
  cursor: pointer;
}
.checkbox-label {
  margin-left: 0.5rem;
  display: block;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}
.text-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #dc2626;
  text-decoration: none;
}
.text-link:hover { color: #ef4444; }

.submit-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #dc2626;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}
.submit-btn:hover:not(:disabled) { background-color: #b91c1c; }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.spinner-icon {
  margin-left: -0.25rem;
  margin-right: 0.5rem;
  height: 1.25rem;
  width: 1.25rem;
  animation: spin 1s linear infinite;
}
@keyframes spin { 100% { transform: rotate(360deg); } }

.footer-text {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563;
}

/* 로그인 성공 화면 전용 스타일 */
.success-page-container {
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.success-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 28rem;
  text-align: center;
}
.success-icon-wrapper {
  width: 4rem; height: 4rem;
  background-color: #dcfce7;
  color: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}
.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}
.success-text { color: #4b5563; margin-bottom: 1.5rem; }
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #1f2937;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}
.logout-btn:hover { background-color: #111827; }
.logout-icon { margin-right: 0.5rem; }
`;

export default function App() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // 2. userData가 null일 수도 있고, UserData 객체일 수도 있다고 제네릭으로 명시합니다. (오류 3 해결)
  const [userData, setUserData] = useState<UserData | null>(null);

  // 3. 이벤트(e)의 타입을 'Form 제출 이벤트'로 명시합니다. (오류 2 해결)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setStatus('error');
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // =====================================================================
      // 🚀 실제 백엔드 연동 코드 (실제 프로젝트에서는 아래 주석을 해제하고 사용하세요)
      // =====================================================================
      /*
      const response = await fetch('https://api.yourdomain.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인에 실패했습니다.');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.token);
      setUserData(data.user);
      setStatus('success');
      */
      
      // =====================================================================
      // 🛠️ 데모용 가짜 백엔드 통신
      // =====================================================================
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (email === 'test@example.com' && password === 'password123') {
        setUserData({ name: '테스트 유저', email: email });
        setStatus('success');
      } else {
        throw new Error('이메일이나 비밀번호가 일치하지 않습니다. (테스트 계정: test@example.com / password123)');
      }

    } catch (error) {
      setStatus('error');
      // 4. catch의 error는 'unknown' 타입이므로, Error 객체인지 확인(타입 가드) 후 처리합니다. (오류 1 해결)
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleLogout = () => {
    setUserData(null);
    setEmail('');
    setPassword('');
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <>
        <style>{cssStyles}</style>
        <div className="success-page-container">
          <div className="success-card">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="success-title">환영합니다!</h2>
            <p className="success-text">{userData?.name}님, 성공적으로 로그인되었습니다.</p>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} className="logout-icon" />
              로그아웃
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{cssStyles}</style>
      <div className="page-container">
        <div className="login-card">
          <div className="text-center mb-8">
            <h1 className="title">로그인</h1>
            <p className="subtitle">서비스 이용을 위해 로그인해주세요.</p>
          </div>

          {status === 'error' && (
            <div className="error-alert">
              <AlertCircle className="error-icon" size={18} />
              <p className="error-text">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="input-label" htmlFor="email">이메일 주소</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Mail className="input-icon" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="test@example.com"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="input-label" htmlFor="password">비밀번호</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Lock className="input-icon" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div className="options-container">
              <div className="checkbox-wrapper">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="checkbox-input"
                />
                <label htmlFor="remember-me" className="checkbox-label">로그인 유지</label>
              </div>
              <div>
                <a href="#" className="text-link">비밀번호 찾기</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="submit-btn"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="spinner-icon" />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          <div className="footer-text">
            계정이 없으신가요?{' '}
            <a href="#" className="text-link">회원가입 하기</a>
          </div>
        </div>
      </div>
    </>
  );
}