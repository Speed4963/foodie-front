import { useState, useRef, useEffect } from "react";
import "../assets/css/Community.css";
import "../assets/css/Commu.css";

// ─── 데이터 인터페이스 정의 (기존 구조 유지) ──────────────────────
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
  comments: Comment[];
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

export default function EatPickCommunity() {
  // ───  상태 관리 (목데이터 전면 제거 및 초기값 빈 배열화) ───
  const [threadsData, setThreadsData] = useState<Post[]>([]);
  const [boardCategories, setBoardCategories] = useState<BoardCategory[]>([]);
  
  const [currentActiveBoard, setCurrentActiveBoard] = useState<string>("채식맛집");
  const [currentActiveCategory, setCurrentActiveCategory] = useState<string>("전체");
  const [currentWrapperId, setCurrentWrapperId] = useState<string>("cate-veg-main");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  // ───  폼 입력 상태 관리 ──────────────────────────────────
  const [author, setAuthor] = useState<string>("미식가_A");
  const [quoteId, setQuoteId] = useState<string>(" ");
  const [content, setContent] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [newCategoryInput, setNewCategoryInput] = useState<string>(" ");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  // ───  1. DB 실시간 데이터 로드 (useEffect) ─────────────────
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Oracle DB에 저장된 전체 카테고리 맵 구조 가져오기
        const boardRes = await fetch("/api/community/boards");
        if (boardRes.ok) {
          const boardData = await boardRes.json();
          setBoardCategories(boardData);
        }

        // Oracle DB에 저장된 전체 스레드 게시글 가져오기
        const postsRes = await fetch("/api/community/posts");
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setThreadsData(postsData);
        }
      } catch (error) {
        console.error("데이터베이스 연결 실패:", error);
      }
    };
    loadInitialData();
  }, []);

  // ───  내비게이션 핸들러 (디자인 연동용 상태 유지) ─────────────
  const handleSelectBoard = (boardName: string, wrapperId: string) => {
    setCurrentActiveBoard(boardName);
    setCurrentWrapperId(wrapperId);
    setCurrentActiveCategory("전체"); 
    setCurrentPage(1);
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

  // ───  2. 새 카테고리 승인 신청 (DB 반영) ───────────────────
  const handleCreateNewCategory = async () => {
    if (!newCategoryInput.trim()) {
      alert("신청할 카테고리명을 입력해 주세요!");
      return;
    }

    try {
      const response = await fetch(`/api/community/boards/${currentActiveBoard}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: newCategoryInput.trim() })
      });

      if (response.ok) {
        const updatedBoard = await response.json();
        setBoardCategories(
          boardCategories.map((item) =>
            item.boardName === currentActiveBoard ? updatedBoard : item
          )
        );
        alert(`[${currentActiveBoard}]에 [# ${newCategoryInput.trim()}] 카테고리가 신청되었습니다.`);
        setNewCategoryInput(" ");
      }
    } catch (error) {
      console.error("카테고리 신청 처리 에러:", error);
    }
  };

  // ─── 인용 핸들러 ─────────────────────────────────────────
  const handleSelectQuote = (postId: number) => {
    setQuoteId(String(postId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelQuote = () => {
    setQuoteId(" ");
  };

  // ───  3. 새 스레드 게시글 등록 (CREATE - Oracle DB 저장) ──────
  const handleAddPost = async () => {
    if (!content.trim()) {
      alert("내용을 입력해 주세요!");
      return;
    }

    // Oracle DB 시퀀스 자동 채번을 위해 postId는 백엔드에서 생성하여 반환받음
    const postPayload = {
      boardId: currentActiveBoard,
      category: currentActiveCategory === "전체" ? "전체" : currentActiveCategory,
      author: isAnonymous ? "익명" : (author.trim() || "익명회원"),
      content: content,
      imgUrl: imgUrl.trim(),
      quotePostId: quoteId.trim() ? parseInt(quoteId.trim()) : null,
      isAnonymous: isAnonymous,
      isLocked: isLocked
    };

    try {
      const response = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload)
      });

      if (response.ok) {
        const savedPost: Post = await response.json(); // 생성 완료된 DB Row 객체
        setThreadsData([savedPost, ...threadsData]);
        setCurrentPage(1);

        setContent("");
        setImgUrl("");
        setQuoteId(" ");
      } else {
        alert("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버 통신 에러:", error);
    }
  };

  // ───  4. 스레드 삭제 (SOFT DELETE / HARD DELETE) ───────────
  const handleDeletePost = async (postId: number) => {
    if (window.confirm("이 스레드를 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/api/community/posts/${postId}`, {
          method: "DELETE"
        });

        if (response.ok) {
          setThreadsData(
            threadsData.map((post) =>
              post.postId === postId ? { ...post, deletedDate: new Date().toISOString() } : post
            )
          );
        }
      } catch (error) {
        console.error("게시글 삭제 처리 에러:", error);
      }
    }
  };

  // ───  5. 댓글 추가 (POST 연동) ─────────────────────────────
  const handleAddComment = async (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) {
      alert("댓글 내용을 입력해 주세요!");
      return;
    }

    const commentPayload = {
      author: isAnonymous ? "익명" : (author.trim() || "익명러"),
      text: commentText
    };

    try {
      const response = await fetch(`/api/community/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentPayload)
      });

      if (response.ok) {
        const newComment: Comment = await response.json();
        setThreadsData(
          threadsData.map((post) =>
            post.postId === postId ? { ...post, comments: [...post.comments, newComment] } : post
          )
        );
        setCommentInputs({ ...commentInputs, [postId]: "" });
      }
    } catch (error) {
      console.error("댓글 등록 처리 에러:", error);
    }
  };

  // ───  6. 댓글 삭제 (DELETE 연동) ───────────────────────────
  const handleDeleteComment = async (postId: number, commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/api/community/posts/${postId}/comments/${commentId}`, {
          method: "DELETE"
        });

        if (response.ok) {
          setThreadsData(
            threadsData.map((post) =>
              post.postId === postId
                ? { ...post, comments: post.comments.filter((c) => c.commentId !== commentId) }
                : post
            )
          );
        }
      } catch (error) {
        console.error("댓글 삭제 처리 에러:", error);
      }
    }
  };

  // ───  7. 좋아요 토글 (Like 상태 반영) ───────────────────────
  const handleToggleLike = async (postId: number) => {
    try {
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: "POST"
      });

      if (response.ok) {
        const updatedPost: Post = await response.json(); // 업데이트 완료된 최신 Post 엔티티 반환받음
        setThreadsData(
          threadsData.map((post) => post.postId === postId ? updatedPost : post)
        );
      }
    } catch (error) {
      console.error("좋아요 처리 에러:", error);
    }
  };

  // ───  데이터 필터링 및 페이지네이션 연산 (기존 로직 보존) ───
  const activePosts = threadsData.filter((post) => !post.deletedDate);
  const filteredPosts = activePosts.filter((post) => {
    const isBoardMatch = post.boardId === currentActiveBoard;
    const isCategoryMatch = currentActiveCategory === "전체" ? true : post.category === currentActiveCategory;
    return isBoardMatch && isCategoryMatch;
  });
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // ───  UI 렌더링 영역 (기존 HTML 구조 및 클래스명 명확히 유지) ───
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

        {/* 채식 게시판 */}
        <div className="major-board-group">
          <div className="major-title">채식 게시판</div>
          <ul className="minor-board-list">
            <li
              className={`minor-item ${currentActiveBoard === "채식맛집" ? "active" : ""}`}
              onClick={() => handleSelectBoard("채식맛집", "cate-veg-main")}
            >
              방문후기
            </li>
            {currentWrapperId === "cate-veg-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "채식맛집")?.categories.map((cate) => (
                  <span
                    key={cate}
                    className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                    onClick={() => handleSelectCategory("채식맛집", cate, false)}
                  >
                    # {cate}
                  </span>
                ))}
                {boardCategories.find(b => b.boardName === "채식맛집")?.pendingCategories.map((cate) => (
                  <span key={cate} className="category-chip pending" onClick={() => handleSelectCategory("채식맛집", cate, true)}>
                    # {cate} <span className="pending-badge">⌛ 대기</span>
                  </span>
                ))}
              </div>
            )}

            <li
              className={`minor-item ${currentActiveBoard === "채식 자유" ? "active" : ""}`}
              onClick={() => handleSelectBoard("채식 자유", "cate-veg-free")}
            >
              자유게시판
            </li>
            {currentWrapperId === "cate-veg-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "채식 자유")?.categories.map((cate) => (
                  <span
                    key={cate}
                    className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                    onClick={() => handleSelectCategory("채식 자유", cate, false)}
                  >
                    # {cate}
                  </span>
                ))}
                {boardCategories.find(b => b.boardName === "채식 자유")?.pendingCategories.map((cate) => (
                  <span key={cate} className="category-chip pending" onClick={() => handleSelectCategory("채식 자유", cate, true)}>
                    # {cate} <span className="pending-badge">⌛ 대기</span>
                  </span>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* 주류 게시판 */}
        <div className="major-board-group">
          <div className="major-title">주류 게시판</div>
          <ul className="minor-board-list">
            <li
              className={`minor-item ${currentActiveBoard === "주류매장" ? "active" : ""}`}
              onClick={() => handleSelectBoard("주류매장", "cate-alc-main")}
            >
              방문후기
            </li>
            {currentWrapperId === "cate-alc-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "주류매장")?.categories.map((cate) => (
                  <span
                    key={cate}
                    className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                    onClick={() => handleSelectCategory("주류매장", cate, false)}
                  >
                    # {cate}
                  </span>
                ))}
                {boardCategories.find(b => b.boardName === "주류매장")?.pendingCategories.map((cate) => (
                  <span key={cate} className="category-chip pending" onClick={() => handleSelectCategory("주류매장", cate, true)}>
                    # {cate} <span className="pending-badge">⌛ 대기</span>
                  </span>
                ))}
              </div>
            )}

            <li
              className={`minor-item ${currentActiveBoard === "주류 자유" ? "active" : ""}`}
              onClick={() => handleSelectBoard("주류 자유", "cate-alc-free")}
            >
              자유게시판
            </li>
            {currentWrapperId === "cate-alc-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "주류 자유")?.categories.map((cate) => (
                  <span
                    key={cate}
                    className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                    onClick={() => handleSelectCategory("주류 자유", cate, false)}
                  >
                    # {cate}
                  </span>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* 이국 게시판 */}
        <div className="major-board-group">
          <div className="major-title">이국 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "이국맛집" ? "active" : ""}`} onClick={() => handleSelectBoard("이국맛집", "cate-exp-main")}>
              방문후기
            </li>
            {currentWrapperId === "cate-exp-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "이국맛집")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("이국맛집", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "이국 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("이국 자유", "cate-exp-free")}>
              자유게시판
            </li>
            {currentWrapperId === "cate-exp-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "이국 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("이국 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* 괴식 게시판 */}
        <div className="major-board-group">
          <div className="major-title">괴식 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "괴식맛집" ? "active" : ""}`} onClick={() => handleSelectBoard("괴식맛집", "cate-weird-main")}>방문후기</li>
            {currentWrapperId === "cate-weird-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "괴식맛집")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("괴식맛집", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "괴식 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("괴식 자유", "cate-weird-free")}>자유게시판</li>
            {currentWrapperId === "cate-weird-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "괴식 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("괴식 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* 유명셰프 게시판 */}
        <div className="major-board-group">
          <div className="major-title">유명셰프 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "유명셰프맛집" ? "active" : ""}`} onClick={() => handleSelectBoard("유명셰프맛집", "cate-chef-main")}>방문후기</li>
            {currentWrapperId === "cate-chef-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "유명셰프맛집")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("유명셰프맛집", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "유명셰프 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("유명셰프 자유", "cate-chef-free")}>자유게시판</li>
            {currentWrapperId === "cate-chef-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "유명셰프 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("유명셰프 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* 미슐랭 게시판 */}
        <div className="major-board-group">
          <div className="major-title">미슐랭 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "미슐랭" ? "active" : ""}`} onClick={() => handleSelectBoard("미슐랭", "cate-star-main")}>방문후기</li>
            {currentWrapperId === "cate-star-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "미슐랭")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("미슐랭", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "미슐랭 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("미슐랭 자유", "cate-star-free")}>자유게시판</li>
            {currentWrapperId === "cate-star-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "미슐랭 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("미슐랭 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* 키즈존 게시판 */}
        <div className="major-board-group">
          <div className="major-title">키즈존 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "키즈존" ? "active" : ""}`} onClick={() => handleSelectBoard("키즈존", "cate-kids-main")}>방문후기</li>
            {currentWrapperId === "cate-kids-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "키즈존")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("키즈존", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "키즈존 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("키즈존 자유", "cate-kids-free")}>자유게시판</li>
            {currentWrapperId === "cate-kids-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "키즈존 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("키즈존 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* 동물식당 게시판 */}
        <div className="major-board-group">
          <div className="major-title">동물식당 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "동물식당" ? "active" : ""}`} onClick={() => handleSelectBoard("동물식당", "cate-pet-main")}>방문후기</li>
            {currentWrapperId === "cate-pet-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "동물식당")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("동물식당", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "동물식당 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("동물식당 자유", "cate-pet-free")}>자유게시판</li>
            {currentWrapperId === "cate-pet-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "동물식당 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("동물식당 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* 카테고리 신청 폼 */}
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

      {/* 스레드 영역 피드 */}
      <div className="threads-container">
        <div className="threads-header" id="feedHeaderTitle">
          {currentActiveBoard} ➔ {currentActiveCategory} 목록
        </div>

        {/* 글 작성 카드 */}
        <div className="write-card">
          <div className="write-layout">
            <div className="user-avatar" id="currentAvatar">U</div>
            <div className="write-inputs">
              <div className="author-row">
                <input
                  type="text"
                  className="input-author"
                  placeholder="작성자 이름"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                {quoteId.trim() && (
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
          {paginatedPosts.map((post) => {
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
                      <div className={`action-item ${post.isLikedByUser ? "liked" : ""}`} onClick={() => handleToggleLike(post.postId)}>
                        {post.isLikedByUser ? "❤️" : "🤍"} <span className="like-count">{post.likes}</span>
                      </div>
                      <div className="action-item">💬 <span className="comment-count">{post.comments.length}</span></div>
                      <div className="action-item" onClick={() => handleSelectQuote(post.postId)}>🔁 <span>인용하기</span></div>
                    </div>

                    {/* 댓글 섹션 */}
                    <div className="comments-section">
                      <div className="comments-list">
                        {post.comments.map((comment) => (
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
          })}
        </div>

        {/* 페이지네이션 */}
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