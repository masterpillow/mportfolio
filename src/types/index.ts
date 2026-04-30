export interface Project {
  id: string; title: string; summary: string; description: string;
  tags: string[]; tools: string[]; vulnerabilities?: string[];
  lessons?: string; githubUrl?: string; featured: boolean; date: string;
}
export interface ContentBlock { type: "p" | "h2" | "code" | "boldp"; text: string; }
export interface Article {
  id: string; title: string; summary: string; tags: string[];
  publishedAt: string; readingTime: number; content: ContentBlock[];
}
export interface WorkExp {
  id: string; role: string; org: string; start: string; end?: string;
  current: boolean; points: string[]; tags: string[];
}
