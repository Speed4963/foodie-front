import { useState, useRef } from 'react';

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
        display: 'flex', alignItems: 'center', gap: '9px',
        padding: '8px 9px', borderRadius: '6px', cursor: 'pointer',
        transition: 'background 0.12s, color 0.12s',
        color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
        fontSize: '13px', marginBottom: '1px', border: 'none',
        background: isActive ? '#3b82f6' : 'none', width: '100%', textAlign: 'left',
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
        <span style={{ fontSize: '10px', background: 'rgba(239,68,68,0.85)', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontWeight: 500 }}>
          {badge}
        </span>
      )}
    </button>
  );
};

const Icons: Record<string, React.ReactNode> = {
  dashboard:  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
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

type BadgeVariant = 'green' | 'amber' | 'red' | 'blue';
const Badge: React.FC<{ variant: BadgeVariant; children: React.ReactNode }> = ({ variant, children }) => {
  const styles: Record<BadgeVariant, React.CSSProperties> = {
    green: { background: '#d1fae5', color: '#065f46' },
    amber: { background: '#fef3c7', color: '#92400e' },
    red:   { background: '#fee2e2', color: '#991b1b' },
    blue:  { background: '#dbeafe', color: '#1e40af' },
  };
  return (
    <span style={{ display: 'inline-block', fontSize: '10.5px', padding: '2px 7px', borderRadius: '20px', fontWeight: 500, ...styles[variant] }}>
      {children}
    </span>
  );
};

const TableCard: React.FC<{ title: string; action?: React.ReactNode; children: React.ReactNode }> = ({ title, action, children }) => (
  <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
    <div style={{ padding: '10px 16px', borderBottom: '0.5px solid #e5e7eb', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>{title}</span>
      {action}
    </div>
    <div style={{ overflowX: 'auto' }}>{children}</div>
  </div>
);

const Th: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th style={{ padding: '7px 16px', textAlign: 'left', color: '#6b7280', fontWeight: 500, background: '#f9fafb', borderBottom: '0.5px solid #e5e7eb', fontSize: '12px', whiteSpace: 'nowrap' }}>{children}</th>
);
const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td style={{ padding: '8px 16px', color: '#111827', borderBottom: '0.5px solid #e5e7eb', fontSize: '12px', whiteSpace: 'nowrap' }}>{children}</td>
);

const StatCard: React.FC<{ label: string; value: string; change: string; changeColor?: string }> = ({ label, value, change, changeColor = '#059669' }) => (
  <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: '8px', padding: '12px 16px' }}>
    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '5px' }}>{label}</div>
    <div style={{ fontSize: '22px', fontWeight: 500, color: '#111827' }}>{value}</div>
    <div style={{ fontSize: '11px', marginTop: '3px', color: changeColor }}>{change}</div>
  </div>
);

