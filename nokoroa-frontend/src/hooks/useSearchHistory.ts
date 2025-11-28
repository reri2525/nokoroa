'use client';

import { useEffect, useState } from 'react';

const MAX_HISTORY_ITEMS = 10;
const STORAGE_KEY_PREFIX = 'search_history_';

interface SearchHistoryHook {
  history: string[];
  addToHistory: (item: string) => void;
  clearHistory: () => void;
  removeFromHistory: (item: string) => void;
}

export function useSearchHistory(
  type: 'keyword' | 'location',
): SearchHistoryHook {
  const storageKey = `${STORAGE_KEY_PREFIX}${type}`;
  const [history, setHistory] = useState<string[]>([]);

  // 初回レンダリング時に履歴を読み込む
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }, [storageKey]);

  // 履歴に追加
  const addToHistory = (item: string) => {
    if (!item.trim()) return;

    const newHistory = [item, ...history.filter((h) => h !== item)].slice(
      0,
      MAX_HISTORY_ITEMS,
    );

    setHistory(newHistory);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  // 履歴から削除
  const removeFromHistory = (item: string) => {
    const newHistory = history.filter((h) => h !== item);
    setHistory(newHistory);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to update search history:', error);
    }
  };

  // 履歴をクリア
  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}
