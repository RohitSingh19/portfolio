import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioContentService } from '@app/core/services/portfolio-content.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

interface NavLink {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  private contentService = inject(PortfolioContentService);
  private content = toSignal(this.contentService.getContent(), { initialValue: null });
  siteName = computed(() => this.content()?.personal.fullName ?? 'Portfolio');

  navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Blogs', path: '/blog' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Resume', path: '/resume' },
    { label: 'Contact', path: '/contact' },
  ];

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
