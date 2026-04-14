import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PortfolioContentService } from '../../core/services/portfolio-content.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen py-20 container-custom">
      <h1 class="section-title">Projects</h1>
      <p class="section-subtitle">Showcase of my work and accomplishments</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article *ngFor="let project of projects()" class="bg-white dark:bg-gray-800 rounded-lg p-6 smooth-shadow border border-gray-100 dark:border-gray-700">
          <div class="flex items-start justify-between gap-4 mb-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h3>
            <span *ngIf="project.featured" class="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              Featured
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-5">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mb-5">
            <span *ngFor="let tag of project.tags" class="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              {{ tag }}
            </span>
          </div>
          <div class="flex gap-4 text-sm font-medium">
            <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">
              Live Demo
            </a>
            <a *ngIf="project.repoUrl" [href]="project.repoUrl" target="_blank" rel="noopener noreferrer" class="text-gray-700 dark:text-gray-300 hover:underline">
              Source Code
            </a>
          </div>
        </article>
        <div *ngIf="projects().length === 0" class="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg p-6 smooth-shadow text-center text-gray-600 dark:text-gray-400">
          No projects configured yet.
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ProjectsComponent {
  private contentService = inject(PortfolioContentService);
  projects = toSignal(this.contentService.getProjects(), { initialValue: [] });
}
