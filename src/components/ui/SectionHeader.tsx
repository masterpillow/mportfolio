interface Props {
  eyebrow: string; title: string; subtitle?: string; center?: boolean;
}
export default function SectionHeader({ eyebrow, title, subtitle, center }: Props) {
  return (
    <div style={{ marginBottom:48, textAlign: center ? "center" : "left" }}>
      <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:13,marginBottom:8 }}>{eyebrow}</p>
      <h2 style={{ fontSize:"clamp(24px,4vw,36px)",fontWeight:700,color:"#E6EDF3",marginBottom:subtitle?12:0 }}>{title}</h2>
      {subtitle && <p style={{ color:"#8B949E",maxWidth:600,lineHeight:1.65,fontSize:15,margin:center?"0 auto":"0" }}>{subtitle}</p>}
    </div>
  );
}
