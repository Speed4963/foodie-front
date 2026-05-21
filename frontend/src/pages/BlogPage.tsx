// src/pages/BlogPage.tsx
import { useState, useMemo, useEffect } from 'react';
import '../Blog.css';
import { useAuth } from '../contexts/AuthContexts'; // 실제 경로가 맞는지 확인하세요

// ─── API 모듈 ────────────────────────────────────────────────
const api = {
  getPosts: async (params?: Record<string, string>) => {
    const qs = params ? `?${new URLSearchParams(params)}` : '';
    const r = await fetch(`/api/posts${qs}`);
    if (!r.ok) throw new Error(`GET /api/posts 실패: ${r.status}`);
    return r.json();
  },
  createPost: async (data: any) =>
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }).then(r => { if (!r.ok) throw new Error('createPost 실패'); return r.json(); }),
  updatePost: async (id: number, data: any) =>
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }).then(r => { if (!r.ok) throw new Error('updatePost 실패'); return r.json(); }),
  deletePost: async (id: number) =>
    fetch(`/api/posts/${id}`, { method: 'DELETE' })
      .then(r => { if (!r.ok) throw new Error('deletePost 실패'); }),
  likePost: async (id: number) =>
    fetch(`/api/posts/${id}/like`, { method: 'POST' })
      .then(r => { if (!r.ok) throw new Error('likePost 실패'); return r.json(); }),
};

// ─── 기본 테마 ───────────────────────────────────────────────
const theme = { primary: '#E8272A', dark: '#0D0D0D', bg: '#FAF8F4', text: '#0D0D0D' };

// ─── Types ───────────────────────────────────────────────────
export interface BlogPost {
  id: number; restaurant: string; category: string; area: string;
  title: string; content: string; rating: number; photos: string[];
  tags: string[]; author: string; authorColor: string; date: string; likes: number; liked?: boolean;
}

const AREAS = ['전체','강남','홍대·합정','을지로·종로','이태원','연남동','성수','마포','용산','기타'];
const CATEGORIES = ['고기·구이','국밥·탕','안주·포차','전통·분식','양식·파스타','카페·브런치','일식·스시','중식','기타'];
const CAT_EMOJI: Record<string, string> = { '고기·구이':'🥩','국밥·탕':'🍲','안주·포차':'🍺','전통·분식':'🥟','양식·파스타':'🍝','카페·브런치':'☕','일식·스시':'🍣','중식':'🥡' };
const EMPTY_FORM = { restaurant:'', category:'고기·구이', area:'', title:'', content:'', rating:3, photos:[] as string[], tags:[] as string[] };

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div style={{ display:'flex', gap:4 }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)}
          style={{ background:'none', border:'none', fontSize:24, cursor:'pointer', color: i <= value ? '#FAB700' : '#E0E0E0', padding:0 }}>★</button>
      ))}
    </div>
  );
}

interface WriteModalProps {
  initial: Partial<typeof EMPTY_FORM>; isEdit: boolean;
  onClose: () => void; onSubmit: (data: typeof EMPTY_FORM) => Promise<void>;
  themeColor: string;
}

