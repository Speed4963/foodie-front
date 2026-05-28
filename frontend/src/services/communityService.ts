import apiClient from "./apiClient";

// ─── 데이터 인터페이스 정의 ──────────────────────
export interface Comment {
  commentId: number;
  author: string;
  text: string;
  createdDate: string;
}

export interface Post {
  postId: number;
  boardId: string; // 참고: 백엔드 컨트롤러는 Integer boardId를 요구하므로 숫자 변환이 필요할 수 있습니다.
  category: string;
  author: string;
  content: string;
  likes: number;
  imgUrl: string;
  createdDate: string;
  comments: Comment[]; // 백엔드의 Replies 데이터와 매핑
  memberId?: string;
  parentPostId?: number | null;
  quotePostId?: number | null;
  isAnonymous?: boolean;
  isLocked?: boolean;
  deletedDate?: string | null;
  isLikedByUser?: boolean;
}

export interface BoardCategory {
  wrapperId: string;
  boardName: string;
  categories: string[];
  pendingCategories: string[];
}

// ─── 커뮤니티 서비스 (PostController 완벽 대응) ────────────────
export const communityService = {
  
  // 1. 게시판 및 카테고리 데이터 조회 (별도 BoardController 존재 가정)
  getBoards: async (): Promise<BoardCategory[]> => {
    const response = await apiClient.get('/api/community/categories'); // 환경에 맞게 경로 확인 필요
    return response.data;
  },

  // 2. 게시판별 스레드 원문 목록 조회 (백엔드: GET /board/{boardId})
  getPostsByBoard: async (boardId: number, page: number = 0, size: number = 10): Promise<Post[]> => {
    const response = await apiClient.get(`/api/community/posts/board/${boardId}`, {
      params: { page, size }
    });
    // 백엔드가 Page<PostResponseDto>를 반환하므로 .content만 추출하여 배열로 리턴
    return response.data.content;
  },

  // 3. 특정 스레드의 답글(댓글) 목록 조회 (백엔드: GET /{threadId}/replies)
  getReplies: async (threadId: number): Promise<Post[]> => {
    const response = await apiClient.get(`/api/community/posts/${threadId}/replies`);
    return response.data;
  },

  // 4. 스레드 원문 및 답글 등록 (백엔드: POST /api/community/posts)
  // 답글(댓글)을 달 때도 이 API를 사용하며 payload에 parentPostId를 포함해야 합니다.
  createPost: async (postData: any): Promise<Post> => {
    const response = await apiClient.post('/api/community/posts', postData);
    return response.data;
  },

  // 5. 게시글 삭제 (백엔드: DELETE /delete/{postId})
  deletePost: async (postId: number): Promise<boolean> => {
    const response = await apiClient.delete(`/api/community/posts/delete/${postId}`);
    return response.status === 200 || response.status === 204;
  },

  // 6. 좋아요 토글 (백엔드: POST /{postId}/like?isIncrease=true/false)
  toggleLike: async (postId: number, isIncrease: boolean): Promise<Post> => {
    const response = await apiClient.post(`/api/community/posts/${postId}/like`, null, {
      params: { isIncrease }
    });
    return response.data;
  }
};