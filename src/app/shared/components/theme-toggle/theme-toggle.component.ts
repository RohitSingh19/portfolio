import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@app/core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="themeService.toggleTheme()"
      class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 inline-flex items-center gap-2"
      [attr.aria-label]="'Toggle ' + (themeService.getActiveTheme() === 'dark' ? 'light' : 'dark') + ' mode'"
      title="Toggle dark/light mode"
    >
      <!-- Sun Icon (light mode) -->
      <svg
        *ngIf="themeService.getActiveTheme() === 'dark'"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1h0zm4.323 7.677a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414h0zm2.828-2.828a1 1 0 011.414.707l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 00-.707-1.414h0zm2.828 9.9a1 1 0 011.414-1.414l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010 1.414h0zm0-9.9a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0h0zM10 18a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm0-14a1 1 0 00-1 1v1a1 1 0 102 0V3a1 1 0 00-1-1zm0 14a8 8 0 100-16 8 8 0 000 16zm.464-4.536a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z"
          clip-rule="evenodd"
        />
      </svg>

      <!-- Moon Icon (dark mode) -->
      <svg
        *ngIf="themeService.getActiveTheme() === 'light'"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>
    </button>
  `,
  styles: [],
})
export class ThemeToggleComponent implements OnInit {
  constructor(readonly themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialize theme on component load
    const stored = localStorage.getItem('portfolio-theme') || 'system';
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      this.themeService.setTheme(stored as 'light' | 'dark' | 'system');
    }
  }
}
