import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="min-h-screen flex flex-col items-center justify-center container-custom text-center">
      <p class="text-8xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">404</p>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <a routerLink="/" class="btn-primary">Back to Home</a>
    </section>
  `,
  styles: [],
})
export class NotFoundComponent {}
