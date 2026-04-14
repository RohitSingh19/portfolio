import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  BlogConfig,
  ExperienceItem,
  PortfolioContent,
  ProjectItem,
  ResumeConfig,
  SkillItem,
  SocialLink,
} from '../models/portfolio-content.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioContentService {
  private readonly contentUrl = 'assets/data/portfolio-content.json';

  private readonly content$ = this.http.get<PortfolioContent>(this.contentUrl).pipe(shareReplay(1));

  constructor(private http: HttpClient) {}

  getContent(): Observable<PortfolioContent> {
    return this.content$;
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return this.content$.pipe(map((content) => content.socialLinks));
  }

  getSkills(): Observable<SkillItem[]> {
    return this.content$.pipe(map((content) => content.skills));
  }

  getBlogConfig(): Observable<BlogConfig> {
    return this.content$.pipe(map((content) => content.blog));
  }

  getExperience(): Observable<ExperienceItem[]> {
    return this.content$.pipe(map((content) => content.experience));
  }

  getProjects(): Observable<ProjectItem[]> {
    return this.content$.pipe(map((content) => content.projects));
  }

  getResumeConfig(): Observable<ResumeConfig> {
    return this.content$.pipe(map((content) => content.resume));
  }
}