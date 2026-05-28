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
  
  // 1. 게시판 카테고리 구조 조회
  getBoardCategories: async (): Promise<BoardCategory[]> => {
    const response = await apiClient.get(`/api/community/categories`);
    return response.data;
  },

  // 2. [수정됨] 게시판별 게시글 목록 조회 (백엔드: /api/community/posts/board/{boardId})
  getPosts: async (
    boardId: number, 
    page: number = 0, 
    size: number = 10
  ): Promise<{ content: Post[]; totalElements: number }> => {
    // 백엔드 경로 및 Pageable 대응
    const response = await apiClient.get(`/api/community/posts/board/${boardId}`, {
      params: { page, size }
    });
    // 백엔드는 Page<PostResponseDto>를 반환하므로 content로 접근
    return {
        content: response.data.content,
        totalElements: response.data.totalElements
    };
  },

  // 3. 새 카테고리 건의
  suggestCategory: async (boardName: string, categoryName: string): Promise<void> => {
    await apiClient.post(`/api/community/categories/suggest`, { boardName, categoryName });
  },

  // 4. 새 게시글 등록
  createPost: async (postData: any): Promise<void> => {
    await apiClient.post(`/api/community/posts`, postData);
  },

  // 5. [수정됨] 게시글 삭제 (백엔드: /api/community/posts/delete/{postId})
  deletePost: async (postId: number): Promise<void> => {
    await apiClient.delete(`/api/community/posts/delete/${postId}`);
  },

  // 6. [주의] 아래 댓글 관련 API는 백엔드에 컨트롤러가 구현되어야 작동합니다.
  createComment: async (postId: number, commentData: any): Promise<Comment> => {
    const response = await apiClient.post(`/api/community/posts/${postId}/comments`, commentData);
    return response.data;
  },

  deleteComment: async (postId: number, commentId: number): Promise<void> => {
    await apiClient.delete(`/api/community/posts/${postId}/comments/${commentId}`);
  },

  // 7. 좋아요 토글 (백엔드: /api/community/posts/{postId}/like?isIncrease={boolean})
  toggleLike: async (postId: number, isIncrease: boolean): Promise<{ likes: number }> => {
    const response = await apiClient.post(`/api/community/posts/${postId}/like`, null, {
      params: { isIncrease }
    });
    return response.data; 
  }
};