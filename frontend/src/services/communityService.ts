import apiClient from "./apiClient";

// ─── 인터페이스 정의 ───
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

// ─── 서비스 정의 ───
const BASE_PATH = "/api/community/posts";

export const communityService = {
  getBoardCategories: async (): Promise<BoardCategory[]> => {
    const response = await apiClient.get(`/api/boards`);
    return response.data;
  },

  getPosts: async (boardId: number, page: number, size: number): Promise<{ content: Post[]; totalElements: number }> => {
    const response = await apiClient.get(`${BASE_PATH}/board/${boardId}`, {
      params: { page, size }
    });
    return response.data;
  },

  createPost: async (postData: any): Promise<Post> => {
    const response = await apiClient.post(BASE_PATH, postData);
    return response.data;
  },

  deletePost: async (postId: number): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${postId}`);
  },

  toggleLike: async (postId: number): Promise<Post> => {
    const response = await apiClient.post(`${BASE_PATH}/${postId}/like`);
    return response.data;
  }
};