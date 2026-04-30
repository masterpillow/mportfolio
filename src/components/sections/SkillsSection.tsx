import { Shield, Code2, Database, Network, Bug, Lock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const GROUPS = [
  { Icon: Bug,      title: "Offensive Security", color:"#F0883E", skills:["Penetration Testing","Vulnerability Assessment","OWASP Top 10","CTF Challenges","Exploit Development"] },
  { Icon: Network,  title: "Tools",              color:"#00FF88", skills:["Burp Suite","Nmap","Metasploit","Wireshark","Gobuster","Nikto"] },
  { Icon: Code2,    title: "Development",        color:"#58A6FF", skills:["Python","TypeScript","Next.js","React","Bash / Shell","Git"] },
  { Icon: Lock,     title: "Security Concepts",  color:"#00FF88", skills:["Web App Security","Network Security","Cryptography","Reverse Engineering","OSINT"] },
  { Icon: Database, title: "Infrastructure",     color:"#58A6FF", skills:["Linux (Kali)","MongoDB","Docker","Vercel","GitHub Actions","REST APIs"] },
  { Icon: Shield,   title: "Frameworks",         color:"#F0883E", skills:["MITRE ATT&CK","NIST CSF","PTES","OWASP Testing Guide"] },
];

export default function SkillsSection() {
  return (
    <section style={{ padding:"80px 0",borderTop:"1px solid #30363D" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px" }}>
        <SectionHeader eyebrow="// skills & tools" title="What I Work With"/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16 }}>
          {GROUPS.map(({Icon,title,color,skills})=>(
            <div key={title} className="card" style={{ padding:20 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
                <Icon size={17} style={{ color }}/>
                <h3 style={{ fontFamily:"monospace",fontWeight:700,color:"#E6EDF3",fontSize:13 }}>{title}</h3>
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                {skills.map(s=><span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
