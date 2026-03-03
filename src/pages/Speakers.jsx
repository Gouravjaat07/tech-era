// import { useState, useRef, useEffect } from "react";
// import Navbar from "../components/Navbar";

// // ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
// const GlobalStyles = () => (
//   <style>{`
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

//     @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

//     @keyframes shimmer       { 0%{background-position:0% center}100%{background-position:200% center} }
//     @keyframes pulseGlow     { 0%,100%{opacity:.4}50%{opacity:1} }
//     @keyframes slideUp       { from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)} }
//     @keyframes floatY        { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
//     @keyframes rotateSlow    { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
//     @keyframes scanLine      { 0%{top:-2px}100%{top:100%} }
//     @keyframes countUp       { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
//     @keyframes gradientShift { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
//     @keyframes orbitDot      { 0%{transform:rotate(0deg) translateX(52px) rotate(0deg)}100%{transform:rotate(360deg) translateX(52px) rotate(-360deg)} }
//     @keyframes orbitDot2     { 0%{transform:rotate(180deg) translateX(52px) rotate(-180deg)}100%{transform:rotate(540deg) translateX(52px) rotate(-540deg)} }

//     .spk-page { font-family:'Manrope',system-ui,sans-serif; background:#050D1A; color:white; min-height:100vh; }

//     .shimmer-text {
//       background:linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%);
//       background-size:200% auto;
//       -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
//       animation:shimmer 4s linear infinite;
//     }
//     .grad-text {
//       background:linear-gradient(135deg,#00EEFF,#4F46E5);
//       -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
//     }

//     /* ─── HERO ─── */
//     .spk-hero {
//       position:relative; overflow:hidden;
//       padding:clamp(90px,12vw,130px) clamp(16px,4vw,28px) clamp(60px,8vw,90px);
//     }
//     .spk-hero-bg {
//       position:absolute; inset:0; pointer-events:none; z-index:0;
//       background:radial-gradient(ellipse 80% 55% at 60% 30%,rgba(167,139,250,.07) 0%,transparent 65%),
//                  radial-gradient(ellipse 50% 40% at 15% 80%,rgba(79,70,229,.07) 0%,transparent 55%),
//                  #050D1A;
//     }
//     .spk-hero-grid {
//       position:absolute; inset:0; pointer-events:none;
//       background-image:linear-gradient(rgba(167,139,250,.022) 1px,transparent 1px),
//                        linear-gradient(90deg,rgba(167,139,250,.022) 1px,transparent 1px);
//       background-size:60px 60px;
//     }
//     .spk-hero-inner {
//       position:relative; z-index:1;
//       max-width:1200px; margin:0 auto;
//       display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,60px); align-items:center;
//     }
//     .spk-hero-left  { animation:slideUp .7s ease-out both; }
//     .spk-hero-right { animation:slideUp .7s .15s ease-out both; }

//     .spk-eyebrow {
//       display:inline-flex; align-items:center; gap:8px;
//       padding:5px 16px; border-radius:999px;
//       border:1px solid rgba(167,139,250,.25); background:rgba(167,139,250,.07);
//       font-size:11px; font-weight:700; letter-spacing:.2em; color:#A78BFA;
//       font-family:'Space Mono',monospace; margin-bottom:20px;
//     }
//     .spk-hero-title {
//       font-family:'Syne',sans-serif;
//       font-size:clamp(30px,5.5vw,68px);
//       font-weight:900; line-height:1.02; letter-spacing:-.03em;
//       color:white; margin-bottom:18px;
//     }
//     .spk-hero-sub {
//       color:#64748B; font-size:clamp(14px,1.6vw,16px); line-height:1.8; margin-bottom:32px;
//     }
//     .spk-cta-row { display:flex; gap:12px; flex-wrap:wrap; }
//     .spk-cta-primary {
//       display:inline-flex; align-items:center; gap:9px;
//       padding:14px clamp(18px,3vw,32px); border-radius:14px;
//       font-weight:800; font-size:clamp(13px,1.5vw,15px); color:#050D1A;
//       background:linear-gradient(135deg,#A78BFA,#4F46E5);
//       border:none; cursor:pointer;
//       transition:transform .25s,box-shadow .25s,filter .25s;
//       font-family:'Manrope',sans-serif; text-decoration:none; white-space:nowrap;
//     }
//     .spk-cta-primary:hover { transform:scale(1.05); box-shadow:0 0 48px rgba(167,139,250,.4); filter:brightness(1.08); }
//     .spk-cta-secondary {
//       display:inline-flex; align-items:center; gap:8px;
//       padding:13px clamp(14px,2.5vw,24px); border-radius:14px;
//       font-weight:700; font-size:clamp(12px,1.4vw,14px); color:#94A3B8;
//       border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.03);
//       cursor:pointer; transition:all .25s;
//       font-family:'Manrope',sans-serif; text-decoration:none; white-space:nowrap;
//     }
//     .spk-cta-secondary:hover { color:#A78BFA; border-color:rgba(167,139,250,.3); background:rgba(167,139,250,.05); }

//     /* Hero right — stat cards 2×2 */
//     .spk-hero-stats { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
//     .spk-stat-card {
//       padding:clamp(14px,2.5vw,22px); border-radius:16px;
//       border:1px solid rgba(255,255,255,.06); background:#0A1628;
//       position:relative; overflow:hidden;
//       transition:border-color .3s,transform .3s;
//     }
//     .spk-stat-card:hover { border-color:rgba(167,139,250,.2); transform:translateY(-3px); }
//     .spk-stat-card::before {
//       content:""; position:absolute; inset:0;
//       background:radial-gradient(circle at top left,rgba(167,139,250,.05),transparent 60%);
//       pointer-events:none;
//     }
//     .spk-stat-val {
//       font-family:'Space Mono',monospace;
//       font-size:clamp(20px,3vw,32px); font-weight:700; line-height:1; margin-bottom:5px;
//       animation:countUp .5s ease-out both;
//     }
//     .spk-stat-label { font-size:clamp(9px,1vw,11px); color:#475569; text-transform:uppercase; letter-spacing:.1em; font-family:'Space Mono',monospace; }

//     /* Alumni chips below hero stats */
//     .spk-alumni-bar {
//       margin-top:12px; padding:12px 14px; border-radius:12px;
//       border:1px solid rgba(167,139,250,.1); background:rgba(167,139,250,.04);
//       display:flex; align-items:center; gap:8px; flex-wrap:wrap;
//     }
//     .spk-alumni-label { font-size:10px; font-weight:700; color:#475569; font-family:'Space Mono',monospace; text-transform:uppercase; letter-spacing:.1em; flex-shrink:0; }
//     .spk-alumni-chip {
//       padding:3px 10px; border-radius:7px;
//       border:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.03);
//       font-size:11px; font-weight:700; color:#64748B; font-family:'Space Mono',monospace;
//     }

//     /* ─── SECTION WRAPPER ─── */
//     .spk-section { max-width:1200px; margin:0 auto; padding:0 clamp(16px,4vw,28px) clamp(52px,7vw,80px); }
//     .spk-section-head { text-align:center; margin-bottom:clamp(32px,5vw,56px); }
//     .spk-sec-eyebrow {
//       display:inline-flex; align-items:center; gap:8px;
//       padding:5px 16px; border-radius:999px;
//       font-size:11px; font-weight:700; letter-spacing:.2em;
//       font-family:'Space Mono',monospace; margin-bottom:14px;
//     }
//     .spk-sec-title {
//       font-family:'Syne',sans-serif;
//       font-size:clamp(22px,4vw,46px);
//       font-weight:900; color:white; letter-spacing:-.03em; line-height:1.08; margin-bottom:12px;
//     }
//     .spk-sec-sub { color:#64748B; font-size:clamp(13px,1.5vw,15px); line-height:1.75; max-width:500px; margin:0 auto; }

//     /* ─── DIVIDER ─── */
//     .spk-divider {
//       height:1px;
//       background:linear-gradient(90deg,transparent,rgba(167,139,250,.18),transparent);
//       max-width:1200px; margin:0 auto clamp(44px,6vw,72px);
//     }

//     /* ─── SPEAKER CARDS ─── */
//     .spk-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
//     .spk-card {
//       position:relative; border-radius:22px;
//       border:1px solid rgba(255,255,255,.06); background:#0A1628;
//       overflow:hidden;
//       transition:transform .4s cubic-bezier(.23,1,.32,1),border-color .4s,box-shadow .4s;
//     }
//     .spk-card:hover { transform:translateY(-8px); }
//     .spk-card-bar  { height:3px; width:100%; }
//     .spk-card-glow { position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .5s; }
//     .spk-card:hover .spk-card-glow { opacity:1; }
//     .spk-card-scan { position:absolute; left:0; right:0; height:1px; pointer-events:none; opacity:0; transition:opacity .3s; }
//     .spk-card:hover .spk-card-scan { opacity:1; animation:scanLine 3.5s linear infinite; }

//     .spk-avatar-wrap { display:flex; justify-content:center; padding:28px 20px 0; position:relative; }
//     .spk-avatar-ring {
//       position:absolute; top:16px; left:50%; transform:translateX(-50%);
//       width:106px; height:106px; border-radius:50%;
//       border:1px dashed; opacity:.22; transition:opacity .3s;
//     }
//     .spk-card:hover .spk-avatar-ring { opacity:.55; animation:rotateSlow 14s linear infinite; }
//     .spk-avatar {
//       width:82px; height:82px; border-radius:50%;
//       display:flex; align-items:center; justify-content:center;
//       font-family:'Space Mono',monospace; font-size:20px; font-weight:700;
//       position:relative; z-index:1; border:2px solid; flex-shrink:0;
//       transition:transform .35s,box-shadow .35s;
//     }
//     .spk-card:hover .spk-avatar { transform:translateY(-4px) scale(1.06); animation:floatY 3s ease-in-out infinite; }
//     .spk-orbit-dot  { position:absolute; width:7px; height:7px; border-radius:50%; top:50%; left:50%; margin:-3.5px 0 0 -3.5px; animation:orbitDot 3s linear infinite; }
//     .spk-orbit-dot2 { position:absolute; width:5px; height:5px; border-radius:50%; top:50%; left:50%; margin:-2.5px 0 0 -2.5px; animation:orbitDot2 5.5s linear infinite; }

