export default function Loading() {
  return (
    <div style={{ minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:36,height:36,border:"2px solid #30363D",borderTopColor:"#00FF88",borderRadius:"50%",margin:"0 auto 14px" }} className="spin"/>
        <p style={{ fontFamily:"monospace",fontSize:12,color:"#8B949E" }}>Loading...</p>
      </div>
    </div>
  );
}
