import apiClient from "./apiClient";

// ─── 백엔드 DTO 스펙에 맞춘 데이터 인터페이스 정의 (동기화 완료) ───
export interface Post {
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

export interface BoardCategory {
  boardId: number;         
  wrapperId: string;
  boardName: string;
  categories: string[];
  pendingCategories: string[];
}

// ─── 커뮤니티 서비스 ────────────────────────────────────────────────
export const communityService = {
  
  // 1. 게시판 목록 가져오기 (BoardController의 /api/boards와 매핑)
  getBoardCategories: async (): Promise<BoardCategory[]> => {
    const response = await apiClient.get(`/api/boards`);
    return response.data;
  },

  // 2. 게시판별 스레드 목록 페이징 조회 (PostController와 매핑)
  getPosts: async (
    boardId: number,
    page: number,
    size: number
  ): Promise<{ content: Post[]; totalElements: number }> => {
    const response = await apiClient.get(`/api/community/posts/board/${boardId}`, {
      params: {
        page: page,
        size: size
      }
    });
    return response.data; // Spring Boot의 Page 객체를 그대로 반환
  },

  // 3. 새 카테고리 해시태그 신청 (BoardController 쪽에 해당 엔드포인트 구현 필요)
  suggestCategory: async (boardName: string, categoryName: string): Promise<void> => {
    await apiClient.post(`/api/community/boards/${boardName}/categories`, {
      categoryName
    });
  },

  // 4. 새 스레드(게시글) 및 답글 등록 (PostController의 createPost와 매핑)
  createPost: async (postData: any): Promise<Post> => {
    // 원문 작성, 답글 작성 모두 이 엔드포인트를 사용합니다. (답글은 postData에 parentId 포함)
    const response = await apiClient.post(`/api/community/posts`, postData);
    return response.data;
  },

  // 5. 스레드 삭제 (백엔드에 DELETE /api/community/posts/{postId} 구현 필요)
  deletePost: async (postId: number): Promise<void> => {
    await apiClient.delete(`/api/community/posts/${postId}`);
  },

  // 6. 좋아요 토글 (백엔드에 POST /api/community/posts/{postId}/like 구현 필요)
  toggleLike: async (postId: number): Promise<Post> => {
    const response = await apiClient.post(`/api/community/posts/${postId}/like`);
    return response.data; 
  }
};