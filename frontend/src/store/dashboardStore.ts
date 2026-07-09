import { create } from 'zustand';

interface CacheEntry {
  data: any;
  timestamp: number;
}

interface DashboardStore {
  cache: Record<string, CacheEntry>;
  getCached: (key: string, maxAgeMs?: number) => any | null;
  setCache: (key: string, data: any) => void;
  invalidate: (key: string) => void;
  invalidateAll: () => void;
}

const DEFAULT_MAX_AGE = 60 * 1000; // 1 minute

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  cache: {},

  getCached: (key, maxAgeMs = DEFAULT_MAX_AGE) => {
    const entry = get().cache[key];
    if (!entry) return null;
    const isStale = Date.now() - entry.timestamp > maxAgeMs;
    return isStale ? null : entry.data;
  },

  setCache: (key, data) => {
    set((state) => ({
      cache: { ...state.cache, [key]: { data, timestamp: Date.now() } },
    }));
  },

  invalidate: (key) => {
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[key];
      return { cache: newCache };
    });
  },

  invalidateAll: () => set({ cache: {} }),
}));