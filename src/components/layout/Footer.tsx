import Link from "next/link";
import { Terminal, Mail, GitFork, Link2 } from "lucide-react";

const SOCIAL = [
  { Icon: GitFork, href: "https://github.com/maxmusial",          label: "GitHub"   },
  { Icon: Link2,   href: "https://linkedin.com/in/maxmusial",     label: "LinkedIn" },
  { Icon: Mail,    href: "/contact",                               label: "Email"    },
];

export default function Footer() {
  return (
    <footer style={{ borderTop:"1px solid #30363D",background:"#161B22",marginTop:64 }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"36px 24px" }}>
        <div style={{ display:"flex",flexWrap:"wrap",gap:24,justifyContent:"space-between",alignItems:"center" }}>
          {/* Brand */}
          <Link href="/" style={{ display:"flex",alignItems:"center",gap:8,fontFamily:"monospace",color:"#00FF88",textDecoration:"none",fontWeight:"bold",fontSize:13 }}>
            <Terminal size={15}/> max@sec:~$
          </Link>
          {/* Nav */}
          <nav style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            {["About","Portfolio","Articles","Contact"].map(l=>(
              <Link key={l} href={"/"+l.toLowerCase()} style={{ fontFamily:"monospace",fontSize:13,color:"#8B949E",textDecoration:"none" }}>{l}</Link>
            ))}
          </nav>
          {/* Social */}
          <div style={{ display:"flex",gap:10 }}>
            {SOCIAL.map(({Icon,href,label})=>(
              <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined}
                rel={href.startsWith("http")?"noopener noreferrer":undefined}
                aria-label={label}
                style={{ display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,borderRadius:6,border:"1px solid #30363D",color:"#8B949E",textDecoration:"none",transition:"color .15s,border-color .15s" }}
                onMouseOver={e=>{(e.currentTarget as HTMLElement).style.color="#00FF88";(e.currentTarget as HTMLElement).style.borderColor="#00FF88"}}
                onMouseOut={e=>{(e.currentTarget as HTMLElement).style.color="#8B949E";(e.currentTarget as HTMLElement).style.borderColor="#30363D"}}>
                <Icon size={15}/>
              </a>
            ))}
          </div>
        </div>
        <div style={{ marginTop:24,paddingTop:20,borderTop:"1px solid #30363D",display:"flex",flexWrap:"wrap",gap:12,justifyContent:"space-between",fontFamily:"monospace",fontSize:11,color:"#8B949E" }}>
          <span>© {new Date().getFullYear()} Maximilian Musial · Built with Next.js, TypeScript & Tailwind</span>
          <span style={{ color:"#00FF88" }}>status: open to internships ✓</span>
        </div>
      </div>
    </footer>
  );
}
