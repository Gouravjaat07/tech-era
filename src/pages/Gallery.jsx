import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

    @keyframes shimmer    { 0%{background-position:0% center}100%{background-position:200% center} }
    @keyframes fadeUp     { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
    @keyframes pulseGlow  { 0%,100%{opacity:0.5}50%{opacity:1} }
    @keyframes te-glow    { 0%,100%{opacity:.45}50%{opacity:1} }
    @keyframes fadeIn     { from{opacity:0}to{opacity:1} }
    @keyframes scaleIn    { from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)} }
    @keyframes slideUp    { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
    @keyframes rotateSlow { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
    @keyframes pingAnim   { 75%,100%{transform:scale(2.1);opacity:0} }
    @keyframes scanLine   { 0%{top:-2px}100%{top:100%} }

    .gl-f1{animation:fadeUp .6s ease-out .08s both}
    .gl-f2{animation:fadeUp .6s ease-out .2s both}
    .gl-f3{animation:fadeUp .6s ease-out .32s both}
    .gl-f4{animation:fadeUp .6s ease-out .44s both}

    .shimmer-text{
      background:linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%);
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      animation:shimmer 4s linear infinite;
    }
    .grad-text{
      background:linear-gradient(135deg,#00EEFF,#4F46E5);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }

    /* ── FONT ALIASES ── */
    .te-display{font-family:'Syne',sans-serif!important}
    .te-mono   {font-family:'JetBrains Mono',monospace!important}
    .te-body   {font-family:'DM Sans',sans-serif!important}

    /* ── GRID BG ── */
    .te-grid-bg{
      background-image:
        linear-gradient(rgba(0,238,255,.022) 1px,transparent 1px),
        linear-gradient(90deg,rgba(0,238,255,.022) 1px,transparent 1px);
      background-size:60px 60px;
    }

    /* ── HERO ── */
    .gl-hero{
      position:relative;min-height:52vh;width:100%;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      overflow:hidden;background:#050D1A;padding:100px 24px 56px;
    }
    .gl-hero-pill{
      display:inline-flex;align-items:center;gap:8px;padding:6px 18px;
      border-radius:999px;border:1px solid rgba(0,238,255,.2);
      background:rgba(0,238,255,.05);margin-bottom:22px;backdrop-filter:blur(8px);
    }
    .gl-hero-pill-dot{width:8px;height:8px;border-radius:50%;background:#00EEFF;animation:te-glow 2s ease-in-out infinite;flex-shrink:0}
    .gl-hero-pill-text{color:#00EEFF;font-size:11px;font-weight:700;letter-spacing:.16em;font-family:'JetBrains Mono',monospace}
    .gl-hero-h1{font-size:clamp(32px,7vw,76px);font-weight:800;line-height:1.05;letter-spacing:-.03em;margin-bottom:16px;color:white;font-family:'Syne',sans-serif;text-align:center}
    .gl-hero-sub{color:#94A3B8;font-size:clamp(14px,2vw,17px);max-width:560px;margin:0 auto;line-height:1.78;font-family:'DM Sans',sans-serif;text-align:center}

    /* ── FILTER BAR ── */
    .gl-filter-bar{
      position:sticky;top:64px;z-index:50;
      background:rgba(5,13,26,.92);backdrop-filter:blur(14px);
      border-bottom:1px solid rgba(255,255,255,.05);
    }
    .gl-filter-inner{
      max-width:1200px;margin:0 auto;
      display:flex;align-items:center;justify-content:space-between;
      gap:16px;padding:14px 24px;flex-wrap:wrap;
    }
    .gl-filter-tabs{display:flex;gap:8px;flex-wrap:wrap;}
    .gl-filter-btn{
      padding:7px 18px;border-radius:999px;font-size:12px;font-weight:700;
      border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);
      color:#64748B;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;
    }
    .gl-filter-btn:hover{border-color:rgba(0,238,255,.25);color:#94A3B8;}
    .gl-filter-btn.active{border-color:rgba(0,238,255,.35);background:rgba(0,238,255,.08);color:#00EEFF;}
    .gl-search-wrap{position:relative;width:240px;}
    .gl-search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#475569;pointer-events:none}
    .gl-search{
      width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
      border-radius:12px;padding:10px 14px 10px 38px;color:white;font-size:13px;
      font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;
    }
    .gl-search:focus{border-color:rgba(0,238,255,.3);}
    .gl-search::placeholder{color:#334155;}

    /* ── MASONRY GALLERY ── */
    .gl-section{max-width:1200px;margin:0 auto;padding:40px 24px 80px;}
    .gl-masonry{
      columns:3;column-gap:16px;
    }
    .gl-item{
      break-inside:avoid;margin-bottom:16px;
      border-radius:18px;overflow:hidden;
      border:1px solid rgba(255,255,255,.05);
      background:#0A1628;
      cursor:pointer;
      position:relative;
      transition:transform .38s cubic-bezier(.23,1,.32,1), border-color .38s, box-shadow .38s;
      display:block;
    }
    .gl-item:hover{transform:translateY(-6px) scale(1.01);}
    .gl-item-img{
      width:100%;display:block;
      object-fit:cover;
      transition:transform .45s cubic-bezier(.23,1,.32,1),filter .45s;
      filter:saturate(.85) brightness(.92);
    }
    .gl-item:hover .gl-item-img{transform:scale(1.06);filter:saturate(1.1) brightness(1);}
    .gl-item-overlay{
      position:absolute;inset:0;
      background:linear-gradient(to top, rgba(5,13,26,.88) 0%, rgba(5,13,26,.3) 50%, transparent 100%);
      opacity:0;transition:opacity .38s;
      display:flex;flex-direction:column;justify-content:flex-end;padding:18px;
    }
    .gl-item:hover .gl-item-overlay{opacity:1;}
    .gl-item-tag{
      display:inline-flex;align-items:center;gap:5px;
      padding:3px 10px;border-radius:999px;font-size:10px;font-weight:700;
      font-family:'JetBrains Mono',monospace;letter-spacing:.08em;
      border:1px solid;width:fit-content;margin-bottom:7px;
    }
    .gl-item-caption{color:white;font-size:13px;font-weight:700;font-family:'Syne',sans-serif;line-height:1.35;}
    .gl-item-sub{color:rgba(255,255,255,.55);font-size:11px;margin-top:3px;font-family:'DM Sans',sans-serif;}
    .gl-item-expand{
      position:absolute;top:12px;right:12px;
      width:32px;height:32px;border-radius:9px;
      background:rgba(5,13,26,.7);border:1px solid rgba(255,255,255,.12);
      display:flex;align-items:center;justify-content:center;
      color:white;opacity:0;transition:opacity .3s;backdrop-filter:blur(6px);
    }
    .gl-item:hover .gl-item-expand{opacity:1;}

    /* ── PLACEHOLDER CARDS (no real images) ── */
    .gl-placeholder{
      width:100%;display:block;
      position:relative;overflow:hidden;
    }

    /* ── LIGHTBOX ── */
    .gl-lightbox-overlay{
      position:fixed;inset:0;z-index:3000;
      background:rgba(5,13,26,.96);backdrop-filter:blur(18px);
      display:flex;align-items:center;justify-content:center;
      padding:20px;animation:fadeIn .22s ease-out;
    }
    .gl-lightbox-box{
      position:relative;max-width:900px;width:100%;
      animation:scaleIn .3s cubic-bezier(.23,1,.32,1);
    }
    .gl-lightbox-img{
      width:100%;border-radius:20px;
      border:1px solid rgba(255,255,255,.08);
      display:block;
      box-shadow:0 40px 120px rgba(0,0,0,.7);
    }
    .gl-lightbox-close{
      position:absolute;top:-14px;right:-14px;
      width:40px;height:40px;border-radius:12px;
      background:#0A1628;border:1px solid rgba(255,255,255,.12);
      color:#94A3B8;font-size:18px;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      transition:color .2s,border-color .2s;
      font-family:'DM Sans',sans-serif;
    }
    .gl-lightbox-close:hover{color:white;border-color:rgba(255,255,255,.3);}
    .gl-lightbox-nav{
      position:absolute;top:50%;transform:translateY(-50%);
      width:44px;height:44px;border-radius:13px;
      background:rgba(5,13,26,.8);border:1px solid rgba(255,255,255,.1);
      color:white;cursor:pointer;font-size:18px;
      display:flex;align-items:center;justify-content:center;
      transition:background .2s,border-color .2s;backdrop-filter:blur(8px);
    }
    .gl-lightbox-nav:hover{background:rgba(0,238,255,.12);border-color:rgba(0,238,255,.3);}
    .gl-lightbox-prev{left:-56px;}
    .gl-lightbox-next{right:-56px;}
    .gl-lightbox-info{
      margin-top:16px;padding:16px 22px;
      border-radius:14px;border:1px solid rgba(255,255,255,.06);
      background:#0A1628;display:flex;align-items:center;justify-content:space-between;gap:12;flex-wrap:wrap;
    }
    .gl-lightbox-caption{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:white;}
    .gl-lightbox-meta{font-family:'JetBrains Mono',monospace;font-size:11px;color:#475569;}
    .gl-lightbox-counter{
      padding:4px 12px;border-radius:999px;
      font-size:11px;font-weight:700;color:#00EEFF;
      border:1px solid rgba(0,238,255,.2);background:rgba(0,238,255,.07);
      font-family:'JetBrains Mono',monospace;white-space:nowrap;
    }

    /* ── STATS ROW ── */
    .gl-stats{
      display:flex;gap:14px;flex-wrap:wrap;
      max-width:1200px;margin:0 auto 8px;padding:0 24px;
    }
    .gl-stat-card{
      padding:14px 20px;border-radius:14px;
      border:1px solid rgba(255,255,255,.05);background:#0A1628;
      text-align:center;transition:border-color .3s,background .3s;
    }
    .gl-stat-card:hover{border-color:rgba(0,238,255,.2);background:rgba(0,238,255,.05);}
    .gl-stat-val{font-size:clamp(18px,3vw,24px);font-weight:900;color:#00EEFF;font-family:'JetBrains Mono',monospace;}
    .gl-stat-lbl{font-size:10px;color:#475569;text-transform:uppercase;letter-spacing:.12em;margin-top:3px;font-family:'DM Sans',sans-serif;}

    /* ── EMPTY STATE ── */
    .gl-empty{
      grid-column:1/-1;text-align:center;
      padding:72px 24px;color:#475569;
    }

    /* ── CTA STRIP ── */
    .gl-cta-strip{
      max-width:1200px;margin:0 auto;padding:0 24px 80px;
    }
    .gl-cta-inner{
      position:relative;border-radius:26px;overflow:hidden;
      padding:clamp(32px,5vw,56px) clamp(22px,5vw,64px);
      text-align:center;
      border:1px solid rgba(0,238,255,.15);
      background:linear-gradient(135deg,rgba(0,238,255,.05) 0%,rgba(79,70,229,.08) 50%,rgba(167,139,250,.05) 100%);
    }
    .gl-cta-h2{font-family:'Syne',sans-serif;font-size:clamp(22px,4vw,42px);font-weight:800;color:white;letter-spacing:-.03em;margin-bottom:10px;}
    .gl-cta-sub{color:#64748B;font-size:clamp(13px,1.6vw,16px);max-width:420px;margin:0 auto 24px;line-height:1.75;font-family:'DM Sans',sans-serif;}
    .gl-cta-btn{
      display:inline-flex;align-items:center;gap:9px;
      padding:13px 32px;border-radius:14px;font-weight:700;font-size:15px;
      color:#050D1A;background:linear-gradient(135deg,#00EEFF,#4F46E5);
      text-decoration:none;transition:transform .28s,box-shadow .28s;font-family:'DM Sans',sans-serif;
      border:none;cursor:pointer;
    }
    .gl-cta-btn:hover{transform:scale(1.05);box-shadow:0 0 38px rgba(0,238,255,.4);}
    .gl-cta-btn-sec{
      display:inline-flex;align-items:center;gap:8px;
      padding:13px 28px;border-radius:14px;font-weight:600;font-size:15px;
      color:#00EEFF;border:1px solid rgba(0,238,255,.3);background:rgba(0,238,255,.05);
      text-decoration:none;transition:transform .28s,border-color .28s,background .28s;
      font-family:'DM Sans',sans-serif;backdrop-filter:blur(8px);
    }
    .gl-cta-btn-sec:hover{transform:scale(1.04);border-color:rgba(0,238,255,.6);background:rgba(0,238,255,.1);}

    /* ── SECTION HEADER ── */
    .sec-head{text-align:center;margin-bottom:clamp(28px,4vw,48px);}
    .sec-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;margin-bottom:14px;}
    .sec-pill-text{font-size:11px;font-weight:700;letter-spacing:.2em;font-family:'JetBrains Mono',monospace;}
    .sec-h2{font-size:clamp(24px,4vw,46px);font-weight:800;color:white;letter-spacing:-.03em;margin-bottom:10px;line-height:1.1;font-family:'Syne',sans-serif;}
    .sec-sub{color:#64748B;font-size:clamp(13px,1.8vw,16px);max-width:460px;margin:0 auto;line-height:1.7;font-family:'DM Sans',sans-serif;}

    /* ── RESPONSIVE ── */
    @media(max-width:1023px){
      .gl-masonry{columns:2;}
      .gl-lightbox-prev{left:-48px;}
      .gl-lightbox-next{right:-48px;}
    }
    @media(max-width:767px){
      .gl-masonry{columns:2;}
      .gl-lightbox-prev,.gl-lightbox-next{display:none;}
      .gl-filter-inner{flex-direction:column;align-items:flex-start;gap:10px;}
      .gl-search-wrap{width:100%;}
      .gl-section{padding:32px 14px 60px;}
      .gl-stats{padding:0 14px;}
      .gl-cta-strip{padding:0 14px 60px;}
      .gl-hero{padding:90px 14px 40px;}
      .gl-filter-bar{top:56px;}
    }
    @media(max-width:479px){
      .gl-masonry{columns:1;}
      .gl-lightbox-box{padding:0 4px;}
      .gl-lightbox-close{top:8px;right:8px;}
      .gl-lightbox-info{flex-direction:column;gap:8px;}
    }
  `}</style>
);

// ─── GALLERY DATA ─────────────────────────────────────────────────────────────
// Replace src values with your actual image paths e.g. "/images/gallery/photo1.jpg"
const GALLERY_ITEMS = [
  // ── Developers Meetup 2026 ──
  { id:1,  src:"/images/gallery/meetup-1.jpg",  caption:"Opening Keynote",          event:"Developers Meetup 2026",  category:"Meetup",      accent:"#00EEFF", height:260 },
  { id:2,  src:"/images/gallery/meetup-2.jpg",  caption:"Networking Session",        event:"Developers Meetup 2026",  category:"Meetup",      accent:"#00EEFF", height:190 },
  { id:3,  src:"/images/gallery/meetup-3.jpg",  caption:"Speaker 1 — Q&A",           event:"Developers Meetup 2026",  category:"Meetup",      accent:"#00EEFF", height:220 },
  { id:4,  src:"/images/gallery/meetup-4.jpg",  caption:"Group Activity",            event:"Developers Meetup 2026",  category:"Meetup",      accent:"#00EEFF", height:180 },
  { id:5,  src:"/images/gallery/meetup-5.jpg",  caption:"Speaker 2 on Stage",        event:"Developers Meetup 2026",  category:"Meetup",      accent:"#00EEFF", height:240 },
  { id:6,  src:"/images/gallery/meetup-6.jpg",  caption:"Group Photo",               event:"Developers Meetup 2026",  category:"Meetup",      accent:"#00EEFF", height:200 },
  { id:7,  src:"/images/gallery/meetup-7.jpg",  caption:"Competition Segment",       event:"Developers Meetup 2026",  category:"Meetup",      accent:"#00EEFF", height:170 },
  { id:8,  src:"/images/gallery/meetup-8.jpg",  caption:"Lunch & Networking",        event:"Developers Meetup 2026",  category:"Meetup",      accent:"#00EEFF", height:215 },

  // ── CV to Career Workshop ──
  { id:9,  src:"/images/gallery/workshop-1.jpg", caption:"Session Opening",          event:"CV to Career Workshop",   category:"Workshop",    accent:"#4ADE80", height:200 },
  { id:10, src:"/images/gallery/workshop-2.jpg", caption:"Live Q&A with Attendees",  event:"CV to Career Workshop",   category:"Workshop",    accent:"#4ADE80", height:240 },
  { id:11, src:"/images/gallery/workshop-3.jpg", caption:"Blockchain Credentials",   event:"CV to Career Workshop",   category:"Workshop",    accent:"#4ADE80", height:175 },

  // ── Collaborations ──
  { id:12, src:"/images/gallery/collab-1.jpg",  caption:"LockedIn Community Night",  event:"LockedIn",                category:"Collabs",     accent:"#A78BFA", height:230 },
  { id:13, src:"/images/gallery/collab-2.jpg",  caption:"Technical Day 5.0",         event:"Technical Day 5.0",       category:"Collabs",     accent:"#4ADE80", height:190 },
  { id:14, src:"/images/gallery/collab-3.jpg",  caption:"AI Fusion 2025",            event:"AI Fusion 2025",          category:"Collabs",     accent:"#FEBC2E", height:210 },
  { id:15, src:"/images/gallery/collab-4.jpg",  caption:"Duality Hackathon",         event:"Duality Hackathon",       category:"Collabs",     accent:"#06B6D4", height:185 },
  { id:16, src:"/images/gallery/collab-5.jpg",  caption:"DevAI-X Noida",             event:"DevAI-X",                 category:"Collabs",     accent:"#A78BFA", height:250 },
  { id:17, src:"/images/gallery/collab-6.jpg",  caption:"Hyperspace Hackathon",      event:"Hyperspace Hackathon",    category:"Collabs",     accent:"#818CF8", height:195 },
  { id:18, src:"/images/gallery/collab-7.jpg",  caption:"AI For All — Microsoft",    event:"AI For All",              category:"Collabs",     accent:"#38BDF8", height:220 },
  { id:19, src:"/images/gallery/collab-8.jpg",  caption:"SHIFT2K25 Pre-Meetup",      event:"SHIFT2K25",               category:"Collabs",     accent:"#34D399", height:175 },
  { id:20, src:"/images/gallery/collab-9.jpg",  caption:"NERDZ'26 @ Jamia Hamdard", event:"NERDZ'26",                category:"Collabs",     accent:"#F472B6", height:240 },

  // ── Behind the Scenes ──
  { id:21, src:"/images/gallery/bts-1.jpg",     caption:"Team Briefing — Pre-event", event:"Behind the Scenes",       category:"BTS",         accent:"#4F46E5", height:200 },
  { id:22, src:"/images/gallery/bts-2.jpg",     caption:"Setting Up the Venue",      event:"Behind the Scenes",       category:"BTS",         accent:"#4F46E5", height:175 },
  { id:23, src:"/images/gallery/bts-3.jpg",     caption:"Organiser Team",            event:"Behind the Scenes",       category:"BTS",         accent:"#4F46E5", height:230 },
];

const FILTERS = ["All", "Meetup", "Workshop", "Collabs", "BTS"];

const STATS = [
  { value: `${GALLERY_ITEMS.length}+`, label: "Photos"  },
  { value: "3+",                        label: "Events"  },
  { value: "10+",                       label: "Collabs" },
  { value: "2K+",                       label: "Community" },
];

// ─── TAG COLOR MAP ────────────────────────────────────────────────────────────
const TAG_STYLES = {
  Meetup:   { color:"#00EEFF", bg:"rgba(0,238,255,.1)",    border:"rgba(0,238,255,.25)"   },
  Workshop: { color:"#4ADE80", bg:"rgba(74,222,128,.1)",   border:"rgba(74,222,128,.25)"  },
  Collabs:  { color:"#A78BFA", bg:"rgba(167,139,250,.1)",  border:"rgba(167,139,250,.25)" },
  BTS:      { color:"#4F46E5", bg:"rgba(79,70,229,.1)",    border:"rgba(79,70,229,.25)"   },
};

// ─── PLACEHOLDER VISUAL (when no real image) ─────────────────────────────────
function PlaceholderCard({ item }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const acc = item.accent;
    const r = parseInt(acc.slice(1,3),16);
    const g = parseInt(acc.slice(3,5),16);
    const b = parseInt(acc.slice(5,7),16);
    const resize = () => {
      canvas.width  = canvas.parentElement.clientWidth;
      canvas.height = item.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    const pts = Array.from({length:18},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.0004, vy:(Math.random()-.5)*.0004,
      rad:Math.random()*1.2+.5, a:Math.random()*.25+.07,
    }));
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0,0,w,h);
      // gradient bg
      const grd = ctx.createLinearGradient(0,0,w,h);
      grd.addColorStop(0,"#0A1628");
      grd.addColorStop(1,`rgba(${r},${g},${b},.06)`);
      ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1)p.vx*=-1;
        if(p.y<0||p.y>1)p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x*w,p.y*h,p.rad,0,Math.PI*2);
        ctx.fillStyle=`rgba(${r},${g},${b},${p.a})`;
        ctx.fill();
      });
      const thresh = Math.min(w,h)*.18;
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b2=>{
        const d=Math.hypot((a.x-b2.x)*w,(a.y-b2.y)*h);
        if(d<thresh){
          ctx.beginPath(); ctx.moveTo(a.x*w,a.y*h); ctx.lineTo(b2.x*w,b2.y*h);
          ctx.strokeStyle=`rgba(${r},${g},${b},${.05*(1-d/thresh)})`;
          ctx.lineWidth=.5; ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [item.accent, item.height]);

  return (
    <div className="gl-placeholder" style={{height:item.height,position:"relative",overflow:"hidden"}}>
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}} />
      {/* center icon */}
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none"}}>
        <div style={{width:52,height:52,borderRadius:16,border:`1px solid ${item.accent}30`,background:`${item.accent}0D`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
          🖼️
        </div>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:`${item.accent}80`,letterSpacing:".1em"}}>PHOTO</span>
      </div>
    </div>
  );
}

// ─── GALLERY ITEM ─────────────────────────────────────────────────────────────
function GalleryItem({ item, onClick, index }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const tag = TAG_STYLES[item.category] || TAG_STYLES.Meetup;

  return (
    <div
      className="gl-item"
      onClick={() => onClick(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderColor: hov ? `${item.accent}35` : "rgba(255,255,255,.05)",
        boxShadow: hov ? `0 18px 48px ${item.accent}18, 0 0 0 1px ${item.accent}18` : "none",
        animationDelay: `${(index % 6) * 0.06}s`,
        animation: "slideUp .5s ease-out both",
      }}
    >
      {imgErr ? (
        <PlaceholderCard item={item} />
      ) : (
        <img
          className="gl-item-img"
          src={item.src}
          alt={item.caption}
          style={{ height: item.height }}
          onError={() => setImgErr(true)}
          loading="lazy"
        />
      )}

      {/* overlay */}
      <div className="gl-item-overlay">
        <div
          className="gl-item-tag"
          style={{ color: tag.color, background: tag.bg, borderColor: tag.border }}
        >
          {item.category}
        </div>
        <div className="gl-item-caption">{item.caption}</div>
        <div className="gl-item-sub">{item.event}</div>
      </div>

      {/* expand icon */}
      <div className="gl-item-expand">
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </div>
    </div>
  );
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];
  const [imgErr, setImgErr] = useState(false);
  const tag = TAG_STYLES[item.category] || TAG_STYLES.Meetup;

  // keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="gl-lightbox-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="gl-lightbox-box">
        <button className="gl-lightbox-close" onClick={onClose}>✕</button>

        <button className="gl-lightbox-nav gl-lightbox-prev" onClick={onPrev}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button className="gl-lightbox-nav gl-lightbox-next" onClick={onNext}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>

        {imgErr ? (
          <div style={{width:"100%",height:420,borderRadius:20,border:"1px solid rgba(255,255,255,.08)",background:"#0A1628",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48}}>🖼️</div>
        ) : (
          <img
            key={item.src}
            className="gl-lightbox-img"
            src={item.src}
            alt={item.caption}
            onError={() => setImgErr(true)}
          />
        )}

        <div className="gl-lightbox-info">
          <div>
            <div
              style={{
                display:"inline-flex",alignItems:"center",gap:5,
                padding:"3px 10px",borderRadius:999,
                fontSize:10,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".08em",
                color:tag.color,background:tag.bg,border:`1px solid ${tag.border}`,
                marginBottom:6,
              }}
            >{item.category}</div>
            <div className="gl-lightbox-caption">{item.caption}</div>
            <div className="gl-lightbox-meta" style={{marginTop:4}}>{item.event}</div>
          </div>
          <div className="gl-lightbox-counter">{index + 1} / {items.length}</div>
        </div>
      </div>
    </div>
  );
}

// ─── HERO CANVAS ─────────────────────────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      const p = canvas.parentElement;
      canvas.width = p.clientWidth; canvas.height = p.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
    const pts = Array.from({length:40},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.00032, vy:(Math.random()-.5)*.00032,
      r:Math.random()*1.3+.4, a:Math.random()*.3+.08,
    }));
    const draw = () => {
      const w=canvas.width, h=canvas.height;
      ctx.clearRect(0,0,w,h);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1)p.vx*=-1; if(p.y<0||p.y>1)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x*w,p.y*h,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,238,255,${p.a})`; ctx.fill();
      });
      const thresh=Math.min(w,h)*.1;
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
        const d=Math.hypot(a.x*w-b.x*w,a.y*h-b.y*h);
        if(d<thresh){ctx.beginPath();ctx.moveTo(a.x*w,a.y*h);ctx.lineTo(b.x*w,b.y*h);ctx.strokeStyle=`rgba(0,238,255,${.04*(1-d/thresh)})`;ctx.lineWidth=.4;ctx.stroke();}
      }));
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{cancelAnimationFrame(raf);ro.disconnect();};
  },[]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",display:"block"}} />;
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Gallery() {
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [lightbox, setLightbox] = useState(null); // filtered index

  const filtered = GALLERY_ITEMS.filter(item =>
    (filter === "All" || item.category === filter) &&
    (!search || item.caption.toLowerCase().includes(search.toLowerCase()) || item.event.toLowerCase().includes(search.toLowerCase()))
  );

  const openLightbox  = useCallback((item) => setLightbox(filtered.indexOf(item)), [filtered]);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto     = useCallback(() => setLightbox(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const nextPhoto     = useCallback(() => setLightbox(i => (i + 1) % filtered.length), [filtered.length]);

  return (
    <div style={{ minHeight:"100vh", background:"#050D1A", fontFamily:"'DM Sans', sans-serif", overflowX:"hidden", width:"100%" }}>
      <GlobalStyles />
      <Navbar />

      {/* ── HERO ── */}
      <section className="gl-hero te-grid-bg">
        <HeroCanvas />
        <div style={{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)",width:"min(600px,80vw)",height:"min(600px,80vw)",borderRadius:"50%",background:"rgba(79,70,229,.09)",filter:"blur(110px)",pointerEvents:"none"}} />
        <div style={{position:"absolute",bottom:"20%",right:"8%",width:"min(280px,38vw)",height:"min(280px,38vw)",borderRadius:"50%",background:"rgba(0,238,255,.05)",filter:"blur(80px)",pointerEvents:"none"}} />

        <div style={{position:"relative",zIndex:10,textAlign:"center"}}>
          <div className="gl-f1">
            <div className="gl-hero-pill">
              <span className="gl-hero-pill-dot" />
              <span className="gl-hero-pill-text">MOMENTS · MEMORIES · COMMUNITY</span>
            </div>
          </div>
          <h1 className="gl-hero-h1 gl-f2">
            Our Story in<br />
            <span className="shimmer-text">Frames</span>
          </h1>
          <p className="gl-hero-sub gl-f3">
            A visual journey through every hackathon, meetup, workshop, and collaboration that has shaped the TechEra community.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="gl-stats gl-f4" style={{marginTop:32}}>
        {STATS.map(s => (
          <div key={s.label} className="gl-stat-card">
            <div className="gl-stat-val">{s.value}</div>
            <div className="gl-stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── STICKY FILTER BAR ── */}
      <div className="gl-filter-bar" style={{marginTop:24}}>
        <div className="gl-filter-inner">
          <div className="gl-filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`gl-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
            <span style={{color:"#475569",fontSize:12,fontFamily:"'JetBrains Mono',monospace",alignSelf:"center",marginLeft:4}}>
              {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="gl-search-wrap">
            <span className="gl-search-icon">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input
              className="gl-search"
              placeholder="Search photos…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── MASONRY GALLERY ── */}
      <div className="gl-section">
        {filtered.length === 0 ? (
          <div className="gl-empty">
            <div style={{fontSize:40,marginBottom:12}}>🔍</div>
            <div style={{fontSize:16,fontWeight:700,color:"#64748B",marginBottom:6}}>No photos found</div>
            <div style={{fontSize:13}}>Try a different filter or search</div>
          </div>
        ) : (
          <div className="gl-masonry">
            {filtered.map((item, i) => (
              <GalleryItem key={item.id} item={item} index={i} onClick={openLightbox} />
            ))}
          </div>
        )}
      </div>

      {/* ── CTA STRIP ── */}
      <div className="gl-cta-strip">
        <div className="gl-cta-inner">
          {/* corner accents */}
          {[
            {top:0,left:0,borderTop:"2px solid rgba(0,238,255,.14)",borderLeft:"2px solid rgba(0,238,255,.14)",borderRadius:"24px 0 0 0"},
            {top:0,right:0,borderTop:"2px solid rgba(79,70,229,.14)",borderRight:"2px solid rgba(79,70,229,.14)",borderRadius:"0 24px 0 0"},
            {bottom:0,left:0,borderBottom:"2px solid rgba(79,70,229,.14)",borderLeft:"2px solid rgba(79,70,229,.14)",borderRadius:"0 0 0 24px"},
            {bottom:0,right:0,borderBottom:"2px solid rgba(0,238,255,.14)",borderRight:"2px solid rgba(0,238,255,.14)",borderRadius:"0 0 24px 0"},
          ].map((s,i)=><div key={i} style={{position:"absolute",width:52,height:52,...s}} />)}

          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(0,238,255,.04) 1px,transparent 1px)",backgroundSize:"24px 24px",pointerEvents:"none"}} />

          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 18px",borderRadius:999,border:"1px solid rgba(0,238,255,.2)",background:"rgba(0,238,255,.05)",marginBottom:18}}>
              <span style={{position:"absolute",width:8,height:8,borderRadius:"50%",background:"#00EEFF",opacity:.42,animation:"pingAnim 1.9s cubic-bezier(0,0,0.2,1) infinite"}} />
              <span style={{width:8,height:8,borderRadius:"50%",background:"#00EEFF",display:"inline-block",flexShrink:0}} />
              <span style={{color:"#00EEFF",fontSize:11,fontWeight:700,letterSpacing:".15em",fontFamily:"'JetBrains Mono',monospace",marginLeft:8}}>BE PART OF THE STORY</span>
            </div>
            <h2 className="gl-cta-h2">
              Your Photo Could<br />
              <span style={{background:"linear-gradient(135deg,#00EEFF,#4F46E5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Be Right Here</span>
            </h2>
            <p className="gl-cta-sub">
              Join TechEra events and become part of a community that builds, connects, and creates memories worth sharing.
            </p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <a href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO" className="gl-cta-btn" target="_blank" rel="noreferrer">
                Join TechEra
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="/events" className="gl-cta-btn-sec">
                Explore Events
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <Lightbox
          items={filtered}
          index={lightbox}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
}
