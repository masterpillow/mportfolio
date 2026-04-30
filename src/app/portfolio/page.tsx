import type { Metadata } from "next";
import Link from "next/link";
import { GitFork, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = { title: "Portfolio", description: "Security projects, CTF write-ups and tools by Maximilian Musial." };

export default function PortfolioPage() {
  const featured = PROJECTS.filter(p=>p.featured);
  const rest     = PROJECTS.filter(p=>!p.featured);
  return (
    <div style={{ maxWidth:1200,margin:"0 auto",padding:"64px 24px" }}>
      <SectionHeader eyebrow="// portfolio" title="Projects & Work"
        subtitle="Hands-on security projects, penetration testing labs, CTF write-ups, and tools — each with a full methodology breakdown."/>

      <p style={{ fontFamily:"monospace",fontSize:12,color:"#8B949E",marginBottom:14 }}>// featured projects</p>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:16,marginBottom:40 }}>
        {featured.map(p=>(
          <article key={p.id} className="card" style={{ padding:20,display:"flex",flexDirection:"column",borderColor:"rgba(0,255,136,.18)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
              <span className="tag-green">Featured</span>
              <span style={{ fontFamily:"monospace",fontSize:11,color:"#8B949E" }}>{p.date}</span>
            </div>
            <h3 style={{ fontWeight:700,color:"#E6EDF3",fontSize:15,marginBottom:8 }}>{p.title}</h3>
            <p style={{ fontSize:13,color:"#8B949E",lineHeight:1.65,flex:1,marginBottom:14 }}>{p.summary}</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:14 }}>
              {p.tags.slice(0,3).map(t=><span key={t} className="tag">{t}</span>)}
              {p.tags.length>3 && <span className="tag">+{p.tags.length-3}</span>}
            </div>
            <div style={{ display:"flex",gap:14,paddingTop:12,borderTop:"1px solid #30363D",alignItems:"center" }}>
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex",gap:4,alignItems:"center",fontFamily:"monospace",fontSize:12,color:"#8B949E",textDecoration:"none" }}>
                  <GitFork size={12}/> Code
                </a>
              )}
              <Link href={"/portfolio/"+p.id}
                style={{ display:"flex",gap:4,alignItems:"center",fontFamily:"monospace",fontSize:12,color:"#8B949E",textDecoration:"none",marginLeft:"auto" }}>
                Details <ChevronRight size={12}/>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {rest.length>0 && (
        <>
          <p style={{ fontFamily:"monospace",fontSize:12,color:"#8B949E",marginBottom:14 }}>// other projects</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14 }}>
            {rest.map(p=>(
              <article key={p.id} className="card" style={{ padding:18 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                  <span style={{ fontFamily:"monospace",fontSize:11,color:"#8B949E" }}>{p.date}</span>
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color:"#8B949E",textDecoration:"none" }}><GitFork size={14}/></a>}
                </div>
                <h3 style={{ fontWeight:700,color:"#E6EDF3",fontSize:14,marginBottom:6 }}>{p.title}</h3>
                <p style={{ fontSize:12,color:"#8B949E",lineHeight:1.6,marginBottom:10 }}>{p.summary}</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                  {p.tags.slice(0,3).map(t=><span key={t} className="tag">{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop:48,padding:24,borderRadius:8,border:"1px solid #30363D",background:"#161B22",display:"flex",flexWrap:"wrap",gap:16,justifyContent:"space-between",alignItems:"center" }}>
        <div>
          <p style={{ fontWeight:700,color:"#E6EDF3",marginBottom:4 }}>See everything on GitHub</p>
          <p style={{ fontSize:13,color:"#8B949E" }}>All projects, tools, and CTF write-ups live in my public repos.</p>
        </div>
        <a href="https://github.com/masterpillow" target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",border:"1px solid #30363D",color:"#E6EDF3",fontFamily:"monospace",fontSize:13,borderRadius:6,textDecoration:"none",whiteSpace:"nowrap" }}>
          <GitFork size={15}/> GitHub Profile ↗
        </a>
      </div>
    </div>
  );
}
