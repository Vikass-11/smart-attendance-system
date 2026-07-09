import { create } from 'zustand';

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

interface DashboardStore {
  cache: Record<string, CacheEntry>;
  getCached: <T>(key: string, maxAgeMs?: number) => T | null;
  setCache: <T>(key: string, data: T) => void;
  invalidate: (key: string) => void;
  invalidateAll: () => void;
}

const DEFAULT_MAX_AGE = 60 * 1000; // 1 minute

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  cache: {},

  getCached: <T>(key: string, maxAgeMs = DEFAULT_MAX_AGE): T | null => {
    const entry = get().cache[key];
    if (!entry) return null;
    const isStale = Date.now() - entry.timestamp > maxAgeMs;
    return isStale ? null : (entry.data as T);
  },

  setCache: <T>(key: string, data: T) => {
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
