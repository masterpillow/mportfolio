import type { Metadata } from "next";
import { Shield, GraduationCap, Target, Users } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Maximilian Musial — cybersecurity student, pentesting enthusiast, Division I student athlete.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth:1200,margin:"0 auto",padding:"64px 24px" }}>
      <SectionHeader eyebrow="// about me" title="Who I Am"
        subtitle="Cybersecurity student with a passion for understanding how systems break — and how to fix them."/>

      <div style={{ display:"grid",gridTemplateColumns:"1fr",gap:24 }} className="about-grid">
        {/* Bio */}
        <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:24 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:12,marginBottom:16 }}>$ cat bio.txt</p>
            {[
              `I'm Maximilian Musial, a Computer Science student concentrating in Cybersecurity with a deep focus on penetration testing and offensive security. My goal is simple: understand how systems are built well enough to find exactly where they break.`,
              `What sets me apart is my combination of a strong programming foundation, hands-on security lab work, and the discipline and analytical thinking I've developed as a Division I student athlete. Competing at that level teaches you to perform under pressure, adapt quickly, and trust your teammates — skills that translate directly into technical security work.`,
              `I actively compete in CTF challenges on HackTheBox and TryHackMe, study the OWASP Top 10 and real-world vulnerability disclosures, and document everything in write-ups so my learning is visible and useful to others.`,
              `I'm currently seeking internship and co-op opportunities in penetration testing, red teaming, and offensive security where I can apply and grow these skills in a professional environment.`,
            ].map((t,i)=>(
              <p key={i} style={{ color:"#8B949E",lineHeight:1.7,fontSize:15,marginBottom:12 }}>{t}</p>
            ))}
          </div>

          {/* Value props */}
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:24 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:12,marginBottom:16 }}>$ cat value-prop.txt</p>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12 }}>
              {[
                ["Technical Depth","I don't just use tools — I understand the protocols, code, and attack surfaces behind them."],
                ["Clear Communication","I write findings reports that both engineers and executives can act on."],
                ["Persistence","Athletic training taught me that the answer is always there — you just haven't looked from that angle yet."],
                ["Security-First Mindset","I think like an attacker even when I'm building. Every project I ship considers its own attack surface."],
              ].map(([t,d])=>(
                <div key={t} style={{ padding:16,borderRadius:6,border:"1px solid #30363D",background:"#0D1117" }}>
                  <p style={{ fontWeight:700,color:"#E6EDF3",fontSize:13,marginBottom:6 }}>{t}</p>
                  <p style={{ color:"#8B949E",fontSize:12,lineHeight:1.6 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          {/* Quick facts */}
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:20 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:12,marginBottom:14 }}>$ whoami --verbose</p>
            {[
              [GraduationCap,"Degree","B.S. Computer Science — Cybersecurity"],
              [Shield,"Focus","Penetration Testing & Offensive Security"],
              [Target,"Goal","Cybersecurity Internship / Co-op 2026"],
              [Users,"Athlete","Division I Student Athlete"],
            ].map(([Icon,label,val]:any)=>(
              <div key={label} style={{ display:"flex",gap:12,marginBottom:12 }}>
                <Icon size={14} style={{ color:"#00FF88",marginTop:2,flexShrink:0 }}/>
                <div>
                  <p style={{ fontFamily:"monospace",fontSize:10,color:"#8B949E" }}>{label}</p>
                  <p style={{ fontSize:13,color:"#E6EDF3" }}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Courses */}
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:20 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:12,marginBottom:12 }}>$ cat coursework.txt</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
              {["Network Security","Cryptography","Operating Systems","Data Structures","Advanced Security","Linux Sys Admin","Software Engineering","Database Systems"].map(c=>(
                <span key={c} className="tag">{c}</span>
              ))}
            </div>
          </div>

          {/* Certs */}
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:20 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:12,marginBottom:12 }}>$ ls certs/</p>
            {[["CompTIA Security+","In Progress"],["eJPT (eLearnSecurity)","Planned"],["OSCP","Target: 2027"]].map(([n,s])=>(
              <div key={n} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
                <span style={{ fontSize:13,color:"#E6EDF3" }}>{n}</span>
                <span className="tag">{s}</span>
              </div>
            ))}
          </div>

          {/* Links */}
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:20 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:12,marginBottom:12 }}>$ find . -name links</p>
            {[["GitHub","https://github.com/maxmusial","#E6EDF3"],["LinkedIn","https://linkedin.com/in/maxmusial","#58A6FF"],["HackTheBox","https://hackthebox.com","#F0883E"],["Resume","/resume.pdf","#00FF88"]].map(([l,h,c])=>(
              <a key={l} href={h} target={h.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                style={{ display:"block",fontFamily:"monospace",fontSize:13,color:c,textDecoration:"none",marginBottom:6 }}>
                → {l}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){.about-grid{grid-template-columns:2fr 1fr!important}}`}</style>
    </div>
  );
}