function WriteModal({ initial, isEdit, onClose, onSubmit, themeColor }: WriteModalProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const update = (key: string, val: unknown) => setForm(f => ({ ...f, [key]: val }));

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5 - form.photos.length);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => update('photos', [...form.photos, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleSubmit = async () => {
    if (!form.restaurant.trim() || !form.title.trim() || !form.content.trim()) { alert('식당 이름, 제목, 내용은 필수입니다!'); return; }
    try {
      setIsSubmitting(true);
      await onSubmit(form);
    } catch (error) {
      alert('업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-head-title">{isEdit ? '리뷰 수정' : '새 리뷰 작성'}</h2>
          <button className="modal-close" onClick={onClose} disabled={isSubmitting}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">식당 이름 *</label>
            <input className="form-input" style={{ '--focus-color': themeColor } as React.CSSProperties}
              value={form.restaurant} onChange={e => update('restaurant', e.target.value)} placeholder="방문한 식당 이름을 입력하세요" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">카테고리</label>
              <select className="form-select" value={form.category} onChange={e => update('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">지역</label>
              <input className="form-input" value={form.area} onChange={e => update('area', e.target.value)} placeholder="예) 을지로, 홍대" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">제목 *</label>
            <input className="form-input" value={form.title} onChange={e => update('title', e.target.value)} placeholder="리뷰 제목을 입력하세요" />
          </div>
          <div className="form-group">
            <label className="form-label">별점</label>
            <StarPicker value={form.rating} onChange={n => update('rating', n)} />
          </div>
          <div className="form-group">
            <label className="form-label">리뷰 내용 *</label>
            <textarea className="form-textarea" value={form.content} onChange={e => update('content', e.target.value)}
              placeholder="방문 후기를 자유롭게 작성해주세요. 메뉴 추천, 분위기, 가격 등을 공유해보세요!" />
          </div>
          <div className="form-group">
            <label className="form-label">사진 첨부 (최대 5장)</label>
            <div className="photo-upload" onClick={() => document.getElementById('photoInput')?.click()}>
              <div style={{ fontSize:28, marginBottom:8 }}>📷</div>
              <div className="photo-upload-text"><strong>클릭하여 사진 선택</strong><br />JPG, PNG 최대 5장</div>
            </div>
            <input type="file" id="photoInput" accept="image/*" multiple style={{ display:'none' }} onChange={handlePhotos} />
            {form.photos.length > 0 && (
              <div className="photo-previews">
                {form.photos.map((src,i) => (
                  <div key={i} className="photo-preview">
                    <img src={src} alt={`photo${i}`} />
                    <button className="photo-del" onClick={() => update('photos', form.photos.filter((_,j) => j !== i))}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn-cancel" onClick={onClose} disabled={isSubmitting}>취소</button>
          <button className="btn-submit" style={{ background: themeColor }} onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '처리 중...' : (isEdit ? '수정 완료' : '등록하기')}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ post, isEditor, onClose, onEdit, onDelete, onLike, themeColor }: {
  post: BlogPost; isEditor: boolean; onClose: () => void; onEdit: () => void;
  onDelete: () => void; onLike: () => void; themeColor: string;
}) {
  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display:'flex', gap:6 }}>
            <span className="post-tag" style={{ background: themeColor, color: '#fff' }}>{post.category}</span>
            <span className="post-tag tag-gray">{post.area}</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {post.photos?.length > 0 && (
            <div className="detail-photos">
              {post.photos.map((src,i) => <img key={i} className="detail-photo" src={src} alt={`photo${i}`} />)}
            </div>
          )}
          <div className="detail-title">{post.title}</div>
          <div className="detail-meta-row">
            <span className="detail-rating" style={{ color: themeColor }}>{'★'.repeat(post.rating)}{'☆'.repeat(5-post.rating)} {post.rating}.0</span>
            <div className="detail-author-row">
              <div className="author-avatar" style={{ background: post.authorColor || themeColor }}>{post.author ? post.author[0] : 'U'}</div>
              <span style={{ fontSize:12, color:'#6B6560' }}>{post.author}</span>
            </div>
            <span style={{ fontSize:11, color:'#bbb' }}>{post.date}</span>
            <span style={{ fontSize:12, color:'#bbb', marginLeft:'auto' }}>🍽 {post.restaurant}</span>
          </div>
          <div className="detail-content">{post.content}</div>
        </div>
        <div className="modal-foot">
          {isEditor && <button className="btn-edit" onClick={onEdit}>수정</button>}
          {isEditor && <button className="btn-delete" onClick={onDelete}>삭제</button>}
          <button className={`like-btn ${post.liked ? 'liked' : ''}`}
            style={post.liked ? { background: themeColor, borderColor: themeColor } : {}}
            onClick={onLike}>❤️ {post.likes || 0}</button>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const { user, isLoading: authLoading } = useAuth();
  const isEditor = user?.role === 'EDITOR' || user?.role === 'ADMIN';

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState('전체');
  const [sort, setSort] = useState<'latest'|'likes'|'rating'>('latest');
  const [search, setSearch] = useState('');
  const [showWrite, setShowWrite] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [detailPost, setDetailPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = { sort };
        if (area !== '전체') params.area = area;
        const data = await api.getPosts(params);
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('게시글 로드 실패:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [area, sort]);

  const filtered = useMemo(() => {
    return posts.filter(p =>
      (area === '전체' ||