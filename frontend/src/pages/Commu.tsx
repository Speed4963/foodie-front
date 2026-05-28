import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { communityService } from "../services/communityService";
import "../assets/css/Community.css";
import "../assets/css/Commu.css";

// ─── 데이터 인터페이스 정의 ──────────────────────
interface Comment {
  commentId: number;
  author: string;
  text: string;
  createdDate: string;
}

interface Post {
  postId: number;
  boardId: string; 
  category: string; 
  author: string;
  content: string;
  likes: number;
  imgUrl: string;
  createdDate: string;
  comments: Comment[]; // 백엔드에서는 replies 등으로 올 수 있음
  memberId?: string;
  parentPostId?: number | null;
  quotePostId?: number | null;
  isAnonymous?: boolean;
  isLocked?: boolean;
  deletedDate?: string | null;
  isLikedByUser?: boolean;
}

interface BoardCategory {
  wrapperId: string;
  boardName: string;
  categories: string[];
  pendingCategories: string[];
}

const BOARD_GROUPS = [
  { groupName: "채식 게시판", boards: [{ name: "채식맛집", boardId: 1, wrapperId: "cate-veg-main", label: "방문후기" }, { name: "채식 자유", boardId: 2, wrapperId: "cate-veg-free", label: "자유게시판" }] },
  { groupName: "주류 게시판", boards: [{ name: "주류매장", boardId: 3, wrapperId: "cate-alc-main", label: "방문후기" }, { name: "주류 자유", boardId: 4, wrapperId: "cate-alc-free", label: "자유게시판" }] },
  { groupName: "이국 게시판", boards: [{ name: "이국맛집", boardId: 5, wrapperId: "cate-exp-main", label: "방문후기" }, { name: "이국 자유", boardId: 6, wrapperId: "cate-exp-free", label: "자유게시판" }] },
  { groupName: "괴식 게시판", boards: [{ name: "괴식맛집", boardId: 7, wrapperId: "cate-weird-main", label: "방문후기" }, { name: "괴식 자유", boardId: 8, wrapperId: "cate-weird-free", label: "자유게시판" }] },
  { groupName: "유명셰프 게시판", boards: [{ name: "유명셰프맛집", boardId: 9, wrapperId: "cate-chef-main", label: "방문후기" }, { name: "유명셰프 자유", boardId: 10, wrapperId: "cate-chef-free", label: "자유게시판" }] },
  { groupName: "미슐랭 게시판", boards: [{ name: "미슐랭", boardId: 11, wrapperId: "cate-star-main", label: "방문후기" }, { name: "미슐랭 자유", boardId: 12, wrapperId: "cate-star-free", label: "자유게시판" }] },
  { groupName: "키즈존 게시판", boards: [{ name: "키즈존", boardId: 13, wrapperId: "cate-kids-main", label: "방문후기" }, { name: "키즈존 자유", boardId: 14, wrapperId: "cate-kids-free", label: "자유게시판" }] },
  { groupName: "동물식당 게시판", boards: [{ name: "동물식당", boardId: 15, wrapperId: "cate-pet-main", label: "방문후기" }, { name: "동물식당 자유", boardId: 16, wrapperId: "cate-pet-free", label: "자유게시판" }] }
];

