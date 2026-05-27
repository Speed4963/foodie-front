import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../assets/css/Community.css";
import "../assets/css/Commu.css";
import { communityService, type Post, type BoardCategory } from "../services/communityService";


export default function Commu() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext ? authContext.user : null;

  // ─── 상태 관리 ───
  const [threadsData, setThreadsData] = useState<Post[]>([]);
  const [boardCategories, setBoardCategories] = useState<BoardCategory[]>([]);
  const [currentActiveBoard, setCurrentActiveBoard] =
    useState<string>("채식맛집");
  const [currentBoardId, setCurrentBoardId] = useState<number | null>(null);
  const [currentActiveCategory, setCurrentActiveCategory] =
    useState<string>("전체");
  const [currentWrapperId, setCurrentWrapperId] =
    useState<string>("cate-veg-main");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  const [writer, setWriter] = useState<string>("");
  const [quoteId, setQuoteId] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [newCategoryInput, setNewCategoryInput] = useState<string>("");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {},
  );

  useEffect(() => {
    if (currentUser?.nickname) {
      // 1. 로그인한 계정의 닉네임이 있으면 그걸 사용합니다.
      setWriter(currentUser.nickname);
    } else {
      // 2. 만약 닉네임이 없다면 '미식가_A'를 사용합니다.
      setWriter("미식가_A");
    }
  }, [currentUser]);

  // ─── 특정 게시판의 스레드 목록 조회 (GET /api/community/posts/board/{boardId}) ───
 const loadPosts = async (boardId: number) => {
    try {
      const data = await communityService.getPosts(boardId, currentPage - 1, postsPerPage);
      setThreadsData(data.content);
    } catch (error) {
      console.error("게시글 로드 실패:", error);
    }
  };

  // 2. 초기 데이터 로드 (독립적인 useEffect)
 useEffect(() => {
  const init = async () => {
    try {
      const boards = await communityService.getBoardCategories();
      console.log("받아온 게시판 데이터:", boards); // 데이터가 오는지 콘솔로 확인!
      setBoardCategories(boards);
      
      if (boards.length > 0) {
        // 첫 번째 게시판을 기본으로 설정
        setCurrentActiveBoard(boards[0].boardName);
        setCurrentBoardId(boards[0].boardId);
        setCurrentWrapperId(boards[0].wrapperId); // wrapperId도 반드시 설정해야 함!
        loadPosts(boards[0].boardId);
      }
    } catch (e) { 
      console.error("게시판 로드 실패:", e); 
    }
  };
  init();
}, []);
  


  // ─── 내비게이션 핸들러 ─────────────
  const handleSelectBoard = (boardName: string, wrapperId: string) => {
    const targetBoard = boardCategories.find((b) => b.boardName === boardName);

    if (targetBoard) {
      setCurrentActiveBoard(boardName);
      setCurrentBoardId(targetBoard.boardId); // 핵심: 이제 ID를 기억합니다.
      setCurrentWrapperId(wrapperId);
      setCurrentActiveCategory("전체");
      setCurrentPage(1);

      loadPosts(targetBoard.boardId);
    } else {
      alert(`[${boardName}] 게시판이 서버에 생성되지 않았습니다.`);
    }
  };

  const handleSelectCategory = async (categoryName: string, isPending: boolean) => {
    if (isPending) {
      alert("관리자의 승인을 기다리고 있는 카테고리입니다.");
      return;
    }
    setCurrentActiveCategory(categoryName);
      setCurrentPage(1);
  };
  // ─── 2. 새 카테고리 승인 신청 ───
  const handleCreateNewCategory = async () => {
    if (!newCategoryInput.trim())
      return alert("신청할 카테고리명을 입력해 주세요!");

    try {
      // 카테고리 선택 시 로직 (API 호출 등 필요하면 여기에 작성)
    
    } catch (error) {
      console.error("카테고리 선택 에러:", error);
    } finally {
      // 필요시 로딩 상태 해제 등 작업
    }
  };

  const handleSelectQuote = (postId: number) => {
    setQuoteId(String(postId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── 3. 새 스레드 원문 게시글 등록 (POST /api/community/posts) ───
  const handleAddPost = async () => {
    if (!content.trim()) return alert("내용을 입력해 주세요!");
    if (!currentBoardId) return alert("게시판을 먼저 선택해 주세요."); // find() 에러 완벽 차단

    const finalAuthor = isAnonymous
      ? "익명"
      : writer.trim() || currentUser?.nickname || "익명회원";

    const postPayload = {
      boardId: currentBoardId, // ID를 직접 주입
      parentId: null,
      quoteId: quoteId ? parseInt(quoteId) : null,
      writer: finalAuthor,
      content: content,
      isAnonymous: isAnonymous,
      imgUrl: imgUrl.trim(),
      thumbUrl: "",
    };

    try {
      // 2. 직접 fetch 대신 서비스 함수 호출 (경로 문제가 해결됨)
     const savedPost = await communityService.createPost({
  boardId: postPayload.boardId,
  parentId: postPayload.parentId,
  quoteId: postPayload.quoteId,
  writer: postPayload.writer,
  content: postPayload.content,
  isAnonymous: postPayload.isAnonymous,
  imgUrl: postPayload.imgUrl,
  thumbUrl: postPayload.thumbUrl
});

      setThreadsData((prev) => [savedPost, ...prev]);
      setCurrentPage(1);
      setContent("");
      setImgUrl("");
      setQuoteId("");
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  // ─── 4. 답글 추가 (POST /api/community/posts) ───
const handleAddComment = async (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return alert("댓글 내용을 입력해 주세요!");
    if (!currentBoardId) return alert("게시판을 확인할 수 없습니다.");

    const finalCommentAuthor = isAnonymous
      ? "익명"
      : writer.trim() || currentUser?.nickname || "익명러";

    // --- 여기부터 시작 ---
    const commentPayload = {
      boardId: currentBoardId,
      parentId: postId, // 원문의 ID를 부모로 지정
      quoteId: null,
      writer: finalCommentAuthor,
      content: commentText,
      isAnonymous: isAnonymous,
      imgUrl: "",
      thumbUrl: "",
    };

    try {
      // 수정 후 (데이터 누락 방지):
const newReply = await communityService.createPost(commentPayload);
      setThreadsData((prev) => [...prev, newReply]);
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    } catch (e) {
      alert("댓글 등록 실패");
    }
  };

  // ─── (선택 구현) 5. 삭제 (현재 컨트롤러에 없음 - 추가 구현 시 동작) ───
  const handleDeletePost = async (postId: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      await communityService.deletePost(postId);
      setThreadsData(prev => prev.filter(p => p.postId !== postId));
    }
  };

  // ─── (선택 구현) 6. 좋아요 토글 (현재 컨트롤러에 없음 - 추가 구현 시 동작) ───
  const handleToggleLike = async (postId: number) => {
    const updatedPost = await communityService.toggleLike(postId);
    setThreadsData(prev => prev.map(p => p.postId === postId ? updatedPost : p));
  };

  // ─── 데이터 필터링 및 페이지네이션 연산 ───
  const mainThreads = threadsData.filter(
    (post) => post.parentId === null || post.parentId === 0,
  );

  const filteredPosts = mainThreads.filter((post) => {
    // 이제 boardId가 서버에서 받아온 currentBoardId와 정확히 일치하는지만 확인합니다.
    const isBoardMatch = post.boardId === currentBoardId;
    const isCategoryMatch =
      currentActiveCategory === "전체"
        ? true
        : post.category === currentActiveCategory;
    return isBoardMatch && isCategoryMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

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

         {/* BOARD_GROUPS.map(...) 대신 boardCategories.map(...)으로 변경 */}
{boardCategories.map((board) => (
  <div className="major-board-group" key={board.boardId}>
    <ul className="minor-board-list">
      <li
        className={`minor-item ${currentActiveBoard === board.boardName ? "active" : ""}`}
        onClick={() => handleSelectBoard(board.boardName, board.wrapperId)}
      >
        {board.boardName}
      </li>
      
      {/* 서브 카테고리 표시 영역 */}
      {currentWrapperId === board.wrapperId && (
        <div className="category-chip-wrapper">
          <span
            className={`category-chip ${currentActiveCategory === "전체" ? "active" : ""}`}
            onClick={(e) => { e.stopPropagation(); handleSelectCategory("전체", false); }}
          >
            # 전체
          </span>
          {board.categories?.map((cate) => (
            <span
              key={cate}
              className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); handleSelectCategory(cate, false); }}
            >
              # {cate}
            </span>
          ))}
        </div>
      )}
    </ul> {/* <--- 여기 </ul> 태그를 꼭 넣어주세요! */}
  </div>
))}

          <div className="create-category-form">
            <div className="create-title">
              선택한 게시판에 카테고리 신청하기
            </div>
            <div className="target-board-indicator">
              대상 게시판: {currentActiveBoard}
            </div>
            <div className="form-row">
              <input
                type="text"
                className="input-category-name"
                placeholder="카테고리명을 입력하세요."
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
              />
              <button
                type="button"
                className="add-category-btn"
                onClick={handleCreateNewCategory}
              >
                신청
              </button>
            </div>
          </div>
        </aside>

        <div className="threads-container">
          <div className="threads-header">
            {currentActiveBoard} ➔ {currentActiveCategory} 목록
          </div>

          <div className="write-card">
            <div className="write-layout">
              <div className="user-avatar">
                {isAnonymous
                  ? "익"
                  : writer.substring(0, 1).toUpperCase() || "U"}
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <input
                        type="text"
                        className="input-author"
                        style={{
                          width: "80px",
                          fontSize: "12px",
                          textAlign: "center",
                          backgroundColor: "#e9ecef",
                        }}
                        value={`ID: ${quoteId}`}
                        readOnly
                      />
                      <button
                        type="button"
                        className="cancel-quote-btn"
                        onClick={() => setQuoteId("")}
                      >
                        ❌ 취소
                      </button>
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
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />{" "}
                      익명
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={isLocked}
                        onChange={(e) => setIsLocked(e.target.checked)}
                      />{" "}
                      비밀글
                    </label>
                    <input
                      type="text"
                      className="input-img-url"
                      placeholder="이미지 URL 주소"
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                    />
                  </div>
                  <button className="submit-btn" onClick={handleAddPost}>
                    등록
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="threads-feed">
            {paginatedPosts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "var(--text-sub)",
                }}
              >
                등록된 스레드가 없습니다. 첫 번째 이야기를 나누어보세요!
              </div>
            ) : (
              paginatedPosts.map((post) => {
                const avatarText = post.writer.substring(0, 1).toUpperCase();
                let quotedBox = null;
                if (post.quoteId) {
                  const quotedPost = threadsData.find(
                    (p) => p.postId === post.quoteId,
                  );
                  if (quotedPost) {
                    quotedBox = (
                      <div className="quote-box">
                        <strong>@{quotedPost.writer}</strong> (ID:{" "}
                        {quotedPost.postId}):{" "}
                        {quotedPost.content.substring(0, 40)}...
                      </div>
                    );
                  }
                }

                const postReplies = threadsData.filter(
                  (p) => p.parentId === post.postId,
                );

                return (
                  <div className="thread-post" key={post.postId}>
                    <div className="post-layout">
                      <div className="profile-column">
                        <div
                          className="user-avatar"
                          style={{
                            backgroundColor:
                              post.writer === "익명" ? "#555" : "#333",
                          }}
                        >
                          {avatarText}
                        </div>
                        <div className="profile-line"></div>
                      </div>
                      <div className="content-column">
                        <div className="post-header">
                          <div className="post-author">
                            {post.writer}{" "}
                            <span
                              style={{
                                fontSize: "11px",
                                color: "var(--text-sub)",
                                fontWeight: "normal",
                              }}
                            >
                              #{post.postId}
                            </span>{" "}
                            {post.category && (
                              <span
                                className="post-badge"
                                style={{ background: "#222", color: "#ffd700" }}
                              >
                                {post.category}
                              </span>
                            )}
                            {post.writer === "익명" && (
                              <span className="post-badge">익명</span>
                            )}
                            {post.isLocked && (
                              <span
                                className="post-badge"
                                style={{
                                  background: "#5c4d00",
                                  color: "#ffd700",
                                }}
                              >
                                비밀글
                              </span>
                            )}
                          </div>
                          <div className="post-meta">
                            <span>
                              {new Date(post.createdAt).toLocaleString()}
                            </span>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeletePost(post.postId)}
                            >
                              삭제
                            </button>
                          </div>
                        </div>

                        <div className="post-body">
                          {post.isLocked
                            ? "작성자와 관리자만 볼 수 있는 비밀 스레드입니다."
                            : post.content}
                        </div>

                        {post.imgUrl && (
                          <div className="post-image">
                            <img src={post.imgUrl} alt="첨부" />
                          </div>
                        )}
                        {quotedBox}

                        <div className="post-actions">
                          <div
                            className={`action-item ${post.isLikedByUser ? "liked" : ""}`}
                            onClick={() => handleToggleLike(post.postId)}
                          >
                            {post.isLikedByUser ? "❤️" : "🤍"}{" "}
                            <span className="like-count">{post.likeCount}</span>
                          </div>
                          <div className="action-item">
                            💬{" "}
                            <span className="comment-count">
                              {post.replyCount || postReplies.length}
                            </span>
                          </div>
                          <div
                            className="action-item"
                            onClick={() => handleSelectQuote(post.postId)}
                          >
                            🔁 <span>인용하기</span>
                          </div>
                        </div>

                        <div className="comments-section">
                          <div className="comments-list">
                            {postReplies.map((reply) => (
                              <div className="comment-item" key={reply.postId}>
                                <div className="comment-avatar">
                                  {reply.writer.substring(0, 1).toUpperCase()}
                                </div>
                                <div className="comment-content-box">
                                  <div className="comment-header">
                                    <span className="comment-author">
                                      {reply.writer}
                                    </span>
                                    <div className="post-meta">
                                      <span>
                                        {new Date(
                                          reply.createdAt,
                                        ).toLocaleString()}
                                      </span>
                                      <button
                                        className="delete-btn"
                                        style={{ fontSize: "10px" }}
                                        onClick={() =>
                                          handleDeletePost(reply.postId)
                                        }
                                      >
                                        삭제
                                      </button>
                                    </div>
                                  </div>
                                  <div className="comment-text">
                                    {reply.content}
                                  </div>
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
                                onChange={(e) =>
                                  setCommentInputs({
                                    ...commentInputs,
                                    [post.postId]: e.target.value,
                                  })
                                }
                                onKeyUp={(e) => {
                                  if (e.key === "Enter")
                                    handleAddComment(post.postId);
                                }}
                              />
                              <button
                                className="comment-submit-btn"
                                onClick={() => handleAddComment(post.postId)}
                              >
                                등록
                              </button>
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
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ),
              )}
              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
  }

