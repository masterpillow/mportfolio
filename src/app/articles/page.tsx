import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Articles",
  description: "Security write-ups, CTF walkthroughs, and technical articles by Maximilian Musial.",
};

export default function ArticlesPage() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Write-ups &amp; Articles</h1>
        <p className="page-desc">
          CTF walkthroughs, OWASP breakdowns, tool guides, and security research — documented so others can learn from it too.
        </p>
      </div>

      <div className="articles-list">
        {ARTICLES.map((a) => (
          <Link key={a.id} href={`/articles/${a.id}`} className="article-item">
            <div className="article-tags">
              {a.tags.map((t) => (
                <span key={t} className="atag">
                  {t}
                </span>
              ))}
            </div>
            <div className="article-title">{a.title}</div>
            <div className="article-desc">{a.summary}</div>
            <div className="article-meta">
              <div className="meta-left">
                <span>{formatDate(a.publishedAt)}</span>
                <span>⏱ {a.readingTime} min read</span>
              </div>
              <span className="read-link">Read →</span>
            </div>
          </Link>
        ))}

        <div className="more-soon">
          <div className="label">// more coming soon</div>
          <p>New CTF write-ups and security breakdowns published regularly.</p>
        </div>
      </div>
    </>
  );
}
