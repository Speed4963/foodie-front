import { useState } from 'react';

type PageId =
  | 'dashboard'
  | 'stats'
  | 'restaurants'
  | 'categories'
  | 'reviews'
  | 'notices'
  | 'members'
  | 'reports'
  | 'inquiry';

interface NavItemProps {
  id: PageId;
  activePage: PageId;
  onClick: (id: PageId) => void;
  icon: React.ReactNode;
  badge?: number;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ id, activePage, onClick, icon, badge, children }) => {
  const isActive = activePage === id;
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        padding: '8px 9px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background 0.12s, color 0.12s',
        color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
        fontSize: '13px',
        marginBottom: '1px',
        border: 'none',
        background: isActive ? '#3b82f6' : 'none',
        width: '100%',
        textAlign: 'left',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)';
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'none';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)';
        }
      }}
    >
      <span style={{ fontSize: '16px', flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{children}</span>
      {badge !== undefined && badge > 0 && (
        <span style={{
          fontSize: '10px',
          background: 'rgba(239,68,68,0.85)',
          color: '#fff',
          padding: '1px 6px',
          borderRadius: '10px',
          fontWeight: 500,
        }}>
          {badge}
        </span>
      )}
    </button>
  );
};

// ── 아이콘 SVG ──────────────────────────────────────────────
const Icons: Record<string, React.ReactNode> = {
  dashboard: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  stats:      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  restaurant: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  category:   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  review:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  notice:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3z"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  member:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  report:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  inquiry:    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  tool:       <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
};

// ── 배지 컴포넌트 ────────────────────────────────────────────
type BadgeVariant = 'green' | 'amber' | 'red' | 'blue';
const Badge: React.FC<{ variant: BadgeVariant; children: React.ReactNode }> = ({ variant, children }) => {
  const styles: Record<BadgeVariant, React.CSSProperties> = {
    green: { background: '#d1fae5', color: '#065f46' },
    amber: { background: '#fef3c7', color: '#92400e' },
    red:   { background: '#fee2e2', color: '#991b1b' },
    blue:  { background: '#dbeafe', color: '#1e40af' },
  };
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '10.5px',
      padding: '2px 7px',
      borderRadius: '20px',
      fontWeight: 500,
      ...styles[variant],
    }}>
      {children}
    </span>
  );
};

// ── 테이블 카드 ──────────────────────────────────────────────
const TableCard: React.FC<{ title: string; action?: React.ReactNode; children: React.ReactNode }> = ({ title, action, children }) => (
  <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
    <div style={{ padding: '10px 16px', borderBottom: '0.5px solid #e5e7eb', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>{title}</span>
      {action}
    </div>
    <div style={{ overflowX: 'auto' }}>
      {children}
    </div>
  </div>
);

const Th: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th style={{ padding: '7px 16px', textAlign: 'left', color: '#6b7280', fontWeight: 500, background: '#f9fafb', borderBottom: '0.5px solid #e5e7eb', fontSize: '12px', whiteSpace: 'nowrap' }}>{children}</th>
);
const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td style={{ padding: '8px 16px', color: '#111827', borderBottom: '0.5px solid #e5e7eb', fontSize: '12px', whiteSpace: 'nowrap' }}>{children}</td>
);

// ── 통계 카드 ────────────────────────────────────────────────
const StatCard: React.FC<{ label: string; value: string; change: string; changeColor?: string }> = ({ label, value, change, changeColor = '#059669' }) => (
  <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: '8px', padding: '12px 16px' }}>
    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '5px' }}>{label}</div>
    <div style={{ fontSize: '22px', fontWeight: 500, color: '#111827' }}>{value}</div>
    <div style={{ fontSize: '11px', marginTop: '3px', color: changeColor }}>{change}</div>
  </div>
);

