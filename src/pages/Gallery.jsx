import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

    @keyframes shimmer   { 0%{background-position:0% center}100%{background-position:200% center} }
    @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
    @keyframes te-glow   { 0%,100%{opacity:.45}50%{opacity:1} }
    @keyframes fadeIn    { from{opacity:0}to{opacity:1} }
    @keyframes scaleIn   { from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)} }
    @keyframes pingAnim  { 75%,100%{transform:scale(2.1);opacity:0} }
    @keyframes bentoIn   { from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)} }

    .gl-f1{animation:fadeUp .55s ease-out .08s both}
    .gl-f2{animation:fadeUp .55s ease-out .2s both}
    .gl-f3{animation:fadeUp .55s ease-out .32s both}
    .gl-f4{animation:fadeUp .55s ease-out .44s both}

    .shimmer-text{
      background:linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%);
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      animation:shimmer 4s linear infinite;
    }

    /* ── FONT ALIASES ── */
    .te-display{font-family:'Syne',sans-serif!important}
    .te-mono   {font-family:'JetBrains Mono',monospace!important}
    .te-body   {font-family:'DM Sans',sans-serif!important}

    /* ── GRID BG ── */
    .te-grid-bg{
      background-image:
        linear-gradient(rgba(0,238,255,.018) 1px,transparent 1px),
        linear-gradient(90deg,rgba(0,238,255,.018) 1px,transparent 1px);
      background-size:60px 60px;
    }

    /* ── HERO ── */
    .gl-hero{
      position:relative;min-height:50vh;width:100%;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      overflow:hidden;background:#050D1A;padding:100px 24px 28px;
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
      max-width:1240px;margin:0 auto;
      display:flex;align-items:center;justify-content:space-between;
      gap:14px;padding:14px 24px;flex-wrap:wrap;
    }
    .gl-filter-tabs{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
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
      border-radius:12px;padding:9px 14px 9px 38px;color:white;font-size:13px;
      font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;
    }
    .gl-search:focus{border-color:rgba(0,238,255,.3);}
    .gl-search::placeholder{color:#334155;}

    /* ════════════════════════════════════════
       BENTO GRID
    ════════════════════════════════════════ */
    .gl-section{max-width:1240px;margin:0 auto;padding:36px 24px 80px;}

    /* 
      Pattern repeats every 8 items:
      Row A: [2col tall] [1col] [1col]   → items 1,2,3
      Row B: [1col]     [1col] [2col]    → items 4,5,6
      Row C: [1col]     [2col] [1col]    → items 7,8,9
      Row D: [2col]     [1col] [1col]    → items 10,11,12
    */
    .gl-bento{
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:14px;
      width:100%;
    }

    /* ── base card ── */
    .gl-item{
      border-radius:20px;overflow:hidden;
      border:1px solid rgba(255,255,255,.05);
      background:#0A1628;
      cursor:pointer;
      position:relative;
      transition:transform .38s cubic-bezier(.23,1,.32,1), border-color .35s, box-shadow .35s;
      will-change:transform;
      min-height:200px;
    }
    .gl-item:hover{transform:translateY(-5px) scale(1.012);}
    .gl-item-img{
      width:100%;height:100%;display:block;
      object-fit:cover;
      transition:transform .45s cubic-bezier(.23,1,.32,1),filter .45s;
      filter:saturate(.85) brightness(.9);
      position:absolute;inset:0;
    }
    .gl-item:hover .gl-item-img{transform:scale(1.07);filter:saturate(1.1) brightness(1);}
    .gl-item-overlay{
      position:absolute;inset:0;
      background:linear-gradient(to top, rgba(5,13,26,.9) 0%, rgba(5,13,26,.3) 55%, transparent 100%);
      opacity:0;transition:opacity .35s;
      display:flex;flex-direction:column;justify-content:flex-end;padding:16px;
    }
    .gl-item:hover .gl-item-overlay{opacity:1;}

    /* always-visible minimal label on tall cards */
    .gl-item-badge{
      position:absolute;top:12px;left:12px;
      display:inline-flex;align-items:center;gap:5px;
      padding:3px 10px;border-radius:999px;font-size:10px;font-weight:700;
      font-family:'JetBrains Mono',monospace;letter-spacing:.08em;
      border:1px solid;backdrop-filter:blur(6px);
      pointer-events:none;
      transition:opacity .3s;
    }
    .gl-item:hover .gl-item-badge{opacity:0;}

    .gl-item-tag{
      display:inline-flex;align-items:center;gap:5px;
      padding:3px 10px;border-radius:999px;font-size:10px;font-weight:700;
      font-family:'JetBrains Mono',monospace;letter-spacing:.08em;
      border:1px solid;width:fit-content;margin-bottom:7px;
    }
    .gl-item-caption{color:white;font-size:13px;font-weight:700;font-family:'Syne',sans-serif;line-height:1.35;}
    .gl-item-sub{color:rgba(255,255,255,.5);font-size:11px;margin-top:3px;font-family:'DM Sans',sans-serif;}
    .gl-item-expand{
      position:absolute;top:12px;right:12px;
      width:32px;height:32px;border-radius:9px;
      background:rgba(5,13,26,.7);border:1px solid rgba(255,255,255,.12);
      display:flex;align-items:center;justify-content:center;
      color:white;opacity:0;transition:opacity .3s;backdrop-filter:blur(6px);
    }
    .gl-item:hover .gl-item-expand{opacity:1;}

    /* ── BENTO SPAN CLASSES ── */
    /* col spans */
    .span-c2{grid-column:span 2;}
    .span-c3{grid-column:span 3;}
    .span-c4{grid-column:span 4;}
    /* row spans */
    .span-r2{grid-row:span 2;}
    /* fixed heights for non-spanning cards */
    .h-sm{height:200px;}
    .h-md{height:240px;}
    .h-lg{height:310px;}
    /* tall card (span-r2) needs explicit height */
    .span-r2{height:100%;min-height:414px;}  /* 2×200 + gap */

    /* ── BENTO ANIMATION ── */
    .gl-item{animation:bentoIn .5s ease-out both;}

    /* ── PLACEHOLDER ── */
    .gl-placeholder{position:absolute;inset:0;width:100%;height:100%;}



    /* ── EMPTY STATE ── */
    .gl-empty{text-align:center;padding:72px 24px;color:#475569;}

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
      border:1px solid rgba(255,255,255,.08);display:block;
      box-shadow:0 40px 120px rgba(0,0,0,.7);max-height:75vh;object-fit:contain;
    }
    .gl-lightbox-close{
      position:absolute;top:-14px;right:-14px;
      width:40px;height:40px;border-radius:12px;
      background:#0A1628;border:1px solid rgba(255,255,255,.12);
      color:#94A3B8;font-size:18px;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      transition:color .2s,border-color .2s;
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
      margin-top:14px;padding:14px 20px;
      border-radius:14px;border:1px solid rgba(255,255,255,.06);
      background:#0A1628;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
    }
    .gl-lightbox-caption{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:white;}
    .gl-lightbox-meta{font-family:'JetBrains Mono',monospace;font-size:11px;color:#475569;margin-top:3px;}
    .gl-lightbox-counter{
      padding:4px 12px;border-radius:999px;font-size:11px;font-weight:700;color:#00EEFF;
      border:1px solid rgba(0,238,255,.2);background:rgba(0,238,255,.07);
      font-family:'JetBrains Mono',monospace;white-space:nowrap;flex-shrink:0;
    }

    /* ── CTA STRIP ── */
    .gl-cta-strip{max-width:1240px;margin:0 auto;padding:0 24px 80px;}
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
      text-decoration:none;transition:transform .28s,box-shadow .28s;font-family:'DM Sans',sans-serif;border:none;cursor:pointer;
    }
    .gl-cta-btn:hover{transform:scale(1.05);box-shadow:0 0 38px rgba(0,238,255,.4);}
    .gl-cta-btn-sec{
      display:inline-flex;align-items:center;gap:8px;
      padding:13px 28px;border-radius:14px;font-weight:600;font-size:15px;
      color:#00EEFF;border:1px solid rgba(0,238,255,.3);background:rgba(0,238,255,.05);
      text-decoration:none;transition:transform .28s,border-color .28s,background .28s;font-family:'DM Sans',sans-serif;
    }
    .gl-cta-btn-sec:hover{transform:scale(1.04);border-color:rgba(0,238,255,.6);background:rgba(0,238,255,.1);}

    /* ════════════════════════════════════════
       RESPONSIVE
    ════════════════════════════════════════ */

    /* Tablet: 768–1023px → 3 columns */
    @media(max-width:1023px){
      .gl-bento{grid-template-columns:repeat(3,1fr);}
      .span-c2{grid-column:span 2;}
      .span-c3{grid-column:span 3;}
      .span-c4{grid-column:span 3;}
      .gl-stats{grid-template-columns:repeat(4,1fr);}
      .gl-lightbox-prev{left:-48px;}
      .gl-lightbox-next{right:-48px;}
    }

    /* Mobile large: 600–767px → 2 columns */
    @media(max-width:767px){
      .gl-bento{grid-template-columns:repeat(2,1fr);gap:10px;}
      .span-c2{grid-column:span 2;}
      .span-c3,.span-c4{grid-column:span 2;}
      .span-r2{min-height:320px;}
      .h-sm{height:160px;}
      .h-md{height:190px;}
      .h-lg{height:240px;}
      .gl-lightbox-prev,.gl-lightbox-next{display:none;}
      .gl-filter-inner{flex-direction:column;align-items:flex-start;gap:10px;}
      .gl-search-wrap{width:100%;}
      .gl-section{padding:28px 14px 60px;}
      .gl-stats{padding:0 14px;}
      .gl-cta-strip{padding:0 14px 60px;}
      .gl-hero{padding:90px 14px 40px;}
      .gl-filter-bar{top:56px;}
    }

    /* Mobile small: < 480px → 2 columns still, tighter */
    @media(max-width:479px){
      .gl-bento{grid-template-columns:repeat(2,1fr);gap:8px;}
      .span-c2{grid-column:span 2;}
      .span-c3,.span-c4{grid-column:span 2;}
      .span-r2{min-height:280px;}
      .h-sm{height:140px;}
      .h-md{height:165px;}
      .h-lg{height:210px;}

      .gl-lightbox-box{padding:0 4px;}
      .gl-lightbox-close{top:8px;right:8px;}
      .gl-lightbox-info{flex-direction:column;gap:8px;}
      .gl-filter-tabs{gap:6px;}
      .gl-filter-btn{padding:6px 13px;font-size:11px;}
    }
  `}</style>
);

// ─── GALLERY DATA ─────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  // ── Developers Meetup 2026 ──
  { id:1,  src:"public/event_images/developers_meetup1.jpeg",  caption:"Opening Keynote",          event:"Developers Meetup 2026",  category:"Meetup",   accent:"#00EEFF" },
  { id:2,  src:"public/event_images/developers_meetup2.jpeg",  caption:"Networking Session",        event:"Developers Meetup 2026",  category:"Meetup",   accent:"#00EEFF" },
  { id:3,  src:"public/event_images/developers_meetup3.jpeg",  caption:"Speaker 1 — Q&A",           event:"Developers Meetup 2026",  category:"Meetup",   accent:"#00EEFF" },
  { id:4,  src:"public/event_images/developers_meetup4.jpeg",  caption:"Group Activity",            event:"Developers Meetup 2026",  category:"Meetup",   accent:"#00EEFF" },
  { id:5,  src:"public/event_images/developers_meetup5.jpeg",  caption:"Speaker 2 on Stage",        event:"Developers Meetup 2026",  category:"Meetup",   accent:"#00EEFF" },
  { id:6,  src:"public/event_images/developers_meetup6.jpeg",  caption:"Group Photo",               event:"Developers Meetup 2026",  category:"Meetup",   accent:"#00EEFF" },
  { id:7,  src:"public/event_images/developers_meetup7.jpeg",  caption:"Competition Segment",       event:"Developers Meetup 2026",  category:"Meetup",   accent:"#00EEFF" },
  { id:8,  src:"public/event_images/developers_meetup8.jpeg",  caption:"Lunch & Networking",        event:"Developers Meetup 2026",  category:"Meetup",   accent:"#00EEFF" },
  // ── CV to Career Workshop ──
  { id:9,  src:"public/event_images/developers_meetup9.jpeg", caption:"Our team",          event:"Developers Meetup 2026",  category:"Meetup", accent:"#00EEFF" },
  { id:10, src:"public/event_images/developers_meetup10.jpeg", caption:"Speaker honouring",  event:"Developers Meetup 2026",  category:"Meetup", accent:"#00EEFF" },
  { id:11, src:"public/event_images/developers_meetup11.jpg", caption:"Venue",  event:"Developers Meetup 2026",  category:"Meetup", accent:"#00EEFF" },
  // ── Collaborations ──
  { id:12, src:"public/event_images/developers_meetup12.jpg", caption:"Speaker 3 on stage",  event:"Developers Meetup 2026",  category:"Meetup", accent:"#00EEFF" },
  { id:13, src:"public/event_images/developers_meetup13.jpg", caption:"Doubt session",  event:"Developers Meetup 2026",  category:"Meetup", accent:"#00EEFF" },
  { id:14, src:"public/event_images/developers_meetup14.jpg", caption:"Game Arena",  event:"Developers Meetup 2026",  category:"Meetup", accent:"#00EEFF" },
  { id:15, src:"public/event_images/developers_meetup15.jpg", caption:"Participants pitching",  event:"Developers Meetup 2026",  category:"Meetup", accent:"#00EEFF" },
  { id:16, src:"public/event_images/developers_meetup16.jpg", caption:"Our Winners",  event:"Developers Meetup 2026",  category:"Meetup", accent:"#00EEFF" },
  { id:17, src:"/images/gallery/collab-6.jpg",  caption:"Hyperspace Hackathon",      event:"Hyperspace Hackathon",   category:"Collabs",  accent:"#818CF8" },
  { id:18, src:"/images/gallery/collab-7.jpg",  caption:"AI For All — Microsoft",    event:"AI For All",             category:"Collabs",  accent:"#38BDF8" },
  { id:19, src:"/images/gallery/collab-8.jpg",  caption:"SHIFT2K25 Pre-Meetup",      event:"SHIFT2K25",              category:"Collabs",  accent:"#34D399" },
  { id:20, src:"/images/gallery/collab-9.jpg",  caption:"NERDZ'26 @ Jamia Hamdard", event:"NERDZ'26",               category:"Collabs",  accent:"#F472B6" },
  // ── Behind the Scenes ──
  { id:21, src:"/images/gallery/bts-1.jpg",     caption:"Team Briefing — Pre-event", event:"Behind the Scenes",      category:"BTS",      accent:"#4F46E5" },
  { id:22, src:"/images/gallery/bts-2.jpg",     caption:"Setting Up the Venue",      event:"Behind the Scenes",      category:"BTS",      accent:"#4F46E5" },
  { id:23, src:"/images/gallery/bts-3.jpg",     caption:"Organiser Team",            event:"Behind the Scenes",      category:"BTS",      accent:"#4F46E5" },
];

const FILTERS = ["All", "Meetup", "Workshop", "Collabs", "BTS"];

const TAG_STYLES = {
  Meetup:   { color:"#00EEFF", bg:"rgba(0,238,255,.1)",    border:"rgba(0,238,255,.25)"   },
  Workshop: { color:"#4ADE80", bg:"rgba(74,222,128,.1)",   border:"rgba(74,222,128,.25)"  },
  Collabs:  { color:"#A78BFA", bg:"rgba(167,139,250,.1)",  border:"rgba(167,139,250,.25)" },
  BTS:      { color:"#4F46E5", bg:"rgba(79,70,229,.1)",    border:"rgba(79,70,229,.25)"   },
};

// ─── BENTO LAYOUT PATTERN ─────────────────────────────────────────────────────
// Repeating 6-item blocks:
// [wide-tall] [sm] [sm]   (row pair)
//             [sm] [sm]
// [sm] [sm]   [wide]
// [sm] [wide]      [sm]
const BENTO_PATTERN = [
  // block A (items 0-5)
  { colSpan:"span-c2", rowSpan:"span-r2", sizeClass:""      }, // 0 — wide tall
  { colSpan:"",        rowSpan:"",        sizeClass:"h-sm"  }, // 1
  { colSpan:"",        rowSpan:"",        sizeClass:"h-sm"  }, // 2
  { colSpan:"",        rowSpan:"",        sizeClass:"h-sm"  }, // 3
  { colSpan:"",        rowSpan:"",        sizeClass:"h-sm"  }, // 4
  // block B (items 5-10)
  { colSpan:"",        rowSpan:"",        sizeClass:"h-md"  }, // 5
  { colSpan:"span-c2", rowSpan:"",        sizeClass:"h-md"  }, // 6 — wide
  { colSpan:"span-c2", rowSpan:"",        sizeClass:"h-md"  }, // 7 — wide
  { colSpan:"",        rowSpan:"",        sizeClass:"h-md"  }, // 8
  // block C (items 9-...)
  { colSpan:"",        rowSpan:"span-r2", sizeClass:""      }, // 9 — tall
  { colSpan:"span-c2", rowSpan:"",        sizeClass:"h-sm"  }, // 10 — wide
  { colSpan:"",        rowSpan:"",        sizeClass:"h-sm"  }, // 11
  { colSpan:"",        rowSpan:"",        sizeClass:"h-sm"  }, // 12
  { colSpan:"span-c2", rowSpan:"",        sizeClass:"h-md"  }, // 13 — wide
];

function getBentoClass(index) {
  return BENTO_PATTERN[index % BENTO_PATTERN.length];
}

// ─── PLACEHOLDER CANVAS ───────────────────────────────────────────────────────
function PlaceholderCard({ accent }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const r = parseInt(accent.slice(1,3),16);
    const g = parseInt(accent.slice(3,5),16);
    const b = parseInt(accent.slice(5,7),16);
    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width  = p.clientWidth;
      canvas.height = p.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    const pts = Array.from({length:16},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.0004, vy:(Math.random()-.5)*.0004,
      rad:Math.random()*1.2+.5, a:Math.random()*.22+.06,
    }));
    const draw = () => {
      const w=canvas.width, h=canvas.height;
      if(!w||!h){raf=requestAnimationFrame(draw);return;}
      ctx.clearRect(0,0,w,h);
      const grd=ctx.createLinearGradient(0,0,w,h);
      grd.addColorStop(0,"#0A1628");
      grd.addColorStop(1,`rgba(${r},${g},${b},.07)`);
      ctx.fillStyle=grd; ctx.fillRect(0,0,w,h);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1)p.vx*=-1; if(p.y<0||p.y>1)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x*w,p.y*h,p.rad,0,Math.PI*2);
        ctx.fillStyle=`rgba(${r},${g},${b},${p.a})`; ctx.fill();
      });
      const thresh=Math.min(w,h)*.2;
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b2=>{
        const d=Math.hypot((a.x-b2.x)*w,(a.y-b2.y)*h);
        if(d<thresh){
          ctx.beginPath();ctx.moveTo(a.x*w,a.y*h);ctx.lineTo(b2.x*w,b2.y*h);
          ctx.strokeStyle=`rgba(${r},${g},${b},${.05*(1-d/thresh)})`;ctx.lineWidth=.5;ctx.stroke();
        }
      }));
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{cancelAnimationFrame(raf);ro.disconnect();};
  },[accent]);

  return (
    <div className="gl-placeholder">
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}} />
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,pointerEvents:"none"}}>
        <div style={{width:44,height:44,borderRadius:13,border:`1px solid ${accent}30`,background:`${accent}0D`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🖼️</div>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:`${accent}70`,letterSpacing:".1em"}}>PHOTO</span>
      </div>
    </div>
  );
}

// ─── GALLERY ITEM ─────────────────────────────────────────────────────────────
function GalleryItem({ item, onClick, bentoConfig, animDelay }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const tag = TAG_STYLES[item.category] || TAG_STYLES.Meetup;
  const { colSpan, rowSpan, sizeClass } = bentoConfig;

  return (
    <div
      className={`gl-item ${colSpan} ${rowSpan} ${sizeClass}`}
      onClick={() => onClick(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderColor: hov ? `${item.accent}35` : "rgba(255,255,255,.05)",
        boxShadow: hov ? `0 18px 48px ${item.accent}18, 0 0 0 1px ${item.accent}18` : "none",
        animationDelay: `${animDelay}s`,
      }}
    >
      {imgErr ? (
        <PlaceholderCard accent={item.accent} />
      ) : (
        <img
          className="gl-item-img"
          src={item.src}
          alt={item.caption}
          onError={() => setImgErr(true)}
          loading="lazy"
        />
      )}

      {/* always-visible badge */}
      <div
        className="gl-item-badge"
        style={{ color:tag.color, background:tag.bg, borderColor:tag.border }}
      >
        {item.category}
      </div>

      {/* hover overlay */}
      <div className="gl-item-overlay">
        <div className="gl-item-tag" style={{color:tag.color,background:tag.bg,borderColor:tag.border}}>
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

  useEffect(() => {
    setImgErr(false);
  }, [index]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
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
          <img key={item.src} className="gl-lightbox-img" src={item.src} alt={item.caption} onError={() => setImgErr(true)} />
        )}

        <div className="gl-lightbox-info">
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:999,fontSize:10,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".08em",color:tag.color,background:tag.bg,border:`1px solid ${tag.border}`,marginBottom:6}}>{item.category}</div>
            <div className="gl-lightbox-caption">{item.caption}</div>
            <div className="gl-lightbox-meta">{item.event}</div>
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
    const pts = Array.from({length:36},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.00030, vy:(Math.random()-.5)*.00030,
      r:Math.random()*1.3+.4, a:Math.random()*.28+.07,
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
  const [filter, setFilter]     = useState("All");
  const [search, setSearch]     = useState("");
  const [lightbox, setLightbox] = useState(null);

  const filtered = GALLERY_ITEMS.filter(item =>
    (filter === "All" || item.category === filter) &&
    (!search || item.caption.toLowerCase().includes(search.toLowerCase()) || item.event.toLowerCase().includes(search.toLowerCase()))
  );

  const openLightbox  = useCallback((item) => setLightbox(filtered.indexOf(item)), [filtered]);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto     = useCallback(() => setLightbox(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const nextPhoto     = useCallback(() => setLightbox(i => (i + 1) % filtered.length), [filtered.length]);

  return (
    <div style={{minHeight:"100vh",background:"#050D1A",fontFamily:"'DM Sans',sans-serif",overflowX:"hidden",width:"100%"}}>
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

      {/* ── STICKY FILTER BAR ── */}
      <div className="gl-filter-bar">
        <div className="gl-filter-inner">
          <div className="gl-filter-tabs">
            {FILTERS.map(f => (
              <button key={f} className={`gl-filter-btn${filter===f?" active":""}`} onClick={()=>setFilter(f)}>{f}</button>
            ))}
            <span style={{color:"#475569",fontSize:12,fontFamily:"'JetBrains Mono',monospace",alignSelf:"center",marginLeft:4}}>
              {filtered.length} photo{filtered.length!==1?"s":""}
            </span>
          </div>
          <div className="gl-search-wrap">
            <span className="gl-search-icon">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input className="gl-search" placeholder="Search photos…" value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* ── BENTO GALLERY ── */}
      <div className="gl-section">
        {filtered.length === 0 ? (
          <div className="gl-empty">
            <div style={{fontSize:40,marginBottom:12}}>🔍</div>
            <div style={{fontSize:16,fontWeight:700,color:"#64748B",marginBottom:6}}>No photos found</div>
            <div style={{fontSize:13}}>Try a different filter or search</div>
          </div>
        ) : (
          <div className="gl-bento">
            {filtered.map((item, i) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={i}
                onClick={openLightbox}
                bentoConfig={getBentoClass(i)}
                animDelay={(i % 9) * 0.055}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── CTA STRIP ── */}
      <div className="gl-cta-strip">
        <div className="gl-cta-inner">
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
            <p className="gl-cta-sub">Join TechEra events and become part of a community that builds, connects, and creates memories worth sharing.</p>
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

      {lightbox !== null && (
        <Lightbox items={filtered} index={lightbox} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />
      )}
    </div>
  );
}