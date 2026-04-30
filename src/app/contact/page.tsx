"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, GitFork, Link2, Shield, CheckCircle, AlertCircle } from "lucide-react";

const schema = z.object({
  name:     z.string().min(2,"Name must be at least 2 characters").max(80),
  email:    z.string().email("Please enter a valid email address"),
  subject:  z.string().min(4,"Subject must be at least 4 characters").max(120),
  message:  z.string().min(20,"Message must be at least 20 characters").max(2000),
  honeypot: z.string().max(0).optional(),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const { register, handleSubmit, reset, formState:{errors,isSubmitting} } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    if(data.honeypot) return;
    setStatus("loading"); setErrMsg("");
    try {
      const res = await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      const json = await res.json();
      if(!res.ok) throw new Error(json.error||"Something went wrong.");
      setStatus("success"); reset();
    } catch(e:unknown) {
      setStatus("error");
      setErrMsg(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  }

  const inp = (err:boolean) => ({
    width:"100%", background:"#0D1117", border:"1px solid "+(err?"#f87171":"#30363D"),
    borderRadius:6, padding:"10px 14px", fontSize:13, color:"#E6EDF3",
    fontFamily:"monospace", outline:"none", boxSizing:"border-box" as const,
  });

  return (
    <div style={{ maxWidth:1100,margin:"0 auto",padding:"64px 24px" }}>
      <div style={{ marginBottom:48 }}>
        <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:13,marginBottom:8 }}>// contact</p>
        <h1 style={{ fontSize:"clamp(28px,5vw,42px)",fontWeight:700,color:"#E6EDF3",marginBottom:12 }}>Get In Touch</h1>
        <p style={{ color:"#8B949E",maxWidth:520,lineHeight:1.65 }}>
          Interested in working together? Have an internship or co-op opportunity? I typically respond within 24 hours.
        </p>
      </div>

      <div style={{ display:"grid",gap:24 }} className="contact-grid">
        {/* Form */}
        <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:28 }}>
          {status==="success" ? (
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"48px 0" }}>
              <CheckCircle size={48} style={{ color:"#00FF88",marginBottom:16 }}/>
              <h2 style={{ fontSize:22,fontWeight:700,color:"#E6EDF3",marginBottom:8 }}>Message Sent!</h2>
              <p style={{ color:"#8B949E",marginBottom:24 }}>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
              <button onClick={()=>setStatus("idle")}
                style={{ padding:"8px 20px",border:"1px solid #30363D",background:"none",color:"#8B949E",fontFamily:"monospace",fontSize:13,borderRadius:6,cursor:"pointer" }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Honeypot - hidden from real users */}
              <div style={{ position:"absolute",opacity:0,pointerEvents:"none",height:0,overflow:"hidden" }} aria-hidden="true">
                <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")}/>
              </div>

              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14 }} className="form-row">
                <div>
                  <label style={{ display:"block",fontFamily:"monospace",fontSize:11,color:"#8B949E",marginBottom:6 }}>
                    Name <span style={{ color:"#00FF88" }}>*</span>
                  </label>
                  <input type="text" placeholder="Jane Smith" style={inp(!!errors.name)} {...register("name")}/>
                  {errors.name && <p style={{ fontFamily:"monospace",fontSize:11,color:"#f87171",marginTop:4 }}>{errors.name.message}</p>}
                </div>
                <div>
                  <label style={{ display:"block",fontFamily:"monospace",fontSize:11,color:"#8B949E",marginBottom:6 }}>
                    Email <span style={{ color:"#00FF88" }}>*</span>
                  </label>
                  <input type="email" placeholder="jane@company.com" style={inp(!!errors.email)} {...register("email")}/>
                  {errors.email && <p style={{ fontFamily:"monospace",fontSize:11,color:"#f87171",marginTop:4 }}>{errors.email.message}</p>}
                </div>
              </div>

              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block",fontFamily:"monospace",fontSize:11,color:"#8B949E",marginBottom:6 }}>
                  Subject <span style={{ color:"#00FF88" }}>*</span>
                </label>
                <input type="text" placeholder="Internship Opportunity — Summer 2026" style={inp(!!errors.subject)} {...register("subject")}/>
                {errors.subject && <p style={{ fontFamily:"monospace",fontSize:11,color:"#f87171",marginTop:4 }}>{errors.subject.message}</p>}
              </div>

              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontFamily:"monospace",fontSize:11,color:"#8B949E",marginBottom:6 }}>
                  Message <span style={{ color:"#00FF88" }}>*</span>
                </label>
                <textarea rows={6} placeholder="Tell me about the opportunity..." style={{ ...inp(!!errors.message),resize:"none" }} {...register("message")}/>
                {errors.message && <p style={{ fontFamily:"monospace",fontSize:11,color:"#f87171",marginTop:4 }}>{errors.message.message}</p>}
              </div>

              {status==="error" && (
                <div style={{ display:"flex",gap:8,alignItems:"center",padding:"10px 14px",borderRadius:6,border:"1px solid rgba(248,113,113,.3)",background:"rgba(248,113,113,.08)",marginBottom:16,fontSize:13,color:"#f87171" }}>
                  <AlertCircle size={14}/> {errMsg}
                </div>
              )}

              <button type="submit" disabled={isSubmitting||status==="loading"}
                style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 26px",background:"#00FF88",color:"#0D1117",fontFamily:"monospace",fontWeight:700,fontSize:13,borderRadius:6,border:"none",cursor:"pointer",opacity:(isSubmitting||status==="loading")?0.65:1 }}>
                {status==="loading"
                  ? <><span className="spin" style={{ display:"inline-block",width:14,height:14,border:"2px solid rgba(13,17,23,.3)",borderTopColor:"#0D1117",borderRadius:"50%" }}/> Sending...</>
                  : <><Send size={14}/> Send Message</>}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:20 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:11,marginBottom:14 }}>// find me at</p>
            {[[Mail,"Email","maxmusial1@gmail.com","mailto:maxmusial1@gmail.com"],[GitFork,"GitHub","github.com/masterpillow","https://github.com/masterpillow"],[Link2,"LinkedIn","linkedin.com/in/maximilian-musial-64646125a","https://linkedin.com/in/maximilian-musial-64646125a"]].map(([Icon,label,val,href]:any)=>(
              <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:14,textDecoration:"none" }}>
                <Icon size={14} style={{ color:"#8B949E",marginTop:2,flexShrink:0 }}/>
                <div>
                  <p style={{ fontFamily:"monospace",fontSize:10,color:"#8B949E" }}>{label}</p>
                  <p style={{ fontSize:13,color:"#E6EDF3" }}>{val}</p>
                </div>
              </a>
            ))}
          </div>

          <div style={{ border:"1px solid #30363D",borderRadius:8,background:"#161B22",padding:20 }}>
            <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:11,marginBottom:10 }}>// resume</p>
            <p style={{ fontSize:12,color:"#8B949E",lineHeight:1.6,marginBottom:12 }}>Prefer to review my background first?</p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              style={{ display:"block",textAlign:"center",padding:"9px",border:"1px solid #30363D",color:"#E6EDF3",fontFamily:"monospace",fontSize:12,borderRadius:6,textDecoration:"none" }}>
              Download Resume ↗
            </a>
          </div>

          <div style={{ border:"1px solid rgba(0,255,136,.2)",borderRadius:8,background:"rgba(0,255,136,.03)",padding:20 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
              <Shield size={13} style={{ color:"#00FF88" }}/>
              <p style={{ fontFamily:"monospace",color:"#00FF88",fontSize:11 }}>// form security</p>
            </div>
            {["Honeypot field — silent bot detection","reCAPTCHA v3 score threshold ≥ 0.5","Zod server-side schema validation","MongoDB Atlas — encrypted storage","Rate limiting via Vercel Edge"].map(n=>(
              <div key={n} style={{ display:"flex",gap:8,fontSize:12,color:"#8B949E",marginBottom:6 }}>
                <span style={{ color:"#00FF88",flexShrink:0 }}>✓</span> {n}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(min-width:860px){.contact-grid{grid-template-columns:2fr 1fr!important}}
        @media(max-width:600px){.form-row{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}
