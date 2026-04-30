"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";

const LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Work",      href: "/work" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Articles",  href: "/articles" },
  { label: "Contact",   href: "/contact" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? path === "/" : path.startsWith(href);

  return (
    <header style={{ position:"sticky",top:0,zIndex:50,background:"rgba(13,17,23,.92)",backdropFilter:"blur(8px)",borderBottom:"1px solid #30363D" }}>
      <nav style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display:"flex",alignItems:"center",gap:8,fontFamily:"monospace",color:"#00FF88",textDecoration:"none",fontWeight:"bold",fontSize:14 }}>
          <Terminal size={16}/>
          max@sec:~$
        </Link>

        {/* Desktop links */}
        <ul style={{ display:"flex",gap:4,listStyle:"none",margin:0,padding:0 }} className="hide-mobile">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{
                display:"block",padding:"6px 12px",fontFamily:"monospace",fontSize:13,borderRadius:6,textDecoration:"none",
                color: active(l.href) ? "#00FF88" : "#8B949E",
                background: active(l.href) ? "rgba(0,255,136,.08)" : "transparent",
                transition:"color .15s,background .15s",
              }}>
                {active(l.href) && <span style={{color:"#00FF88",opacity:.5}}>./</span>}{l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
          style={{ display:"none",padding:"6px 16px",background:"#00FF88",color:"#0D1117",fontFamily:"monospace",fontWeight:"bold",fontSize:13,borderRadius:6,textDecoration:"none" }}
          className="show-desktop">
          Resume ↗
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
          style={{ background:"none",border:"none",color:"#8B949E",cursor:"pointer",padding:4,display:"none" }}
          className="show-mobile">
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background:"rgba(13,17,23,.96)",borderTop:"1px solid #30363D",padding:"12px 24px 16px" }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display:"block",padding:"10px 12px",fontFamily:"monospace",fontSize:14,borderRadius:6,textDecoration:"none",marginBottom:2,
                color: active(l.href) ? "#00FF88" : "#8B949E",
                background: active(l.href) ? "rgba(0,255,136,.08)" : "transparent" }}>
              {l.label}
            </Link>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            style={{ display:"block",marginTop:8,padding:"10px",textAlign:"center",background:"#00FF88",color:"#0D1117",fontFamily:"monospace",fontWeight:"bold",fontSize:13,borderRadius:6,textDecoration:"none" }}>
            Resume ↗
          </a>
        </div>
      )}

      <style>{`
        @media(max-width:768px){.hide-mobile{display:none!important}.show-mobile{display:block!important}}
        @media(min-width:769px){.show-desktop{display:block!important}.show-mobile{display:none!important}}
      `}</style>
    </header>
  );
}
