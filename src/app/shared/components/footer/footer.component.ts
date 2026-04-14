import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          Made with 
          <span class="text-red-500 text-lg mx-1 animate-pulse">❤️</span> 
          by 
          <a 
            href="https://www.linkedin.com/in/rohit-singh-wd1993/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
          >
            Rohit
          </a>
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
          © {{ currentYear }} All rights reserved
        </p>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}