import apiClient from "./apiClient";

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
}

interface BoardCategory {
  wrapperId: string;
  boardName: string;
  categories: string[];
  pendingCategories: string[];
}

// ─── 커뮤니티 서비스 ────────────────────────────────────────────────
export const communityService = {
  
  // 1. 게시판 메타데이터 및 카테고리 구조 가져오기
  getBoardCategories: async (): Promise<BoardCategory[]> => {
    const response = await apiClient.get(`/api/community/categories`);
    return response.data;
  },

  // 2. 게시판, 카테고리별 스레드 목록 페이징 조회
 getPosts: async (
  boardId: number, // 이름 대신 ID를 받습니다.
  categoryName: string,
  page: number,
  size: number
): Promise<{ posts: Post[]; totalElements: number }> => {
  // 2. URL을 서버가 원하는 /board/{boardId} 형태로 수정
  const response = await apiClient.get(`/api/community/posts/board/${boardId}`, {
    params: {
      category: categoryName, // board는 이제 경로에 포함되었으므로 파라미터에서 제외
      page: page,
      size: size
    }
  });
  return response.data;
},

  // 3. 새 카테고리 해시태그 건의/신청
  suggestCategory: async (boardName: string, categoryName: string): Promise<void> => {
    await apiClient.post(`/api/community/categories/suggest`, {
      boardName,
      categoryName
    });
  },

  // 4. 새 스레드(게시글) 등록
  createPost: async (postData: any): Promise<void> => {
    await apiClient.post(`/api/community/posts`, postData);
  },

  // 5. 스레드 삭제 (Soft-Delete)
  deletePost: async (postId: number): Promise<void> => {
    await apiClient.delete(`/api/community/posts/${postId}`);
  },

  // 6. 댓글 추가
  createComment: async (postId: number, commentData: { author: string; text: string }): Promise<Comment> => {
    const response = await apiClient.post(`/api/community/posts/${postId}/comments`, commentData);
    return response.data;
  },

  // 7. 댓글 삭제
  deleteComment: async (postId: number, commentId: number): Promise<void> => {
    await apiClient.delete(`/api/community/posts/${postId}/comments/${commentId}`);
  },

  // 8. 좋아요 토글
  toggleLike: async (postId: number): Promise<{ isLiked: boolean; likes: number }> => {
    const response = await apiClient.post(`/api/community/posts/${postId}/like`);
    return response.data; 
  }
};