export default function EatPickCommunity() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext ? authContext.user : null;

  // ─── 상태 관리 ───
  const [threadsData, setThreadsData] = useState<Post[]>([]);
  const [boardCategories, setBoardCategories] = useState<BoardCategory[]>([]);
  
  const [currentActiveBoard, setCurrentActiveBoard] = useState<{ name: string; id: number }>({ name: "채식맛집", id: 1 });
  const [currentActiveCategory, setCurrentActiveCategory] = useState<string>("전체");
  const [currentWrapperId, setCurrentWrapperId] = useState<string>("cate-veg-main");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  // ─── 폼 입력 상태 관리 ───
  const [author, setAuthor] = useState<string>("");
  const [quoteId, setQuoteId] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const [expandedComments, setExpandedComments] = useState<{ [postId: number]: boolean }>({});

  useEffect(() => {
    if (currentUser?.nickname) {
      setAuthor(currentUser.nickname);
    } else {
      setAuthor("미식가_A");
    }
  }, [currentUser]);

  // ─── 1. 기초 데이터 및 첫 게시판 글 로드 ─────────────────
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const boardData = await communityService.getBoards();
        if (boardData) setBoardCategories(boardData);

        // 첫 번째 렌더링 시 현재 활성화된 게시판 데이터 로드
        await loadPostsForBoard(currentActiveBoard.id);
      } catch (error) {
        console.error("데이터베이스 연결 실패:", error);
      }
    };
    loadInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 게시판별 글 로드 함수
  const loadPostsForBoard = async (boardId: number) => {
    try {
      const postsData = await communityService.getPostsByBoard(boardId, 0, 100); 
      if (postsData) {
        // 백엔드에서 받은 replies를 comments 형태로 매핑
        const mappedPosts = postsData.map(p => ({
          ...p,
          comments: (p as any).replies || [] 
        }));
        setThreadsData(mappedPosts);
      }
    } catch (error) {
      console.error(`게시판 ${boardId} 글 불러오기 실패:`, error);
      setThreadsData([]);
    }
  };

  // ─── 내비게이션 핸들러 ─────────────
  const handleSelectBoard = (boardName: string, boardId: number, wrapperId: string) => {
    setCurrentActiveBoard({ name: boardName, id: boardId });
    setCurrentWrapperId(wrapperId);
    setCurrentActiveCategory("전체"); 
    setCurrentPage(1);
    loadPostsForBoard(boardId); // 🌟 게시판 바뀔 때마다 서버에서 데이터 새로 가져오기
  };

  const handleSelectCategory = (categoryName: string, isPending: boolean) => {
    if (isPending) {
      alert("관리자의 승인을 기다리고 있는 카테고리입니다.");
      return;
    }
    setCurrentActiveCategory(categoryName);
    setCurrentPage(1);
  };


  const handleSelectQuote = (postId: number) => {
    setQuoteId(String(postId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCancelQuote = () => setQuoteId("");

  // ─── 3. 새 스레드 게시글 등록 ──────
  const handleAddPost = async () => {
    if (!content.trim()) {
      alert("내용을 입력해 주세요!");
      return;
    }
    const finalAuthor = isAnonymous ? "익명" : (author.trim() || currentUser?.nickname || "익명회원");
    
    // 🌟 백엔드 PostRequestDto 스펙에 맞춤
    const postPayload = {
      boardId: currentActiveBoard.id, 
      category: currentActiveCategory === "전체" ? "일반" : currentActiveCategory,
      author: finalAuthor,
      content: content,
      imgUrl: imgUrl.trim(),
      quotePostId: quoteId ? parseInt(quoteId) : null,
      parentPostId: null, // 원문이므로 null
      isAnonymous: isAnonymous,
      isLocked: isLocked,
      memberId: currentUser?.email || null 
    };

    try {
      const savedPost = await communityService.createPost(postPayload);
      if (savedPost) {
        setThreadsData((prev) => [{ ...savedPost, comments: [] }, ...prev]);
        setCurrentPage(1);
        setContent("");
        setImgUrl("");
        setQuoteId("");
      }
    } catch (error) {
      console.error("서버 통신 에러:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  // ─── 4. 스레드 삭제 (SOFT DELETE) ───────────
  const handleDeletePost = async (postId: number) => {
    if (window.confirm("이 스레드를 삭제하시겠습니까?")) {
      try {
        const isSuccess = await communityService.deletePost(postId);
        if (isSuccess) {
          setThreadsData((prev) =>
            prev.map((post) =>
              post.postId === postId ? { ...post, deletedDate: new Date().toISOString() } : post
            )
          );
        }
      } catch (error) {
        console.error("게시글 삭제 처리 에러:", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  // ─── 5. 댓글 추가 (백엔드 스펙에 맞게 createPost 활용) ───
  const handleAddComment = async (parentPostId: number) => {
    const commentText = commentInputs[parentPostId]?.trim();
    if (!commentText) {
      alert("댓글 내용을 입력해 주세요!");
      return;
    }

    const finalCommentAuthor = isAnonymous ? "익명" : (author.trim() || currentUser?.nickname || "익명러");
    
    // 🌟 백엔드 댓글 작성 스펙: 일반 글 작성과 동일하나 parentPostId를 붙임
    const replyPayload = {
      boardId: currentActiveBoard.id, 
      category: "댓글",
      author: finalCommentAuthor,
      content: commentText,
      parentPostId: parentPostId, // 부모글 지정
      isAnonymous: isAnonymous,
      memberId: currentUser?.email || null 
    };

    try {
      const newReply = await communityService.createPost(replyPayload);
      if (newReply) {
        // 화면 표출용 Comment 인터페이스로 변환
        const newComment: Comment = {
          commentId: newReply.postId,
          author: newReply.author,
          text: newReply.content,
          createdDate: newReply.createdDate
        };

        setThreadsData((prev) =>
          prev.map((post) =>
            post.postId === parentPostId ? { ...post, comments: [...post.comments, newComment] } : post
          )
        );
        setCommentInputs((prev) => ({ ...prev, [parentPostId]: "" }));
      }
    } catch (error) {
      console.error("댓글 등록 처리 에러:", error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  // ─── 6. 댓글 삭제 ───────────────────────────
  const handleDeleteComment = async (parentPostId: number, commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        // 댓글(답글)도 결국 Post이므로 통일된 삭제 API 사용
        const isSuccess = await communityService.deletePost(commentId);
        if (isSuccess) {
          setThreadsData((prev) =>
            prev.map((post) =>
              post.postId === parentPostId
                ? { ...post, comments: post.comments.filter((c) => c.commentId !== commentId) }
                : post
            )
          );
        }
      } catch (error) {
        console.error("댓글 삭제 처리 에러:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  // ─── 7. 좋아요 토글 ───────────────────────
  const handleToggleLike = async (post: Post) => {
    try {
      const isIncrease = !post.isLikedByUser; // 현재 좋아요 상태의 반대로 요청
      const updatedPost = await communityService.toggleLike(post.postId, isIncrease);
      if (updatedPost) {
        setThreadsData((prev) =>
          prev.map((p) => (p.postId === post.postId ? { ...updatedPost, comments: p.comments } : p))
        );
      }
    } catch (error) {
      console.error("좋아요 처리 에러:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  // ─── 데이터 필터링 및 페이지네이션 연산 ───
  const activePosts = threadsData.filter((post) => !post.deletedDate);
  const filteredPosts = activePosts.filter((post) => {
    const isCategoryMatch = currentActiveCategory === "전체" ? true : post.category === currentActiveCategory;
    return isCategoryMatch; // 보드 아이디는 이미 서버에서 걸러서 가져왔으므로 카테고리만 필터링
  });
  
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
     <>
      <header className="cs-header">
        <div className="header-content">
          <h2 className="logo">
            <span>Eat Pick</span> 커뮤니티
          </h2>
          <div className="welcome-box">
            <h3>안녕하세요, Eat Pick 회원여러분!</h3>
            <h3>즐거운 시간되세요.</h3>
          </div>
        </div>
      </header>

    <div className="community-main-layout">
      <aside className="board-navigation-sidebar">
        <div className="sidebar-title">Eat Pick 커뮤니티</div>

        {BOARD_GROUPS.map((group) => (
          <div className="major-board-group" key={group.groupName}>
            <div className="major-title">{group.groupName}</div>
            <ul className="minor-board-list">
              {group.boards.map((board) => {
                const isBoardActive = currentActiveBoard.id === board.boardId;
                const boardData = boardCategories.find((b) => b.boardName === board.name);

                return (
                  <div key={board.name}>
                    <li
                      className={`minor-item ${isBoardActive ? "active" : ""}`}
                      onClick={() => handleSelectBoard(board.name, board.boardId, board.wrapperId)}
                    >
                      {board.label}
                    </li>
                    {currentWrapperId === board.wrapperId && boardData && (
                      <div className="category-chip-wrapper">
                        <span
                          className={`category-chip ${currentActiveCategory === "전체" ? "active" : ""}`}
                          onClick={() => handleSelectCategory("전체", false)}
                        >
                          # 전체
                        </span>
                        {boardData.categories.map((cate) => (
                          <span
                            key={cate}
                            className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                            onClick={() => handleSelectCategory(cate, false)}
                          >
                            # {cate}
                          </span>
                        ))}
                        {boardData.pendingCategories?.map((cate) => (
                          <span
                            key={cate}
                            className="category-chip pending"
                            onClick={() => handleSelectCategory(cate, true)}
                          >
                            # {cate} <span className="pending-badge">⌛ 대기</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>

      {/* 스레드 영역 피드 */}
      <div className="threads-container">
        <div className="threads-header" id="feedHeaderTitle">
          {currentActiveBoard.name} ➔ {currentActiveCategory} 목록
        </div>

        {/* 글 작성 카드 */}
        <div className="write-card">
          <div className="write-layout">
            <div className="user-avatar" id="currentAvatar">
              {isAnonymous ? "익" : (author.substring(0, 1).toUpperCase() || "U")}
            </div>
            <div className="write-inputs">
              <div className="author-row">
                <input
                  type="text"
                  className="input-author"
                  placeholder="작성자 이름"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  disabled={isAnonymous} 
                />
                {quoteId && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <input
                      type="text"
                      className="input-author"
                      style={{ width: "80px", fontSize: "12px", textAlign: "center", backgroundColor: "#e9ecef" }}
                      value={`ID: ${quoteId}`}
                      readOnly
                    />
                    <button type="button" className="cancel-quote-btn" onClick={handleCancelQuote}>❌ 취소</button>
                  </div>
                )}
              </div>
              <textarea
                className="input-text"
                placeholder="이야기를 함께 나누어보세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <div className="write-options">
                <div className="option-left">
                  <label>
                    <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} /> 익명
                  </label>
                  <label>
                    <input type="checkbox" checked={isLocked} onChange={(e) => setIsLocked(e.target.checked)} /> 비밀글
                  </label>
                  <input
                    type="text"
                    className="input-img-url"
                    placeholder="이미지 URL 주소"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)} 
                  />
                </div>
                <button className="submit-btn" onClick={handleAddPost}>등록</button>
              </div>
            </div>
          </div>
        </div>

        {/* 스레드 피드 리스트 */}
        <div className="threads-feed" id="threadsFeed">
          {paginatedPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-sub)" }}>
              등록된 스레드가 없습니다. 첫 번째 이야기를 나누어보세요!
            </div>
          ) : (
            paginatedPosts.map((post) => {
              const avatarText = post.isAnonymous ? "익" : post.author.substring(0, 1).toUpperCase();
              const authorName = post.isAnonymous ? "익명 스레드" : post.author;

              let quotedBox = null;
              if (post.quotePostId) {
                const quotedPost = threadsData.find(p => p.postId === post.quotePostId);
                if (quotedPost) {
                  quotedBox = (
                    <div className="quote-box">
                      <strong>@{quotedPost.isAnonymous ? "익명" : quotedPost.author}</strong> (ID: {quotedPost.postId}): {quotedPost.content.substring(0, 40)}...
                    </div>
                  );
                }
              }

              const safeComments = post.comments || [];
              const isCommentsExpanded = expandedComments[post.postId];
              const visibleComments = isCommentsExpanded ? safeComments : safeComments.slice(0, 5);
              const hasMoreComments = safeComments.length > 5;

              return (
                <div className="thread-post" key={post.postId}>
                  <div className="post-layout">
                    <div className="profile-column">
                      <div className="user-avatar" style={{ backgroundColor: post.isAnonymous ? "#555" : "#333" }}>{avatarText}</div>
                      <div className="profile-line"></div>
                    </div>
                    <div className="content-column">
                      <div className="post-header">
                        <div className="post-author">
                          {authorName}{" "}
                          <span style={{ fontSize: "11px", color: "var(--text-sub)", fontWeight: "normal" }}>#{post.postId}</span>{" "}
                          <span className="post-badge" style={{ background: "#222", color: "#ffd700" }}>{post.category}</span>
                          {post.isAnonymous && <span className="post-badge">익명</span>}
                          {post.isLocked && <span className="post-badge" style={{ background: "#5c4d00", color: "#ffd700" }}>비밀글</span>}
                        </div>
                        <div className="post-meta">
                          <span>{post.createdDate}</span>
                          <button className="delete-btn" onClick={() => handleDeletePost(post.postId)}>삭제</button>
                        </div>
                      </div>

                      <div className="post-body">
                        {post.isLocked ? "작성자와 관리자만 볼 수 있는 비밀 스레드입니다." : post.content}
                      </div>

                      {post.imgUrl && <div className="post-image"><img src={post.imgUrl} alt="첨부" /></div>}
                      {quotedBox}

                      <div className="post-actions">
                        <div className={`action-item ${post.isLikedByUser ? "liked" : ""}`} onClick={() => handleToggleLike(post)}>
                          {post.isLikedByUser ? "❤️" : "🤍"} <span className="like-count">{post.likes}</span>
                        </div>
                        <div className="action-item">💬 <span className="comment-count">{safeComments.length}</span></div>
                        <div className="action-item" onClick={() => handleSelectQuote(post.postId)}>🔁 <span>인용하기</span></div>
                      </div>

                      <div className="comments-section">
                        <div className="comments-list">
                          {visibleComments.map((comment) => (
                            <div className="comment-item" key={comment.commentId}>
                              <div className="comment-avatar">{comment.author.substring(0, 1).toUpperCase()}</div>
                              <div className="comment-content-box">
                                <div className="comment-header">
                                  <span className="comment-author">{comment.author}</span>
                                  <div className="post-meta">
                                    <span>{comment.createdDate}</span>
                                    <button className="delete-btn" style={{ fontSize: "10px" }} onClick={() => handleDeleteComment(post.postId, comment.commentId)}>삭제</button>
                                  </div>
                                </div>
                                <div className="comment-text">{comment.text}</div>
                              </div>
                            </div>
                          ))}
                          
                          {hasMoreComments && (
                            <button 
                              onClick={() => setExpandedComments(prev => ({ ...prev, [post.postId]: !isCommentsExpanded }))}
                              style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '12px', cursor: 'pointer', marginTop: '8px', padding: '4px', textDecoration: 'underline' }}
                            >
                              {isCommentsExpanded ? "댓글 접기" : `댓글 ${safeComments.length - 5}개 더보기`}
                            </button>
                          )}
                        </div>

                        <div className="comment-write-box">
                          <input
                            type="text"
                            className="comment-input"
                            placeholder="댓글작성"
                            value={commentInputs[post.postId] || ""}
                            onChange={(e) => setCommentInputs({ ...commentInputs, [post.postId]: e.target.value })}
                            onKeyUp={(e) => { if (e.key === "Enter") handleAddComment(post.postId); }}
                          />
                          <button className="comment-submit-btn" onClick={() => handleAddComment(post.postId)}>등록</button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-container">
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>이전</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>다음</button>
          </div>
        )}
      </div>
    </div><br /><br /><br />
    </>
  );
}