export interface SocialLink {
  id: string;
  label: string;
  url: string;
  title: string;
  icon: 'linkedin' | 'github' | 'medium' | 'twitter' | 'instagram';
  theme: 'linkedin' | 'github' | 'medium' | 'twitter' | 'instagram';
}

export interface SkillItem {
  name: string;
  category: string;
  logo: string;
}

export interface BlogConfig {
  mediumUsername: string;
  devtoUsername: string;
}

export interface ExperienceItem {
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

export interface ProjectItem {
  title: string;
  'repo-link': string;
  'live-preview-link'?: string;
  'live-preview-description': string;
  'tech stack': string[];
}

export interface ResumeConfig {
  googleDriveLink: string;
  fileName: string;
  title: string;
}

export interface PortfolioContent {
  personal: {
    fullName: string;
    designation: string;
    profileImage: string;
    intro: string;
  };
  socialLinks: SocialLink[];
  skills: SkillItem[];
  blog: BlogConfig;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  resume: ResumeConfig;
}