// ── 바 차트 행 ────────────────────────────────────────────────
const BarRow: React.FC<{ label: string; pct: number; value: string; color?: string }> = ({ label, pct, value, color = '#3b82f6' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
    <span style={{ fontSize: '11px', color: '#6b7280', width: '52px', flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '3px', height: '8px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '8px', borderRadius: '3px', background: color }} />
    </div>
    <span style={{ fontSize: '11px', color: '#6b7280', width: '30px', textAlign: 'right', flexShrink: 0 }}>{value}</span>
  </div>
);

// ── 페이지 콘텐츠 ─────────────────────────────────────────────
const PageContent: React.FC<{ page: PageId }> = ({ page }) => {
  const addBtn = (label: string) => (
    <button style={{ fontSize: '11px', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', border: 'none', padding: '4px 9px', borderRadius: '5px', cursor: 'pointer' }}>
      {label}
    </button>
  );

  switch (page) {
    case 'dashboard':
      return (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '14px' }}>
            <StatCard label="등록 맛집" value="128" change="↑ 이번 달 +12" />
            <StatCard label="전체 회원" value="3,241" change="↑ 이번 달 +87" />
            <StatCard label="처리 대기" value="10" change="신고 5 · 문의 2 · 리뷰 3" changeColor="#d97706" />
          </div>
          <TableCard title="최근 등록 맛집" action={<span style={{ fontSize: '11px', color: '#6b7280' }}>최근 5건</span>}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><Th>이름</Th><Th>카테고리</Th><Th>지역</Th><Th>상태</Th></tr></thead>
              <tbody>
                <tr><Td>진미반점</Td><Td>중식</Td><Td>강남구</Td><Td><Badge variant="green">등록됨</Badge></Td></tr>
                <tr><Td>스시하나</Td><Td>일식</Td><Td>마포구</Td><Td><Badge variant="green">등록됨</Badge></Td></tr>
                <tr><Td>한우마을</Td><Td>한식</Td><Td>용산구</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
                <tr><Td>파스타나라</Td><Td>양식</Td><Td>서초구</Td><Td><Badge variant="green">등록됨</Badge></Td></tr>
                <tr><Td>버거하우스</Td><Td>패스트푸드</Td><Td>종로구</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
              </tbody>
            </table>
          </TableCard>
        </>
      );

    case 'stats':
      return (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: '8px', padding: '14px 16px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 500, marginBottom: '12px', color: '#111827' }}>카테고리별 맛집 수</div>
              <BarRow label="한식" pct={82} value="42" />
              <BarRow label="일식" pct={49} value="25" />
              <BarRow label="중식" pct={35} value="18" />
              <BarRow label="양식" pct={29} value="15" />
              <BarRow label="기타" pct={22} value="11" />
            </div>
            <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: '8px', padding: '14px 16px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 500, marginBottom: '12px', color: '#111827' }}>월별 신규 회원</div>
              <BarRow label="1월" pct={45} value="54" color="#6366f1" />
              <BarRow label="2월" pct={60} value="72" color="#6366f1" />
              <BarRow label="3월" pct={55} value="66" color="#6366f1" />
              <BarRow label="4월" pct={72} value="87" color="#6366f1" />
              <BarRow label="5월" pct={68} value="82" color="#6366f1" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
            <StatCard label="이번 달 방문자" value="12,430" change="↑ 지난달 대비 +8%" />
            <StatCard label="평균 평점" value="4.3" change="전체 리뷰 기준" changeColor="#6b7280" />
            <StatCard label="총 리뷰 수" value="8,912" change="↑ 이번 달 +203" />
          </div>
        </>
      );

    case 'restaurants':
      return (
        <TableCard title="맛집 목록" action={addBtn('+ 새 맛집 추가')}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><Th>이름</Th><Th>카테고리</Th><Th>지역</Th><Th>평점</Th><Th>상태</Th></tr></thead>
            <tbody>
              <tr><Td>진미반점</Td><Td>중식</Td><Td>강남구</Td><Td>4.5</Td><Td><Badge variant="green">등록됨</Badge></Td></tr>
              <tr><Td>스시하나</Td><Td>일식</Td><Td>마포구</Td><Td>4.8</Td><Td><Badge variant="green">등록됨</Badge></Td></tr>
              <tr><Td>한우마을</Td><Td>한식</Td><Td>용산구</Td><Td>4.2</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
              <tr><Td>파스타나라</Td><Td>양식</Td><Td>서초구</Td><Td>4.0</Td><Td><Badge variant="green">등록됨</Badge></Td></tr>
              <tr><Td>버거하우스</Td><Td>패스트푸드</Td><Td>종로구</Td><Td>3.9</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
              <tr><Td>삼겹살집</Td><Td>한식</Td><Td>은평구</Td><Td>4.6</Td><Td><Badge variant="green">등록됨</Badge></Td></tr>
            </tbody>
          </table>
        </TableCard>
      );

    case 'categories':
      return (
        <TableCard title="카테고리 목록" action={addBtn('+ 카테고리 추가')}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><Th>카테고리명</Th><Th>등록 맛집 수</Th><Th>상태</Th></tr></thead>
            <tbody>
              {[['한식','42','green'],['중식','18','green'],['일식','25','green'],['양식','15','green'],['패스트푸드','12','green'],['채식','6','amber'],['디저트','8','green'],['이색음식','2','amber']].map(([name,count,v])=>(
                <tr key={name}><Td>{name}</Td><Td>{count}</Td><Td><Badge variant={v as BadgeVariant}>{v==='green'?'활성':'비활성'}</Badge></Td></tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      );

    case 'reviews':
      return (
        <TableCard title="리뷰 목록" action={<span style={{ fontSize: '11px', color: '#dc2626' }}>검토 대기 3건</span>}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><Th>작성자</Th><Th>맛집</Th><Th>내용 요약</Th><Th>평점</Th><Th>상태</Th></tr></thead>
            <tbody>
              <tr><Td>김철수</Td><Td>진미반점</Td><Td>맛있어요 또 올게요</Td><Td>⭐ 5.0</Td><Td><Badge variant="green">승인됨</Badge></Td></tr>
              <tr><Td>이영희</Td><Td>스시하나</Td><Td>가격 대비 별로예요</Td><Td>⭐ 2.0</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
              <tr><Td>박민준</Td><Td>한우마을</Td><Td>광고성 내용 포함 의심</Td><Td>⭐ 5.0</Td><Td><Badge variant="red">신고됨</Badge></Td></tr>
              <tr><Td>최지은</Td><Td>파스타나라</Td><Td>분위기 좋고 맛도 좋아요</Td><Td>⭐ 4.0</Td><Td><Badge variant="green">승인됨</Badge></Td></tr>
              <tr><Td>정호진</Td><Td>삼겹살집</Td><Td>불쾌한 표현 포함</Td><Td>⭐ 1.0</Td><Td><Badge variant="red">신고됨</Badge></Td></tr>
            </tbody>
          </table>
        </TableCard>
      );

    case 'notices':
      return (
        <TableCard title="공지사항 목록" action={addBtn('+ 공지 작성')}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><Th>제목</Th><Th>작성일</Th><Th>조회수</Th><Th>상태</Th></tr></thead>
            <tbody>
              <tr><Td>서비스 점검 안내 (5/20)</Td><Td>2025.05.15</Td><Td>1,203</Td><Td><Badge variant="blue">게시중</Badge></Td></tr>
              <tr><Td>신규 카테고리 추가 안내</Td><Td>2025.05.10</Td><Td>892</Td><Td><Badge variant="blue">게시중</Badge></Td></tr>
              <tr><Td>이용약관 변경 안내</Td><Td>2025.04.28</Td><Td>2,451</Td><Td><Badge variant="green">완료</Badge></Td></tr>
              <tr><Td>앱 업데이트 v2.3.0</Td><Td>2025.04.15</Td><Td>1,874</Td><Td><Badge variant="green">완료</Badge></Td></tr>
            </tbody>
          </table>
        </TableCard>
      );

    case 'members':
      return (
        <TableCard title="회원 목록" action={<span style={{ fontSize: '11px', color: '#6b7280' }}>총 3,241명</span>}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><Th>닉네임</Th><Th>이메일</Th><Th>가입일</Th><Th>리뷰 수</Th><Th>상태</Th></tr></thead>
            <tbody>
              <tr><Td>맛집탐험가</Td><Td>user1@email.com</Td><Td>2024.03.12</Td><Td>42</Td><Td><Badge variant="green">정상</Badge></Td></tr>
              <tr><Td>서울미식가</Td><Td>user2@email.com</Td><Td>2024.05.20</Td><Td>18</Td><Td><Badge variant="green">정상</Badge></Td></tr>
              <tr><Td>리뷰킹</Td><Td>user3@email.com</Td><Td>2024.07.04</Td><Td>87</Td><Td><Badge variant="amber">주의</Badge></Td></tr>
              <tr><Td>foodlover</Td><Td>user4@email.com</Td><Td>2024.09.18</Td><Td>5</Td><Td><Badge variant="green">정상</Badge></Td></tr>
              <tr><Td>스팸계정123</Td><Td>spam@email.com</Td><Td>2025.01.02</Td><Td>0</Td><Td><Badge variant="red">정지됨</Badge></Td></tr>
            </tbody>
          </table>
        </TableCard>
      );

    case 'reports':
      return (
        <TableCard title="신고 목록" action={<span style={{ fontSize: '11px', color: '#dc2626' }}>미처리 5건</span>}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><Th>신고자</Th><Th>신고 대상</Th><Th>사유</Th><Th>신고일</Th><Th>상태</Th></tr></thead>
            <tbody>
              <tr><Td>김철수</Td><Td>리뷰 #2841</Td><Td>허위 정보</Td><Td>05.18</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
              <tr><Td>이영희</Td><Td>리뷰 #2799</Td><Td>욕설/비방</Td><Td>05.17</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
              <tr><Td>박민준</Td><Td>맛집 #124</Td><Td>광고성 게시물</Td><Td>05.16</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
              <tr><Td>최지은</Td><Td>회원 스팸계정123</Td><Td>스팸 활동</Td><Td>05.15</Td><Td><Badge variant="green">처리완료</Badge></Td></tr>
              <tr><Td>정호진</Td><Td>리뷰 #2750</Td><Td>개인정보 노출</Td><Td>05.14</Td><Td><Badge variant="amber">검토중</Badge></Td></tr>
            </tbody>
          </table>
        </TableCard>
      );

    case 'inquiry':
      return (
        <TableCard title="문의 목록" action={<span style={{ fontSize: '11px', color: '#dc2626' }}>미답변 2건</span>}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><Th>작성자</Th><Th>제목</Th><Th>문의일</Th><Th>상태</Th></tr></thead>
            <tbody>
              <tr><Td>김철수</Td><Td>맛집 등록 방법이 궁금해요</Td><Td>05.18</Td><Td><Badge variant="amber">미답변</Badge></Td></tr>
              <tr><Td>이영희</Td><Td>리뷰 삭제 요청</Td><Td>05.17</Td><Td><Badge variant="amber">미답변</Badge></Td></tr>
              <tr><Td>박민준</Td><Td>회원 탈퇴 처리 요청</Td><Td>05.15</Td><Td><Badge variant="green">답변완료</Badge></Td></tr>
              <tr><Td>최지은</Td><Td>평점 오류 신고</Td><Td>05.12</Td><Td><Badge variant="green">답변완료</Badge></Td></tr>
              <tr><Td>정호진</Td><Td>앱 로그인 오류</Td><Td>05.10</Td><Td><Badge variant="green">답변완료</Badge></Td></tr>
            </tbody>
          </table>
        </TableCard>
      );
  }
};

// ── 페이지 메타 ───────────────────────────────────────────────
const pageMeta: Record<PageId, { title: string; sub: string }> = {
  dashboard:   { title: '대시보드',          sub: '전체 현황을 확인하세요' },
  stats:       { title: '통계 / 분석',       sub: '서비스 지표를 확인하세요' },
  restaurants: { title: '맛집 관리',         sub: '등록된 맛집을 관리하세요' },
  categories:  { title: '카테고리 관리',     sub: '맛집 분류 카테고리를 관리하세요' },
  reviews:     { title: '댓글 / 리뷰 관리', sub: '사용자 리뷰를 검토하고 관리하세요' },
  notices:     { title: '공지사항 관리',     sub: '공지사항을 작성하고 관리하세요' },
  members:     { title: '회원 관리',         sub: '가입 회원을 조회하고 관리하세요' },
  reports:     { title: '신고 관리',         sub: '접수된 신고를 검토하고 처리하세요' },
  inquiry:     { title: '문의 관리',         sub: '사용자 문의를 확인하고 답변하세요' },
};

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function Manager() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const { title, sub } = pageMeta[activePage];

  const navLabelStyle: React.CSSProperties = {
    fontSize: '9.5px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '10px 8px 5px',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* ── 사이드바 ── */}
      <aside style={{
        width: '220px',
        background: '#16162a',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}>
        {/* 헤더 */}
        <div style={{ padding: '18px 14px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {Icons.tool}
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 500, color: '#fff' }}>관리자페이지</div>
              <div style={{ fontSize: '9px', color: '#60a5fa', background: 'rgba(59,130,246,0.15)', padding: '1px 5px', borderRadius: '3px', marginTop: '2px', width: 'fit-content' }}>Admin</div>
            </div>
          </div>
        </div>

        {/* 네비게이션 */}
        <nav style={{ padding: '10px 6px', flex: 1 }}>
          <div style={{ marginBottom: '4px' }}>
            <div style={navLabelStyle}>개요</div>
            <NavItem id="dashboard" activePage={activePage} onClick={setActivePage} icon={Icons.dashboard}>대시보드</NavItem>
            <NavItem id="stats"     activePage={activePage} onClick={setActivePage} icon={Icons.stats}>통계 / 분석</NavItem>
          </div>
          <div style={{ marginBottom: '4px' }}>
            <div style={navLabelStyle}>콘텐츠</div>
            <NavItem id="restaurants" activePage={activePage} onClick={setActivePage} icon={Icons.restaurant}>맛집 관리</NavItem>
            <NavItem id="categories"  activePage={activePage} onClick={setActivePage} icon={Icons.category}>카테고리 관리</NavItem>
            <NavItem id="reviews"     activePage={activePage} onClick={setActivePage} icon={Icons.review} badge={3}>댓글 / 리뷰 관리</NavItem>
            <NavItem id="notices"     activePage={activePage} onClick={setActivePage} icon={Icons.notice}>공지사항 관리</NavItem>
          </div>
          <div>
            <div style={navLabelStyle}>사용자</div>
            <NavItem id="members" activePage={activePage} onClick={setActivePage} icon={Icons.member}>회원 관리</NavItem>
            <NavItem id="reports" activePage={activePage} onClick={setActivePage} icon={Icons.report} badge={5}>신고 관리</NavItem>
            <NavItem id="inquiry" activePage={activePage} onClick={setActivePage} icon={Icons.inquiry} badge={2}>문의 관리</NavItem>
          </div>
        </nav>

        {/* 푸터 */}
        <div style={{ padding: '10px 6px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 500, color: '#60a5fa', flexShrink: 0 }}>관</div>
            <div>
              <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>관리자</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── 메인 콘텐츠 ── */}
      <main style={{ flex: 1, background: '#f3f4f6', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* 탑바 */}
        <div style={{ padding: '14px 20px', background: '#fff', borderBottom: '0.5px solid #e5e7eb', flexShrink: 0 }}>
          <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>{title}</div>
          <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '2px' }}>{sub}</div>
        </div>

        {/* 콘텐츠 */}
        <div style={{ padding: '18px 20px', flex: 1, overflowY: 'auto' }}>
          <PageContent page={activePage} />
        </div>
      </main>
    </div>
  );
}






