import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  author: string;
  source: 'medium' | 'devto';
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private devtoApiUrl = 'https://dev.to/api/articles';
  private mediumRssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all blogs from Dev.to and Medium
   * @param mediumUsername Your Medium username
   * @param devtoUsername Your Dev.to username
   */
  getAllBlogs(mediumUsername: string, devtoUsername: string): Observable<BlogPost[]> {
    return forkJoin({
      devto: this.fetchDevtoBlogs(devtoUsername),
      medium: this.fetchMediumBlogs(mediumUsername),
    }).pipe(
      map(({ devto, medium }) => {
        const allBlogs = [...devto, ...medium];
        // Sort by date (newest first)
        return allBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }),
      catchError(() => of([]))
    );
  }

  /**
   * Fetch blogs from Dev.to
   */
  private fetchDevtoBlogs(username: string): Observable<BlogPost[]> {
    return this.http
      .get<any[]>(`${this.devtoApiUrl}?username=${username}&per_page=10`)
      .pipe(
        map((articles) =>
          articles.map((article) => ({
            id: `devto-${article.id}`,
            title: article.title,
            excerpt: article.description || article.body_markdown?.substring(0, 150) || '',
            url: article.url,
            date: article.published_at,
            author: article.user.name,
            source: 'devto' as const,
            image: article.cover_image,
          }))
        ),
        catchError(() => of([]))
      );
  }

  /**
   * Fetch blogs from Medium using RSS feed
   */
  private fetchMediumBlogs(username: string): Observable<BlogPost[]> {
    const rssUrl = `${this.mediumRssUrl}${username}`;
    return this.http
      .get<any>(rssUrl)
      .pipe(
        switchMap((data) => {
          if (data.items && data.items.length > 0) {
            return of(
              data.items.slice(0, 10).map((item: any) => ({
                id: `medium-${item.guid}`,
                title: item.title,
                excerpt: this.stripHtml(item.description || item.content || '').substring(0, 150),
                url: item.link,
                date: item.pubDate,
                author: item.author,
                source: 'medium' as const,
                image: this.extractImageFromContent(item.content || item.description || ''),
              }))
            );
          }
          return of([]);
        }),
        catchError(() => of([]))
      );
  }

  /**
   * Strip HTML tags from content
   */
  private stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  /**
   * Extract image URL from HTML content
   */
  private extractImageFromContent(content: string): string | undefined {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgRegex);
    return match ? match[1] : undefined;
  }
}
