import type { Metadata } from "next";
import Link from "next/link";
import { GitFork } from "lucide-react";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Security projects, CTF write-ups and tools by Maximilian Musial.",
};

export default function PortfolioPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <>
      <div className="page-header">
        <div className="section-label">// portfolio</div>
        <h1 className="page-title">Projects & Work</h1>
        <p className="page-desc">
          Hands-on security projects, penetration testing labs, CTF write-ups, and tools — each with a full
          methodology breakdown.
        </p>
      </div>

      <div className="projects-section">
        <div className="sub-label">// featured projects</div>
        <div className="featured-grid">
          {featured.map((p) => (
            <article key={p.id} className="project-card">
              <Link href={`/portfolio/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", flex: 1 }}>
                <div className="card-top">
                  <span className="featured-badge">Featured</span>
                  <span className="card-date">{p.date}</span>
                </div>
                <div className="card-title">{p.title}</div>
                <div className="card-desc">{p.summary}</div>
                <div className="pf-tags">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="pf-tag">
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 3 && <span className="pf-tag">+{p.tags.length - 3}</span>}
                </div>
              </Link>
              <div className="card-footer">
                {p.githubUrl ? (
                  <a className="code-link" href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                    ⌥ Code
                  </a>
                ) : (
                  <span className="code-link" style={{ opacity: 0.4 }}>
                    ⌥ Code
                  </span>
                )}
                <Link href={`/portfolio/${p.id}`} className="details-link" style={{ textDecoration: "none" }}>
                  Details &rsaquo;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <div className="sub-label">// other projects</div>
            <div className="other-grid">
              {rest.map((p) => (
                <div key={p.id} className="other-card">
                  <Link href={`/portfolio/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <div className="other-top">
                      <span className="other-date">{p.date}</span>
                      <span style={{ color: "var(--pf-text-dim)", fontSize: 14 }}>›</span>
                    </div>
                    <div className="other-title">{p.title}</div>
                    <div className="other-desc">{p.summary}</div>
                    <div className="pf-tags">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="pf-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="code-link" style={{ display: "inline-block", marginTop: 10 }}>
                      ⌥ Code
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="github-banner">
          <div>
            <p style={{ fontWeight: 600, color: "var(--pf-text)", marginBottom: 4 }}>See everything on GitHub</p>
            <p style={{ fontSize: 13, color: "var(--pf-text-muted)" }}>
              All projects, tools, and CTF write-ups live in my public repos.
            </p>
          </div>
          <a href="https://github.com/masterpillow" target="_blank" rel="noopener noreferrer">
            <GitFork size={15} /> GitHub Profile ↗
          </a>
        </div>
      </div>
    </>
  );
}
