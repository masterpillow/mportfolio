import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { ARTICLES } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface Props { params: { id: string } }
export async function generateStaticParams() { return ARTICLES.map(a=>({id:a.id})); }
export async function generateMetadata({params}:Props): Promise<Metadata> {
  const a = ARTICLES.find(a=>a.id===params.id);
  return a ? {title:a.title,description:a.summary} : {title:"Not Found"};
}

export default function ArticlePage({params}:Props) {
  const a = ARTICLES.find(a=>a.id===params.id);
  if(!a) notFound();

  return (
    <div style={{ maxWidth:800,margin:"0 auto",padding:"64px 24px" }}>
      <Link href="/articles" style={{ display:"inline-flex",alignItems:"center",gap:6,fontFamily:"monospace",fontSize:13,color:"#8B949E",textDecoration:"none",marginBottom:32 }}>
        <ArrowLeft size={13}/> Back to Articles
      </Link>

      <article>
        <header style={{ marginBottom:36,paddingBottom:28,borderBottom:"1px solid #30363D" }}>
          <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:14 }}>
            {a.tags.map(t=><span key={t} className="tag-green">{t}</span>)}
          </div>
          <h1 style={{ fontSize:"clamp(24px,5vw,38px)",fontWeight:700,color:"#E6EDF3",marginBottom:12,lineHeight:1.25 }}>{a.title}</h1>
          <p style={{ color:"#8B949E",fontSize:16,lineHeight:1.65,marginBottom:16 }}>{a.summary}</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:20,fontFamily:"monospace",fontSize:12,color:"#8B949E" }}>
            <span style={{ display:"flex",alignItems:"center",gap:5 }}><Calendar size={12}/>{formatDate(a.publishedAt)}</span>
            <span style={{ display:"flex",alignItems:"center",gap:5 }}><Clock size={12}/>{a.readingTime} min read</span>
          </div>
        </header>

        <div style={{ lineHeight:1.8 }}>
          {a.content.map((block,i)=>{
            if(block.type==="h2") return (
              <h2 key={i} style={{ fontFamily:"monospace",color:"#00FF88",fontSize:16,fontWeight:700,marginTop:36,marginBottom:12 }}>{block.text}</h2>
            );
            if(block.type==="code") return (
              <pre key={i} style={{ borderRadius:8,border:"1px solid #30363D",background:"#161B22",padding:20,overflowX:"auto",fontSize:12,fontFamily:"monospace",color:"#00FF88",lineHeight:1.6,marginBottom:20 }}>
                <code>{block.text}</code>
              </pre>
            );
            if(block.type==="boldp") {
              const [bold,...rest] = block.text.split(":**");
              const boldText = bold.replace(/\*\*/g,"");
              return (
                <p key={i} style={{ color:"#8B949E",fontSize:15,lineHeight:1.75,marginBottom:14 }}>
                  <strong style={{ color:"#E6EDF3" }}>{boldText}:</strong>{rest.join(":")}
                </p>
              );
            }
            return <p key={i} style={{ color:"#8B949E",fontSize:15,lineHeight:1.75,marginBottom:14 }}>{block.text}</p>;
          })}
        </div>

        <footer style={{ marginTop:48,paddingTop:24,borderTop:"1px solid #30363D",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16 }}>
          <div>
            <p style={{ fontWeight:700,color:"#E6EDF3",fontSize:14,marginBottom:2 }}>Written by Maximilian Musial</p>
            <p style={{ fontSize:12,color:"#8B949E" }}>Cybersecurity Student · Penetration Testing Enthusiast</p>
          </div>
          <Link href="/articles" style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",border:"1px solid #30363D",fontFamily:"monospace",fontSize:13,color:"#8B949E",borderRadius:6,textDecoration:"none" }}>
            <ArrowLeft size={13}/> More Articles
          </Link>
        </footer>
      </article>
    </div>
  );
}
