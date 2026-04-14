import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { BlogService, BlogPost } from '../../core/services/blog.service';
import { PortfolioContentService } from '../../core/services/portfolio-content.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen py-20 container-custom">
      <h1 class="section-title">Blog</h1>
        <p class="section-subtitle">A collection of my published blogs, sharing practical knowledge, real-world insights, and ideas that help others grow.</p>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div *ngFor="let i of [1, 2, 3, 4, 5, 6]" class="animate-pulse">
          <div class="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div *ngIf="!isLoading && blogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <article
          *ngFor="let blog of blogs"
          class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden smooth-shadow hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Blog Image -->
          <div *ngIf="blog.image" class="h-48 overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
            <img 
              [src]="blog.image" 
              [alt]="blog.title" 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div *ngIf="!blog.image" class="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>

          <!-- Blog Content -->
          <div class="p-6">
            <!-- Source Badge -->
            <span [ngClass]="getBadgeClass(blog.source)" class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3">
              {{ blog.source === 'devto' ? 'Dev.to' : 'Medium' }}
            </span>

            <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
              {{ blog.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {{ blog.excerpt }}
            </p>

            <!-- Meta Information -->
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>{{ blog.author }}</span>
              <span>{{ formatDate(blog.date) }}</span>
            </div>

            <!-- Read More Button -->
            <a
              [href]="blog.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Read More →
            </a>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && blogs.length === 0" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          No blogs found. Please check your usernames or try again later.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      :host ::ng-deep {
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    `,
  ],
})
export class BlogComponent implements OnInit {
  blogs: BlogPost[] = [];
  isLoading = true;
  private destroyRef = inject(DestroyRef);

  constructor(
    private blogService: BlogService,
    private contentService: PortfolioContentService
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  private loadBlogs(): void {
    this.isLoading = true;
    this.contentService
      .getBlogConfig()
      .pipe(
        switchMap((config) => this.blogService.getAllBlogs(config.mediumUsername, config.devtoUsername)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (blogs) => {
          this.blogs = blogs;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  getBadgeClass(source: 'medium' | 'devto'): string {
    return source === 'devto'
      ? 'bg-black dark:bg-white text-white dark:text-black'
      : 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100';
  }
}

