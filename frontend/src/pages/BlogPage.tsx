// ============================================================
// src/pages/BlogPage.tsx — 잇픽 맛집 블로그
// 기능: 게시글 작성·수정·삭제, 사진 업로드, 좋아요, 검색, 필터
// 백엔드 연결 포인트: TODO 주석 확인
// ============================================================
import { useState, useMemo } from 'react'
import '../Blog.css'

// ─── Types ───────────────────────────────────────────────────
export interface BlogPost {
  id: number
  restaurant: string
  category: string
  area: string
  title: string
  content: string
  rating: number
  photos: string[]       // base64 or URL (백엔드 연결 시 URL로 교체)
  tags: string[]
  author: string
  authorColor: string
  date: string
  likes: number
  liked?: boolean
}

// ─── 초기 목 데이터 (백엔드 연결 시 API로 교체) ─────────────
// TODO: useEffect(() => { fetch('/api/posts').then(...) }, []) 로 교체
const INITIAL_POSTS: BlogPost[] = [
  { id:1, restaurant:'을지로 골뱅이', category:'안주·포차', area:'을지로·종로', title:'퇴근 후 소맥 한 잔, 을지로 골뱅이의 진가', content:'을지로 3가 골목 깊숙이 자리한 이곳. 골뱅이무침 한 접시에 소주 한 병이면 하루의 피로가 싹 날아갑니다. 특히 무침에 들어간 야채들이 신선해서 느끼하지 않고 깔끔한 맛이 일품이에요. 가격도 부담 없고 사장님이 친절하셔서 혼자도, 여럿이서도 편하게 즐길 수 있는 곳입니다.', rating:5, photos:[], tags:['인기'], author:'김민준', authorColor:'#E53E3E', date:'2025.05.07', likes:42 },
  { id:2, restaurant:'광장시장 빈대떡', category:'전통·분식', area:'을지로·종로', title:'100년 전통의 맛, 광장시장 빈대떡은 역시 달라', content:'광장시장을 대표하는 음식 중 하나죠. 바삭하게 구워진 빈대떡에 막걸리 한 잔이면 이 조합을 누가 만들었나 싶을 정도로 완벽합니다.', rating:4, photos:[], tags:['맛집'], author:'이서연', authorColor:'#2F855A', date:'2025.05.06', likes:28 },
  { id:3, restaurant:'연남동 브런치 카페', category:'카페·브런치', area:'연남동', title:'주말 아침을 여는 완벽한 브런치 플레이스', content:'연남동 골목에 숨겨진 브런치 카페. 에그베네딕트가 정말 일품이에요. 소스가 진하고 빵이 촉촉하게 잘 구워져 있어서 한 입 먹는 순간 감탄이 나옵니다.', rating:5, photos:[], tags:['힙','신규'], author:'박지호', authorColor:'#6B46C1', date:'2025.05.05', likes:67 },
  { id:4, restaurant:'마포 돼지갈비', category:'고기·구이', area:'마포', title:'두툼한 갈비살, 마포에서 가장 맛있는 돼지갈비', content:'마포구 오래된 골목에 위치한 이 식당은 30년 넘게 한 자리를 지켜온 곳입니다. 고기가 두툼하게 잘려있어서 씹는 맛이 있고, 양념이 절묘하게 배어있습니다.', rating:5, photos:[], tags:['인기','찐맛집'], author:'최유진', authorColor:'#C05621', date:'2025.05.04', likes:55 },
  { id:5, restaurant:'용산 순대국밥', category:'국밥·탕', area:'용산', title:'해장의 정석, 새벽 2시에도 줄서는 이유가 있다', content:'용산역 근처에 위치한 이 순대국밥집은 24시간 운영합니다. 국물이 진하고 깊은 맛이 나서 해장에 최고예요.', rating:5, photos:[], tags:['찐맛집'], author:'정다은', authorColor:'#185FA5', date:'2025.05.03', likes:89 },
]

