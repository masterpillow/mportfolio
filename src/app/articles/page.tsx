import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { ARTICLES } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Articles", description: "Security write-ups, CTF walkthroughs, and technical articles by Maximilian Musial." };

export default function ArticlesPage() {
  return (
    <div style={{ maxWidth:860,margin:"0 auto",padding:"64px 24px" }}>
      <SectionHeader eyebrow="// articles" title="Write-ups & Articles"
        subtitle="CTF walkthroughs, OWASP breakdowns, tool guides, and security research — documented so others can learn from it too."/>

      <div>
        {ARTICLES.map(a=>(
          <article key={a.id} style={{ padding:"28px 0",borderBottom:"1px solid #30363D" }}>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:10 }}>
              {a.tags.map(t=><span key={t} className="tag">{t}</span>)}
            </div>
            <Link href={"/articles/"+a.id} style={{ textDecoration:"none" }}>
              <h2 style={{ fontSize:20,fontWeight:700,color:"#E6EDF3",marginBottom:8 }}>{a.title}</h2>
            </Link>
            <p style={{ fontSize:14,color:"#8B949E",lineHeight:1.65,marginBottom:12 }}>{a.summary}</p>
            <div style={{ display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
              <div style={{ display:"flex",gap:16,fontFamily:"monospace",fontSize:12,color:"#8B949E" }}>
                <span>{formatDate(a.publishedAt)}</span>
                <span style={{ display:"flex",alignItems:"center",gap:4 }}><Clock size={11}/>{a.readingTime} min read</span>
              </div>
              <Link href={"/articles/"+a.id} style={{ fontFamily:"monospace",fontSize:12,color:"#8B949E",textDecoration:"none" }}>Read →</Link>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop:36,padding:20,borderRadius:8,border:"1px dashed #30363D",background:"rgba(22,27,34,.5)",textAlign:"center" }}>
        <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:12,marginBottom:4 }}>// more coming soon</p>
        <p style={{ fontSize:12,color:"#8B949E" }}>New CTF write-ups and security breakdowns published regularly.</p>
      </div>
    </div>
  );
}
