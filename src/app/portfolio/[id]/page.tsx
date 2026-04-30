import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GitFork, ArrowLeft, Terminal, AlertTriangle, BookOpen } from "lucide-react";
import { PROJECTS } from "@/lib/data";

interface Props { params: { id: string } }

export async function generateStaticParams() { return PROJECTS.map(p=>({id:p.id})); }
export async function generateMetadata({params}:Props): Promise<Metadata> {
  const p = PROJECTS.find(p=>p.id===params.id);
  return p ? {title:p.title,description:p.summary} : {title:"Not Found"};
}

export default function ProjectPage({params}:Props) {
  const p = PROJECTS.find(p=>p.id===params.id);
  if(!p) notFound();

  const blocks = p.description.split("\n\n");

  return (
    <div style={{ maxWidth:1000,margin:"0 auto",padding:"64px 24px" }}>
      <Link href="/portfolio" style={{ display:"inline-flex",alignItems:"center",gap:6,fontFamily:"monospace",fontSize:13,color:"#8B949E",textDecoration:"none",marginBottom:32 }}>
        <ArrowLeft size={13}/> Back to Portfolio
      </Link>

      <header style={{ marginBottom:36 }}>
        <div style={{ display:"flex",gap:8,marginBottom:12 }}>
          {p.featured && <span className="tag-green">Featured</span>}
          <span style={{ fontFamily:"monospace",fontSize:12,color:"#8B949E" }}>{p.date}</span>
        </div>
        <h1 style={{ fontSize:"clamp(26px,5vw,42px)",fontWeight:700,color:"#E6EDF3",marginBottom:12 }}>{p.title}</h1>
        <p style={{ color:"#8B949E",fontSize:16,lineHeight:1.65 }}>{p.summary}</p>
      </header>

      {p.githubUrl && (
        <div style={{ marginBottom:36,paddingBottom:32,borderBottom:"1px solid #30363D" }}>
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"9px 18px",border:"1px solid #30363D",fontSize:13,fontFamily:"monospace",color:"#E6EDF3",borderRadius:6,textDecoration:"none" }}>
            <GitFork size={14}/> View Code
          </a>
        </div>
      )}

      <div style={{ display:"grid",gap:24 }} className="detail-grid">
        {/* Main */}
        <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
          {/* Methodology */}
          <section>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
              <Terminal size={15} style={{ color:"#00FF88" }}/>
              <h2 style={{ fontFamily:"monospace",color:"#00FF88",fontSize:13 }}>// methodology</h2>
            </div>
            <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:24 }}>
              {blocks.map((block,i)=>{
                if(block.startsWith("**")&&block.endsWith("**"))
                  return <h3 key={i} style={{ fontWeight:700,color:"#E6EDF3",fontSize:14,marginTop:16,marginBottom:6 }}>{block.replace(/\*\*/g,"")}</h3>;
                if(block.includes("\n")){
                  const [head,...items]=block.split("\n");
                  return (
                    <div key={i} style={{ marginBottom:14 }}>
                      {head.startsWith("**")&&<h3 style={{ fontWeight:700,color:"#E6EDF3",fontSize:14,marginBottom:8 }}>{head.replace(/\*\*/g,"")}</h3>}
                      <ul style={{ listStyle:"none",padding:0 }}>
                        {items.map((it,j)=>it.trim()&&(
                          <li key={j} style={{ display:"flex",gap:8,fontSize:13,color:"#8B949E",lineHeight:1.65,marginBottom:4 }}>
                            <span style={{ color:"#00FF88",flexShrink:0 }}>›</span>{it.replace(/^[-•]\s*/,"")}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return <p key={i} style={{ fontSize:14,color:"#8B949E",lineHeight:1.7,marginBottom:10 }}>{block}</p>;
              })}
            </div>
          </section>

          {/* Vulnerabilities */}
          {p.vulnerabilities&&p.vulnerabilities.length>0&&(
            <section>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
                <AlertTriangle size={15} style={{ color:"#F0883E" }}/>
                <h2 style={{ fontFamily:"monospace",color:"#F0883E",fontSize:13 }}>// vulnerabilities found</h2>
              </div>
              <ul style={{ listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:8 }}>
                {p.vulnerabilities.map((v,i)=>(
                  <li key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:6,border:"1px solid rgba(240,136,62,.2)",background:"rgba(240,136,62,.04)" }}>
                    <span style={{ width:22,height:22,borderRadius:"50%",background:"rgba(240,136,62,.18)",color:"#F0883E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0 }}>{i+1}</span>
                    <span style={{ fontSize:13,color:"#E6EDF3" }}>{v}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Lessons */}
          {p.lessons&&(
            <section>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
                <BookOpen size={15} style={{ color:"#58A6FF" }}/>
                <h2 style={{ fontFamily:"monospace",color:"#58A6FF",fontSize:13 }}>// lessons learned</h2>
              </div>
              <div style={{ padding:20,borderRadius:8,border:"1px solid rgba(88,166,255,.2)",background:"rgba(88,166,255,.04)" }}>
                <p style={{ fontSize:14,color:"#E6EDF3",lineHeight:1.7,fontStyle:"italic" }}>"{p.lessons}"</p>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:18 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:11,marginBottom:10 }}>// tools used</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
              {p.tools.map(t=><span key={t} className="tag">{t}</span>)}
            </div>
          </div>
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:18 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:11,marginBottom:10 }}>// categories</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
              {p.tags.map(t=><span key={t} className="tag-green">{t}</span>)}
            </div>
          </div>
          <Link href="/portfolio" style={{ display:"flex",alignItems:"center",gap:8,padding:14,borderRadius:8,border:"1px solid #30363D",background:"#161B22",fontFamily:"monospace",fontSize:13,color:"#8B949E",textDecoration:"none" }}>
            <ArrowLeft size={13}/> All Projects
          </Link>
        </div>
      </div>
      <style>{`@media(min-width:900px){.detail-grid{grid-template-columns:2fr 1fr!important}}`}</style>
    </div>
  );
}
