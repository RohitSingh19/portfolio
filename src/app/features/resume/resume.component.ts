import { Component, DestroyRef, OnInit, signal, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ResumeService, ResumePDF } from '../../core/services/resume.service';
import { PortfolioContentService } from '../../core/services/portfolio-content.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen py-20 container-custom">
      <h1 class="section-title">Resume</h1>
      <p class="section-subtitle">Download my resume or view it below</p>

      <!-- Download Button -->
      <div class="flex justify-center mb-12">
        <button
          (click)="onDownload()"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path>
          </svg>
          Download Resume
        </button>
      </div>

      <!-- PDF Viewer -->
      <div *ngIf="resume() && resumeUrl()" class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden smooth-shadow">
        <!-- Instructions for Configuration -->
        <div *ngIf="showInstructions()" class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6">
          <p class="text-blue-900 dark:text-blue-200 font-semibold mb-2">Configuration Required</p>
          <p class="text-blue-800 dark:text-blue-300 text-sm mb-4">
            The Resume page needs your Google Drive link to display your PDF. Please update the Google Drive URL in the component.
          </p>
          <ul class="text-blue-800 dark:text-blue-300 text-sm space-y-2 ml-4">
            <li><strong>Steps:</strong></li>
            <li>1. Upload your resume PDF to Google Drive</li>
            <li>2. Right-click the file and select "Share"</li>
            <li>3. Make it "Viewer - Anyone with the link"</li>
            <li>4. Copy the share link</li>
            <li>5. Update the <code>googleDriveLink</code> property in resume.component.ts</li>
          </ul>
        </div>

        <!-- PDF Viewer -->
        <div *ngIf="!showInstructions()" class="w-full">
          <iframe
            [src]="sanitizedResumeUrl()"
            class="w-full border-0"
            style="height: 800px; min-height: 600px"
            title="Resume PDF Viewer"
            allow="autoplay"
          ></iframe>

          <!-- Mobile Download Note -->
          <div class="md:hidden bg-gray-100 dark:bg-gray-700 p-4 text-center">
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              For better viewing on mobile, please download the PDF using the button above.
            </p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="error()" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <p class="text-red-600 dark:text-red-300">{{ error() }}</p>
      </div>
    </section>
  `,
  styles: [
    `
      :host ::ng-deep {
        code {
          background-color: rgba(0, 0, 0, 0.1);
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.85em;
        }
      }
    `,
  ],
})
export class ResumeComponent implements OnInit {
  resume = signal<ResumePDF | null>(null);
  resumeUrl = signal<string | null>(null);
  error = signal<string | null>(null);
  showInstructions = signal(true);
  private destroyRef = inject(DestroyRef);
  private googleDriveLink = '';
  private resumeFileName = 'Resume.pdf';

  // Compute sanitized URL for iframe src binding
  sanitizedResumeUrl = computed(() => {
    const url = this.resumeUrl();
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });
  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,
    private contentService: PortfolioContentService
  ) {}

  ngOnInit(): void {
    this.contentService
      .getResumeConfig()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resumeConfig) => {
          this.googleDriveLink = resumeConfig.googleDriveLink;
          this.resumeFileName = resumeConfig.fileName;

          if (!this.googleDriveLink) {
            this.error.set('Resume link not configured. Please add your Google Drive link to the content source.');
            return;
          }

          this.loadResume();
        },
        error: () => {
          this.error.set('Failed to load portfolio content for the resume page.');
        },
      });
  }

  private loadResume(): void {
    try {
      this.resumeService.getResume(this.googleDriveLink).subscribe({
        next: (resume) => {
          this.resume.set(resume);
          this.resumeUrl.set(resume.url);
          this.showInstructions.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load resume. Please check the Google Drive link configuration.');
          console.error('Error loading resume:', err);
        },
      });
    } catch (err) {
      this.error.set('Invalid Google Drive link format.');
      console.error('Error:', err);
    }
  }

  onDownload(): void {
    if (!this.googleDriveLink) {
      alert('Resume link not configured.');
      return;
    }

    this.resumeService.downloadResume(this.googleDriveLink, this.resumeFileName);
  }
}
