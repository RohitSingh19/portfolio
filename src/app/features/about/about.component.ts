import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <section class="min-h-screen py-20 container-custom">
      <h1 class="section-title">About Me</h1>
      <p class="section-subtitle">Learn more about my background and expertise</p>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 smooth-shadow">
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          This is your about page. Share your story, skills, and experience here.
        </p>
      </div>
    </section>
  `,
  styles: [],
})
export class AboutComponent {}
