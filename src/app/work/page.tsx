import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { WORK } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Work Experience", description: "Work experience and background of Maximilian Musial." };

export default function WorkPage() {
  return (
    <div style={{ maxWidth:900,margin:"0 auto",padding:"64px 24px" }}>
      <SectionHeader eyebrow="// experience" title="Work & Background"
        subtitle="Technical roles, leadership experience, and relevant coursework that shape my security perspective."/>

      <div style={{ position:"relative",paddingLeft:48 }}>
        {/* Timeline line */}
        <div style={{ position:"absolute",left:16,top:0,bottom:0,width:1,background:"#30363D" }}/>

        {WORK.map((w,i)=>(
          <div key={w.id} style={{ position:"relative",marginBottom:32 }}>
            {/* Circle */}
            <div style={{ position:"absolute",left:-36,top:8,width:36,height:36,borderRadius:"50%",border:"1px solid #30363D",background:"#161B22",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Briefcase size={15} style={{ color:"#00FF88" }}/>
            </div>

            <article className="card" style={{ padding:24 }}>
              <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"space-between",gap:8,marginBottom:14 }}>
                <div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                    <h3 style={{ fontWeight:700,color:"#E6EDF3",fontSize:15 }}>{w.role}</h3>
                    {w.current && <span className="tag-green" style={{ fontSize:10 }}>Current</span>}
                  </div>
                  <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:13 }}>{w.org}</p>
                </div>
                <p style={{ fontFamily:"monospace",fontSize:12,color:"#8B949E" }}>
                  {formatDate(w.start)} — {w.current?"Present":formatDate(w.end!)}
                </p>
              </div>
              <ul style={{ marginBottom:14,paddingLeft:0,listStyle:"none" }}>
                {w.points.map((pt,i)=>(
                  <li key={i} style={{ display:"flex",gap:10,fontSize:14,color:"#8B949E",lineHeight:1.65,marginBottom:8 }}>
                    <span style={{ color:"#00FF88",flexShrink:0,marginTop:2 }}>›</span> {pt}
                  </li>
                ))}
              </ul>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6,paddingTop:12,borderTop:"1px solid #30363D" }}>
                {w.tags.map(t=><span key={t} className="tag">{t}</span>)}
              </div>
            </article>
          </div>
        ))}
      </div>

      <div style={{ marginTop:40,padding:24,borderRadius:8,border:"1px solid #30363D",background:"#161B22",textAlign:"center" }}>
        <p style={{ color:"#8B949E",fontSize:14,marginBottom:12 }}>Want the full picture? My resume has everything in one place.</p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:"#00FF88",color:"#0D1117",fontFamily:"monospace",fontWeight:700,fontSize:13,borderRadius:6,textDecoration:"none" }}>
          Download Resume ↗
        </a>
      </div>
    </div>
  );
}
