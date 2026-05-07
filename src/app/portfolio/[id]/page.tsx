import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GitFork, ArrowLeft, AlertTriangle } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { getPortfolioWriteupHtml } from "@/lib/portfolio-writeup";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = PROJECTS.find((x) => x.id === id);
  return p ? { title: p.title, description: p.summary } : { title: "Not Found" };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) notFound();

  const writeupHtml = getPortfolioWriteupHtml(p.id);

  if (writeupHtml) {
    return (
      <div className="detail-inner">
        <div dangerouslySetInnerHTML={{ __html: writeupHtml }} />
        {p.githubUrl && (
          <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--pf-border)" }}>
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 18px",
                border: "1px solid var(--pf-border)",
                fontSize: 13,
                fontFamily: "var(--portfolio-mono), monospace",
                color: "var(--pf-text)",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              <GitFork size={14} /> View Code ↗
            </a>
          </div>
        )}
      </div>
    );
  }

  const blocks = p.description.split("\n\n");

  return (
    <div className="detail-inner">
      <Link href="/portfolio" className="back-btn">
        <ArrowLeft size={14} /> back to portfolio
      </Link>

      <header style={{ marginBottom: "2rem" }}>
        <div className="detail-meta">
          {p.featured && <span className="featured-badge">Featured</span>}
          <span className="card-date">{p.date}</span>
        </div>
        <h1 className="detail-title">{p.title}</h1>
        <p className="detail-subtitle">{p.summary}</p>
      </header>

      {p.githubUrl && (
        <div style={{ marginBottom: "2rem" }}>
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 18px",
              border: "1px solid var(--pf-border)",
              fontSize: 13,
              fontFamily: "var(--portfolio-mono), monospace",
              color: "var(--pf-text)",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            <GitFork size={14} /> View Code ↗
          </a>
        </div>
      )}

      <div style={{ display: "grid", gap: 24 }} className="detail-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <section className="writeup">
            <h2 style={{ marginTop: 0 }}>Methodology</h2>
            <div style={{ border: "1px solid var(--pf-border)", borderRadius: 8, background: "var(--pf-bg-card)", padding: 24 }}>
              {blocks.map((block, i) => {
                if (block.startsWith("**") && block.endsWith("**"))
                  return (
                    <h3 key={i} style={{ fontWeight: 600, color: "var(--pf-text)", fontSize: 15, marginTop: 16, marginBottom: 6 }}>
                      {block.replace(/\*\*/g, "")}
                    </h3>
                  );
                if (block.includes("\n")) {
                  const [head, ...items] = block.split("\n");
                  return (
                    <div key={i} style={{ marginBottom: 14 }}>
                      {head.startsWith("**") && (
                        <h3 style={{ fontWeight: 600, color: "var(--pf-text)", fontSize: 15, marginBottom: 8 }}>{head.replace(/\*\*/g, "")}</h3>
                      )}
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {items.map(
                          (it, j) =>
                            it.trim() && (
                              <li key={j} style={{ display: "flex", gap: 8, fontSize: 14, color: "#aaa", lineHeight: 1.65, marginBottom: 4 }}>
                                <span style={{ color: "var(--pf-green)", flexShrink: 0 }}>›</span>
                                {it.replace(/^[-•]\s*/, "")}
                              </li>
                            ),
                        )}
                      </ul>
                    </div>
                  );
                }
                return (
                  <p key={i} style={{ fontSize: 14, color: "#aaa", lineHeight: 1.7, marginBottom: 10 }}>
                    {block}
                  </p>
                );
              })}
            </div>
          </section>

          {p.vulnerabilities && p.vulnerabilities.length > 0 && (
            <section>
              <h2>Vulnerabilities</h2>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {p.vulnerabilities.map((v, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      borderRadius: 6,
                      border: "1px solid rgba(239,68,68,.25)",
                      background: "rgba(220,38,38,.05)",
                    }}
                  >
                    <AlertTriangle size={16} style={{ color: "#ef4444", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--pf-text)" }}>{v}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.lessons && (
            <section>
              <h2>Lessons Learned</h2>
              <div className="finding-box">
                <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>&ldquo;{p.lessons}&rdquo;</p>
              </div>
            </section>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ border: "1px solid var(--pf-border)", borderRadius: 8, background: "var(--pf-bg-card)", padding: 18 }}>
            <p style={{ fontFamily: "var(--portfolio-mono), monospace", color: "var(--pf-green)", fontSize: 11, marginBottom: 10 }}>// tools used</p>
            <div className="pf-tags">
              {p.tools.map((t) => (
                <span key={t} className="pf-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ border: "1px solid var(--pf-border)", borderRadius: 8, background: "var(--pf-bg-card)", padding: 18 }}>
            <p style={{ fontFamily: "var(--portfolio-mono), monospace", color: "var(--pf-green)", fontSize: 11, marginBottom: 10 }}>// tags</p>
            <div className="detail-tags" style={{ marginBottom: 0 }}>
              {p.tags.map((t) => (
                <span key={t} className="detail-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/portfolio"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: 14,
              borderRadius: 8,
              border: "1px solid var(--pf-border)",
              background: "var(--pf-bg-card)",
              fontFamily: "var(--portfolio-mono), monospace",
              fontSize: 13,
              color: "var(--pf-text-muted)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={13} /> All projects
          </Link>
        </div>
      </div>
      <style>{`@media(min-width:900px){.detail-grid{grid-template-columns:2fr 1fr!important}}`}</style>
    </div>
  );
}
