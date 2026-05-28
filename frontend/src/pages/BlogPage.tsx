// src/pages/BlogPage.tsx
import { useState, useMemo, useEffect } from 'react';
import '../Blog.css';
import { useAuth } from '../contexts/AuthContext';
import type { AuthUser } from '../contexts/AuthContext'; 

// ─── 기본 테마 (단일 고정) ───────────────────────────────────
const theme = { primary: '#E8272A', dark: '#0D0D0D', bg: '#FAF8F4', text: '#0D0D0D' }

// ─── Types ───────────────────────────────────────────────────
export interface BlogPost {
  id: number; restaurant: string; category: string; area: string
  title: string; content: string; rating: number; photos: string[]
  tags: string[]; author: string; authorColor: string; date: string; likes: number; liked?: boolean
}

const AREAS = ['전체','강남','홍대·합정','을지로·종로','이태원','연남동','성수','마포','용산','기타']
const CATEGORIES = ['고기·구이','국밥·탕','안주·포차','전통·분식','양식·파스타','카페·브런치','일식·스시','중식','기타']
const CAT_EMOJI: Record<string, string> = { '고기·구이':'🥩','국밥·탕':'🍲','안주·포차':'🍺','전통·분식':'🥟','양식·파스타':'🍝','카페·브런치':'☕','일식·스시':'🍣','중식':'🥡' }
const EMPTY_FORM = { restaurant:'', category:'고기·구이', area:'', title:'', content:'', rating:3, photos:[] as string[], tags:[] as string[] }

// ─── 🔗 백엔드 REST API 완전 연동 공통 객체 ───────────────────
// 배포 환경에서는 절대경로, 로컬 개발 환경에서는 Vite 프록시 사용
const BASE_URL = window.location.hostname === 'localhost'
  ? ''
  : 'http://43.203.165.206:8080';

const api = {
  authHeaders: (): Record<string, string> => {
    const token = localStorage.getItem('eatpick_access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  // 1. 게시글 목록 조회 (필터 및 정렬 조건을 쿼리 스트링으로 전달)
  getPosts: async (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/api/posts?${query}`);
    if (!response.ok) throw new Error(`GET /api/posts 실패: ${response.status}`);
    return response.json();
  },
  // 2. 새 게시글 등록 (인증 토큰 포함)
  createPost: async (postData: any) => {
    const response = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...api.authHeaders()
      },
      credentials: 'include',
      body: JSON.stringify(postData)
    });
    if (!response.ok) throw new Error(`POST /api/posts 실패: ${response.status}`);
    return response.json();
  },
  // 3. 기존 게시글 수정 (인증 토큰 및 PathVariable ID 포함)
  updatePost: async (id: number, postData: any) => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...api.authHeaders()
      },
      credentials: 'include',
      body: JSON.stringify(postData)
    });
    if (!response.ok) throw new Error(`PUT /api/posts/${id} 실패: ${response.status}`);
    return response.json();
  },
  // 4. 게시글 삭제
  deletePost: async (id: number) => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: api.authHeaders(),
      credentials: 'include',
    });
    if (!response.ok) throw new Error(`DELETE /api/posts/${id} 실패: ${response.status}`);
    return true;
  },
  // 5. 좋아요 토글 (서버 DB 내 Like 카운트 증감 및 상태 반영)
  toggleLike: async (id: number) => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}/like`, {
      method: 'POST',
      headers: api.authHeaders(),
      credentials: 'include',
    });
    if (!response.ok) throw new Error(`POST /api/posts/${id}/like 실패: ${response.status}`);
    return response.json(); 
  }
};

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div style={{ display:'flex', gap:4 }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)}
          style={{ background:'none', border:'none', fontSize:24, cursor:'pointer', color: i <= value ? '#FAB700' : '#E0E0E0', padding:0 }}>★</button>
      ))}
    </div>
  )
}

interface WriteModalProps {
  initial: Partial<typeof EMPTY_FORM>; isEdit: boolean
  onClose: () => void; onSubmit: (data: typeof EMPTY_FORM) => void
  themeColor: string
}