//     .spk-card-body   { padding:16px clamp(14px,2.5vw,24px) 24px; text-align:center; }
//     .spk-event-tag   { display:inline-block; padding:3px 11px; border-radius:999px; font-size:10px; font-weight:700; font-family:'Space Mono',monospace; letter-spacing:.1em; margin-bottom:10px; border:1px solid; }
//     .spk-name        { font-family:'Syne',sans-serif; font-size:clamp(15px,2vw,19px); font-weight:900; color:white; letter-spacing:-.02em; margin-bottom:4px; }
//     .spk-role        { font-size:12px; color:#64748B; margin-bottom:12px; line-height:1.5; }
//     .spk-topic-label { font-size:10px; font-weight:700; color:#475569; font-family:'Space Mono',monospace; text-transform:uppercase; letter-spacing:.12em; margin-bottom:6px; }
//     .spk-topic-chip  { display:inline-block; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; font-family:'Space Mono',monospace; border:1px solid; margin-bottom:14px; }
//     .spk-quote       { position:relative; padding:12px 14px; border-radius:12px; border:1px solid rgba(255,255,255,.05); background:rgba(255,255,255,.02); font-size:12px; color:#94A3B8; line-height:1.75; font-style:italic; margin-bottom:16px; text-align:left; }
//     .spk-socials     { display:flex; justify-content:center; gap:8px; }
//     .spk-soc         { width:30px; height:30px; border-radius:8px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.03); display:flex; align-items:center; justify-content:center; color:#475569; text-decoration:none; font-size:11px; transition:color .2s,border-color .2s,background .2s; }
//     .spk-soc:hover   { color:#A78BFA; border-color:rgba(167,139,250,.3); background:rgba(167,139,250,.06); }

//     /* ─── TESTIMONIALS ─── */
//     .spk-quote-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
//     .spk-quote-card { padding:clamp(18px,3vw,26px); border-radius:18px; border:1px solid rgba(255,255,255,.05); background:#0A1628; position:relative; overflow:hidden; transition:transform .35s,border-color .35s,box-shadow .35s; }
//     .spk-quote-card:hover { transform:translateY(-5px); }
//     .spk-quote-mark { font-size:44px; line-height:.9; font-family:'Syne',sans-serif; font-weight:900; position:absolute; top:10px; left:14px; opacity:.08; }
//     .spk-quote-text { font-size:13px; color:#94A3B8; line-height:1.8; font-style:italic; margin-bottom:14px; position:relative; z-index:1; }
//     .spk-quote-author { display:flex; align-items:center; gap:10px; }
//     .spk-quote-avatar { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:11px; font-weight:700; flex-shrink:0; border:1px solid; }
//     .spk-quote-name { font-size:13px; font-weight:800; color:white; }
//     .spk-quote-role { font-size:11px; color:#64748B; }

//     /* ─── HOW IT WORKS ─── */
//     .spk-process-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; position:relative; }
//     .spk-process-grid::before { content:""; position:absolute; top:36px; left:10%; right:10%; height:1px; background:linear-gradient(90deg,transparent,rgba(167,139,250,.2),rgba(79,70,229,.2),transparent); pointer-events:none; }
//     .spk-process-step { text-align:center; padding:clamp(18px,3vw,26px) clamp(12px,2vw,18px); border-radius:16px; border:1px solid rgba(255,255,255,.04); background:#0A1628; transition:transform .3s,border-color .3s; }
//     .spk-process-step:hover { transform:translateY(-5px); border-color:rgba(167,139,250,.12); }
//     .spk-process-num { width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:14px; font-weight:700; margin:0 auto 14px; border:1px solid; background:#050D1A; position:relative; z-index:1; transition:box-shadow .3s; }
//     .spk-process-step:hover .spk-process-num { box-shadow:0 0 20px rgba(167,139,250,.3); }
//     .spk-process-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:white; margin-bottom:7px; }
//     .spk-process-desc  { font-size:12px; color:#64748B; line-height:1.65; }

//     /* ─── BENEFITS 6-CARD GRID ─── */
//     .spk-benefits-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:clamp(40px,5vw,60px); }
//     .spk-benefit-row {
//       display:flex; align-items:flex-start; gap:12px;
//       padding:clamp(12px,2vw,16px) clamp(12px,2vw,16px); border-radius:14px;
//       border:1px solid rgba(255,255,255,.05); background:rgba(255,255,255,.02);
//       transition:border-color .3s,background .3s,transform .3s;
//     }
//     .spk-benefit-row:hover { transform:translateX(4px); }
//     .spk-benefit-icon  { width:36px; height:36px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:16px; border:1px solid; }
//     .spk-benefit-title { font-size:13px; font-weight:700; color:white; margin-bottom:2px; }
//     .spk-benefit-desc  { font-size:11px; color:#64748B; line-height:1.6; }
//     .spk-benefit-dot   { width:5px; height:5px; border-radius:50%; flex-shrink:0; align-self:center; }

//     /* ─── CTA CARD ─── */
//     .spk-cta-card {
//       position:relative; border-radius:24px; overflow:hidden;
//       border:1px solid rgba(167,139,250,.15);
//       background:linear-gradient(135deg,rgba(79,70,229,.05) 0%,#0A1628 40%,rgba(167,139,250,.04) 100%);
//     }
//     .spk-cta-glow-tl { position:absolute; top:-70px; left:-70px; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(167,139,250,.12),transparent 65%); pointer-events:none; animation:pulseGlow 4s ease-in-out infinite; }
//     .spk-cta-glow-br { position:absolute; bottom:-70px; right:-70px; width:240px; height:240px; border-radius:50%; background:radial-gradient(circle,rgba(0,238,255,.08),transparent 65%); pointer-events:none; animation:pulseGlow 4s 2s ease-in-out infinite; }
//     .spk-cta-top-bar  { height:4px; background:linear-gradient(90deg,#A78BFA,#4F46E5,#00EEFF,#A78BFA); background-size:200% 100%; animation:gradientShift 3s ease infinite; }
//     .spk-cta-inner    { position:relative; z-index:1; display:grid; grid-template-columns:1fr 1fr; }
//     .spk-cta-left     { padding:clamp(28px,4vw,50px) clamp(20px,4vw,46px); border-right:1px solid rgba(255,255,255,.05); }
//     .spk-cta-right    { padding:clamp(28px,4vw,50px) clamp(20px,4vw,46px); display:flex; flex-direction:column; gap:9px; }

//     .spk-cta-eyebrow { display:inline-flex; align-items:center; gap:7px; padding:5px 14px; border-radius:999px; border:1px solid rgba(167,139,250,.25); background:rgba(167,139,250,.07); font-size:11px; font-weight:700; letter-spacing:.2em; color:#A78BFA; font-family:'Space Mono',monospace; margin-bottom:16px; }
//     .spk-cta-title   { font-family:'Syne',sans-serif; font-size:clamp(22px,3.5vw,40px); font-weight:900; color:white; letter-spacing:-.02em; line-height:1.1; margin-bottom:12px; }
//     .spk-cta-desc    { color:#64748B; font-size:clamp(13px,1.4vw,14px); line-height:1.8; margin-bottom:24px; }
//     .spk-metrics     { display:flex; gap:clamp(14px,3vw,26px); flex-wrap:wrap; margin-bottom:28px; }
//     .spk-metric-val   { font-family:'Space Mono',monospace; font-size:clamp(18px,2.5vw,24px); font-weight:700; line-height:1; margin-bottom:3px; }
//     .spk-metric-label { font-size:10px; color:#475569; text-transform:uppercase; letter-spacing:.12em; font-family:'Space Mono',monospace; }

//     .spk-apply-btn {
//       display:inline-flex; align-items:center; justify-content:center; gap:9px;
//       padding:clamp(12px,1.8vw,15px) clamp(22px,3.5vw,38px); border-radius:13px;
//       font-weight:800; font-size:clamp(13px,1.4vw,15px); color:#050D1A;
//       background:linear-gradient(135deg,#A78BFA,#4F46E5);
//       border:none; cursor:pointer;
//       transition:transform .25s,box-shadow .25s,filter .25s;
//       font-family:'Manrope',sans-serif; text-decoration:none; width:fit-content;
//     }
//     .spk-apply-btn:hover { transform:scale(1.05); box-shadow:0 0 50px rgba(167,139,250,.45); filter:brightness(1.1); }
//     .spk-contact-row   { display:flex; align-items:center; gap:7px; margin-top:13px; flex-wrap:wrap; }
//     .spk-contact-item  { display:flex; align-items:center; gap:6px; font-size:12px; color:#475569; }
//     .spk-contact-item a { color:#A78BFA; text-decoration:none; font-weight:600; transition:color .2s; }
//     .spk-contact-item a:hover { color:white; }

//     .spk-checklist-label { font-size:10px; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.12em; font-family:'Space Mono',monospace; margin-bottom:2px; }
//     .spk-checklist-item  { display:flex; align-items:center; gap:10px; padding:9px 13px; border-radius:10px; border:1px solid rgba(255,255,255,.04); background:rgba(255,255,255,.02); font-size:12px; color:#94A3B8; transition:border-color .2s,background .2s; }
//     .spk-checklist-item:hover { border-color:rgba(167,139,250,.15); background:rgba(167,139,250,.04); }
//     .spk-trust-row  { display:flex; gap:16px; margin-top:6px; padding-top:10px; border-top:1px solid rgba(255,255,255,.04); flex-wrap:wrap; }
//     .spk-trust-item { display:flex; align-items:center; gap:5px; font-size:11px; color:#475569; }

//     /* ─── FOOTER ─── */
//     .spk-footer { background:#050D1A; border-top:1px solid rgba(255,255,255,.04); padding:32px clamp(16px,4vw,28px) 22px; }
//     .spk-footer-inner { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; }
//     .spk-footer-links { display:flex; gap:18px; flex-wrap:wrap; }

//     /* ════════════ RESPONSIVE ════════════ */

//     /* Tablet landscape ≤1100px */
//     @media(max-width:1100px) {
//       .spk-benefits-grid { grid-template-columns:repeat(2,1fr); }
//     }

