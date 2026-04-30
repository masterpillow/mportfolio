import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data";
import { ARTICLES } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maxmusial.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["/","/about","/work","/portfolio","/articles","/contact"].map(path=>({
    url: BASE+path, lastModified: new Date(), changeFrequency:"monthly" as const, priority: path==="/"?1:0.8,
  }));
  const projectPages = PROJECTS.map(p=>({
    url:`${BASE}/portfolio/${p.id}`, lastModified:new Date(), changeFrequency:"monthly" as const, priority:0.7,
  }));
  const articlePages = ARTICLES.map(a=>({
    url:`${BASE}/articles/${a.id}`, lastModified:new Date(a.publishedAt), changeFrequency:"monthly" as const, priority:0.7,
  }));
  return [...staticPages,...projectPages,...articlePages];
}
