// import React, { useState } from 'react';
// import { Mail, Lock, Loader2, AlertCircle, CheckCircle2, LogOut } from 'lucide-react';
// import '../Login.css'

// /**
//  * 백엔드 MemberDto 스펙에 맞춘 유저 데이터 인터페이스
//  */
// interface UserData {
//   email: string;
//   nickname: string; // MemberDto의 nickname 필드와 매칭
//   accessToken?: string;
//   role?: string;
//   isBanned?: boolean;
//   createdAt?: string;
// }

// type Status = 'idle' | 'loading' | 'success' | 'error';

// export default function App() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [status, setStatus] = useState<Status>('idle');
//   const [errorMessage, setErrorMessage] = useState<string>('');
//   const [userData, setUserData] = useState<UserData | null>(null);

//   /**
//    * 로그인 핸들러
//    * MemberController의 /api/member/login 엔드포인트와 통신합니다.
//    */
//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
// //     if (!email || !password) {
// //       setStatus('error');
// //       setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
// //       return;
// //     }

// //     setStatus('loading');
// //     setErrorMessage('');

//     try {
//       const response = await fetch('/api/member/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // [중요] HttpOnly 쿠키(JWT)를 브라우저에 저장하기 위해 필수 설정
//         credentials: 'include', 
//         body: JSON.stringify({ 
//           email: email, 
//           password: password,
//           nickname: "" // MemberDto의 @NotBlank 검증 통과를 위한 빈 값 (로그인 시엔 무시됨)
//         }),
//       });

//       // 403 Forbidden: SecurityConfig 설정 확인 필요
//       if (response.status === 403) {
//         throw new Error('접근 권한이 없습니다. 서버 설정을 확인해주세요.');
//       }

//       if (!response.ok) {
//         // 백엔드에서 보낸 에러 메시지 추출 시도
//         const errorData = await response.json().catch(() => ({}));
//         if (response.status === 401) {
//           throw new Error('이메일이나 비밀번호가 일치하지 않습니다.');
//         }
//         throw new Error(errorData.message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
//       }

//       // MemberDto 데이터를 JSON으로 파싱
//       const data: UserData = await response.json();
      
//       setUserData(data);
//       setStatus('success');

//     } catch (error) {
//       console.error('Login Error:', error);
//       setStatus('error');
//       if (error instanceof Error) {
//         setErrorMessage(error.message);
//       } else {
//         setErrorMessage('연결 중 알 수 없는 오류가 발생했습니다.');
//       }
//     }
//   };

//   /**
//    * 로그아웃 핸들러
//    * 서버의 HttpOnly JWT 쿠키를 제거하기 위해 /api/member/logout 호출
//    */
//   const handleLogout = async () => {
//     try {
//       await fetch('/api/member/logout', { 
//         method: 'POST',
//         credentials: 'include' 
//       });
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       // 클라이언트 상태 초기화
//       setUserData(null);
//       setEmail('');
//       setPassword('');
//       setStatus('idle');
//     }
//   };

//   // 로그인 성공 시 표시되는 화면
//   if (status === 'success') {
//     return (
//       <div className="success-page-container">
//         <div className="success-card">
//           <div className="success-icon-wrapper">
//             <CheckCircle2 size={32} />
//           </div>
//           <h2 className="success-title">환영합니다!</h2>
//           <p className="success-text">
//             <strong>{userData?.nickname}</strong>님, 성공적으로 로그인되었습니다.
//           </p>
//           <button onClick={handleLogout} className="logout-btn">
//             <LogOut size={18} className="logout-icon" />
//             로그아웃
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // 로그인 폼 레이아웃
//   return (
//     <div className="page-container">
//       <div className="login-card">
//         <div className="text-center mb-8">
//           <h1 className="title">로그인</h1>
//           <p className="subtitle">서비스 이용을 위해 로그인해주세요.</p>
//         </div>

//         {status === 'error' && (
//           <div className="error-alert">
//             <AlertCircle className="error-icon" size={18} />
//             <p className="error-text">{errorMessage}</p>
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label className="input-label" htmlFor="email">이메일 주소</label>
//             <div className="input-wrapper">
//               <div className="input-icon-wrapper">
//                 <Mail className="input-icon" />
//               </div>
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input-field"
//                 placeholder="example@email.com"
//                 disabled={status === 'loading'}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="input-label" htmlFor="password">비밀번호</label>
//             <div className="input-wrapper">
//               <div className="input-icon-wrapper">
//                 <Lock className="input-icon" />
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input-field"
//                 placeholder="••••••••"
//                 disabled={status === 'loading'}
//               />
//             </div>
//           </div>

//           <div className="options-container">
//             <div className="checkbox-wrapper">
//               <input
//                 id="remember-me"
//                 type="checkbox"
//                 className="checkbox-input"
//               />
//               <label htmlFor="remember-me" className="checkbox-label">로그인 유지</label>
//             </div>
//             <div>
//               <a href="#" className="text-link">비밀번호 찾기</a>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={status === 'loading'}
//             className="submit-btn"
//           >
//             {status === 'loading' ? (
//               <>
//                 <Loader2 className="spinner-icon animate-spin" />
//                 로그인 중...
//               </>
//             ) : (
//               '로그인'
//             )}
//           </button>
//         </form>

//         <div className="footer-text">
//           계정이 없으신가요?{' '}
//           <a href="/membership" className="text-link">회원가입 하기</a>
//         </div>
//       </div>
//     </div>
//   );
// }