//     /* Tablet / small laptop ≤900px */
//     @media(max-width:900px) {
//       .spk-hero-inner   { grid-template-columns:1fr; }
//       .spk-hero-stats   { grid-template-columns:repeat(4,1fr); }
//       .spk-grid         { grid-template-columns:repeat(2,1fr); }
//       .spk-quote-grid   { grid-template-columns:repeat(2,1fr); }
//       .spk-process-grid { grid-template-columns:repeat(2,1fr); }
//       .spk-process-grid::before { display:none; }
//       .spk-cta-inner    { grid-template-columns:1fr; }
//       .spk-cta-left     { border-right:none; border-bottom:1px solid rgba(255,255,255,.05); }
//     }

//     /* Large mobile ≤640px */
//     @media(max-width:640px) {
//       .spk-hero-stats   { grid-template-columns:repeat(2,1fr); }
//       .spk-grid         { grid-template-columns:1fr; }
//       .spk-quote-grid   { grid-template-columns:1fr; }
//       .spk-benefits-grid { grid-template-columns:1fr; }
//       .spk-cta-row      { flex-direction:column; }
//       .spk-cta-primary, .spk-cta-secondary { width:100%; justify-content:center; }
//       .spk-process-grid { grid-template-columns:repeat(2,1fr); }
//     }

//     /* Standard mobile ≤480px */
//     @media(max-width:480px) {
//       .spk-process-grid { grid-template-columns:1fr; }
//       .spk-cta-left, .spk-cta-right { padding:24px 18px; }
//       .spk-footer-inner { flex-direction:column; gap:14px; }
//       .spk-footer-links { gap:14px; }
//     }

//     /* Small mobile ≤380px */
//     @media(max-width:380px) {
//       .spk-stat-val  { font-size:18px; }
//       .spk-hero-title { font-size:28px; }
//       .spk-cta-left, .spk-cta-right { padding:20px 14px; }
//       .spk-benefit-row { flex-wrap:wrap; }
//     }
//   `}</style>
// );

// // ─── ICONS ─────────────────────────────────────────────────────────────────────
// const LinkedInIcon = () => <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
// const InstaIcon    = () => <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
// const TwitterIcon  = () => <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
// const ArrowRight   = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>;
// const MicIcon      = () => <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
// const MailIcon     = () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>;
// const StarIcon     = () => <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>;

// // ─── ANIMATED CANVAS ──────────────────────────────────────────────────────────
// function HeroBgCanvas() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const canvas = ref.current; if (!canvas) return;
//     const ctx = canvas.getContext("2d"); let raf;
//     const resize = () => { canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight; };
//     resize();
//     const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
//     const pts = Array.from({ length: 38 }, () => ({
//       x: Math.random(), y: Math.random(),
//       vx: (Math.random() - .5) * .00025, vy: (Math.random() - .5) * .00025,
//       r: Math.random() * 1.4 + .3, a: Math.random() * .17 + .04,
//     }));
//     const draw = () => {
//       const w = canvas.width, h = canvas.height;
//       ctx.clearRect(0, 0, w, h);
//       pts.forEach(p => {
//         p.x += p.vx; p.y += p.vy;
//         if (p.x < 0 || p.x > 1) p.vx *= -1;
//         if (p.y < 0 || p.y > 1) p.vy *= -1;
//         ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(167,139,250,${p.a})`; ctx.fill();
//       });
//       const thresh = Math.min(w, h) * .12;
//       pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
//         const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
//         if (d < thresh) { ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.strokeStyle = `rgba(167,139,250,${.018 * (1 - d / thresh)})`; ctx.lineWidth = .5; ctx.stroke(); }
//       }));
//       raf = requestAnimationFrame(draw);
//     };
//     draw();
//     return () => { cancelAnimationFrame(raf); ro.disconnect(); };
//   }, []);
//   return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />;
// }

// // ─── DATA ──────────────────────────────────────────────────────────────────────
// const SPEAKERS = [
//   { name:"Pragati Srivastava", role:"Java Backend Developer", company:"Ex-Amazon",  initials:"PS", accent:"#00EEFF", event:"Developers Meetup 2026", eventAccent:"#00EEFF", quote:"Building at scale taught me that great code isn't just functional — it tells a story future devs can read.", topic:"Backend Architecture & Career Growth", linkedin:"#", twitter:"#", instagram:"#" },
// //   { name:"Shivani Mehrotra",   role:"Co-Founder & COO",       company:"Edubuk",      initials:"SM", accent:"#4ADE80", event:"CV to Career Workshop",   eventAccent:"#4ADE80", quote:"Verified credentials are the future of hiring. We're here to make your career story undeniable.",          topic:"Blockchain Credentials & Hiring",    linkedin:"#", twitter:"#", instagram:"#" },
// //   { name:"Apoorva Bajaj",      role:"Co-Founder & CEO",       company:"Edubuk",      initials:"AB", accent:"#A78BFA", event:"CV to Career Workshop",   eventAccent:"#4ADE80", quote:"The gap between talent and opportunity is often just a trusted signal. TruCV closes that gap permanently.", topic:"EdTech, Careers & Startup",          linkedin:"#", twitter:"#", instagram:"#" },
// ];

// const TESTIMONIALS = [
//   { quote:"Speaking at TechEra was one of the most energizing experiences of my career. The audience was genuinely curious and asked the sharpest questions.", name:"Pragati Srivastava", role:"Ex-Amazon · Java Backend", initials:"PS", accent:"#00EEFF" },
// //   { quote:"The TechEra team made everything seamless — from prep to stage. Zero stress, and the community reception was incredible.",                          name:"Shivani Mehrotra",   role:"COO · Edubuk",           initials:"SM", accent:"#4ADE80" },
// //   { quote:"I expected a good audience. I didn't expect the depth of conversation after my talk. Real builders, real questions.",                                name:"Apoorva Bajaj",      role:"CEO · Edubuk",           initials:"AB", accent:"#A78BFA" },
// ];

// const BENEFITS = [
//   { icon:"🎤", color:"#A78BFA", bg:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.2)", title:"A Real Stage, Real Audience",   desc:"Speak to 200–1,000+ developers, designers, and founders who show up to learn — not just collect swag." },
//   { icon:"📣", color:"#00EEFF", bg:"rgba(0,238,255,.1)",   border:"rgba(0,238,255,.2)",   title:"10K+ Social Amplification",     desc:"Your talk is promoted across TechEra's Instagram, LinkedIn & newsletter — before, during, and after." },
//   { icon:"🤝", color:"#4F46E5", bg:"rgba(79,70,229,.12)",  border:"rgba(79,70,229,.25)",  title:"Elite Backstage Networking",    desc:"Connect with speakers, sponsors, and community leaders building India's next generation of tech." },
//   { icon:"🏆", color:"#FEBC2E", bg:"rgba(254,188,46,.1)",  border:"rgba(254,188,46,.2)",  title:"Official Speaker Certificate",  desc:"A recognized TechEra credential — add it to your LinkedIn, resume, and portfolio with pride." },
//   { icon:"🎁", color:"#4ADE80", bg:"rgba(74,222,128,.1)",  border:"rgba(74,222,128,.2)",  title:"Exclusive Speaker Perks",       desc:"Speaker merch, lifetime free event access, and priority invites to every future TechEra event." },
//   { icon:"🌍", color:"#F97316", bg:"rgba(249,115,22,.1)",  border:"rgba(249,115,22,.2)",  title:"Featured Community Profile",    desc:"Your profile lives on TechEra's website and is shared across our partner networks in India and beyond." },
// ];

// const PROCESS_STEPS = [
//   { num:"01", color:"#A78BFA", title:"Apply",          desc:"Fill the quick speaker form — under 3 minutes. Just the essentials we need." },
//   { num:"02", color:"#4F46E5", title:"We Review",      desc:"Our team reviews within 48 hours and matches you to the right event." },
//   { num:"03", color:"#00EEFF", title:"Brief Call",     desc:"A 15-min call to align on topic, format, audience, and expectations." },
//   { num:"04", color:"#4ADE80", title:"Take the Stage", desc:"Confirmed! We handle all logistics so you focus on delivering a great talk." },
// ];

// const CHECKLIST = [
//   "Featured speaker profile on TechEra website",
//   "Pre-event social media promotion across all channels",
//   "Dedicated stage time — keynote, session, or workshop",
//   "Backstage access & networking with sponsors",
//   "Official Speaker Certificate (LinkedIn-ready)",
//   "Exclusive speaker merch & lifetime event access",
//   "Post-event recap feature & content amplification",
//   "Priority invite to all future TechEra events",
// ];

// // ─── SPEAKER CARD ──────────────────────────────────────────────────────────────
// function SpeakerCard({ speaker, index }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <div className="spk-card"
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       style={{ borderColor: hov ? `${speaker.accent}35` : "rgba(255,255,255,.06)", boxShadow: hov ? `0 20px 52px ${speaker.accent}16, 0 0 0 1px ${speaker.accent}18` : "none", animation:"slideUp .5s ease-out both", animationDelay:`${index * .1}s` }}
//     >
//       <div className="spk-card-bar"  style={{ background:`linear-gradient(90deg,${speaker.accent},${speaker.accent}55)` }} />
//       <div className="spk-card-glow" style={{ background:`radial-gradient(ellipse at top,${speaker.accent}10,transparent 55%)` }} />
//       <div className="spk-card-scan" style={{ background:`linear-gradient(90deg,transparent,${speaker.accent}60,transparent)` }} />
//       <div className="spk-avatar-wrap">
//         <div className="spk-avatar-ring" style={{ borderColor:speaker.accent }} />
//         <div className="spk-avatar" style={{ background:`${speaker.accent}18`, borderColor:`${speaker.accent}45`, color:speaker.accent, boxShadow:hov?`0 0 24px ${speaker.accent}30`:"none" }}>
//           {speaker.initials}
//           {hov && <div className="spk-orbit-dot"  style={{ background:speaker.accent }} />}
//           {hov && <div className="spk-orbit-dot2" style={{ background:speaker.accent, opacity:.35 }} />}
//         </div>
//       </div>
//       <div className="spk-card-body">
//         <div className="spk-event-tag" style={{ color:speaker.eventAccent, borderColor:`${speaker.eventAccent}35`, background:`${speaker.eventAccent}10` }}>{speaker.event}</div>
//         <div className="spk-name">{speaker.name}</div>
//         <div className="spk-role"><span style={{ color:speaker.accent, fontWeight:700 }}>{speaker.role}</span> · {speaker.company}</div>
//         <div className="spk-topic-label">Spoke About</div>
//         <div className="spk-topic-chip" style={{ color:speaker.accent, borderColor:`${speaker.accent}25`, background:`${speaker.accent}0D` }}>{speaker.topic}</div>
//         <div className="spk-quote" style={{ borderColor:`${speaker.accent}15` }}>
//           <span style={{ color:speaker.accent, opacity:.35, fontSize:22, lineHeight:1 }}>"</span>{speaker.quote}
//         </div>
//         <div className="spk-socials">
//           {[{Icon:LinkedInIcon,l:"LinkedIn",h:speaker.linkedin},{Icon:TwitterIcon,l:"Twitter",h:speaker.twitter},{Icon:InstaIcon,l:"Instagram",h:speaker.instagram}].map(({Icon,l,h})=>(
//             <a key={l} href={h} target="_blank" rel="noreferrer" className="spk-soc" aria-label={l}><Icon /></a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
// export default function SpeakersPage() {
//   return (
//     <div className="spk-page">
//       <GlobalStyles />
//       <Navbar />

