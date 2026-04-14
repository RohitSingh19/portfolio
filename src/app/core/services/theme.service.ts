import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';
  private readonly systemPreference = this.getSystemPreference();
  
  theme = signal<Theme>(this.getStoredTheme());

  constructor() {
    // Apply theme effect whenever it changes
    effect(() => {
      this.applyTheme(this.theme());
    });

    // Listen for system theme changes
    this.listenToSystemTheme();
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const currentTheme = this.theme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Set a specific theme
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  /**
   * Get the current active theme (resolved if system)
   */
  getActiveTheme(): 'light' | 'dark' {
    const currentTheme = this.theme();
    if (currentTheme === 'system') {
      return this.systemPreference;
    }
    return currentTheme;
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(theme: Theme): void {
    const html = document.documentElement;
    const activeTheme = theme === 'system' ? this.systemPreference : theme;

    if (activeTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  /**
   * Get stored theme from localStorage
   */
  private getStoredTheme(): Theme {
    if (typeof localStorage === 'undefined') {
      return 'system';
    }

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'system';
  }

  /**
   * Get system theme preference
   */
  private getSystemPreference(): 'light' | 'dark' {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  /**
   * Listen to system theme changes
   */
  private listenToSystemTheme(): void {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Re-trigger theme effect if using system preference
      if (this.theme() === 'system') {
        this.theme.set('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
  }
}
