import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:     z.string().min(2).max(80).trim(),
  email:    z.string().email().max(200).trim().toLowerCase(),
  subject:  z.string().min(4).max(120).trim(),
  message:  z.string().min(20).max(2000).trim(),
  honeypot: z.string().max(0).optional(),
});

const rateMap = new Map<string,{count:number;resetAt:number}>();
function limited(ip:string):boolean{
  const now=Date.now(),e=rateMap.get(ip);
  if(!e||now>e.resetAt){rateMap.set(ip,{count:1,resetAt:now+3600000});return false;}
  if(e.count>=3)return true;
  e.count++;return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()??"unknown";
  if(limited(ip)) return NextResponse.json({error:"Too many submissions. Try again later."},{status:429});

  let body:unknown;
  try{ body=await req.json(); }catch{ return NextResponse.json({error:"Invalid body."},{status:400}); }

  // Honeypot — silent accept if filled
  if(body&&typeof body==="object"&&"honeypot"in body){
    const hp=(body as Record<string,unknown>).honeypot;
    if(hp&&String(hp).length>0) return NextResponse.json({ok:true});
  }

  const parsed=schema.safeParse(body);
  if(!parsed.success) return NextResponse.json({error:"Validation failed.",details:parsed.error.flatten().fieldErrors},{status:422});

  const {name,email,subject,message}=parsed.data;

  // Save to MongoDB (activated when MONGODB_URI is set)
  if(process.env.MONGODB_URI){
    try{
      const {default:dbConnect}=await import("@/lib/db");
      const {default:Contact}=await import("@/models/Contact");
      await dbConnect();
      await Contact.create({name,email,subject,message,ip});
    }catch(e){console.error("MongoDB error:",e);}
  }

  // Send email via Resend (activated when RESEND_API_KEY is set)
  if(process.env.RESEND_API_KEY&&process.env.CONTACT_EMAIL){
    try{
      const {Resend}=await import("resend");
      const resend=new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:"Portfolio <onboarding@resend.dev>",
        to:[process.env.CONTACT_EMAIL],
        subject:`[Portfolio] ${subject}`,
        html:`<div style="font-family:monospace;background:#0D1117;color:#E6EDF3;padding:24px;border-radius:8px">
          <h2 style="color:#00FF88">New Contact Submission</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border-color:#30363D;margin:16px 0"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>`,
      });
    }catch(e){console.error("Resend error:",e);}
  }

  if(process.env.NODE_ENV==="development") console.log("📬 Contact:",{name,email,subject});
  return NextResponse.json({ok:true,message:"Message received!"});
}
export async function GET(){ return NextResponse.json({error:"Method not allowed."},{status:405}); }
