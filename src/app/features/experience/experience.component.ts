import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PortfolioContentService } from '@app/core/services/portfolio-content.service';
import { TimelineComponent, TimelineItem } from '@app/shared/components/timeline/timeline.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TimelineComponent],
  template: `
    <app-timeline 
      [items]="experiences()"
      title="Work Experience"
      subtitle="My professional journey and key roles"
    />
  `,
  styles: [],
})
export class ExperienceComponent {
  private contentService = inject(PortfolioContentService);
  experiences = toSignal(this.contentService.getExperience(), { initialValue: [] as TimelineItem[] });
}
