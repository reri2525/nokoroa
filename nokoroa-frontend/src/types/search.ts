import { PostData } from './post';

export interface SearchFilters {
  q?: string;
  tags?: string[];
  location?: string;
  authorId?: number;
  limit?: number;
  offset?: number;
}

export type Post = PostData;

export interface SearchResponse {
  posts: Post[];
  total: number;
  hasMore: boolean;
}
