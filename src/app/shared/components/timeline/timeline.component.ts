import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineItem {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: {
    start: string;
    end: string;
  };
  description: string;
  responsibilities: string[];
  isCurrentRole?: boolean;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent {
  @Input() items: TimelineItem[] = [];
  @Input() title: string = 'Timeline';
  @Input() subtitle: string = '';
}
