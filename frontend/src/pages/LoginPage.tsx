import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  LogOut,
  Home,
} from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import "../Login.css";

type RoleType = 'USER' | 'EDITOR' | 'ADMIN';

interface UserData {
  email: string;
  nickname: string;
  role?: RoleType;
  isBanned?: boolean;
}

type Status = "idle" | "loading" | "success" | "error";

export default function LoginPage() {
  const { loginContext, logoutContext } = useContext(AuthContext) || {
    loginContext: () => {},
    logoutContext: () => {},
  };
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 서버 로그인 요청
      const response = await fetch("http://43.203.165.206:8080/api/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 💡 쿠키 자동 처리를 위한 필수 옵션
        body: JSON.stringify({ email, password, nickname: "" }),
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("이메일이나 비밀번호가 일치하지 않습니다.");
        throw new Error("서버 오류가 발생했습니다.");
      }

      const data: UserData = await response.json();
      console.log("확인: 서버에서 받은 데이터", data);

      // Context 상태 업데이트 (토큰은 쿠키로 자동 처리되므로 상태만 저장)
      if (loginContext) {
        loginContext({ 
          email: data.email, 
          nickname: data.nickname, 
          role: data.role || 'USER',
          isBanned: data.isBanned || false 
        });
      }

      setUserData(data);
      setStatus("success");

    } catch (error) {
      console.error("Login Error:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "연결 중 알 수 없는 오류가 발생했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://43.203.165.206:8080/api/member/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logoutContext(); // 컨텍스트 로그아웃
      setUserData(null);
      setEmail("");
      setPassword("");
      setStatus("idle");
    }
  };
  // 로그인 성공 시 표시되는 화면
  if (status === "success") {
    return (
      <div className="success-page-container">
        <div className="success-card">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="success-title">환영합니다!</h2>
          <p className="success-text">
            <strong>{userData?.nickname}</strong>님, 성공적으로 로그인되었습니다.
          </p>
          <div
            className="button-group"
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button onClick={() => navigate("/")} className="home-btn">
              <Home size={18} />
              홈으로
            </button>

            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              로그아웃
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 로그인 폼 레이아웃
  return (
    <div className="page-container">
      <div className="login-card">
        <div className="text-center mb-8">
          <h1 className="title">로그인</h1>
          <p className="subtitle">서비스 이용을 위해 로그인해주세요.</p>
        </div>

        {status === "error" && (
          <div className="error-alert">
            <AlertCircle className="error-icon" size={18} />
            <p className="error-text">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="input-label" htmlFor="email">
              이메일 주소
            </label>
            <div className="input-wrapper">
              <div className="input-icon-wrapper">
                <Mail className="input-icon" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="example@email.com"
                disabled={status === "loading"}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="password">
              비밀번호
            </label>
            <div className="input-wrapper">
              <div className="input-icon-wrapper">
                <Lock className="input-icon" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                disabled={status === "loading"}
              />
            </div>
          </div>

          <div className="options-container">
            <div className="checkbox-wrapper">
              <input
                id="remember-me"
                type="checkbox"
                className="checkbox-input"
              />
              <label htmlFor="remember-me" className="checkbox-label">
                로그인 유지
              </label>
            </div>
            <div>
              <a href="#" className="text-link">
                비밀번호 찾기
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="submit-btn"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="spinner-icon animate-spin" />
                로그인 중...
              </>
            ) : (
              "로그인"
            )}
          </button>
        </form>

        <div className="footer-text">
          계정이 없으신가요?{" "}
          <a href="/membership" className="text-link">
            회원가입 하기
          </a>
        </div>
      </div>
    </div>
  );
}