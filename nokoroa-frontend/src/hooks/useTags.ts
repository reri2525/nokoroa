'use client';

import { useEffect, useState } from 'react';

import { API_CONFIG } from '@/lib/apiConfig';

interface Tag {
  name: string;
  count: number;
}

interface TagsResponse {
  tags: Tag[];
  total: number;
}

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const response = await fetch(`${API_CONFIG.BASE_URL}/posts/tags`);

        if (!response.ok) {
          throw new Error('タグの取得に失敗しました');
        }

        const data: TagsResponse = await response.json();
        setTags(data.tags);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'タグの取得に失敗しました',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const refetch = () => {
    const fetchTags = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const response = await fetch(`${API_CONFIG.BASE_URL}/posts/tags`);

        if (!response.ok) {
          throw new Error('タグの取得に失敗しました');
        }

        const data: TagsResponse = await response.json();
        setTags(data.tags);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'タグの取得に失敗しました',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  };

  return {
    tags,
    isLoading,
    error,
    refetch,
  };
}