const AREAS = ['전체','강남','홍대·합정','을지로·종로','이태원','연남동','성수','마포','용산','기타']
const CATEGORIES = ['고기·구이','국밥·탕','안주·포차','전통·분식','양식·파스타','카페·브런치','일식·스시','중식','기타']
const CAT_EMOJI: Record<string, string> = { '고기·구이':'🥩','국밥·탕':'🍲','안주·포차':'🍺','전통·분식':'🥟','양식·파스타':'🍝','카페·브런치':'☕','일식·스시':'🍣','중식':'🥡' }

// ─── Form 초기값 ──────────────────────────────────────────────
const EMPTY_FORM = { restaurant:'', category:'고기·구이', area:'', title:'', content:'', rating:3, photos:[] as string[], tags:[] as string[] }

// ─── Stars Component ──────────────────────────────────────────
function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div style={{ display:'flex', gap:4 }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)}
          style={{ background:'none', border:'none', fontSize:24, cursor:'pointer', color: i <= value ? '#FAB700' : '#E0E0E0', padding:0 }}>
          ★
        </button>
      ))}
    </div>
  )
}

// ─── Write/Edit Modal ─────────────────────────────────────────
interface WriteModalProps {
  initial: Partial<typeof EMPTY_FORM>
  isEdit: boolean
  onClose: () => void
  onSubmit: (data: typeof EMPTY_FORM) => void
}

