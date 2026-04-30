import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section style={{ padding:"80px 24px",borderTop:"1px solid #30363D" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ position:"relative",borderRadius:12,border:"1px solid #30363D",background:"#161B22",padding:"64px 48px",textAlign:"center",overflow:"hidden" }}>
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at center,rgba(0,255,136,.05) 0%,transparent 65%)",pointerEvents:"none" }}/>
          <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:13,marginBottom:12,position:"relative" }}>// open to opportunities</p>
          <h2 style={{ fontSize:"clamp(24px,4vw,38px)",fontWeight:700,color:"#E6EDF3",marginBottom:14,position:"relative" }}>Looking for a Cybersecurity Intern?</h2>
          <p style={{ color:"#8B949E",maxWidth:500,margin:"0 auto 36px",lineHeight:1.65,position:"relative" }}>
            Actively seeking internship and co-op opportunities in penetration testing, red teaming, and offensive security. Let&apos;s talk.
          </p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:14,justifyContent:"center",position:"relative" }}>
            <Link href="/contact" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"12px 28px",background:"#00FF88",color:"#0D1117",fontFamily:"monospace",fontWeight:700,fontSize:14,borderRadius:8,textDecoration:"none" }}>
              <Mail size={15}/> Get In Touch
            </Link>
            <Link href="/portfolio" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"12px 28px",border:"1px solid #30363D",color:"#E6EDF3",fontFamily:"monospace",fontSize:14,borderRadius:8,textDecoration:"none" }}>
              View My Work <ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
