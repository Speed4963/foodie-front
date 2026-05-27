import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; 
import "../assets/css/Community.css";
import "../assets/css/Commu.css";

// ─── 백엔드 DTO 스펙에 맞춘 데이터 인터페이스 정의 ──────────────────────
interface Post {
  postId: number;          
  boardId: number;         
  parentId: number | null; 
  quoteId: number | null;  
  writer: string;          
  content: string;         
  replyCount: number;      
  likeCount: number;       
  imgUrl: string;          
  thumbUrl: string;        
  isLocked: boolean;       
  lockedAt: string | null; 
  bumpAt: string;          
  createdAt: string;       
  
  category?: string; 
  isLikedByUser?: boolean;
}

interface BoardCategory {
  boardId: number;         
  wrapperId: string;
  boardName: string;
  categories: string[];
  pendingCategories: string[];
}

const BOARD_GROUPS = [
  { groupName: "채식 게시판", boards: [{ name: "채식맛집", wrapperId: "cate-veg-main", label: "방문후기" }, { name: "채식 자유", wrapperId: "cate-veg-free", label: "자유게시판" }] },
  { groupName: "주류 게시판", boards: [{ name: "주류매장", wrapperId: "cate-alc-main", label: "방문후기" }, { name: "주류 자유", wrapperId: "cate-alc-free", label: "자유게시판" }] },
  { groupName: "이국 게시판", boards: [{ name: "이국맛집", wrapperId: "cate-exp-main", label: "방문후기" }, { name: "이국 자유", wrapperId: "cate-exp-free", label: "자유게시판" }] },
  { groupName: "괴식 게시판", boards: [{ name: "괴식맛집", wrapperId: "cate-weird-main", label: "방문후기" }, { name: "괴식 자유", wrapperId: "cate-weird-free", label: "자유게시판" }] },
  { groupName: "유명셰프 게시판", boards: [{ name: "유명셰프맛집", wrapperId: "cate-chef-main", label: "방문후기" }, { name: "유명셰프 자유", wrapperId: "cate-chef-free", label: "자유게시판" }] },
  { groupName: "미슐랭 게시판", boards: [{ name: "미슐랭", wrapperId: "cate-star-main", label: "방문후기" }, { name: "미슐랭 자유", wrapperId: "cate-star-free", label: "자유게시판" }] },
  { groupName: "키즈존 게시판", boards: [{ name: "키즈존", wrapperId: "cate-kids-main", label: "방문후기" }, { name: "키즈존 자유", wrapperId: "cate-kids-free", label: "자유게시판" }] },
  { groupName: "동물식당 게시판", boards: [{ name: "동물식당", wrapperId: "cate-pet-main", label: "방문후기" }, { name: "동물식당 자유", wrapperId: "cate-pet-free", label: "자유게시판" }] }
];

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function EatPickCommunity() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext ? authContext.user : null;

  // ─── 상태 관리 ───
  const [threadsData, setThreadsData] = useState<Post[]>([]); 
  const [boardCategories, setBoardCategories] = useState<BoardCategory[]>([]);
  
  const [currentActiveBoard, setCurrentActiveBoard] = useState<string>("채식맛집");
  const [currentActiveCategory, setCurrentActiveCategory] = useState<string>("전체");
  const [currentWrapperId, setCurrentWrapperId] = useState<string>("cate-veg-main");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  // ─── 폼 입력 상태 관리 ───
  const [writer, setWriter] = useState<string>(""); 
  const [quoteId, setQuoteId] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [newCategoryInput, setNewCategoryInput] = useState<string>("");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (currentUser?.nickname) {
      setWriter(currentUser.nickname);
    } else {
      setWriter("미식가_A");
    }
  }, [currentUser]);

  // ─── [핵심 수정] 특정 게시판의 글을 서버에서 불러오는 함수 ───
  const loadPostsByBoardId = async (boardId: number) => {
    try {
      const postsRes = await fetch(`${BASE_URL}/api/community/posts/board/${boardId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('eatpick_access_token')}`
        },
        credentials: "include" 
      });
      if (postsRes.ok) {
        const postsData = await postsRes.json();
        // 백엔드가 Page<PostResponseDto>를 반환하면 postsData.content에 배열이 들어있습니다.
        const postsArray = postsData.content ? postsData.content : postsData;
        setThreadsData(postsArray);
      }
    } catch (error) {
      console.error("게시글 로드 실패:", error);
    }
  };

  // ─── 1. DB 초기 데이터 로드 ───
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // 게시판 목록 로드
        const boardRes = await fetch(`${BASE_URL}/api/boards`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('eatpick_access_token')}`
          },
          credentials: "include" 
        });
        
        if (boardRes.ok) {
          const boardData = await boardRes.json();
          setBoardCategories(boardData);

          // 기본 게시판("채식맛집") ID를 찾아 해당 게시판 글 로드
          const defaultBoard = boardData.find((b: BoardCategory) => b.boardName === "채식맛집");
          if (defaultBoard) {
            loadPostsByBoardId(defaultBoard.boardId);
          }
        }
      } catch (error) {
        console.error("데이터베이스 연결 실패:", error);
      }
    };
    loadInitialData();
  }, []);

  // ─── 내비게이션 핸들러 ─────────────
  const handleSelectBoard = (boardName: string, wrapperId: string) => {
    setCurrentActiveBoard(boardName);
    setCurrentWrapperId(wrapperId);
    setCurrentActiveCategory("전체"); 
    setCurrentPage(1);

    // 게시판을 클릭하면 해당 게시판의 글을 서버에서 새로 가져옵니다.
    const targetBoard = boardCategories.find(b => b.boardName === boardName);
    if (targetBoard) {
      loadPostsByBoardId(targetBoard.boardId);
    }
  };

  const handleSelectCategory = (boardName: string, categoryName: string, isPending: boolean) => {
    if (isPending) {
      alert("관리자의 승인을 기다리고 있는 카테고리입니다.");
      return;
    }
    setCurrentActiveBoard(boardName);
    setCurrentActiveCategory(categoryName);
    setCurrentPage(1);
  };

  // ─── 2. 새 카테고리 승인 신청 ───
  const handleCreateNewCategory = async () => {
    if (!newCategoryInput.trim()) {
      alert("신청할 카테고리명을 입력해 주세요!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/community/boards/${currentActiveBoard}/categories`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('eatpick_access_token')}`
        },
        credentials: "include", 
        body: JSON.stringify({ categoryName: newCategoryInput.trim() })
      });

      if (response.ok) {
        const updatedBoard = await response.json();
        setBoardCategories((prev) =>
          prev.map((item) => (item.boardName === currentActiveBoard ? updatedBoard : item))
        );
        alert(`[${currentActiveBoard}]에 [# ${newCategoryInput.trim()}] 카테고리가 신청되었습니다.`);
        setNewCategoryInput("");
      } else {
        alert("카테고리 신청에 실패했습니다.");
      }
    } catch (error) {
      console.error("카테고리 신청 처리 에러:", error);
    }
  };

  const handleSelectQuote = (postId: number) => {
    setQuoteId(String(postId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelQuote = () => {
    setQuoteId("");
  };

  // ─── 3. 새 스레드 원문 게시글 등록 ───
  const handleAddPost = async () => {
    if (!content.trim()) {
      console.log("현재 선택된 게시판:", currentActiveBoard);
    console.log("서버 데이터:", boardCategories);
      alert("내용을 입력해 주세요!");
      return;
    }

    const currentBoardData = boardCategories.find(b => b.boardName === currentActiveBoard);
    if (!currentBoardData) {
      alert("올바른 게시판 정보를 찾을 수 없습니다.");
      return;
    }

    const finalAuthor = isAnonymous ? "익명" : (writer.trim() || currentUser?.nickname || "익명회원");

    const postPayload = {
      boardId: currentBoardData.boardId, 
      parentId: null,                    
      quoteId: quoteId ? parseInt(quoteId) : null,
      writer: finalAuthor,
      content: content,
      isAnonymous: isAnonymous,
      imgUrl: imgUrl.trim(),
      thumbUrl: ""                       
    };

    try {
      const response = await fetch(`${BASE_URL}/api/community/posts`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('eatpick_access_token')}`
        },
        credentials: "include", 
        body: JSON.stringify(postPayload)
      });

      if (response.ok) {
        const savedPost: Post = await response.json();
        setThreadsData((prev) => [savedPost, ...prev]);
        setCurrentPage(1);
        setContent("");
        setImgUrl("");
        setQuoteId("");
      } else {
        alert(`에러코드 ${response.status} : 게시글 등록 실패`);
      }
    } catch (error) {
      console.error("네트워크 통신 실패:", error);
    }
  };

  // ─── 4. 스레드/답글 삭제 ───
  const handleDeletePost = async (postId: number) => {
    if (window.confirm("이 게시글(혹은 답글)을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`${BASE_URL}/api/community/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('eatpick_access_token')}`
          },
          credentials: "include" 
        });

        if (response.ok) {
          setThreadsData((prev) => prev.filter((post) => post.postId !== postId));
        } else {
          alert("게시글 삭제에 실패했습니다. 권한을 확인해 주세요.");
        }
      } catch (error) {
        console.error("게시글 삭제 처리 에러:", error);
      }
    }
  };

  // ─── 5. 답글 추가 ───
  const handleAddComment = async (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) {
      alert("댓글 내용을 입력해 주세요!");
      return;
    }

    const currentBoardData = boardCategories.find(b => b.boardName === currentActiveBoard);
    const finalCommentAuthor = isAnonymous ? "익명" : (writer.trim() || currentUser?.nickname || "익명러");

    const commentPayload = {
      boardId: currentBoardData ? currentBoardData.boardId : null,
      parentId: postId, 
      quoteId: null,
      writer: finalCommentAuthor,
      content: commentText,
      isAnonymous: isAnonymous,
      imgUrl: "",
      thumbUrl: ""
    };

    try {
      const response = await fetch(`${BASE_URL}/api/community/posts`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('eatpick_access_token')}`
        },
        credentials: "include", 
        body: JSON.stringify(commentPayload)
      });

      if (response.ok) {
        const newReply: Post = await response.json();
        setThreadsData((prev) => [...prev, newReply]); 
        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      } else {
        alert("댓글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 등록 처리 에러:", error);
    }
  };

  // ─── 6. 좋아요 토글 ───
  const handleToggleLike = async (postId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/community/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('eatpick_access_token')}`
        },
        credentials: "include" 
      });

      if (response.ok) {
        const updatedPost: Post = await response.json();
        setThreadsData((prev) =>
          prev.map((post) => (post.postId === postId ? updatedPost : post))
        );
      } else {
        alert("좋아요 처리에 실패했습니다.");
      }
    } catch (error) {
      console.error("좋아요 처리 에러:", error);
    }
  };

  // ─── 데이터 필터링 및 페이지네이션 연산 ───
  const mainThreads = threadsData.filter((post) => post.parentId === null || post.parentId === 0);

  const filteredPosts = mainThreads.filter((post) => {
    const targetBoard = boardCategories.find((b) => b.boardName === currentActiveBoard);
    const isBoardMatch = targetBoard ? post.boardId === targetBoard.boardId : false;
    
    const isCategoryMatch = currentActiveCategory === "전체" ? true : post.category === currentActiveCategory;
    return isBoardMatch && isCategoryMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
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
                const isBoardActive = currentActiveBoard === board.name;
                const boardData = boardCategories.find((b) => b.boardName === board.name);

                return (
                  <div key={board.name}>
                    <li
                      className={`minor-item ${isBoardActive ? "active" : ""}`}
                      onClick={() => handleSelectBoard(board.name, board.wrapperId)}
                    >
                      {board.label}
                    </li>
                    {currentWrapperId === board.wrapperId && boardData && (
                      <div className="category-chip-wrapper">
                        <span
                          className={`category-chip ${currentActiveCategory === "전체" ? "active" : ""}`}
                          onClick={() => handleSelectCategory(board.name, "전체", false)}
                        >
                          # 전체
                        </span>
                        {boardData.categories.map((cate) => (
                          <span
                            key={cate}
                            className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                            onClick={() => handleSelectCategory(board.name, cate, false)}
                          >
                            # {cate}
                          </span>
                        ))}
                        {boardData.pendingCategories?.map((cate) => (
                          <span
                            key={cate}
                            className="category-chip pending"
                            onClick={() => handleSelectCategory(board.name, cate, true)}
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

        <div className="create-category-form">
          <div className="create-title">선택한 게시판에 카테고리 신청하기</div>
          <div className="target-board-indicator" id="targetIndicator">대상 게시판: {currentActiveBoard}</div>
          <div className="form-row">
            <input
              type="text"
              className="input-category-name"
              placeholder="카테고리명을 입력하세요."
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
            />
            <button type="button" className="add-category-btn" onClick={handleCreateNewCategory}>신청</button>
          </div>
        </div>
      </aside>

      <div className="threads-container">
        <div className="threads-header" id="feedHeaderTitle">
          {currentActiveBoard} ➔ {currentActiveCategory} 목록
        </div>

        <div className="write-card">
          <div className="write-layout">
            <div className="user-avatar" id="currentAvatar">
              {isAnonymous ? "익" : (writer.substring(0, 1).toUpperCase() || "U")}
            </div>
            <div className="write-inputs">
              <div className="author-row">
                <input
                  type="text"
                  className="input-author"
                  placeholder="작성자 이름"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
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

        <div className="threads-feed" id="threadsFeed">
          {paginatedPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-sub)" }}>
              등록된 스레드가 없습니다. 첫 번째 이야기를 나누어보세요!
            </div>
          ) : (
            paginatedPosts.map((post) => {
              const avatarText = post.writer.substring(0, 1).toUpperCase();
              const authorName = post.writer;

              let quotedBox = null;
              if (post.quoteId) {
                const quotedPost = threadsData.find(p => p.postId === post.quoteId);
                if (quotedPost) {
                  quotedBox = (
                    <div className="quote-box">
                      <strong>@{quotedPost.writer}</strong> (ID: {quotedPost.postId}): {quotedPost.content.substring(0, 40)}...
                    </div>
                  );
                }
              }

              const postReplies = threadsData.filter((p) => p.parentId === post.postId);

              return (
                <div className="thread-post" key={post.postId}>
                  <div className="post-layout">
                    <div className="profile-column">
                      <div className="user-avatar" style={{ backgroundColor: post.writer === "익명" ? "#555" : "#333" }}>{avatarText}</div>
                      <div className="profile-line"></div>
                    </div>
                    <div className="content-column">
                      <div className="post-header">
                        <div className="post-author">
                          {authorName}{" "}
                          <span style={{ fontSize: "11px", color: "var(--text-sub)", fontWeight: "normal" }}>#{post.postId}</span>{" "}
                          {post.category && <span className="post-badge" style={{ background: "#222", color: "#ffd700" }}>{post.category}</span>}
                          {post.writer === "익명" && <span className="post-badge">익명</span>}
                          {post.isLocked && <span className="post-badge" style={{ background: "#5c4d00", color: "#ffd700" }}>비밀글</span>}
                        </div>
                        <div className="post-meta">
                          <span>{new Date(post.createdAt).toLocaleString()}</span>
                          <button className="delete-btn" onClick={() => handleDeletePost(post.postId)}>삭제</button>
                        </div>
                      </div>

                      <div className="post-body">
                        {post.isLocked ? "작성자와 관리자만 볼 수 있는 비밀 스레드입니다." : post.content}
                      </div>

                      {post.imgUrl && <div className="post-image"><img src={post.imgUrl} alt="첨부" /></div>}
                      {quotedBox}

                      <div className="post-actions">
                        <div className={`action-item ${post.isLikedByUser ? "liked" : ""}`} onClick={() => handleToggleLike(post.postId)}>
                          {post.isLikedByUser ? "❤️" : "🤍"} <span className="like-count">{post.likeCount}</span>
                        </div>
                        <div className="action-item">💬 <span className="comment-count">{post.replyCount || postReplies.length}</span></div>
                        <div className="action-item" onClick={() => handleSelectQuote(post.postId)}>🔁 <span>인용하기</span></div>
                      </div>

                      <div className="comments-section">
                        <div className="comments-list">
                          {postReplies.map((reply) => (
                            <div className="comment-item" key={reply.postId}>
                              <div className="comment-avatar">{reply.writer.substring(0, 1).toUpperCase()}</div>
                              <div className="comment-content-box">
                                <div className="comment-header">
                                  <span className="comment-author">{reply.writer}</span>
                                  <div className="post-meta">
                                    <span>{new Date(reply.createdAt).toLocaleString()}</span>
                                    <button className="delete-btn" style={{ fontSize: "10px" }} onClick={() => handleDeletePost(reply.postId)}>삭제</button>
                                  </div>
                                </div>
                                <div className="comment-text">{reply.content}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {!post.isLocked && (
                          <div className="comment-write-box">
                            <input
                              type="text"
                              className="comment-input"
                              placeholder="답글 작성"
                              value={commentInputs[post.postId] || ""}
                              onChange={(e) => setCommentInputs({ ...commentInputs, [post.postId]: e.target.value })}
                              onKeyUp={(e) => { if (e.key === "Enter") handleAddComment(post.postId); }}
                            />
                            <button className="comment-submit-btn" onClick={() => handleAddComment(post.postId)}>등록</button>
                          </div>
                        )}
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