const BarRow: React.FC<{ label: string; pct: number; value: string; color?: string }> = ({ label, pct, value, color = '#3b82f6' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
    <span style={{ fontSize: '11px', color: '#6b7280', width: '52px', flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '3px', height: '8px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '8px', borderRadius: '3px', background: color }} />
    </div>
    <span style={{ fontSize: '11px', color: '#6b7280', width: '30px', textAlign: 'right', flexShrink: 0 }}>{value}</span>
  </div>
);

// ── 메뉴 아이템 타입 ──────────────────────────────────────────
interface MenuItem {
  id: number;
  name: string;
  price: string;
}

interface PhotoPreview {
  id: number;
  url: string;
  file: File;
}

// ── 공지사항 작성 모달 ────────────────────────────────────────
interface NoticeFormData {
  title: string;
  content: string;
  status: '게시중' | '완료';
}

const AddNoticeModal: React.FC<{ onClose: () => void; onSave: (data: NoticeFormData) => void }> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'게시중' | '완료'>('게시중');

  const handleSave = () => {
    if (!title.trim()) { alert('제목을 입력해주세요.'); return; }
    if (!content.trim()) { alert('내용을 입력해주세요.'); return; }
    onSave({ title, content, status });
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    fontSize: '13px', padding: '8px 10px', borderRadius: '6px',
    border: '1px solid #e5e7eb', background: '#fff', color: '#111827',
    width: '100%', outline: 'none', fontFamily: 'sans-serif',
    transition: 'border-color 0.15s', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#6b7280', marginBottom: '5px', display: 'block' };
  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '10px', fontWeight: 600, color: '#9ca3af',
    letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        zIndex: 1000, padding: '24px 16px', overflowY: 'auto',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '12px', border: '0.5px solid #e5e7eb',
          width: '100%', maxWidth: '520px', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.2s ease',
        }}
      >
        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          .notice-input:focus { border-color: #3b82f6 !important; }
          .notice-pill:hover { opacity: 0.85; }
        `}</style>

        {/* 헤더 */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3z"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>공지사항 작성</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* 바디 */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={sectionLabelStyle}>공지 내용</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={labelStyle}>제목 *</label>
                <input
                  className="notice-input"
                  style={inputStyle}
                  type="text"
                  placeholder="공지사항 제목을 입력하세요"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>내용 *</label>
                <textarea
                  className="notice-input"
                  style={{ ...inputStyle, minHeight: '120px', resize: 'vertical', lineHeight: '1.5' }}
                  placeholder="공지사항 내용을 입력하세요"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: '#f3f4f6' }} />

          <div>
            <p style={sectionLabelStyle}>게시 상태</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['게시중', '완료'] as const).map(s => (
                <button
                  key={s}
                  className="notice-pill"
                  onClick={() => setStatus(s)}
                  style={{
                    padding: '7px 16px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontFamily: 'sans-serif',
                    border: status === s
                      ? (s === '게시중' ? '1.5px solid #3b82f6' : '1.5px solid #059669')
                      : '1px solid #e5e7eb',
                    background: status === s
                      ? (s === '게시중' ? '#eff6ff' : '#d1fae5')
                      : '#fff',
                    color: status === s
                      ? (s === '게시중' ? '#1d4ed8' : '#065f46')
                      : '#6b7280',
                    fontWeight: status === s ? 500 : 400,
                    transition: 'all 0.12s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: '8px', background: '#fafafa' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer', fontFamily: 'sans-serif' }}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            style={{ padding: '8px 20px', fontSize: '13px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontWeight: 500, fontFamily: 'sans-serif' }}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

// ── 맛집 추가 모달 ────────────────────────────────────────────
const AddRestaurantModal: React.FC<{ onClose: () => void; onSave: (data: RestaurantFormData) => void }> = ({ onClose, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [holiday, setHoliday] = useState('');
  const [status, setStatus] = useState<'등록됨' | '검토중'>('등록됨');
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([{ id: 1, name: '', price: '' }]);
  const [hours, setHours] = useState({
    weekdayOpen: '11:00', weekdayClose: '22:00',
    satOpen: '11:00', satClose: '22:00',
    sunOpen: '11:00', sunClose: '21:00',
  });
  const [nextPhotoId, setNextPhotoId] = useState(1);
  const [nextMenuId, setNextMenuId] = useState(2);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      setPhotos(prev => [...prev, { id: nextPhotoId, url, file }]);
      setNextPhotoId(n => n + 1);
    });
  };

  const removePhoto = (id: number) => setPhotos(prev => prev.filter(p => p.id !== id));

  const addMenu = () => {
    setMenuItems(prev => [...prev, { id: nextMenuId, name: '', price: '' }]);
    setNextMenuId(n => n + 1);
  };

  const removeMenu = (id: number) => setMenuItems(prev => prev.filter(m => m.id !== id));

  const updateMenu = (id: number, field: 'name' | 'price', val: string) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m));
  };

  const handleSave = () => {
    if (!name.trim()) { alert('가게 이름을 입력해주세요.'); return; }
    onSave({ name, category, rating, district, address, phone, hours, breakTime, holiday, status, menuItems, photos });
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    fontSize: '13px', padding: '8px 10px', borderRadius: '6px',
    border: '1px solid #e5e7eb', background: '#fff', color: '#111827',
    width: '100%', outline: 'none', fontFamily: 'sans-serif',
    transition: 'border-color 0.15s',
  };
  const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#6b7280', marginBottom: '5px', display: 'block' };
  const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '4px' };
  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '10px', fontWeight: 600, color: '#9ca3af',
    letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px',
  };
  const dividerStyle: React.CSSProperties = { height: '1px', background: '#f3f4f6', margin: '4px 0' };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        zIndex: 1000, padding: '24px 16px', overflowY: 'auto',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '12px', border: '0.5px solid #e5e7eb',
          width: '100%', maxWidth: '560px', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.2s ease',
        }}
      >
        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          .modal-input:focus { border-color: #3b82f6 !important; }
          .photo-zone:hover { background: #f0f6ff !important; border-color: #93c5fd !important; }
          .del-icon-btn:hover { background: #fee2e2 !important; color: #991b1b !important; }
          .add-row-btn:hover { background: #f0f9ff !important; }
          .pill-btn { transition: all 0.12s; }
        `}</style>

        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>새 맛집 추가</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '72vh', overflowY: 'auto' }}>
          <div>
            <p style={sectionLabelStyle}>가게 사진</p>
            <div
              className="photo-zone"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
              style={{ border: '1.5px dashed #d1d5db', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer', background: '#f9fafb', transition: 'all 0.15s' }}
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#9ca3af" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto 8px' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 3px' }}>클릭 또는 드래그로 사진 업로드</p>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>JPG, PNG, WEBP · 여러 장 선택 가능</span>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
            {photos.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {photos.map(p => (
                  <div key={p.id} style={{ position: 'relative' }}>
                    <img src={p.url} alt="" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '7px', border: '0.5px solid #e5e7eb' }} />
                    <button className="del-icon-btn" onClick={() => removePhoto(p.id)} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', transition: 'all 0.12s' }}>
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={dividerStyle} />
          <div>
            <p style={sectionLabelStyle}>기본 정보</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>가게 이름 *</label>
                <input className="modal-input" style={inputStyle} type="text" placeholder="예: 진미반점" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>카테고리</label>
                  <select className="modal-input" style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">선택</option>
                    {['한식','중식','일식','양식','패스트푸드','분식','카페/디저트','기타'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>평점</label>
                  <input className="modal-input" style={inputStyle} type="number" min="0" max="5" step="0.1" placeholder="0.0 ~ 5.0" value={rating} onChange={e => setRating(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div style={dividerStyle} />
          <div>
            <p style={sectionLabelStyle}>위치 & 연락처</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>지역 (구)</label>
                <select className="modal-input" style={inputStyle} value={district} onChange={e => setDistrict(e.target.value)}>
                  <option value="">선택</option>
                  {['강남구','마포구','용산구','서초구','종로구','은평구','송파구','강서구','동작구','영등포구','관악구','광진구'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>상세 주소</label>
                <input className="modal-input" style={inputStyle} type="text" placeholder="예: 서울특별시 강남구 테헤란로 123 1층" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>전화번호</label>
                <input className="modal-input" style={inputStyle} type="tel" placeholder="예: 02-1234-5678" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
          </div>
          <div style={dividerStyle} />
          <div>
            <p style={sectionLabelStyle}>영업시간</p>
            <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr 12px 1fr', alignItems: 'center', gap: '6px', rowGap: '8px' }}>
              <span /><span style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center' }}>오픈</span><span /><span style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center' }}>마감</span>
              {[
                { label: '월~금', open: 'weekdayOpen', close: 'weekdayClose' },
                { label: '토요일', open: 'satOpen', close: 'satClose' },
                { label: '일요일', open: 'sunOpen', close: 'sunClose' },
              ].map(row => (
                <>
                  <span key={row.label + 'l'} style={{ fontSize: '12px', color: '#6b7280' }}>{row.label}</span>
                  <input key={row.open} className="modal-input" type="time" style={{ ...inputStyle, padding: '6px 8px', fontSize: '12px' }} value={hours[row.open as keyof typeof hours]} onChange={e => setHours(prev => ({ ...prev, [row.open]: e.target.value }))} />
                  <span style={{ textAlign: 'center', color: '#d1d5db', fontSize: '12px' }}>~</span>
                  <input key={row.close} className="modal-input" type="time" style={{ ...inputStyle, padding: '6px 8px', fontSize: '12px' }} value={hours[row.close as keyof typeof hours]} onChange={e => setHours(prev => ({ ...prev, [row.close]: e.target.value }))} />
                </>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              <div style={fieldStyle}><label style={labelStyle}>브레이크 타임</label><input className="modal-input" style={inputStyle} type="text" placeholder="예: 15:00 ~ 17:00" value={breakTime} onChange={e => setBreakTime(e.target.value)} /></div>
              <div style={fieldStyle}><label style={labelStyle}>휴무일</label><input className="modal-input" style={inputStyle} type="text" placeholder="예: 매주 화요일" value={holiday} onChange={e => setHoliday(e.target.value)} /></div>
            </div>
          </div>
          <div style={dividerStyle} />
          <div>
            <p style={sectionLabelStyle}>메뉴 목록</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 32px', gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: '#9ca3af', paddingLeft: '2px' }}>메뉴 이름</span>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>가격 (원)</span>
              <span />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {menuItems.map(item => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 32px', gap: '6px', alignItems: 'center' }}>
                  <input className="modal-input" style={inputStyle} type="text" placeholder="예: 짜장면" value={item.name} onChange={e => updateMenu(item.id, 'name', e.target.value)} />
                  <input className="modal-input" style={inputStyle} type="text" placeholder="8,000" value={item.price} onChange={e => updateMenu(item.id, 'price', e.target.value)} />
                  <button className="del-icon-btn" onClick={() => removeMenu(item.id)} style={{ width: '32px', height: '36px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', transition: 'all 0.12s', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              ))}
            </div>
            <button className="add-row-btn" onClick={addMenu} style={{ marginTop: '8px', width: '100%', border: '1px dashed #d1d5db', borderRadius: '6px', padding: '8px', fontSize: '12px', color: '#6b7280', cursor: 'pointer', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', transition: 'all 0.12s', fontFamily: 'sans-serif' }}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              메뉴 추가
            </button>
          </div>
          <div style={dividerStyle} />
          <div>
            <p style={sectionLabelStyle}>등록 상태</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['등록됨', '검토중'] as const).map(s => (
                <button key={s} className="pill-btn" onClick={() => setStatus(s)} style={{ padding: '7px 16px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontFamily: 'sans-serif', border: status === s ? (s === '등록됨' ? '1.5px solid #3b82f6' : '1.5px solid #d97706') : '1px solid #e5e7eb', background: status === s ? (s === '등록됨' ? '#eff6ff' : '#fffbeb') : '#fff', color: status === s ? (s === '등록됨' ? '#1d4ed8' : '#92400e') : '#6b7280', fontWeight: status === s ? 500 : 400 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: '8px', background: '#fafafa' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer', fontFamily: 'sans-serif' }}>취소</button>
          <button onClick={handleSave} style={{ padding: '8px 20px', fontSize: '13px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontWeight: 500, fontFamily: 'sans-serif' }}>저장하기</button>
        </div>
      </div>
    </div>
  );
};

interface RestaurantFormData {
  name: string; category: string; rating: string; district: string; address: string; phone: string;
  hours: { weekdayOpen: string; weekdayClose: string; satOpen: string; satClose: string; sunOpen: string; sunClose: string; };
  breakTime: string; holiday: string; status: '등록됨' | '검토중'; menuItems: MenuItem[]; photos: PhotoPreview[];
}

interface RestaurantRow {
  id: number; name: string; category: string; district: string; rating: string; status: '등록됨' | '검토중';
}

type MemberStatus = '정상' | '주의' | '정지됨';
interface MemberRow {
  id: number; nickname: string; email: string; joinDate: string; reviewCount: number; status: MemberStatus; warnings: number;
}

// ── 공지사항 타입 ──────────────────────────────────────────────
interface NoticeRow {
  id: number;
  title: string;
  content: string;
  date: string;
  views: number;
  status: '게시중' | '완료';
  isAdmin: boolean; // 관리자가 직접 작성한 글
}

// ── 리뷰 타입 ─────────────────────────────────────────────────
type ReviewStatus = '승인됨' | '검토중' | '신고됨' | '삭제됨';
interface ReviewRow {
  id: number;
  author: string;
  restaurant: string;
  summary: string;
  rating: string;
  status: ReviewStatus;
}

// ── 페이지 콘텐츠 ─────────────────────────────────────────────
const PageContent: React.FC<{ page: PageId }> = ({ page }) => {
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  const [members, setMembers] = useState<MemberRow[]>([
    { id: 1, nickname: '맛집탐험가',  email: 'user1@email.com', joinDate: '2024.03.12', reviewCount: 42, status: '정상',  warnings: 0 },
    { id: 2, nickname: '서울미식가',  email: 'user2@email.com', joinDate: '2024.05.20', reviewCount: 18, status: '정상',  warnings: 0 },
    { id: 3, nickname: '리뷰킹',      email: 'user3@email.com', joinDate: '2024.07.04', reviewCount: 87, status: '주의',  warnings: 1 },
    { id: 4, nickname: 'foodlover',   email: 'user4@email.com', joinDate: '2024.09.18', reviewCount: 5,  status: '정상',  warnings: 0 },
    { id: 5, nickname: '스팸계정123', email: 'spam@email.com',  joinDate: '2025.01.02', reviewCount: 0,  status: '정지됨',warnings: 3 },
  ]);

  const [restaurants, setRestaurants] = useState<RestaurantRow[]>([
    { id: 1, name: '진미반점',  category: '중식',     district: '강남구', rating: '4.5', status: '등록됨' },
    { id: 2, name: '스시하나',  category: '일식',     district: '마포구', rating: '4.8', status: '등록됨' },
    { id: 3, name: '한우마을',  category: '한식',     district: '용산구', rating: '4.2', status: '검토중' },
    { id: 4, name: '파스타나라',category: '양식',     district: '서초구', rating: '4.0', status: '등록됨' },
    { id: 5, name: '버거하우스',category: '패스트푸드',district: '종로구', rating: '3.9', status: '검토중' },
    { id: 6, name: '삼겹살집',  category: '한식',     district: '은평구', rating: '4.6', status: '등록됨' },
  ]);
  const [nextRestaurantId, setNextRestaurantId] = useState(7);

  // ── 리뷰 상태 ──────────────────────────────────────────────
  const [reviews, setReviews] = useState<ReviewRow[]>([
    { id: 1, author: '김철수', restaurant: '진미반점',  summary: '맛있어요 또 올게요',     rating: '⭐ 5.0', status: '승인됨' },
    { id: 2, author: '이영희', restaurant: '스시하나',  summary: '가격 대비 별로예요',     rating: '⭐ 2.0', status: '검토중' },
    { id: 3, author: '박민준', restaurant: '한우마을',  summary: '광고성 내용 포함 의심',  rating: '⭐ 5.0', status: '신고됨' },
    { id: 4, author: '최지은', restaurant: '파스타나라',summary: '분위기 좋고 맛도 좋아요', rating: '⭐ 4.0', status: '승인됨' },
    { id: 5, author: '정호진', restaurant: '삼겹살집',  summary: '불쾌한 표현 포함',       rating: '⭐ 1.0', status: '신고됨' },
  ]);

  // ── 공지사항 상태 ──────────────────────────────────────────
  const [notices, setNotices] = useState<NoticeRow[]>([
    { id: 1, title: '서비스 점검 안내 (5/20)', content: '5월 20일 새벽 2시~4시 서비스 점검이 예정되어 있습니다.', date: '2025.05.15', views: 1203, status: '게시중', isAdmin: false },
    { id: 2, title: '신규 카테고리 추가 안내',  content: '채식 및 이색음식 카테고리가 새롭게 추가되었습니다.', date: '2025.05.10', views: 892,  status: '게시중', isAdmin: false },
    { id: 3, title: '이용약관 변경 안내',       content: '개인정보 처리방침이 2025년 5월 1일부로 변경되었습니다.', date: '2025.04.28', views: 2451, status: '완료', isAdmin: false },
    { id: 4, title: '앱 업데이트 v2.3.0',       content: '버그 수정 및 성능 개선이 이루어졌습니다.', date: '2025.04.15', views: 1874, status: '완료', isAdmin: false },
  ]);
  const [nextNoticeId, setNextNoticeId] = useState(5);

  type ReportStatus = '검토중' | '처리완료' | '삭제됨' | '경고처리';
  interface ReportRow {
    id: number; reporter: string; target: string; reason: string; date: string; status: ReportStatus;
  }
  const [reports, setReports] = useState<ReportRow[]>([
    { id: 1, reporter: '김철수', target: '리뷰 #2841', reason: '허위 정보',    date: '05.18', status: '검토중' },
    { id: 2, reporter: '이영희', target: '리뷰 #2799', reason: '욕설/비방',    date: '05.17', status: '검토중' },
    { id: 3, reporter: '박민준', target: '맛집 #124',  reason: '광고성 게시물', date: '05.16', status: '검토중' },
    { id: 4, reporter: '최지은', target: '회원 스팸계정123', reason: '스팸 활동', date: '05.15', status: '처리완료' },
    { id: 5, reporter: '정호진', target: '리뷰 #2750', reason: '개인정보 노출', date: '05.14', status: '검토중' },
  ]);

  const handleRestaurantSave = (data: RestaurantFormData) => {
    setRestaurants(prev => [...prev, { id: nextRestaurantId, name: data.name, category: data.category || '기타', district: data.district || '—', rating: data.rating || '—', status: data.status }]);
    setNextRestaurantId(n => n + 1);
  };

  const handleNoticeSave = (data: { title: string; content: string; status: '게시중' | '완료' }) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}`;
    setNotices(prev => [{ id: nextNoticeId, title: data.title, content: data.content, date: dateStr, views: 0, status: data.status, isAdmin: true }, ...prev]);
    setNextNoticeId(n => n + 1);
  };

  const deleteNotice = (id: number) => setNotices(prev => prev.filter(n => n.id !== id));
  const deleteReview = (id: number) => setReviews(prev => prev.filter(r => r.id !== id));
  const setReviewStatus = (id: number, status: ReviewStatus) => setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  const actionBtnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '3px',
    padding: '4px 8px', borderRadius: '5px',
    border: '1px solid #e5e7eb', background: '#fff',
    color: '#6b7280', cursor: 'pointer', fontSize: '11px',
    fontFamily: 'sans-serif', transition: 'all 0.12s', whiteSpace: 'nowrap' as const,
  };

  const addBtn = (label: string, onClick?: () => void) => (
    <button onClick={onClick} style={{ fontSize: '11px', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', border: 'none', padding: '4px 9px', borderRadius: '5px', cursor: 'pointer' }}>
      {label}
    </button>
  );

  const reviewStatusMeta: Record<ReviewStatus, { variant: BadgeVariant; label: string }> = {
    '승인됨': { variant: 'green', label: '승인됨' },
    '검토중': { variant: 'amber', label: '검토중' },
    '신고됨': { variant: 'red',   label: '신고됨' },
    '삭제됨': { variant: 'red',   label: '삭제됨' },
  };

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

    case 'restaurants': {
      const toggleStatus = (id: number) => {
        setRestaurants(prev => prev.map(r => r.id === id ? { ...r, status: r.status === '등록됨' ? '검토중' : '등록됨' } : r));
      };
      const deleteRestaurant = (id: number) => setRestaurants(prev => prev.filter(r => r.id !== id));
      return (
        <>
          {showRestaurantModal && <AddRestaurantModal onClose={() => setShowRestaurantModal(false)} onSave={handleRestaurantSave} />}
          <style>{`
            .row-del-btn:hover { background: #fee2e2 !important; border-color: #fca5a5 !important; color: #991b1b !important; }
            .row-del-btn:hover svg { stroke: #991b1b; }
            tr:hover .row-actions { opacity: 1 !important; }
          `}</style>
          <TableCard title={`맛집 목록 (${restaurants.length})`} action={addBtn('+ 새 맛집 추가', () => setShowRestaurantModal(true))}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><Th>이름</Th><Th>카테고리</Th><Th>지역</Th><Th>평점</Th><Th>영업 상태</Th><Th>관리</Th></tr></thead>
              <tbody>
                {restaurants.map(r => {
                  const isActive = r.status === '등록됨';
                  return (
                    <tr key={r.id} style={{ transition: 'background 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                      onMouseLeave={e => (e.currentTarget.style.background = '')}
                    >
                      <Td>{r.name}</Td><Td>{r.category}</Td><Td>{r.district}</Td><Td>{r.rating}</Td>
                      <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button onClick={() => toggleStatus(r.id)} title={isActive ? '클릭하면 검토중으로 변경' : '클릭하면 등록됨으로 변경'} style={{ width: '36px', height: '20px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: isActive ? '#22c55e' : '#d1d5db', position: 'relative', flexShrink: 0, transition: 'background 0.2s', padding: 0 }}>
                            <span style={{ position: 'absolute', top: '3px', left: isActive ? '18px' : '3px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', display: 'block' }} />
                          </button>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: isActive ? '#15803d' : '#92400e' }}>{r.status}</span>
                        </div>
                      </td>
                      <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                        <div className="row-actions" style={{ opacity: 0, transition: 'opacity 0.15s', display: 'flex', gap: '4px' }}>
                          <button className="row-del-btn" onClick={() => { if (window.confirm(`'${r.name}'을(를) 삭제하시겠습니까?`)) deleteRestaurant(r.id); }} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 9px', borderRadius: '5px', border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer', fontSize: '11px', fontFamily: 'sans-serif', transition: 'all 0.12s' }}>
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableCard>
        </>
      );
    }

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

    // ── 댓글/리뷰 관리 (삭제 기능 추가) ────────────────────────
    case 'reviews': {
      const pendingCount = reviews.filter(r => r.status === '검토중' || r.status === '신고됨').length;
      return (
        <>
          <style>{`
            .review-row:hover { background: #f9fafb; }
            .review-row:hover .review-actions { opacity: 1 !important; }
            .rv-del-btn:hover   { background: #fef2f2 !important; border-color: #f87171 !important; color: #991b1b !important; }
            .rv-del-btn:hover svg { stroke: #991b1b; }
            .rv-approve-btn:hover { background: #f0fdf4 !important; border-color: #4ade80 !important; color: #15803d !important; }
            .rv-reject-btn:hover  { background: #fff7ed !important; border-color: #fb923c !important; color: #c2410c !important; }
            .rv-undo-btn:hover    { background: #eff6ff !important; border-color: #93c5fd !important; color: #1d4ed8 !important; }
          `}</style>
          <TableCard
            title={`댓글 / 리뷰 목록 (${reviews.length}건)`}
            action={
              pendingCount > 0
                ? <span style={{ fontSize: '11px', background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>검토 대기 {pendingCount}건</span>
                : <span style={{ fontSize: '11px', color: '#059669', fontWeight: 500 }}>모두 처리됨 ✓</span>
            }
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr><Th>작성자</Th><Th>맛집</Th><Th>내용 요약</Th><Th>평점</Th><Th>상태</Th><Th>관리</Th></tr>
              </thead>
              <tbody>
                {reviews.map(r => {
                  const { variant, label } = reviewStatusMeta[r.status];
                  const isDeleted = r.status === '삭제됨';
                  return (
                    <tr
                      key={r.id}
                      className="review-row"
                      style={{ transition: 'background 0.1s', opacity: isDeleted ? 0.45 : 1 }}
                    >
                      <Td>{r.author}</Td>
                      <Td>{r.restaurant}</Td>
                      <td style={{ padding: '8px 16px', color: '#111827', borderBottom: '0.5px solid #e5e7eb', fontSize: '12px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {isDeleted ? <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>[삭제된 리뷰]</span> : r.summary}
                      </td>
                      <Td>{r.rating}</Td>
                      <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                        <Badge variant={variant}>{label}</Badge>
                      </td>
                      <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                        <div className="review-actions" style={{ display: 'flex', gap: '4px', opacity: 0, transition: 'opacity 0.15s' }}>
                          {!isDeleted ? (
                            <>
                              {/* 승인 버튼 (검토중/신고됨 상태에서만) */}
                              {(r.status === '검토중' || r.status === '신고됨') && (
                                <button
                                  className="rv-approve-btn"
                                  title="승인"
                                  onClick={() => setReviewStatus(r.id, '승인됨')}
                                  style={actionBtnStyle}
                                >
                                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                  승인
                                </button>
                              )}
                              {/* 삭제 버튼 */}
                              <button
                                className="rv-del-btn"
                                title="리뷰 삭제"
                                onClick={() => {
                                  if (window.confirm(`'${r.author}'의 리뷰를 삭제하시겠습니까?\n삭제 후 복구할 수 없습니다.`)) {
                                    deleteReview(r.id);
                                  }
                                }}
                                style={actionBtnStyle}
                              >
                                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#f87171" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                                  <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                                </svg>
                                삭제
                              </button>
                            </>
                          ) : (
                            /* 삭제된 리뷰는 되돌리기 없음 — 이미 목록에서 제거됨 */
                            null
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableCard>
        </>
      );
    }

    // ── 공지사항 관리 (작성 + 삭제) ────────────────────────────
    case 'notices': {
      const adminCount = notices.filter(n => n.isAdmin).length;
      return (
        <>
          {showNoticeModal && <AddNoticeModal onClose={() => setShowNoticeModal(false)} onSave={handleNoticeSave} />}
          <style>{`
            .notice-row:hover { background: #f9fafb; }
            .notice-row:hover .notice-actions { opacity: 1 !important; }
            .notice-del-btn:hover { background: #fef2f2 !important; border-color: #f87171 !important; color: #991b1b !important; }
            .notice-del-btn:hover svg { stroke: #991b1b; }
          `}</style>
          <TableCard
            title={`공지사항 목록 (${notices.length}건)`}
            action={
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {adminCount > 0 && (
                  <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>
                    관리자 작성 {adminCount}건
                  </span>
                )}
                {addBtn('+ 공지 작성', () => setShowNoticeModal(true))}
              </div>
            }
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr><Th>제목</Th><Th>작성일</Th><Th>조회수</Th><Th>상태</Th><Th>관리</Th></tr>
              </thead>
              <tbody>
                {notices.map(n => (
                  <tr key={n.id} className="notice-row" style={{ transition: 'background 0.1s' }}>
                    <td style={{ padding: '8px 16px', color: '#111827', borderBottom: '0.5px solid #e5e7eb', fontSize: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {n.isAdmin && (
                          <span style={{ fontSize: '9.5px', background: '#eff6ff', color: '#1d4ed8', padding: '1px 5px', borderRadius: '4px', fontWeight: 500, flexShrink: 0 }}>관리자</span>
                        )}
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px', display: 'block' }}>{n.title}</span>
                      </div>
                    </td>
                    <Td>{n.date}</Td>
                    <Td>{n.views.toLocaleString()}</Td>
                    <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                      <Badge variant={n.status === '게시중' ? 'blue' : 'green'}>{n.status}</Badge>
                    </td>
                    <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                      {/* 관리자가 작성한 공지만 삭제 버튼 표시 */}
                      {n.isAdmin ? (
                        <div className="notice-actions" style={{ display: 'flex', gap: '4px', opacity: 0, transition: 'opacity 0.15s' }}>
                          <button
                            className="notice-del-btn"
                            title="공지사항 삭제"
                            onClick={() => {
                              if (window.confirm(`'${n.title}' 공지사항을 삭제하시겠습니까?`)) deleteNotice(n.id);
                            }}
                            style={actionBtnStyle}
                          >
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#f87171" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                            </svg>
                            삭제
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#d1d5db' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </>
      );
    }

    case 'members': {
      const statusBadgeVariant = (s: MemberStatus): BadgeVariant =>
        s === '정상' ? 'green' : s === '주의' ? 'amber' : 'red';

      const addWarning = (id: number) => {
        setMembers(prev => prev.map(m => {
          if (m.id !== id) return m;
          const w = m.warnings + 1;
          const status: MemberStatus = w >= 3 ? '정지됨' : w >= 1 ? '주의' : '정상';
          return { ...m, warnings: w, status };
        }));
      };

      const toggleSuspend = (id: number) => {
        setMembers(prev => prev.map(m => {
          if (m.id !== id) return m;
          if (m.status === '정지됨') return { ...m, status: '정상' as MemberStatus, warnings: 0 };
          return { ...m, status: '정지됨' as MemberStatus };
        }));
      };

      const resetWarnings = (id: number) => {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, warnings: 0, status: '정상' as MemberStatus } : m));
      };

      const suspended = members.filter(m => m.status === '정지됨').length;

      return (
        <>
          <style>{`
            .member-row:hover .member-actions { opacity: 1 !important; }
            .member-row:hover { background: #f9fafb; }
            .warn-btn:hover { background: #fff7ed !important; border-color: #fb923c !important; color: #c2410c !important; }
            .warn-btn:hover svg { stroke: #c2410c; }
            .suspend-btn-on:hover  { background: #f0fdf4 !important; border-color: #4ade80 !important; color: #15803d !important; }
            .suspend-btn-off:hover { background: #fef2f2 !important; border-color: #f87171 !important; color: #991b1b !important; }
            .reset-btn:hover { background: #eff6ff !important; border-color: #93c5fd !important; color: #1d4ed8 !important; }
          `}</style>
          <TableCard title={`회원 목록 (${members.length}명)`} action={suspended > 0 ? <span style={{ fontSize: '11px', background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>정지 {suspended}명</span> : undefined}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><Th>닉네임</Th><Th>이메일</Th><Th>가입일</Th><Th>리뷰 수</Th><Th>경고</Th><Th>상태</Th><Th>관리</Th></tr></thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id} className="member-row" style={{ transition: 'background 0.1s' }}>
                    <Td>{m.nickname}</Td><Td>{m.email}</Td><Td>{m.joinDate}</Td><Td>{m.reviewCount}</Td>
                    <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                        {[0, 1, 2].map(i => (
                          <svg key={i} viewBox="0 0 24 24" width="13" height="13" fill={i < m.warnings ? '#ef4444' : '#e5e7eb'} style={{ flexShrink: 0 }}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/></svg>
                        ))}
                        {m.warnings > 0 && <span style={{ fontSize: '10px', color: '#ef4444', marginLeft: '3px', fontWeight: 500 }}>{m.warnings}/3</span>}
                      </div>
                    </td>
                    <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}><Badge variant={statusBadgeVariant(m.status)}>{m.status}</Badge></td>
                    <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                      <div className="member-actions" style={{ display: 'flex', gap: '4px', opacity: 0, transition: 'opacity 0.15s' }}>
                        {m.status !== '정지됨' && m.warnings < 3 && (
                          <button className="warn-btn" title="경고 부여" onClick={() => addWarning(m.id)} style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '4px 8px', borderRadius: '5px', border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer', fontSize: '11px', fontFamily: 'sans-serif', transition: 'all 0.12s' }}>
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="#f87171" stroke="none"><rect x="4" y="2" width="16" height="20" rx="2"/></svg>
                            경고
                          </button>
                        )}
                        <button className={m.status === '정지됨' ? 'suspend-btn-on' : 'suspend-btn-off'} title={m.status === '정지됨' ? '정지 해제' : '계정 정지'} onClick={() => { if (window.confirm(m.status === '정지됨' ? `'${m.nickname}' 정지를 해제하시겠습니까?` : `'${m.nickname}'을(를) 정지하시겠습니까?`)) toggleSuspend(m.id); }} style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '4px 8px', borderRadius: '5px', border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer', fontSize: '11px', fontFamily: 'sans-serif', transition: 'all 0.12s' }}>
                          {m.status === '정지됨' ? (<><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>해제</>) : (<><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#f87171" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>정지</>)}
                        </button>
                        {m.warnings > 0 && (
                          <button className="reset-btn" title="경고 초기화" onClick={() => resetWarnings(m.id)} style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '4px 8px', borderRadius: '5px', border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer', fontSize: '11px', fontFamily: 'sans-serif', transition: 'all 0.12s' }}>
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#93c5fd" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
                            초기화
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </>
      );
    }

    case 'reports': {
      type ReportStatus = '검토중' | '처리완료' | '삭제됨' | '경고처리';
      interface ReportRow { id: number; reporter: string; target: string; reason: string; date: string; status: ReportStatus; }
      const reportStatusMeta: Record<ReportStatus, { variant: BadgeVariant; label: string }> = {
        '검토중':   { variant: 'amber', label: '검토중' },
        '처리완료': { variant: 'green', label: '처리완료' },
        '삭제됨':   { variant: 'red',   label: '삭제됨' },
        '경고처리': { variant: 'blue',  label: '경고처리' },
      };
      const setReportStatus = (id: number, status: ReportStatus) =>
        setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      const deleteReport = (id: number) => setReports(prev => prev.filter(r => r.id !== id));
      const pending = reports.filter(r => r.status === '검토중').length;

      return (
        <>
          <style>{`
            .report-row:hover { background: #f9fafb; }
            .report-row:hover .report-actions { opacity: 1 !important; }
            .rpt-warn-btn:hover  { background: #fff7ed !important; border-color: #fb923c !important; color: #c2410c !important; }
            .rpt-del-btn:hover   { background: #fef2f2 !important; border-color: #f87171 !important; color: #991b1b !important; }
            .rpt-done-btn:hover  { background: #f0fdf4 !important; border-color: #4ade80 !important; color: #15803d !important; }
            .rpt-undo-btn:hover  { background: #eff6ff !important; border-color: #93c5fd !important; color: #1d4ed8 !important; }
          `}</style>
          <TableCard title={`신고 목록 (${reports.length}건)`} action={pending > 0 ? <span style={{ fontSize: '11px', background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>미처리 {pending}건</span> : <span style={{ fontSize: '11px', color: '#059669', fontWeight: 500 }}>모두 처리됨 ✓</span>}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><Th>신고자</Th><Th>신고 대상</Th><Th>사유</Th><Th>신고일</Th><Th>상태</Th><Th>관리</Th></tr></thead>
              <tbody>
                {reports.map(r => {
                  const { variant, label } = reportStatusMeta[r.status];
                  const isDone = r.status !== '검토중';
                  return (
                    <tr key={r.id} className="report-row" style={{ transition: 'background 0.1s', opacity: r.status === '삭제됨' ? 0.45 : 1 }}>
                      <Td>{r.reporter}</Td>
                      <td style={{ padding: '8px 16px', color: '#3b82f6', borderBottom: '0.5px solid #e5e7eb', fontSize: '12px', whiteSpace: 'nowrap' }}>{r.target}</td>
                      <Td>{r.reason}</Td><Td>{r.date}</Td>
                      <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}><Badge variant={variant}>{label}</Badge></td>
                      <td style={{ padding: '8px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
                        <div className="report-actions" style={{ display: 'flex', gap: '4px', opacity: 0, transition: 'opacity 0.15s' }}>
                          {!isDone ? (
                            <>
                              <button className="rpt-warn-btn" title="경고 처리" onClick={() => setReportStatus(r.id, '경고처리')} style={actionBtnStyle}>
                                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fb923c" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                경고
                              </button>
                              <button className="rpt-done-btn" title="처리 완료" onClick={() => setReportStatus(r.id, '처리완료')} style={actionBtnStyle}>
                                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                완료
                              </button>
                              <button className="rpt-del-btn" title="삭제" onClick={() => { if (window.confirm(`'${r.target}' 신고를 삭제하시겠습니까?`)) deleteReport(r.id); }} style={actionBtnStyle}>
                                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#f87171" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                                삭제
                              </button>
                            </>
                          ) : (
                            <button className="rpt-undo-btn" title="되돌리기" onClick={() => setReportStatus(r.id, '검토중')} style={actionBtnStyle}>
                              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#93c5fd" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
                              되돌리기
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableCard>
        </>
      );
    }

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

export default function Manager() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const { title, sub } = pageMeta[activePage];

  const navLabelStyle: React.CSSProperties = {
    fontSize: '9.5px', fontWeight: 500, color: 'rgba(255,255,255,0.25)',
    letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 8px 5px',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '220px', background: '#16162a', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '18px 14px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{Icons.tool}</div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 500, color: '#fff' }}>관리자페이지</div>
              <div style={{ fontSize: '9px', color: '#60a5fa', background: 'rgba(59,130,246,0.15)', padding: '1px 5px', borderRadius: '3px', marginTop: '2px', width: 'fit-content' }}>Admin</div>
            </div>
          </div>
        </div>
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

      <main style={{ flex: 1, background: '#f3f4f6', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ padding: '14px 20px', background: '#fff', borderBottom: '0.5px solid #e5e7eb', flexShrink: 0 }}>
          <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>{title}</div>
          <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '2px' }}>{sub}</div>
        </div>
        <div style={{ padding: '18px 20px', flex: 1, overflowY: 'auto' }}>
          <PageContent page={activePage} />
        </div>
      </main>
    </div>
  );
}