function WriteModal({ initial, isEdit, onClose, onSubmit }: WriteModalProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial })

  const update = (key: string, val: unknown) => setForm(f => ({ ...f, [key]: val }))

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5 - form.photos.length)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => {
        // TODO: 백엔드 연결 시 S3/Cloudinary에 업로드 후 URL을 저장
        update('photos', [...form.photos, ev.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const handleSubmit = () => {
    if (!form.restaurant.trim() || !form.title.trim() || !form.content.trim()) {
      alert('식당 이름, 제목, 내용은 필수입니다!')
      return
    }
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
            <input className="form-input" value={form.restaurant} onChange={e => update('restaurant', e.target.value)} placeholder="방문한 식당 이름을 입력하세요" />
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
            <textarea className="form-textarea" value={form.content} onChange={e => update('content', e.target.value)} placeholder="방문 후기를 자유롭게 작성해주세요. 메뉴 추천, 분위기, 가격 등을 공유해보세요!" />
          </div>
          <div className="form-group">
            <label className="form-label">사진 첨부 (최대 5장)</label>
            <div className="photo-upload" onClick={() => document.getElementById('photoInput')?.click()}>
              <div style={{ fontSize:28, marginBottom:8 }}>📷</div>
              <div className="photo-upload-text"><strong>클릭하여 사진 선택</strong><br />JPG, PNG 최대 5장</div>
            </div>
            {/* TODO: 백엔드 연결 시 이 input을 multipart/form-data로 전송 */}
            <input type="file" id="photoInput" accept="image/*" multiple style={{ display:'none' }} onChange={handlePhotos} />
            {form.photos.length > 0 && (
              <div className="photo-previews">
                {form.photos.map((src, i) => (
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
          <button className="btn-submit" onClick={handleSubmit}>
            {isEdit ? '수정 완료' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Detail Modal ─────────────────────────────────────────────
function DetailModal({ post, onClose, onEdit, onDelete, onLike }: {
  post: BlogPost; onClose: () => void; onEdit: () => void; onDelete: () => void; onLike: () => void
}) {
  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display:'flex', gap:6 }}>
            <span className="post-tag tag-red">{post.category}</span>
            <span className="post-tag tag-gray">{post.area}</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {post.photos.length > 0 && (
            <div className="detail-photos">
              {post.photos.map((src, i) => <img key={i} className="detail-photo" src={src} alt={`photo${i}`} />)}
            </div>
          )}
          <div className="detail-title">{post.title}</div>
          <div className="detail-meta-row">
            <span className="detail-rating">{'★'.repeat(post.rating)}{'☆'.repeat(5 - post.rating)} {post.rating}.0</span>
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
          <button className={`like-btn ${post.liked ? 'liked' : ''}`} onClick={onLike}>
            ❤️ {post.likes}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── BlogPage ─────────────────────────────────────────────────
let nextId = INITIAL_POSTS.length + 1

export default function BlogPage() {
  const [posts, setPosts]             = useState<BlogPost[]>(INITIAL_POSTS)
  const [area, setArea]               = useState('전체')
  const [sort, setSort]               = useState<'latest'|'likes'|'rating'>('latest')
  const [search, setSearch]           = useState('')
  const [showWrite, setShowWrite]     = useState(false)
  const [editPost, setEditPost]       = useState<BlogPost | null>(null)
  const [detailPost, setDetailPost]   = useState<BlogPost | null>(null)

  // 필터 + 정렬
  const filtered = useMemo(() => {
    let list = posts.filter(p =>
      (area === '전체' || p.area === area) &&
      (!search || p.title.includes(search) || p.restaurant.includes(search) || p.content.includes(search))
    )
    if (sort === 'likes')  list = [...list].sort((a, b) => b.likes - a.likes)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'latest') list = [...list].sort((a, b) => b.id - a.id)
    return list
  }, [posts, area, sort, search])

  const hotPosts = useMemo(() => [...posts].sort((a, b) => b.likes - a.likes).slice(0, 5), [posts])

  const catCounts = useMemo(() => {
    const m: Record<string, number> = {}
    posts.forEach(p => { m[p.category] = (m[p.category] || 0) + 1 })
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }, [posts])

  // 등록
  const handleSubmit = (data: typeof EMPTY_FORM) => {
    // TODO: POST /api/posts 로 교체
    setPosts(prev => [{
      id: nextId++, ...data,
      author: '나', authorColor: '#E8272A',
      date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
      likes: 0,
    }, ...prev])
    setShowWrite(false)
  }

  // 수정
  const handleEdit = (data: typeof EMPTY_FORM) => {
    // TODO: PUT /api/posts/${editPost.id} 로 교체
    setPosts(prev => prev.map(p => p.id === editPost!.id ? { ...p, ...data } : p))
    setEditPost(null)
    setDetailPost(null)
  }

  // 삭제
  const handleDelete = (id: number) => {
    if (!confirm('이 리뷰를 삭제할까요?')) return
    // TODO: DELETE /api/posts/${id} 로 교체
    setPosts(prev => prev.filter(p => p.id !== id))
    setDetailPost(null)
  }

  // 좋아요
  const handleLike = (id: number) => {
    // TODO: POST /api/posts/${id}/like 로 교체
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
    setDetailPost(prev => prev && prev.id === id
      ? { ...prev, liked: !prev.liked, likes: prev.liked ? prev.likes - 1 : prev.likes + 1 }
      : prev
    )
  }

  return (
    <div className="blog-page">
      {/* 헤더 */}
      <header className="blog-header">
        <div className="blog-logo">
          <svg width="18" height="22" viewBox="0 0 44 56" fill="none">
            <path d="M22 2C11.5 2 3 10.5 3 21c0 14 19 33 19 33S41 35 41 21C41 10.5 32.5 2 22 2z" fill="#E8272A" stroke="#B01E20" strokeWidth="2"/>
            <circle cx="22" cy="21" r="7" fill="white" opacity="0.9"/>
          </svg>
          잇픽 <span>BLOG</span>
        </div>
        <div className="header-btns">
          <button className="btn-login">로그인</button>
          <button className="btn-write" onClick={() => setShowWrite(true)}>✏️ 글쓰기</button>
        </div>
      </header>

      {/* 히어로 검색 */}
      <div className="blog-hero">
        <div className="hero-bg-grid" /><div className="hero-circle" />
        <div className="hero-inner">
          <div className="hero-eyebrow">Eat Pick Blog</div>
          <h1 className="hero-title">맛집 <span>리뷰</span><br />커뮤니티</h1>
          <p className="hero-sub">직접 다녀온 맛집 후기를 공유해보세요</p>
          <div className="hero-search">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="식당 이름, 지역, 음식 종류 검색..." />
            <button>검색</button>
          </div>
        </div>
      </div>

      {/* 지역 필터 */}
      <div className="area-section">
        <div className="area-label">지역별 보기</div>
        <div className="area-pills">
          {AREAS.map(a => (
            <button key={a} className={`area-pill ${area === a ? 'on' : ''}`} onClick={() => setArea(a)}>{a}</button>
          ))}
        </div>
      </div>

      {/* 메인 레이아웃 */}
      <div className="blog-main">
        {/* 피드 */}
        <div>
          <div className="feed-head">
            <div className="feed-title">{area === '전체' ? '전체 리뷰' : `${area} 리뷰`}</div>
            <div className="feed-sort">
              {(['latest','likes','rating'] as const).map(s => (
                <button key={s} className={`sort-btn ${sort === s ? 'on' : ''}`} onClick={() => setSort(s)}>
                  {s === 'latest' ? '최신순' : s === 'likes' ? '인기순' : '별점순'}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-feed">아직 리뷰가 없어요 😅<br />첫 번째 리뷰를 작성해보세요!</div>
          ) : (
            filtered.map(post => (
              <div key={post.id} className="post-card" onClick={() => setDetailPost(post)}>
                <div className="post-card-inner">
                  {post.photos.length > 0
                    ? <img className="post-thumb" src={post.photos[0]} alt={post.restaurant} />
                    : <div className="post-thumb-placeholder">{CAT_EMOJI[post.category] || '🍽️'}</div>
                  }
                  <div className="post-body">
                    <div className="post-tags">
                      <span className="post-tag tag-red">{post.category}</span>
                      <span className="post-tag tag-gray">{post.area}</span>
                      {post.tags.map(t => <span key={t} className="post-tag tag-red">{t}</span>)}
                    </div>
                    <div className="post-title">{post.title}</div>
                    <div className="post-excerpt">{post.content.slice(0, 80)}...</div>
                    <div className="post-meta">
                      <div className="post-author">
                        <div className="author-avatar" style={{ background: post.authorColor }}>{post.author[0]}</div>
                        <span className="author-name">{post.author}</span>
                      </div>
                      <span className="post-date">{post.date}</span>
                      <div className="post-stats">
                        <span>❤️ {post.likes}</span>
                        <span>{'★'.repeat(post.rating)} {post.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 사이드바 */}
        <aside>
          <div className="sidebar-widget">
            <div className="widget-title">🔥 인기 리뷰</div>
            {hotPosts.map((p, i) => (
              <div key={p.id} className="hot-post" onClick={() => setDetailPost(p)}>
                <div className={`hot-num ${i < 3 ? 'top' : ''}`}>{String(i+1).padStart(2,'0')}</div>
                <div>
                  <div className="hot-title">{p.title}</div>
                  <div className="hot-meta">{p.restaurant} · ❤️ {p.likes}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="sidebar-widget">
            <div className="widget-title">📂 카테고리</div>
            <div className="cat-list">
              {catCounts.map(([cat, cnt]) => (
                <div key={cat} className="cat-item" onClick={() => setSearch(cat)}>
                  <span className="cat-name">{CAT_EMOJI[cat] || '🍽'} {cat}</span>
                  <span className="cat-cnt">{cnt}개</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 글쓰기 모달 */}
      {showWrite && (
        <WriteModal initial={EMPTY_FORM} isEdit={false} onClose={() => setShowWrite(false)} onSubmit={handleSubmit} />
      )}

      {/* 수정 모달 */}
      {editPost && (
        <WriteModal initial={editPost} isEdit={true} onClose={() => setEditPost(null)} onSubmit={handleEdit} />
      )}

      {/* 상세 모달 */}
      {detailPost && (
        <DetailModal
          post={detailPost}
          onClose={() => setDetailPost(null)}
          onEdit={() => { setEditPost(detailPost); setDetailPost(null) }}
          onDelete={() => handleDelete(detailPost.id)}
          onLike={() => handleLike(detailPost.id)}
        />
      )}
    </div>
  )
}