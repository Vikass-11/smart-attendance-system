const THEME_KEY = 'theme';

export function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark') return true;
  if (stored === 'light') return false;

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyTheme(isDark: boolean): void {
  if (typeof document === 'undefined') return;

  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}
