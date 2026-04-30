"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Download, Terminal } from "lucide-react";

const ROLES = ["Penetration Tester","Offensive Security Enthusiast","CTF Player","Security Researcher"];

export default function HeroSection() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = ROLES[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text.length < cur.length)       t = setTimeout(()=>setText(cur.slice(0,text.length+1)),75);
    else if (!del && text.length === cur.length) t = setTimeout(()=>setDel(true),2000);
    else if (del && text.length > 0)             t = setTimeout(()=>setText(text.slice(0,-1)),38);
    else { setDel(false); setIdx(i=>(i+1)%ROLES.length); }
    return ()=>clearTimeout(t);
  },[text,del,idx]);

  return (
    <section style={{ position:"relative",minHeight:"92vh",display:"flex",alignItems:"center",overflow:"hidden" }}>
      {/* Grid bg */}
      <div className="grid-bg" style={{ position:"absolute",inset:0,opacity:.28,pointerEvents:"none" }}/>
      {/* Glow */}
      <div style={{ position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,136,.055) 0%,transparent 70%)",pointerEvents:"none" }}/>

      <div style={{ position:"relative",maxWidth:1200,margin:"0 auto",padding:"80px 24px",width:"100%" }}>
        <div style={{ maxWidth:680 }}>
          {/* Badge */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",marginBottom:24,borderRadius:6,border:"1px solid rgba(0,255,136,.28)",background:"rgba(0,255,136,.04)",fontFamily:"monospace",fontSize:13,color:"#00FF88" }}>
            <Terminal size={14}/> whoami
          </div>

          {/* Name */}
          <h1 style={{ fontSize:"clamp(44px,7vw,72px)",fontWeight:700,color:"#E6EDF3",lineHeight:1.1,marginBottom:16 }}>
            Maximilian<br/><span style={{ color:"#00FF88" }} className="glow-green">Musial</span>
          </h1>

          {/* Typewriter */}
          <div style={{ display:"flex",alignItems:"center",fontFamily:"monospace",fontSize:"clamp(16px,2.5vw,22px)",color:"#58A6FF",marginBottom:20,height:36 }}>
            {text}<span className="blink" style={{ display:"inline-block",width:2,height:"1.1em",background:"#00FF88",marginLeft:2,verticalAlign:"middle" }}/>
          </div>

          {/* Tagline */}
          <p style={{ fontSize:17,color:"#8B949E",lineHeight:1.7,maxWidth:540,marginBottom:40 }}>
            Computer Science student specializing in{" "}
            <span style={{ color:"#E6EDF3",fontWeight:500 }}>penetration testing</span> and{" "}
            <span style={{ color:"#E6EDF3",fontWeight:500 }}>offensive security</span>.
            I build secure systems and understand how to break insecure ones.
          </p>

          {/* CTAs */}
          <div style={{ display:"flex",flexWrap:"wrap",gap:14,marginBottom:52 }}>
            <Link href="/portfolio" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",background:"#00FF88",color:"#0D1117",fontFamily:"monospace",fontWeight:700,fontSize:14,borderRadius:8,textDecoration:"none" }}>
              View Projects <ArrowRight size={15}/>
            </Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",border:"1px solid #30363D",color:"#E6EDF3",fontFamily:"monospace",fontSize:14,borderRadius:8,textDecoration:"none" }}>
              <Download size={15}/> Resume
            </a>
            <Link href="/contact"
              style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",border:"1px solid #30363D",color:"#E6EDF3",fontFamily:"monospace",fontSize:14,borderRadius:8,textDecoration:"none" }}>
              Contact Me
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display:"flex",flexWrap:"wrap",gap:36 }}>
            {[["3+","Security Projects"],["CTF","Active Competitor"],["OWASP","Top 10 Focus"],["Open","to Internships"]].map(([v,l])=>(
              <div key={l}>
                <p style={{ fontFamily:"monospace",fontWeight:700,color:"#00FF88",fontSize:22 }}>{v}</p>
                <p style={{ color:"#8B949E",fontSize:12 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal window decoration */}
        <div style={{ display:"none",position:"absolute",right:24,top:"50%",transform:"translateY(-50%)",width:320,borderRadius:10,border:"1px solid #30363D",background:"#161B22",boxShadow:"0 8px 32px rgba(0,0,0,.4)" }} className="show-desktop">
          <div style={{ display:"flex",alignItems:"center",gap:6,padding:"10px 14px",borderBottom:"1px solid #30363D" }}>
            <span style={{ width:11,height:11,borderRadius:"50%",background:"#FF5F57" }}/>
            <span style={{ width:11,height:11,borderRadius:"50%",background:"#FFBD2E" }}/>
            <span style={{ width:11,height:11,borderRadius:"50%",background:"#00FF88" }}/>
            <span style={{ fontFamily:"monospace",fontSize:11,color:"#8B949E",marginLeft:6 }}>terminal — zsh</span>
          </div>
          <div style={{ padding:"14px 16px",fontFamily:"monospace",fontSize:12,lineHeight:1.7 }}>
            <p><span style={{color:"#00FF88"}}>$</span> <span style={{color:"#58A6FF"}}>nmap</span> <span style={{color:"#8B949E"}}>-sV -sC target</span></p>
            <p style={{color:"#8B949E",paddingLeft:12}}>PORT    STATE  SERVICE</p>
            <p style={{paddingLeft:12}}><span style={{color:"#F0883E"}}>22/tcp</span>  <span style={{color:"#00FF88"}}>open</span>   ssh</p>
            <p style={{paddingLeft:12}}><span style={{color:"#F0883E"}}>80/tcp</span>  <span style={{color:"#00FF88"}}>open</span>   http</p>
            <p style={{paddingLeft:12}}><span style={{color:"#F0883E"}}>443/tcp</span> <span style={{color:"#00FF88"}}>open</span>   https</p>
            <p style={{color:"#8B949E",paddingLeft:12,paddingTop:4}}>Nmap done. 3/1000 ports open.</p>
            <p style={{paddingTop:6}}><span style={{color:"#00FF88"}}>$</span> <span style={{color:"#58A6FF"}}>gobuster</span> <span style={{color:"#8B949E"}}>dir -u http://target</span></p>
            <p style={{color:"#8B949E",paddingLeft:12}}>/admin         <span style={{color:"#F0883E"}}>(301)</span></p>
            <p style={{color:"#8B949E",paddingLeft:12}}>/api           <span style={{color:"#00FF88"}}>(200)</span></p>
            <p style={{paddingLeft:12,color:"#F0883E"}}>/backup        (403) ⚠</p>
            <p style={{paddingTop:6,display:"flex",alignItems:"center",gap:4}}><span style={{color:"#00FF88"}}>$</span> <span className="blink" style={{display:"inline-block",width:8,height:15,background:"#00FF88"}}/></p>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){.show-desktop{display:block!important}}`}</style>
    </section>
  );
}