function WriteModal({ initial, isEdit, onClose, onSubmit, themeColor }: WriteModalProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial })
  const update = (key: string, val: unknown) => setForm(f => ({ ...f, [key]: val }))

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5 - form.photos.length)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => update('photos', [...form.photos, ev.target?.result as string])
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const handleSubmit = () => {
    if (!form.restaurant.trim() || !form.title.trim() || !form.content.trim()) { alert('식당 이름, 제목, 내용은 필수입니다!'); return }
    onSubmit(form)
  }

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-head-title">{isEdit ? '리뷰 수정' : '새 리뷰 작성'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
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
          <button className="btn-cancel" onClick={onClose}>취소</button>
          <button className="btn-submit" style={{ background: themeColor }} onClick={handleSubmit}>
            {isEdit ? '수정 완료' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailModal({ post, onClose, onEdit, onDelete, onLike, themeColor }: {
  post: BlogPost; onClose: () => void; onEdit: () => void
  onDelete: () => void; onLike: () => void; themeColor: string
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
          {post.photos.length > 0 && (
            <div className="detail-photos">
              {post.photos.map((src,i) => <img key={i} className="detail-photo" src={src} alt={`photo${i}`} />)}
            </div>
          )}
          <div className="detail-title">{post.title}</div>
          <div className="detail-meta-row">
            <span className="detail-rating" style={{ color: themeColor }}>{'★'.repeat(post.rating)}{'☆'.repeat(5-post.rating)} {post.rating}.0</span>
            <div className="detail-author-row">
              <div className="author-avatar" style={{ background: post.authorColor }}>{post.author[0]}</div>
              <span style={{ fontSize:12, color:'#6B6560' }}>{post.author}</span>
            </div>
            <span style={{ fontSize:11, color:'#bbb' }}>{post.date}</span>
            <span style={{ fontSize:12, color:'#bbb', marginLeft:'auto' }}>🍽 {post.restaurant}</span>
          </div>
          <div className="detail-content">{post.content}</div>
        </div>
        <div className="modal-foot">
          <button className="btn-edit" onClick={onEdit}>수정</button>
          <button className="btn-delete" onClick={onDelete}>삭제</button>
          <button className={`like-btn ${post.liked ? 'liked' : ''}`}
            style={post.liked ? { background: themeColor, borderColor: themeColor } : {}}
            onClick={onLike}>❤️ {post.likes}</button>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const { user } = useAuth();
  const currentUser = user as AuthUser | null;

  // const isEditor = useMemo(() => {
  //   return currentUser !== null;
  // }, [currentUser]);

  // 변경 코드
  const isEditor = true;

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState('전체');
  const [sort, setSort] = useState<'latest'|'likes'|'rating'>('latest');
  const [search, setSearch] = useState('');
  const [showWrite, setShowWrite] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [detailPost, setDetailPost] = useState<BlogPost | null>(null);

  // ───  DB에서 게시글 실시간 데이터 페칭 ────────────────────────
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = { sort };
        if (area !== '전체') params.area = area;
        
        // 백엔드 Oracle DB 적재 데이터를 가져옵니다.
        const data = await api.getPosts(params);
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('DB 게시글 로드 실패:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [area, sort]);

  // 클라이언트 측 실시간 검색 필터링 (제목, 식당명, 본문 타겟팅)
  const filtered = useMemo(() => {
    return posts.filter(p =>
      !search || 
      p.title.includes(search) || 
      p.restaurant.includes(search) || 
      p.content.includes(search)
    );
  }, [posts, search]);

  const hotPosts = useMemo(() => [...posts].sort((a,b) => b.likes - a.likes).slice(0, 5), [posts])
  const catCounts = useMemo(() => {
    const m: Record<string,number> = {}
    posts.forEach(p => { m[p.category] = (m[p.category] || 0) + 1 })
    return Object.entries(m).sort((a,b) => b[1] - a[1])
  }, [posts])

  // ───  1. DB 게시글 생성 (CREATE) ─────────────────────────────
  const handleSubmit = async (data: typeof EMPTY_FORM) => {
    if (!currentUser) { alert('로그인이 필요한 기능입니다.'); return; }
    try {
      const newPost: BlogPost = await api.createPost({
        ...data,
        authorId: currentUser.email,
        author: currentUser.nickname,
        authorColor: theme.primary,
      });
      setPosts(prev => [newPost, ...prev]);
      setShowWrite(false);
    } catch (error) {
      console.error('DB 저장 실패:', error);
      alert('서버 저장에 실패했습니다. 백엔드 로그를 확인하세요.');
    }
  };

  // ───  2. DB 게시글 수정 (UPDATE) ─────────────────────────────
  const handleEdit = async (data: typeof EMPTY_FORM) => {
    if (!editPost) return;
    try {
      // 백엔드로 PUT 요청 송신 및 DB 업데이트 완료된 최신 객체 반환받기
      const updatedPost: BlogPost = await api.updatePost(editPost.id, data);
      
      setPosts(prev => prev.map(p => p.id === editPost.id ? updatedPost : p));
      setEditPost(null); 
      setDetailPost(null);
    } catch (error) {
      console.error('DB 수정 실패:', error);
      alert('수정에 실패했습니다.');
    }
  };

  // ───  3. DB 게시글 삭제 (DELETE) ─────────────────────────────
  const handleDelete = async (id: number) => {
    if (!confirm('이 리뷰를 DB에서 완전히 삭제할까요?')) return;
    try {
      await api.deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id)); 
      setDetailPost(null);
    } catch (error) {
      console.error('DB 삭제 실패:', error);
      alert('삭제 처리에 실패했습니다.');
    }
  };

  // ───  4. DB 좋아요 처리 (LIKE TOGGLE) ─────────────────────────
  const handleLike = async (id: number) => {
    try {
      // 서버 연동 후 증감 반영된 최신 BlogPost 정보를 갱신 처리
      const updatedPost: BlogPost = await api.toggleLike(id);
      
      setPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      setDetailPost(prev => prev && prev.id === id ? updatedPost : prev);
    } catch (error) {
      console.error('좋아요 서버 반영 실패:', error);
    }
  };

  const pageStyle: React.CSSProperties = {
    '--blog-primary': theme.primary,
    '--blog-dark': theme.dark,
    '--blog-bg': theme.bg,
    '--blog-text': theme.text,
    background: theme.bg,
    color: theme.text,
  } as React.CSSProperties

  return (
    <div className="blog-page" style={pageStyle}>

      {/* 히어로 검색 배경 */}
      <div className="blog-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          className="hero-bg"
          aria-hidden={true}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 50%), url('/src/assets/Image/Copilot_20260520_113840.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'normal',
            zIndex: 1,
          }}
        />

        <div className="hero-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-eyebrow" style={{ color: theme.primary }}>
            🍽️ EAT PICK BLOG
          </div>
          <h1 className="hero-title" style={{ color: '#ffffff' }}>
            맛집 <span style={{ color: theme.primary }}>리뷰</span><br />커뮤니티
          </h1>
          <p className="hero-sub" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            직접 다녀온 맛집 후기를 공유해보세요
          </p>
          <div className="hero-search">
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              placeholder="식당 이름, 지역, 음식 종류 검색..."
              style={{ '--search-focus': theme.primary } as React.CSSProperties} 
            />
            <button style={{ background: theme.primary, color: '#fff' }}>검색</button>
          </div>
        </div>
      </div>

      {/* 지역 필터 */}
      <div className="area-section" style={{ background: theme.bg, borderColor: `${theme.primary}22` }}>
        <div className="area-label" style={{ color: theme.text, opacity: 0.6 }}>지역별 보기</div>
        <div className="area-pills">
          {AREAS.map(a => (
            <button key={a}
              className={`area-pill ${area === a ? 'on' : ''}`}
              style={area === a
                ? { background: theme.primary, borderColor: theme.primary, color: '#fff' }
                : { color: theme.dark, borderColor: `${theme.primary}30` }}
              onClick={() => setArea(a)}>{a}</button>
          ))}
        </div>
      </div>

      {/* 메인 비즈니스 영역 */}
      <div className="blog-main" style={{ background: theme.bg }}>
        <section className="blog-feed" aria-label="리뷰 목록">
          <div className="feed-head">
            <div className="feed-title" style={{ color: theme.dark }}>
              {area === '전체' ? '전체 리뷰' : `${area} 리뷰`}
            </div>
            <div className="feed-sort">
              {(['latest','likes','rating'] as const).map(s => (
                <button key={s}
                  className={`sort-btn ${sort === s ? 'on' : ''}`}
                  style={sort === s ? { color: theme.primary, borderColor: theme.primary, background: `${theme.primary}15` } : { color: theme.text }}
                  onClick={() => setSort(s)}>
                  {s === 'latest' ? '최신순' : s === 'likes' ? '인기순' : '별점순'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="empty-feed">데이터베이스에서 리뷰를 불러오는 중입니다...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-feed">등록된 맛집 리뷰가 없습니다 😅<br />첫 번째 주인공이 되어보세요!</div>
          ) : (
            filtered.map(post => (
              <div key={post.id} className="post-card" onClick={() => setDetailPost(post)}
                style={{ background: '#fff', borderColor: `${theme.primary}18` }}>
                <div className="post-card-inner">
                  {post.photos.length > 0
                    ? <img className="post-thumb" src={post.photos[0]} alt={post.restaurant} />
                    : <div className="post-thumb-placeholder" style={{ background: `${theme.primary}15`, color: theme.primary }}>
                        {CAT_EMOJI[post.category] || '🍽️'}
                      </div>
                  }
                  <div className="post-body">
                    <div className="post-tags">
                      <span className="post-tag" style={{ background: theme.primary, color: '#fff' }}>{post.category}</span>
                      <span className="post-tag tag-gray">{post.area}</span>
                      {post.tags?.map(t => <span key={t} className="post-tag" style={{ background: `${theme.primary}20`, color: theme.primary }}>{t}</span>)}
                    </div>
                    <div className="post-title" style={{ color: theme.dark }}>{post.title}</div>
                    <div className="post-excerpt" style={{ color: theme.text, opacity: 0.65 }}>
                      {post.content.slice(0,80)}...
                    </div>
                    <div className="post-meta">
                      <div className="post-author">
                        <div className="author-avatar" style={{ background: post.authorColor }}>{post.author?.[0] || '익'}</div>
                        <span className="author-name" style={{ color: theme.text }}>{post.author}</span>
                      </div>
                      <span className="post-date">{post.date}</span>
                      <div className="post-stats" style={{ color: theme.primary }}>
                        <span>❤️ {post.likes}</span>
                        <span>{'★'.repeat(post.rating)} {post.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* 사이드바 */}
        <aside className="blog-sidebar" aria-label="인기 리뷰 및 카테고리">
          {isEditor && (
            <button className="sidebar-write-btn" onClick={() => setShowWrite(true)}
              style={{ background: theme.primary, color: '#fff' }}>
              ✏️ 리뷰 작성하기
            </button>
          )}

          <div className="sidebar-widget" style={{ background: '#fff', borderColor: `${theme.primary}18` }}>
            <div className="widget-title" style={{ color: theme.dark }}>🔥 인기 리뷰</div>
            {hotPosts.map((p,i) => (
              <div key={p.id} className="hot-post" onClick={() => setDetailPost(p)}>
                <div className={`hot-num ${i < 3 ? 'top' : ''}`}
                  style={i < 3 ? { color: theme.primary } : {}}>{String(i+1).padStart(2,'0')}</div>
                <div>
                  <div className="hot-title" style={{ color: theme.dark }}>{p.title}</div>
                  <div className="hot-meta">{p.restaurant} · ❤️ {p.likes}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-widget" style={{ background: '#fff', borderColor: `${theme.primary}18` }}>
            <div className="widget-title" style={{ color: theme.dark }}>📂 카테고리</div>
            <div className="cat-list">
              {catCounts.map(([cat,cnt]) => (
                <div key={cat} className="cat-item" onClick={() => setSearch(cat)}>
                  <span className="cat-name" style={{ color: theme.dark }}>{CAT_EMOJI[cat] || '🍽'} {cat}</span>
                  <span className="cat-cnt" style={{ background: `${theme.primary}15`, color: theme.primary }}>{cnt}개</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 모바일 플로팅 버튼 */}
      {isEditor && (
        <button className="blog-fab" onClick={() => setShowWrite(true)}
          style={{ background: theme.primary, color: '#fff', boxShadow: `0 8px 24px ${theme.primary}55` }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>리뷰 쓰기</span>
        </button>
      )}

      {showWrite && <WriteModal initial={EMPTY_FORM} isEdit={false} onClose={() => setShowWrite(false)} onSubmit={handleSubmit} themeColor={theme.primary} />}
      {editPost && <WriteModal initial={editPost} isEdit={true} onClose={() => setEditPost(null)} onSubmit={handleEdit} themeColor={theme.primary} />}
      {detailPost && (
        <DetailModal post={detailPost} onClose={() => setDetailPost(null)}
          onEdit={() => { setEditPost(detailPost); setDetailPost(null) }}
          onDelete={() => handleDelete(detailPost.id)}
          onLike={() => handleLike(detailPost.id)}
          themeColor={theme.primary} />
      )}
    </div>
  )
}
