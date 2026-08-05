import { writable } from 'svelte/store';

export type ThemeMode = 'dark' | 'light';

function createThemeStore() {
  let initialTheme: ThemeMode = 'dark';
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved === 'light' || saved === 'dark') {
      initialTheme = saved;
    }
  }

  const { subscribe, set, update } = writable<ThemeMode>(initialTheme);

  return {
    subscribe,
    toggleTheme: () => {
      update((current) => {
        const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('portfolio_theme', next);
          document.documentElement.setAttribute('data-theme', next);
          if (next === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
          } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
          }
        }
        return next;
      });
    },
    setTheme: (mode: ThemeMode) => {
      set(mode);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('portfolio_theme', mode);
        document.documentElement.setAttribute('data-theme', mode);
        if (mode === 'light') {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        }
      }
    },
    initTheme: () => {
      if (typeof localStorage !== 'undefined') {
        const saved = (localStorage.getItem('portfolio_theme') as ThemeMode) || 'dark';
        set(saved);
        document.documentElement.setAttribute('data-theme', saved);
        if (saved === 'light') {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        }
      }
    }
  };
}

export const themeStore = createThemeStore();
