import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ARTICLES } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { getArticleWriteupHtml } from "@/lib/article-writeup";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const a = ARTICLES.find((x) => x.id === id);
  return a ? { title: a.title, description: a.summary } : { title: "Not Found" };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const a = ARTICLES.find((x) => x.id === id);
  if (!a) notFound();

  const writeupHtml = getArticleWriteupHtml(a.id);

  if (writeupHtml) {
    return (
      <div className="detail-inner">
        <div dangerouslySetInnerHTML={{ __html: writeupHtml }} />
        <footer className="article-footer">
          <div>
            <p style={{ fontWeight: 600, color: "var(--ar-text)", fontSize: 14, marginBottom: 2 }}>Written by Maximilian Musial</p>
            <p style={{ fontSize: 12, color: "var(--ar-text-muted)" }}>Cybersecurity Student · Penetration Testing Enthusiast</p>
          </div>
          <Link href="/articles">
            <ArrowLeft size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            More articles
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="detail-inner">
      <Link href="/articles" className="back-btn">
        <ArrowLeft size={14} /> back to articles
      </Link>

      <article>
        <div className="detail-tags">
          {a.tags.map((t) => (
            <span key={t} className="detail-tag">
              {t}
            </span>
          ))}
        </div>
        <h1 className="detail-title">{a.title}</h1>
        <p className="detail-subtitle">{a.summary}</p>
        <div className="detail-meta">
          <span>{formatDate(a.publishedAt)}</span>
          <span>⏱ {a.readingTime} min read</span>
        </div>

        <div className="content">
          {a.content.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "code")
              return (
                <div key={i} className="code-block">
                  {block.text}
                </div>
              );
            if (block.type === "boldp") {
              const [bold, ...rest] = block.text.split(":**");
              const boldText = bold.replace(/\*\*/g, "");
              return (
                <p key={i}>
                  <strong>{boldText}:</strong>
                  {rest.join(":")}
                </p>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
        </div>

        <footer className="article-footer">
          <div>
            <p style={{ fontWeight: 600, color: "var(--ar-text)", fontSize: 14, marginBottom: 2 }}>Written by Maximilian Musial</p>
            <p style={{ fontSize: 12, color: "var(--ar-text-muted)" }}>Cybersecurity Student · Penetration Testing Enthusiast</p>
          </div>
          <Link href="/articles">
            <ArrowLeft size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            More articles
          </Link>
        </footer>
      </article>
    </div>
  );
}
