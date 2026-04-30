import Link from "next/link";
import { ArrowRight, GitFork, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/data";

export default function FeaturedProjects() {
  const featured = PROJECTS.filter(p=>p.featured).slice(0,3);
  return (
    <section style={{ padding:"80px 0",borderTop:"1px solid #30363D",background:"rgba(22,27,34,.4)" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px" }}>
        <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:40,flexWrap:"wrap",gap:12 }}>
          <div>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:13,marginBottom:8 }}>// featured work</p>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,32px)",fontWeight:700,color:"#E6EDF3" }}>Recent Projects</h2>
          </div>
          <Link href="/portfolio" style={{ display:"flex",alignItems:"center",gap:4,fontFamily:"monospace",fontSize:13,color:"#8B949E",textDecoration:"none" }}>
            View all <ArrowRight size={13}/>
          </Link>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:16 }}>
          {featured.map(p=>(
            <article key={p.id} className="card" style={{ padding:20,display:"flex",flexDirection:"column",borderColor:"rgba(0,255,136,.15)" }}>
              <span className="tag-green" style={{ alignSelf:"flex-start",marginBottom:14 }}>Featured</span>
              <h3 style={{ fontWeight:700,color:"#E6EDF3",fontSize:15,marginBottom:8 }}>{p.title}</h3>
              <p style={{ fontSize:13,color:"#8B949E",lineHeight:1.65,flex:1,marginBottom:14 }}>{p.summary}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:14 }}>
                {p.tags.slice(0,3).map(t=><span key={t} className="tag">{t}</span>)}
              </div>
              <div style={{ display:"flex",gap:16,paddingTop:12,borderTop:"1px solid #30363D" }}>
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex",alignItems:"center",gap:4,fontFamily:"monospace",fontSize:12,color:"#8B949E",textDecoration:"none" }}>
                    <GitFork size={12}/> Code
                  </a>
                )}
                <Link href={"/portfolio/"+p.id} style={{ display:"flex",alignItems:"center",gap:4,fontFamily:"monospace",fontSize:12,color:"#8B949E",textDecoration:"none",marginLeft:"auto" }}>
                  <ExternalLink size={12}/> Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