//       {/* ══ HERO ══ */}
//       <section className="spk-hero">
//         <div className="spk-hero-bg" /><div className="spk-hero-grid" /><HeroBgCanvas />
//         <div className="spk-hero-inner">
//           <div className="spk-hero-left">
//             <div className="spk-eyebrow">
//               <span style={{ width:7, height:7, borderRadius:"50%", background:"#A78BFA", display:"inline-block", animation:"pulseGlow 2s ease-in-out infinite" }} />
//               SPEAKERS / COMMUNITY
//             </div>
//             <h1 className="spk-hero-title">Voices That<br /><span className="shimmer-text">Move Communities.</span></h1>
//             <p className="spk-hero-sub">Meet the brilliant minds who've taken the TechEra stage — and discover why speaking here is one of the most impactful things you can do for your career.</p>
//             <div className="spk-cta-row">
//               <a href="#apply" className="spk-cta-primary"><MicIcon /> Apply as Speaker</a>
//               <a href="#speakers" className="spk-cta-secondary">Meet Our Speakers <ArrowRight /></a>
//             </div>
//           </div>
//           <div className="spk-hero-right">
//             <div className="spk-hero-stats">
//               {[{val:"3+",label:"Expert Speakers",color:"#A78BFA"},{val:"400+",label:"Lives Impacted",color:"#00EEFF"},{val:"5+",label:"Events Powered",color:"#4ADE80"},{val:"48h",label:"Response Time",color:"#FEBC2E"}].map(({val,label,color})=>(
//                 <div key={label} className="spk-stat-card">
//                   <div className="spk-stat-val" style={{color}}>{val}</div>
//                   <div className="spk-stat-label">{label}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="spk-alumni-bar">
//               <div className="spk-alumni-label">Alumni at</div>
//               {["Amazon","Edubuk","Tech4Hack"].map(n=><div key={n} className="spk-alumni-chip">{n}</div>)}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══ SPEAKER CARDS ══ */}
//       <section id="speakers" className="spk-section" style={{paddingTop:"clamp(48px,7vw,80px)"}}>
//         <div className="spk-section-head">
//           <div className="spk-sec-eyebrow" style={{border:"1px solid rgba(167,139,250,.2)",background:"rgba(167,139,250,.06)",color:"#A78BFA"}}>
//             <span style={{width:6,height:6,borderRadius:"50%",background:"#A78BFA",display:"inline-block",animation:"pulseGlow 2s ease-in-out infinite"}} /> OUR SPEAKERS
//           </div>
//           <h2 className="spk-sec-title">Builders Who've<br /><span className="shimmer-text">Shared the Stage</span></h2>
//           <p className="spk-sec-sub">Real practitioners. Real stories. Every speaker brings years of hands-on experience directly to our community.</p>
//         </div>
//         <div className="spk-grid">
//           {SPEAKERS.map((s,i)=><SpeakerCard key={s.name} speaker={s} index={i}/>)}
//         </div>
//       </section>

//       {/* ══ TESTIMONIALS ══ */}
//       <section className="spk-section" style={{paddingTop:0}}>
//         <div className="spk-quote-grid">
//           {TESTIMONIALS.map((t,i)=>(
//             <div key={i} className="spk-quote-card"
//               onMouseEnter={e=>{e.currentTarget.style.borderColor=`${t.accent}25`;e.currentTarget.style.boxShadow=`0 14px 40px ${t.accent}10`;}}
//               onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.05)";e.currentTarget.style.boxShadow="none";}}
//             >
//               <div className="spk-quote-mark" style={{color:t.accent}}>"</div>
//               <p className="spk-quote-text">"{t.quote}"</p>
//               <div className="spk-quote-author">
//                 <div className="spk-quote-avatar" style={{background:`${t.accent}15`,borderColor:`${t.accent}35`,color:t.accent}}>{t.initials}</div>
//                 <div><div className="spk-quote-name">{t.name}</div><div className="spk-quote-role">{t.role}</div></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="spk-divider" />

//       {/* ══ HOW IT WORKS ══ */}
//       <section className="spk-section">
//         <div className="spk-section-head">
//           <div className="spk-sec-eyebrow" style={{border:"1px solid rgba(254,188,46,.2)",background:"rgba(254,188,46,.06)",color:"#FEBC2E"}}>
//             <span style={{width:6,height:6,borderRadius:"50%",background:"#FEBC2E",display:"inline-block"}}/> HOW IT WORKS
//           </div>
//           <h2 className="spk-sec-title">From Idea to <span className="grad-text">Stage</span></h2>
//           <p className="spk-sec-sub">Simple. Transparent. Fast. Our process respects your time — from first hello to standing ovation.</p>
//         </div>
//         <div className="spk-process-grid">
//           {PROCESS_STEPS.map((step,i)=>(
//             <div key={i} className="spk-process-step">
//               <div className="spk-process-num" style={{color:step.color,borderColor:`${step.color}35`}}>{step.num}</div>
//               <div className="spk-process-title">{step.title}</div>
//               <p className="spk-process-desc">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="spk-divider" />

//       {/* ══ BENEFITS + CTA ══ */}
//       <section id="apply" className="spk-section" style={{paddingBottom:"clamp(60px,8vw,100px)"}}>
//         <div className="spk-section-head">
//           <div className="spk-sec-eyebrow" style={{border:"1px solid rgba(167,139,250,.25)",background:"rgba(167,139,250,.07)",color:"#A78BFA"}}>
//             <span style={{width:6,height:6,borderRadius:"50%",background:"#A78BFA",display:"inline-block",animation:"pulseGlow 2s ease-in-out infinite"}}/> WHY SPEAK AT TECHERA
//           </div>
//           <h2 className="spk-sec-title">Your Stage.<br /><span className="shimmer-text">Your Moment.</span></h2>
//           <p className="spk-sec-sub">TechEra speakers don't just present — they become legends in our community. Here's everything you get.</p>
//         </div>

//         {/* 6 benefit cards */}
//         <div className="spk-benefits-grid">
//           {BENEFITS.map((b,i)=>(
//             <div key={i} className="spk-benefit-row"
//               onMouseEnter={e=>{e.currentTarget.style.borderColor=`${b.color}22`;e.currentTarget.style.background=b.bg;e.currentTarget.style.transform="translateX(4px)";}}
//               onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.05)";e.currentTarget.style.background="rgba(255,255,255,.02)";e.currentTarget.style.transform="none";}}
//             >
//               <div className="spk-benefit-icon" style={{background:b.bg,borderColor:b.border}}>{b.icon}</div>
//               <div style={{flex:1}}>
//                 <div className="spk-benefit-title">{b.title}</div>
//                 <div className="spk-benefit-desc">{b.desc}</div>
//               </div>
//               <div className="spk-benefit-dot" style={{background:b.color,boxShadow:`0 0 8px ${b.color}60`}}/>
//             </div>
//           ))}
//         </div>

