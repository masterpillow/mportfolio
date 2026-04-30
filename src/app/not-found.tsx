import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:24 }}>
      <div>
        <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:13,marginBottom:8 }}>// 404 not found</p>
        <h1 style={{ fontSize:"clamp(48px,10vw,100px)",fontWeight:700,color:"#E6EDF3",lineHeight:1,marginBottom:8 }}>404</h1>
        <p style={{ color:"#8B949E",marginBottom:28,fontSize:16 }}>This page doesn&apos;t exist — or you found something interesting.</p>
        <Link href="/" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:"#00FF88",color:"#0D1117",fontFamily:"monospace",fontWeight:700,fontSize:13,borderRadius:6,textDecoration:"none" }}>
          ← Back Home
        </Link>
      </div>
    </div>
  );
}
