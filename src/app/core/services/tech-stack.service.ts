import { Injectable } from '@angular/core';

export interface Technology {
  name: string;
  category: string;
  logo: string; // Devicon URL or local path
}

@Injectable({
  providedIn: 'root'
})
export class TechStackService {
  private technologies: Technology[] = [
    // Backend
    { name: 'C#', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
    { name: 'Python', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: '.Net Core', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' },
    { name: 'FastAPI', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
    
    // Frontend
    { name: 'Angular', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
    { name: 'TypeScript', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'TailwindCSS', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'RxJS', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rxjs/rxjs-original.svg' },
    { name: 'HTML5', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS3', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'JavaScript', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        
    // Database
    { name: 'PostgreSQL', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'MongoDB', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },    
    { name: 'MySQL', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
        
    // Cloud & DevOps
    { name: 'AWS', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Docker', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Kubernetes', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
    { name: 'CI/CD', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'GitHub Actions', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    
    // Tools
    { name: 'Git', category: 'Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'GitHub', category: 'Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'VS Code', category: 'Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { name: 'Postman', category: 'Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'Webpack', category: 'Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg' },
  ];

  private categories = ['Backend','Frontend', 'Database', 'Cloud & DevOps', 'Tools'];

  constructor() {}

  /**
   * Get all technologies
   */
  getAllTechnologies(): Technology[] {
    return this.technologies;
  }

  /**
   * Get technologies by category
   */
  getTechnologiesByCategory(category: string): Technology[] {
    return this.technologies.filter(tech => tech.category === category);
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return this.categories;
  }

  /**
   * Get technologies organized by category
   */
  getTechnologiesGroupedByCategory(): { [key: string]: Technology[] } {
    const grouped: { [key: string]: Technology[] } = {};
    this.categories.forEach(cat => {
      grouped[cat] = this.getTechnologiesByCategory(cat);
    });
    return grouped;
  }
}