//         {/* CTA card */}
//         <div className="spk-cta-card">
//           <div className="spk-cta-glow-tl"/><div className="spk-cta-glow-br"/>
//           <div className="spk-cta-top-bar"/>
//           <div className="spk-cta-inner">
//             <div className="spk-cta-left">
//               <div className="spk-cta-eyebrow"><StarIcon /> READY TO SPEAK?</div>
//               <h3 className="spk-cta-title">Your knowledge<br />deserves an<br /><span className="shimmer-text">engaged audience.</span></h3>
//               <p className="spk-cta-desc">TechEra's community is built on curiosity, ambition, and action. When you speak here, you're not presenting to a passive crowd — you're sparking ideas that will ship into the real world.</p>
//               <div className="spk-metrics">
//                 {[{val:"2,000+",label:"Active Members",color:"#A78BFA"},{val:"400+",label:"Event Attendees",color:"#00EEFF"},{val:"10K+",label:"Social Reach",color:"#4ADE80"}].map(({val,label,color})=>(
//                   <div key={label}>
//                     <div className="spk-metric-val" style={{color}}>{val}</div>
//                     <div className="spk-metric-label">{label}</div>
//                   </div>
//                 ))}
//               </div>
//               <a href="https://docs.google.com/forms/d/e/1FAIpQLSehz9Yy6i5WFw1O3tDYtEkb414jtoWGlf1FFKYlbZG_W8Useg/viewform" target="_blank" rel="noreferrer" className="spk-apply-btn">
//                 <MicIcon /> Apply as Speaker
//               </a>
//               <div className="spk-contact-row">
//                 <div className="spk-contact-item"><MailIcon /><a href="mailto:techeraa151@gmail.com">techeraa151@gmail.com</a></div>
//                 <div style={{width:3,height:3,borderRadius:"50%",background:"#334155",flexShrink:0}}/>
//                 <span style={{fontSize:12,color:"#475569"}}>or DM on Instagram</span>
//               </div>
//             </div>
//             <div className="spk-cta-right">
//               <div className="spk-checklist-label">What's included</div>
//               {CHECKLIST.map((text,i)=>(
//                 <div key={i} className="spk-checklist-item"
//                   onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(167,139,250,.15)";e.currentTarget.style.background="rgba(167,139,250,.04)";}}
//                   onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.04)";e.currentTarget.style.background="rgba(255,255,255,.02)";}}
//                 >
//                   <span style={{color:"#4ADE80",flexShrink:0,fontSize:13}}>✓</span>{text}
//                 </div>
//               ))}
//               <div className="spk-trust-row">
//                 {[{icon:"⚡",label:"48h Response"},{icon:"🆓",label:"100% Free"},{icon:"🔒",label:"No Spam"}].map(({icon,label})=>(
//                   <div key={label} className="spk-trust-item"><span>{icon}</span>{label}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══ FOOTER ══ */}
//       <footer className="spk-footer">
//         <div className="spk-footer-inner">
//           <span style={{color:"#475569",fontSize:12}}>© 2025 TechEra Community. All rights reserved.</span>
//           <div className="spk-footer-links">
//             {["Terms of Service","Privacy Policy","Cookie Policy"].map(l=>(
//               <a key={l} href="#" style={{color:"#475569",fontSize:12,textDecoration:"none",transition:"color .2s"}}
//                 onMouseEnter={e=>e.currentTarget.style.color="#94A3B8"}
//                 onMouseLeave={e=>e.currentTarget.style.color="#475569"}
//               >{l}</a>
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

    @keyframes shimmer       { 0%{background-position:0% center}100%{background-position:200% center} }
    @keyframes pulseGlow     { 0%,100%{opacity:.4}50%{opacity:1} }
    @keyframes slideUp       { from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)} }
    @keyframes floatY        { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
    @keyframes rotateSlow    { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
    @keyframes scanLine      { 0%{top:-2px}100%{top:100%} }
    @keyframes countUp       { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
    @keyframes gradientShift { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
    @keyframes orbitDot      { 0%{transform:rotate(0deg) translateX(52px) rotate(0deg)}100%{transform:rotate(360deg) translateX(52px) rotate(-360deg)} }
    @keyframes orbitDot2     { 0%{transform:rotate(180deg) translateX(52px) rotate(-180deg)}100%{transform:rotate(540deg) translateX(52px) rotate(-540deg)} }

    .spk-page { font-family:'Manrope',system-ui,sans-serif; background:#050D1A; color:white; min-height:100vh; }

    .shimmer-text {
      background:linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%);
      background-size:200% auto;
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      animation:shimmer 4s linear infinite;
    }
    .grad-text {
      background:linear-gradient(135deg,#00EEFF,#4F46E5);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }

    /* ─── HERO ─── */
    .spk-hero {
      position:relative; overflow:hidden;
      padding:clamp(90px,12vw,130px) clamp(16px,4vw,28px) clamp(60px,8vw,90px);
    }
    .spk-hero-bg {
      position:absolute; inset:0; pointer-events:none; z-index:0;
      background:radial-gradient(ellipse 80% 55% at 60% 30%,rgba(167,139,250,.07) 0%,transparent 65%),
                 radial-gradient(ellipse 50% 40% at 15% 80%,rgba(79,70,229,.07) 0%,transparent 55%),
                 #050D1A;
    }
    .spk-hero-grid {
      position:absolute; inset:0; pointer-events:none;
      background-image:linear-gradient(rgba(167,139,250,.022) 1px,transparent 1px),
                       linear-gradient(90deg,rgba(167,139,250,.022) 1px,transparent 1px);
      background-size:60px 60px;
    }
    .spk-hero-inner {
      position:relative; z-index:1;
      max-width:1200px; margin:0 auto;
      display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,60px); align-items:center;
    }
    .spk-hero-left  { animation:slideUp .7s ease-out both; }
    .spk-hero-right { animation:slideUp .7s .15s ease-out both; }

    .spk-eyebrow {
      display:inline-flex; align-items:center; gap:8px;
      padding:5px 16px; border-radius:999px;
      border:1px solid rgba(167,139,250,.25); background:rgba(167,139,250,.07);
      font-size:11px; font-weight:700; letter-spacing:.2em; color:#A78BFA;
      font-family:'Space Mono',monospace; margin-bottom:20px;
    }
    .spk-hero-title {
      font-family:'Syne',sans-serif;
      font-size:clamp(30px,5.5vw,68px);
      font-weight:900; line-height:1.02; letter-spacing:-.03em;
      color:white; margin-bottom:18px;
    }
    .spk-hero-sub {
      color:#64748B; font-size:clamp(14px,1.6vw,16px); line-height:1.8; margin-bottom:32px;
    }
    .spk-cta-row { display:flex; gap:12px; flex-wrap:wrap; }
    .spk-cta-primary {
      display:inline-flex; align-items:center; gap:9px;
      padding:14px clamp(18px,3vw,32px); border-radius:14px;
      font-weight:800; font-size:clamp(13px,1.5vw,15px); color:#050D1A;
      background:linear-gradient(135deg,#A78BFA,#4F46E5);
      border:none; cursor:pointer;
      transition:transform .25s,box-shadow .25s,filter .25s;
      font-family:'Manrope',sans-serif; text-decoration:none; white-space:nowrap;
    }
    .spk-cta-primary:hover { transform:scale(1.05); box-shadow:0 0 48px rgba(167,139,250,.4); filter:brightness(1.08); }
    .spk-cta-secondary {
      display:inline-flex; align-items:center; gap:8px;
      padding:13px clamp(14px,2.5vw,24px); border-radius:14px;
      font-weight:700; font-size:clamp(12px,1.4vw,14px); color:#94A3B8;
      border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.03);
      cursor:pointer; transition:all .25s;
      font-family:'Manrope',sans-serif; text-decoration:none; white-space:nowrap;
    }
    .spk-cta-secondary:hover { color:#A78BFA; border-color:rgba(167,139,250,.3); background:rgba(167,139,250,.05); }

    /* Hero right — stat cards 2×2 */
    .spk-hero-stats { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .spk-stat-card {
      padding:clamp(14px,2.5vw,22px); border-radius:16px;
      border:1px solid rgba(255,255,255,.06); background:#0A1628;
      position:relative; overflow:hidden;
      transition:border-color .3s,transform .3s;
    }
    .spk-stat-card:hover { border-color:rgba(167,139,250,.2); transform:translateY(-3px); }
    .spk-stat-card::before {
      content:""; position:absolute; inset:0;
      background:radial-gradient(circle at top left,rgba(167,139,250,.05),transparent 60%);
      pointer-events:none;
    }
    .spk-stat-val {
      font-family:'Space Mono',monospace;
      font-size:clamp(20px,3vw,32px); font-weight:700; line-height:1; margin-bottom:5px;
      animation:countUp .5s ease-out both;
    }
    .spk-stat-label { font-size:clamp(9px,1vw,11px); color:#475569; text-transform:uppercase; letter-spacing:.1em; font-family:'Space Mono',monospace; }

    /* Alumni chips below hero stats */
    .spk-alumni-bar {
      margin-top:12px; padding:12px 14px; border-radius:12px;
      border:1px solid rgba(167,139,250,.1); background:rgba(167,139,250,.04);
      display:flex; align-items:center; gap:8px; flex-wrap:wrap;
    }
    .spk-alumni-label { font-size:10px; font-weight:700; color:#475569; font-family:'Space Mono',monospace; text-transform:uppercase; letter-spacing:.1em; flex-shrink:0; }
    .spk-alumni-chip {
      padding:3px 10px; border-radius:7px;
      border:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.03);
      font-size:11px; font-weight:700; color:#64748B; font-family:'Space Mono',monospace;
    }

    /* ─── SECTION WRAPPER ─── */
    .spk-section { max-width:1200px; margin:0 auto; padding:0 clamp(16px,4vw,28px) clamp(52px,7vw,80px); }
    .spk-section-head { text-align:center; margin-bottom:clamp(32px,5vw,56px); }
    .spk-sec-eyebrow {
      display:inline-flex; align-items:center; gap:8px;
      padding:5px 16px; border-radius:999px;
      font-size:11px; font-weight:700; letter-spacing:.2em;
      font-family:'Space Mono',monospace; margin-bottom:14px;
    }
    .spk-sec-title {
      font-family:'Syne',sans-serif;
      font-size:clamp(22px,4vw,46px);
      font-weight:900; color:white; letter-spacing:-.03em; line-height:1.08; margin-bottom:12px;
    }
    .spk-sec-sub { color:#64748B; font-size:clamp(13px,1.5vw,15px); line-height:1.75; max-width:500px; margin:0 auto; }

    /* ─── DIVIDER ─── */
    .spk-divider {
      height:1px;
      background:linear-gradient(90deg,transparent,rgba(167,139,250,.18),transparent);
      max-width:1200px; margin:0 auto clamp(44px,6vw,72px);
    }

    /* ─── SPEAKER CARDS ─── */
    .spk-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
    .spk-card {
      position:relative; border-radius:22px;
      border:1px solid rgba(255,255,255,.06); background:#0A1628;
      overflow:hidden;
      transition:transform .4s cubic-bezier(.23,1,.32,1),border-color .4s,box-shadow .4s;
    }
    .spk-card:hover { transform:translateY(-8px); }
    .spk-card-bar  { height:3px; width:100%; }
    .spk-card-glow { position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .5s; }
    .spk-card:hover .spk-card-glow { opacity:1; }
    .spk-card-scan { position:absolute; left:0; right:0; height:1px; pointer-events:none; opacity:0; transition:opacity .3s; }
    .spk-card:hover .spk-card-scan { opacity:1; animation:scanLine 3.5s linear infinite; }

    .spk-avatar-wrap { display:flex; justify-content:center; padding:28px 20px 0; position:relative; }
    .spk-avatar-ring {
      position:absolute; top:16px; left:50%; transform:translateX(-50%);
      width:106px; height:106px; border-radius:50%;
      border:1px dashed; opacity:.22; transition:opacity .3s;
    }
    .spk-card:hover .spk-avatar-ring { opacity:.55; animation:rotateSlow 14s linear infinite; }
    .spk-avatar {
      width:82px; height:82px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-family:'Space Mono',monospace; font-size:20px; font-weight:700;
      position:relative; z-index:1; border:2px solid; flex-shrink:0;
      transition:transform .35s,box-shadow .35s;
      overflow:hidden;
    }
    .spk-card:hover .spk-avatar { transform:translateY(-4px) scale(1.06); animation:floatY 3s ease-in-out infinite; }
    .spk-orbit-dot  { position:absolute; width:7px; height:7px; border-radius:50%; top:50%; left:50%; margin:-3.5px 0 0 -3.5px; animation:orbitDot 3s linear infinite; }
    .spk-orbit-dot2 { position:absolute; width:5px; height:5px; border-radius:50%; top:50%; left:50%; margin:-2.5px 0 0 -2.5px; animation:orbitDot2 5.5s linear infinite; }

    .spk-card-body   { padding:16px clamp(14px,2.5vw,24px) 24px; text-align:center; }
    .spk-event-tag   { display:inline-block; padding:3px 11px; border-radius:999px; font-size:10px; font-weight:700; font-family:'Space Mono',monospace; letter-spacing:.1em; margin-bottom:10px; border:1px solid; }
    .spk-name        { font-family:'Syne',sans-serif; font-size:clamp(15px,2vw,19px); font-weight:900; color:white; letter-spacing:-.02em; margin-bottom:4px; }
    .spk-role        { font-size:12px; color:#64748B; margin-bottom:12px; line-height:1.5; }
    .spk-topic-label { font-size:10px; font-weight:700; color:#475569; font-family:'Space Mono',monospace; text-transform:uppercase; letter-spacing:.12em; margin-bottom:6px; }
    .spk-topic-chip  { display:inline-block; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; font-family:'Space Mono',monospace; border:1px solid; margin-bottom:14px; }
    .spk-quote       { position:relative; padding:12px 14px; border-radius:12px; border:1px solid rgba(255,255,255,.05); background:rgba(255,255,255,.02); font-size:12px; color:#94A3B8; line-height:1.75; font-style:italic; margin-bottom:16px; text-align:left; }
    .spk-socials     { display:flex; justify-content:center; gap:8px; }
    .spk-soc         { width:30px; height:30px; border-radius:8px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.03); display:flex; align-items:center; justify-content:center; color:#475569; text-decoration:none; font-size:11px; transition:color .2s,border-color .2s,background .2s; }
    .spk-soc:hover   { color:#A78BFA; border-color:rgba(167,139,250,.3); background:rgba(167,139,250,.06); }

    /* ─── TESTIMONIALS ─── */
    .spk-quote-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
    .spk-quote-card { padding:clamp(18px,3vw,26px); border-radius:18px; border:1px solid rgba(255,255,255,.05); background:#0A1628; position:relative; overflow:hidden; transition:transform .35s,border-color .35s,box-shadow .35s; }
    .spk-quote-card:hover { transform:translateY(-5px); }
    .spk-quote-mark { font-size:44px; line-height:.9; font-family:'Syne',sans-serif; font-weight:900; position:absolute; top:10px; left:14px; opacity:.08; }
    .spk-quote-text { font-size:13px; color:#94A3B8; line-height:1.8; font-style:italic; margin-bottom:14px; position:relative; z-index:1; }
    .spk-quote-author { display:flex; align-items:center; gap:10px; }
    .spk-quote-avatar { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:11px; font-weight:700; flex-shrink:0; border:1px solid; overflow:hidden; }
    .spk-quote-name { font-size:13px; font-weight:800; color:white; }
    .spk-quote-role { font-size:11px; color:#64748B; }

    /* ─── HOW IT WORKS ─── */
    .spk-process-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; position:relative; }
    .spk-process-grid::before { content:""; position:absolute; top:36px; left:10%; right:10%; height:1px; background:linear-gradient(90deg,transparent,rgba(167,139,250,.2),rgba(79,70,229,.2),transparent); pointer-events:none; }
    .spk-process-step { text-align:center; padding:clamp(18px,3vw,26px) clamp(12px,2vw,18px); border-radius:16px; border:1px solid rgba(255,255,255,.04); background:#0A1628; transition:transform .3s,border-color .3s; }
    .spk-process-step:hover { transform:translateY(-5px); border-color:rgba(167,139,250,.12); }
    .spk-process-num { width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:14px; font-weight:700; margin:0 auto 14px; border:1px solid; background:#050D1A; position:relative; z-index:1; transition:box-shadow .3s; }
    .spk-process-step:hover .spk-process-num { box-shadow:0 0 20px rgba(167,139,250,.3); }
    .spk-process-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:white; margin-bottom:7px; }
    .spk-process-desc  { font-size:12px; color:#64748B; line-height:1.65; }

    /* ─── BENEFITS 6-CARD GRID ─── */
    .spk-benefits-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:clamp(40px,5vw,60px); }
    .spk-benefit-row {
      display:flex; align-items:flex-start; gap:12px;
      padding:clamp(12px,2vw,16px) clamp(12px,2vw,16px); border-radius:14px;
      border:1px solid rgba(255,255,255,.05); background:rgba(255,255,255,.02);
      transition:border-color .3s,background .3s,transform .3s;
    }
    .spk-benefit-row:hover { transform:translateX(4px); }
    .spk-benefit-icon  { width:36px; height:36px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:16px; border:1px solid; }
    .spk-benefit-title { font-size:13px; font-weight:700; color:white; margin-bottom:2px; }
    .spk-benefit-desc  { font-size:11px; color:#64748B; line-height:1.6; }
    .spk-benefit-dot   { width:5px; height:5px; border-radius:50%; flex-shrink:0; align-self:center; }

    /* ─── CTA CARD ─── */
    .spk-cta-card {
      position:relative; border-radius:24px; overflow:hidden;
      border:1px solid rgba(167,139,250,.15);
      background:linear-gradient(135deg,rgba(79,70,229,.05) 0%,#0A1628 40%,rgba(167,139,250,.04) 100%);
    }
    .spk-cta-glow-tl { position:absolute; top:-70px; left:-70px; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(167,139,250,.12),transparent 65%); pointer-events:none; animation:pulseGlow 4s ease-in-out infinite; }
    .spk-cta-glow-br { position:absolute; bottom:-70px; right:-70px; width:240px; height:240px; border-radius:50%; background:radial-gradient(circle,rgba(0,238,255,.08),transparent 65%); pointer-events:none; animation:pulseGlow 4s 2s ease-in-out infinite; }
    .spk-cta-top-bar  { height:4px; background:linear-gradient(90deg,#A78BFA,#4F46E5,#00EEFF,#A78BFA); background-size:200% 100%; animation:gradientShift 3s ease infinite; }
    .spk-cta-inner    { position:relative; z-index:1; display:grid; grid-template-columns:1fr 1fr; }
    .spk-cta-left     { padding:clamp(28px,4vw,50px) clamp(20px,4vw,46px); border-right:1px solid rgba(255,255,255,.05); }
    .spk-cta-right    { padding:clamp(28px,4vw,50px) clamp(20px,4vw,46px); display:flex; flex-direction:column; gap:9px; }

    .spk-cta-eyebrow { display:inline-flex; align-items:center; gap:7px; padding:5px 14px; border-radius:999px; border:1px solid rgba(167,139,250,.25); background:rgba(167,139,250,.07); font-size:11px; font-weight:700; letter-spacing:.2em; color:#A78BFA; font-family:'Space Mono',monospace; margin-bottom:16px; }
    .spk-cta-title   { font-family:'Syne',sans-serif; font-size:clamp(22px,3.5vw,40px); font-weight:900; color:white; letter-spacing:-.02em; line-height:1.1; margin-bottom:12px; }
    .spk-cta-desc    { color:#64748B; font-size:clamp(13px,1.4vw,14px); line-height:1.8; margin-bottom:24px; }
    .spk-metrics     { display:flex; gap:clamp(14px,3vw,26px); flex-wrap:wrap; margin-bottom:28px; }
    .spk-metric-val   { font-family:'Space Mono',monospace; font-size:clamp(18px,2.5vw,24px); font-weight:700; line-height:1; margin-bottom:3px; }
    .spk-metric-label { font-size:10px; color:#475569; text-transform:uppercase; letter-spacing:.12em; font-family:'Space Mono',monospace; }

    .spk-apply-btn {
      display:inline-flex; align-items:center; justify-content:center; gap:9px;
      padding:clamp(12px,1.8vw,15px) clamp(22px,3.5vw,38px); border-radius:13px;
      font-weight:800; font-size:clamp(13px,1.4vw,15px); color:#050D1A;
      background:linear-gradient(135deg,#A78BFA,#4F46E5);
      border:none; cursor:pointer;
      transition:transform .25s,box-shadow .25s,filter .25s;
      font-family:'Manrope',sans-serif; text-decoration:none; width:fit-content;
    }
    .spk-apply-btn:hover { transform:scale(1.05); box-shadow:0 0 50px rgba(167,139,250,.45); filter:brightness(1.1); }
    .spk-contact-row   { display:flex; align-items:center; gap:7px; margin-top:13px; flex-wrap:wrap; }
    .spk-contact-item  { display:flex; align-items:center; gap:6px; font-size:12px; color:#475569; }
    .spk-contact-item a { color:#A78BFA; text-decoration:none; font-weight:600; transition:color .2s; }
    .spk-contact-item a:hover { color:white; }

    .spk-checklist-label { font-size:10px; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.12em; font-family:'Space Mono',monospace; margin-bottom:2px; }
    .spk-checklist-item  { display:flex; align-items:center; gap:10px; padding:9px 13px; border-radius:10px; border:1px solid rgba(255,255,255,.04); background:rgba(255,255,255,.02); font-size:12px; color:#94A3B8; transition:border-color .2s,background .2s; }
    .spk-checklist-item:hover { border-color:rgba(167,139,250,.15); background:rgba(167,139,250,.04); }
    .spk-trust-row  { display:flex; gap:16px; margin-top:6px; padding-top:10px; border-top:1px solid rgba(255,255,255,.04); flex-wrap:wrap; }
    .spk-trust-item { display:flex; align-items:center; gap:5px; font-size:11px; color:#475569; }

    /* ─── FOOTER ─── */
    .spk-footer { background:#050D1A; border-top:1px solid rgba(255,255,255,.04); padding:32px clamp(16px,4vw,28px) 22px; }
    .spk-footer-inner { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; }
    .spk-footer-links { display:flex; gap:18px; flex-wrap:wrap; }

    /* ════════════ RESPONSIVE ════════════ */

    /* Tablet landscape ≤1100px */
    @media(max-width:1100px) {
      .spk-benefits-grid { grid-template-columns:repeat(2,1fr); }
    }

    /* Tablet / small laptop ≤900px */
    @media(max-width:900px) {
      .spk-hero-inner   { grid-template-columns:1fr; }
      .spk-hero-stats   { grid-template-columns:repeat(4,1fr); }
      .spk-grid         { grid-template-columns:repeat(2,1fr); }
      .spk-quote-grid   { grid-template-columns:repeat(2,1fr); }
      .spk-process-grid { grid-template-columns:repeat(2,1fr); }
      .spk-process-grid::before { display:none; }
      .spk-cta-inner    { grid-template-columns:1fr; }
      .spk-cta-left     { border-right:none; border-bottom:1px solid rgba(255,255,255,.05); }
    }

    /* Large mobile ≤640px */
    @media(max-width:640px) {
      .spk-hero-stats   { grid-template-columns:repeat(2,1fr); }
      .spk-grid         { grid-template-columns:1fr; }
      .spk-quote-grid   { grid-template-columns:1fr; }
      .spk-benefits-grid { grid-template-columns:1fr; }
      .spk-cta-row      { flex-direction:column; }
      .spk-cta-primary, .spk-cta-secondary { width:100%; justify-content:center; }
      .spk-process-grid { grid-template-columns:repeat(2,1fr); }
    }

    /* Standard mobile ≤480px */
    @media(max-width:480px) {
      .spk-process-grid { grid-template-columns:1fr; }
      .spk-cta-left, .spk-cta-right { padding:24px 18px; }
      .spk-footer-inner { flex-direction:column; gap:14px; }
      .spk-footer-links { gap:14px; }
    }

    /* Small mobile ≤380px */
    @media(max-width:380px) {
      .spk-stat-val  { font-size:18px; }
      .spk-hero-title { font-size:28px; }
      .spk-cta-left, .spk-cta-right { padding:20px 14px; }
      .spk-benefit-row { flex-wrap:wrap; }
    }
  `}</style>
);

// ─── ICONS ─────────────────────────────────────────────────────────────────────
const LinkedInIcon = () => <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const InstaIcon    = () => <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TwitterIcon  = () => <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const ArrowRight   = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>;
const MicIcon      = () => <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const MailIcon     = () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>;
const StarIcon     = () => <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>;

// ─── ANIMATED CANVAS ──────────────────────────────────────────────────────────
function HeroBgCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let raf;
    const resize = () => { canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
    const pts = Array.from({ length: 38 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - .5) * .00025, vy: (Math.random() - .5) * .00025,
      r: Math.random() * 1.4 + .3, a: Math.random() * .17 + .04,
    }));
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.a})`; ctx.fill();
      });
      const thresh = Math.min(w, h) * .12;
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
        if (d < thresh) { ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.strokeStyle = `rgba(167,139,250,${.018 * (1 - d / thresh)})`; ctx.lineWidth = .5; ctx.stroke(); }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />;
}

// ─── DATA ──────────────────────────────────────────────────────────────────────
const SPEAKERS = [
  // ── CHANGE 1: added photo + real LinkedIn URL ──
  { name:"Pragati Srivastava", role:"Java Backend Developer", company:"Ex-Amazon",  initials:"PS", accent:"#00EEFF", event:"Developers Meetup 2026", eventAccent:"#00EEFF", quote:"Building at scale taught me that great code isn't just functional — it tells a story future devs can read.", topic:"Backend Architecture & Career Growth", photo:"/images/pragati-srivastava.png", linkedin:"https://www.linkedin.com/in/pragatisri/", twitter:"#", instagram:"#" },
//   { name:"Shivani Mehrotra",   role:"Co-Founder & COO",       company:"Edubuk",      initials:"SM", accent:"#4ADE80", event:"CV to Career Workshop",   eventAccent:"#4ADE80", quote:"Verified credentials are the future of hiring. We're here to make your career story undeniable.",          topic:"Blockchain Credentials & Hiring",    linkedin:"#", twitter:"#", instagram:"#" },
//   { name:"Apoorva Bajaj",      role:"Co-Founder & CEO",       company:"Edubuk",      initials:"AB", accent:"#A78BFA", event:"CV to Career Workshop",   eventAccent:"#4ADE80", quote:"The gap between talent and opportunity is often just a trusted signal. TruCV closes that gap permanently.", topic:"EdTech, Careers & Startup",          linkedin:"#", twitter:"#", instagram:"#" },
];

const TESTIMONIALS = [
  { quote:"Speaking at TechEra was one of the most energizing experiences of my career. The audience was genuinely curious and asked the sharpest questions.", name:"Pragati Srivastava", role:"Ex-Amazon · Java Backend", initials:"PS", accent:"#00EEFF",
    photo:"/images/pragati-srivastava.png" },
//   { quote:"The TechEra team made everything seamless — from prep to stage. Zero stress, and the community reception was incredible.",                          name:"Shivani Mehrotra",   role:"COO · Edubuk",           initials:"SM", accent:"#4ADE80" },
//   { quote:"I expected a good audience. I didn't expect the depth of conversation after my talk. Real builders, real questions.",                                name:"Apoorva Bajaj",      role:"CEO · Edubuk",           initials:"AB", accent:"#A78BFA" },
];

const BENEFITS = [
  { icon:"🎤", color:"#A78BFA", bg:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.2)", title:"A Real Stage, Real Audience",   desc:"Speak to 200–1,000+ developers, designers, and founders who show up to learn — not just collect swag." },
  { icon:"📣", color:"#00EEFF", bg:"rgba(0,238,255,.1)",   border:"rgba(0,238,255,.2)",   title:"10K+ Social Amplification",     desc:"Your talk is promoted across TechEra's Instagram, LinkedIn & newsletter — before, during, and after." },
  { icon:"🤝", color:"#4F46E5", bg:"rgba(79,70,229,.12)",  border:"rgba(79,70,229,.25)",  title:"Elite Backstage Networking",    desc:"Connect with speakers, sponsors, and community leaders building India's next generation of tech." },
  { icon:"🏆", color:"#FEBC2E", bg:"rgba(254,188,46,.1)",  border:"rgba(254,188,46,.2)",  title:"Official Speaker Certificate",  desc:"A recognized TechEra credential — add it to your LinkedIn, resume, and portfolio with pride." },
  { icon:"🎁", color:"#4ADE80", bg:"rgba(74,222,128,.1)",  border:"rgba(74,222,128,.2)",  title:"Exclusive Speaker Perks",       desc:"Speaker merch, lifetime free event access, and priority invites to every future TechEra event." },
  { icon:"🌍", color:"#F97316", bg:"rgba(249,115,22,.1)",  border:"rgba(249,115,22,.2)",  title:"Featured Community Profile",    desc:"Your profile lives on TechEra's website and is shared across our partner networks in India and beyond." },
];

const PROCESS_STEPS = [
  { num:"01", color:"#A78BFA", title:"Apply",          desc:"Fill the quick speaker form — under 3 minutes. Just the essentials we need." },
  { num:"02", color:"#4F46E5", title:"We Review",      desc:"Our team reviews within 48 hours and matches you to the right event." },
  { num:"03", color:"#00EEFF", title:"Brief Call",     desc:"A 15-min call to align on topic, format, audience, and expectations." },
  { num:"04", color:"#4ADE80", title:"Take the Stage", desc:"Confirmed! We handle all logistics so you focus on delivering a great talk." },
];

const CHECKLIST = [
  "Featured speaker profile on TechEra website",
  "Pre-event social media promotion across all channels",
  "Dedicated stage time — keynote, session, or workshop",
  "Backstage access & networking with sponsors",
  "Official Speaker Certificate (LinkedIn-ready)",
  "Exclusive speaker merch & lifetime event access",
  "Post-event recap feature & content amplification",
  "Priority invite to all future TechEra events",
];

// ─── SPEAKER CARD ──────────────────────────────────────────────────────────────
function SpeakerCard({ speaker, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="spk-card"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderColor: hov ? `${speaker.accent}35` : "rgba(255,255,255,.06)", boxShadow: hov ? `0 20px 52px ${speaker.accent}16, 0 0 0 1px ${speaker.accent}18` : "none", animation:"slideUp .5s ease-out both", animationDelay:`${index * .1}s` }}
    >
      <div className="spk-card-bar"  style={{ background:`linear-gradient(90deg,${speaker.accent},${speaker.accent}55)` }} />
      <div className="spk-card-glow" style={{ background:`radial-gradient(ellipse at top,${speaker.accent}10,transparent 55%)` }} />
      <div className="spk-card-scan" style={{ background:`linear-gradient(90deg,transparent,${speaker.accent}60,transparent)` }} />
      <div className="spk-avatar-wrap">
        <div className="spk-avatar-ring" style={{ borderColor:speaker.accent }} />
        {/* ── CHANGE 2: show photo if available, else initials ── */}
        <div className="spk-avatar" style={{ background:`${speaker.accent}18`, borderColor:`${speaker.accent}45`, color:speaker.accent, boxShadow:hov?`0 0 24px ${speaker.accent}30`:"none" }}>
          {speaker.photo
            ? <img src={speaker.photo} alt={speaker.name} style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }} />
            : speaker.initials
          }
          {hov && <div className="spk-orbit-dot"  style={{ background:speaker.accent }} />}
          {hov && <div className="spk-orbit-dot2" style={{ background:speaker.accent, opacity:.35 }} />}
        </div>
      </div>
      <div className="spk-card-body">
        <div className="spk-event-tag" style={{ color:speaker.eventAccent, borderColor:`${speaker.eventAccent}35`, background:`${speaker.eventAccent}10` }}>{speaker.event}</div>
        <div className="spk-name">{speaker.name}</div>
        <div className="spk-role"><span style={{ color:speaker.accent, fontWeight:700 }}>{speaker.role}</span> · {speaker.company}</div>
        <div className="spk-topic-label">Spoke About</div>
        <div className="spk-topic-chip" style={{ color:speaker.accent, borderColor:`${speaker.accent}25`, background:`${speaker.accent}0D` }}>{speaker.topic}</div>
        <div className="spk-quote" style={{ borderColor:`${speaker.accent}15` }}>
          <span style={{ color:speaker.accent, opacity:.35, fontSize:22, lineHeight:1 }}>"</span>{speaker.quote}
        </div>
        <div className="spk-socials">
          {[{Icon:LinkedInIcon,l:"LinkedIn",h:speaker.linkedin},{Icon:TwitterIcon,l:"Twitter",h:speaker.twitter},{Icon:InstaIcon,l:"Instagram",h:speaker.instagram}].map(({Icon,l,h})=>(
            <a key={l} href={h} target="_blank" rel="noreferrer" className="spk-soc" aria-label={l}><Icon /></a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function SpeakersPage() {
  return (
    <div className="spk-page">
      <GlobalStyles />
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="spk-hero">
        <div className="spk-hero-bg" /><div className="spk-hero-grid" /><HeroBgCanvas />
        <div className="spk-hero-inner">
          <div className="spk-hero-left">
            <div className="spk-eyebrow">
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#A78BFA", display:"inline-block", animation:"pulseGlow 2s ease-in-out infinite" }} />
              SPEAKERS / COMMUNITY
            </div>
            <h1 className="spk-hero-title">Voices That<br /><span className="shimmer-text">Move Communities.</span></h1>
            <p className="spk-hero-sub">Meet the brilliant minds who've taken the TechEra stage — and discover why speaking here is one of the most impactful things you can do for your career.</p>
            <div className="spk-cta-row">
              <a href="#apply" className="spk-cta-primary"><MicIcon /> Apply as Speaker</a>
              <a href="#speakers" className="spk-cta-secondary">Meet Our Speakers <ArrowRight /></a>
            </div>
          </div>
          <div className="spk-hero-right">
            <div className="spk-hero-stats">
              {[{val:"3+",label:"Expert Speakers",color:"#A78BFA"},{val:"400+",label:"Lives Impacted",color:"#00EEFF"},{val:"5+",label:"Events Powered",color:"#4ADE80"},{val:"48h",label:"Response Time",color:"#FEBC2E"}].map(({val,label,color})=>(
                <div key={label} className="spk-stat-card">
                  <div className="spk-stat-val" style={{color}}>{val}</div>
                  <div className="spk-stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="spk-alumni-bar">
              <div className="spk-alumni-label">Alumni at</div>
              {["Amazon","Edubuk","Tech4Hack"].map(n=><div key={n} className="spk-alumni-chip">{n}</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SPEAKER CARDS ══ */}
      <section id="speakers" className="spk-section" style={{paddingTop:"clamp(48px,7vw,80px)"}}>
        <div className="spk-section-head">
          <div className="spk-sec-eyebrow" style={{border:"1px solid rgba(167,139,250,.2)",background:"rgba(167,139,250,.06)",color:"#A78BFA"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#A78BFA",display:"inline-block",animation:"pulseGlow 2s ease-in-out infinite"}} /> OUR SPEAKERS
          </div>
          <h2 className="spk-sec-title">Builders Who've<br /><span className="shimmer-text">Shared the Stage</span></h2>
          <p className="spk-sec-sub">Real practitioners. Real stories. Every speaker brings years of hands-on experience directly to our community.</p>
        </div>
        <div className="spk-grid">
          {SPEAKERS.map((s,i)=><SpeakerCard key={s.name} speaker={s} index={i}/>)}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="spk-section" style={{paddingTop:0}}>
        <div className="spk-quote-grid">
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className="spk-quote-card"
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${t.accent}25`;e.currentTarget.style.boxShadow=`0 14px 40px ${t.accent}10`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.05)";e.currentTarget.style.boxShadow="none";}}
            >
              <div className="spk-quote-mark" style={{color:t.accent}}>"</div>
              <p className="spk-quote-text">"{t.quote}"</p>
              <div className="spk-quote-author">
                {/* ── CHANGE 3: show photo in testimonial avatar too ── */}
                <div className="spk-quote-avatar" style={{background:`${t.accent}15`,borderColor:`${t.accent}35`,color:t.accent}}>
                  {t.photo
                    ? <img src={t.photo} alt={t.name} style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }} />
                    : t.initials
                  }
                </div>
                <div><div className="spk-quote-name">{t.name}</div><div className="spk-quote-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="spk-divider" />

      {/* ══ HOW IT WORKS ══ */}
      <section className="spk-section">
        <div className="spk-section-head">
          <div className="spk-sec-eyebrow" style={{border:"1px solid rgba(254,188,46,.2)",background:"rgba(254,188,46,.06)",color:"#FEBC2E"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#FEBC2E",display:"inline-block"}}/> HOW IT WORKS
          </div>
          <h2 className="spk-sec-title">From Idea to <span className="grad-text">Stage</span></h2>
          <p className="spk-sec-sub">Simple. Transparent. Fast. Our process respects your time — from first hello to standing ovation.</p>
        </div>
        <div className="spk-process-grid">
          {PROCESS_STEPS.map((step,i)=>(
            <div key={i} className="spk-process-step">
              <div className="spk-process-num" style={{color:step.color,borderColor:`${step.color}35`}}>{step.num}</div>
              <div className="spk-process-title">{step.title}</div>
              <p className="spk-process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="spk-divider" />

      {/* ══ BENEFITS + CTA ══ */}
      <section id="apply" className="spk-section" style={{paddingBottom:"clamp(60px,8vw,100px)"}}>
        <div className="spk-section-head">
          <div className="spk-sec-eyebrow" style={{border:"1px solid rgba(167,139,250,.25)",background:"rgba(167,139,250,.07)",color:"#A78BFA"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#A78BFA",display:"inline-block",animation:"pulseGlow 2s ease-in-out infinite"}}/> WHY SPEAK AT TECHERA
          </div>
          <h2 className="spk-sec-title">Your Stage.<br /><span className="shimmer-text">Your Moment.</span></h2>
          <p className="spk-sec-sub">TechEra speakers don't just present — they become legends in our community. Here's everything you get.</p>
        </div>

        {/* 6 benefit cards */}
        <div className="spk-benefits-grid">
          {BENEFITS.map((b,i)=>(
            <div key={i} className="spk-benefit-row"
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${b.color}22`;e.currentTarget.style.background=b.bg;e.currentTarget.style.transform="translateX(4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.05)";e.currentTarget.style.background="rgba(255,255,255,.02)";e.currentTarget.style.transform="none";}}
            >
              <div className="spk-benefit-icon" style={{background:b.bg,borderColor:b.border}}>{b.icon}</div>
              <div style={{flex:1}}>
                <div className="spk-benefit-title">{b.title}</div>
                <div className="spk-benefit-desc">{b.desc}</div>
              </div>
              <div className="spk-benefit-dot" style={{background:b.color,boxShadow:`0 0 8px ${b.color}60`}}/>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div className="spk-cta-card">
          <div className="spk-cta-glow-tl"/><div className="spk-cta-glow-br"/>
          <div className="spk-cta-top-bar"/>
          <div className="spk-cta-inner">
            <div className="spk-cta-left">
              <div className="spk-cta-eyebrow"><StarIcon /> READY TO SPEAK?</div>
              <h3 className="spk-cta-title">Your knowledge<br />deserves an<br /><span className="shimmer-text">engaged audience.</span></h3>
              <p className="spk-cta-desc">TechEra's community is built on curiosity, ambition, and action. When you speak here, you're not presenting to a passive crowd — you're sparking ideas that will ship into the real world.</p>
              <div className="spk-metrics">
                {[{val:"2,000+",label:"Active Members",color:"#A78BFA"},{val:"400+",label:"Event Attendees",color:"#00EEFF"},{val:"10K+",label:"Social Reach",color:"#4ADE80"}].map(({val,label,color})=>(
                  <div key={label}>
                    <div className="spk-metric-val" style={{color}}>{val}</div>
                    <div className="spk-metric-label">{label}</div>
                  </div>
                ))}
              </div>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSehz9Yy6i5WFw1O3tDYtEkb414jtoWGlf1FFKYlbZG_W8Useg/viewform" target="_blank" rel="noreferrer" className="spk-apply-btn">
                <MicIcon /> Apply as Speaker
              </a>
              <div className="spk-contact-row">
                <div className="spk-contact-item"><MailIcon /><a href="mailto:techeraa151@gmail.com">techeraa151@gmail.com</a></div>
                <div style={{width:3,height:3,borderRadius:"50%",background:"#334155",flexShrink:0}}/>
                <span style={{fontSize:12,color:"#475569"}}>or DM on Instagram</span>
              </div>
            </div>
            <div className="spk-cta-right">
              <div className="spk-checklist-label">What's included</div>
              {CHECKLIST.map((text,i)=>(
                <div key={i} className="spk-checklist-item"
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(167,139,250,.15)";e.currentTarget.style.background="rgba(167,139,250,.04)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.04)";e.currentTarget.style.background="rgba(255,255,255,.02)";}}
                >
                  <span style={{color:"#4ADE80",flexShrink:0,fontSize:13}}>✓</span>{text}
                </div>
              ))}
              <div className="spk-trust-row">
                {[{icon:"⚡",label:"48h Response"},{icon:"🆓",label:"100% Free"},{icon:"🔒",label:"No Spam"}].map(({icon,label})=>(
                  <div key={label} className="spk-trust-item"><span>{icon}</span>{label}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="spk-footer">
        <div className="spk-footer-inner">
          <span style={{color:"#475569",fontSize:12}}>© 2025 TechEra Community. All rights reserved.</span>
          <div className="spk-footer-links">
            {["Terms of Service","Privacy Policy","Cookie Policy"].map(l=>(
              <a key={l} href="#" style={{color:"#475569",fontSize:12,textDecoration:"none",transition:"color .2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#94A3B8"}
                onMouseLeave={e=>e.currentTarget.style.color="#475569"}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}