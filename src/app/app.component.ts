import { Component, OnInit, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PortfolioContentService } from './core/services/portfolio-content.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',  
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="min-h-screen">
      <router-outlet />
    </main>
    <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          Made with 
          <span class="text-red-500 text-lg mx-1 animate-pulse">❤️</span> 
          by 
          <a 
            [href]="primaryProfileUrl()" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
          >
            {{ fullName() }}
          </a>
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
          © {{ currentYear }} All rights reserved
        </p>
      </div>
    </footer>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  currentYear = new Date().getFullYear();
  private themeService = inject(ThemeService);
  private contentService = inject(PortfolioContentService);
  private content = toSignal(this.contentService.getContent(), { initialValue: null });
  fullName = computed(() => this.content()?.personal.fullName ?? 'Portfolio');
  primaryProfileUrl = computed(() => this.content()?.socialLinks.find((link) => link.id === 'linkedin')?.url ?? '/');

  ngOnInit(): void {
    // Initialize AOS (Animate On Scroll)
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100,
      });
    }
  }
}
