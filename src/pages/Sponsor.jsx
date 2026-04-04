import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { overflow-x: hidden; background: #050D1A; }

    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

    @keyframes shimmer     { 0%{background-position:0% center} 100%{background-position:200% center} }
    @keyframes pulseGlow   { 0%,100%{opacity:.4} 50%{opacity:1} }
    @keyframes slideUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn      { from{opacity:0} to{opacity:1} }
    @keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes rotateSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes scanLine    { 0%{top:-2px} 100%{top:100%} }
    @keyframes orbitDot    { 0%{transform:rotate(0deg) translateX(54px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(54px) rotate(-360deg)} }
    @keyframes orbitDot2   { 0%{transform:rotate(180deg) translateX(54px) rotate(-180deg)} 100%{transform:rotate(540deg) translateX(54px) rotate(-540deg)} }
    @keyframes countUp     { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
    @keyframes borderPulse { 0%,100%{border-color:rgba(0,238,255,.2)} 50%{border-color:rgba(0,238,255,.5)} }
    @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

    .sp-page { font-family: 'Manrope', sans-serif; background: #050D1A; color: white; min-height: 100vh; }
    .shimmer-text { background: linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }
    .grad-text { background: linear-gradient(135deg,#00EEFF,#4F46E5); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .gold-text { background: linear-gradient(135deg,#FEBC2E,#F97316); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

    /* ── HERO ── */
    .sp-hero { position: relative; min-height: 88vh; display: flex; align-items: center; overflow: hidden; padding: 100px 28px 60px; }
    .sp-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,238,255,.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(79,70,229,.08) 0%, transparent 60%), #050D1A; }
    .sp-hero-grid-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,238,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,238,255,.025) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
    .sp-hero-content { position: relative; max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .sp-hero-left { animation: slideUp .7s ease-out both; }
    .sp-hero-right { animation: slideUp .7s .15s ease-out both; }

    .sp-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 999px; border: 1px solid rgba(0,238,255,.25); background: rgba(0,238,255,.06); font-size: 11px; font-weight: 700; letter-spacing: .22em; color: #00EEFF; font-family: 'Space Mono', monospace; margin-bottom: 20px; }
    .sp-hero-title { font-family: 'Syne', sans-serif; font-size: clamp(36px, 5.5vw, 68px); font-weight: 900; line-height: 1.02; letter-spacing: -.03em; color: white; margin-bottom: 20px; }
    .sp-hero-sub { color: #64748B; font-size: 16px; line-height: 1.8; max-width: 500px; margin-bottom: 36px; }

    .sp-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
    .sp-cta-primary { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; border-radius: 16px; font-weight: 800; font-size: 15px; color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5); border: none; cursor: pointer; transition: transform .25s, box-shadow .25s, filter .25s; font-family: 'Manrope', sans-serif; text-decoration: none; white-space: nowrap; }
    .sp-cta-primary:hover { transform: scale(1.05); box-shadow: 0 0 48px rgba(0,238,255,.4); filter: brightness(1.08); }
    .sp-cta-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 15px 28px; border-radius: 16px; font-weight: 700; font-size: 14px; color: #94A3B8; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03); cursor: pointer; transition: all .25s; font-family: 'Manrope', sans-serif; text-decoration: none; white-space: nowrap; }
    .sp-cta-secondary:hover { color: #00EEFF; border-color: rgba(0,238,255,.3); background: rgba(0,238,255,.05); }

    /* ── HERO STATS ── */
    .sp-hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .sp-stat-card { padding: 22px 22px; border-radius: 18px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; position: relative; overflow: hidden; transition: border-color .3s, transform .3s; }
    .sp-stat-card:hover { border-color: rgba(0,238,255,.2); transform: translateY(-3px); }
    .sp-stat-card::before { content:""; position:absolute; inset:0; background: radial-gradient(circle at top left, rgba(0,238,255,.05), transparent 60%); pointer-events:none; }
    .sp-stat-val { font-family: 'Space Mono', monospace; font-size: 32px; font-weight: 700; color: #00EEFF; line-height: 1; margin-bottom: 5px; animation: countUp .5s ease-out both; }
    .sp-stat-val.gold { color: #FEBC2E; }
    .sp-stat-val.purple { color: #A78BFA; }
    .sp-stat-val.green { color: #4ADE80; }
    .sp-stat-label { font-size: 12px; color: #475569; text-transform: uppercase; letter-spacing: .1em; font-family: 'Space Mono', monospace; }

    /* ── SECTION WRAPPER ── */
    .sp-section { max-width: 1200px; margin: 0 auto; padding: 0 28px 100px; }
    .sp-section-head { text-align: center; margin-bottom: 60px; }
    .sp-sec-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 16px; border-radius: 999px; border: 1px solid rgba(254,188,46,.25); background: rgba(254,188,46,.06); font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #FEBC2E; font-family: 'Space Mono', monospace; margin-bottom: 16px; }
    .sp-sec-title { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 46px); font-weight: 900; color: white; letter-spacing: -.03em; line-height: 1.08; margin-bottom: 12px; }
    .sp-sec-sub { color: #64748B; font-size: 15px; line-height: 1.75; max-width: 500px; margin: 0 auto; }
    .sp-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(0,238,255,.18), transparent); max-width: 1200px; margin: 0 auto 80px; }

    /* ── TIER BADGES ── */
    .sp-tier-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; font-size: 10px; font-weight: 700; font-family: 'Space Mono', monospace; letter-spacing: .12em; }
    .tier-platinum { background: rgba(148,163,184,.1); border: 1px solid rgba(148,163,184,.3); color: #94A3B8; }
    .tier-gold { background: rgba(254,188,46,.1); border: 1px solid rgba(254,188,46,.3); color: #FEBC2E; }
    .tier-silver { background: rgba(167,139,250,.1); border: 1px solid rgba(167,139,250,.3); color: #A78BFA; }
    .tier-community { background: rgba(0,238,255,.08); border: 1px solid rgba(0,238,255,.25); color: #00EEFF; }
    .tier-upskilling { background: rgba(0,238,255,.08); border: 1px solid rgba(0,238,255,.25); color: #00EEFF; }
    .tier-job { background: rgba(254,188,46,.08); border: 1px solid rgba(254,188,46,.3); color: #FEBC2E; }
    .tier-in-kind { background: rgba(167,139,250,.08); border: 1px solid rgba(167,139,250,.3); color: #A78BFA; }
    .tier-goodies { background: rgba(254,188,46,.08); border: 1px solid rgba(254,188,46,.3); color: #FEBC2E; }
    .tier-innovation { background: rgba(254,188,46,.08); border: 1px solid rgba(254,188,46,.3); color: #FEBC2E; }
    .tier-venue { background: rgba(148,163,184,.08); border: 1px solid rgba(148,163,184,.3); color: #94A3B8; }

    /* ── SPONSORS SHOWCASE GRID ── */
    .sp-showcase-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

    /* Featured / Platinum span full row */
    .sp-sponsor-card { position: relative; border-radius: 22px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; overflow: hidden; transition: transform .4s cubic-bezier(.23,1,.32,1), border-color .4s, box-shadow .4s; }
    .sp-sponsor-card:hover { transform: translateY(-8px); }
    .sp-sponsor-card.featured { grid-column: span 3; display: grid; grid-template-columns: 1fr 1fr; }
    .sp-sponsor-card-bar { height: 3px; width: 100%; }
    .sp-sponsor-card.featured .sp-sponsor-card-bar { display: none; }
    .sp-sponsor-card.featured .sp-featured-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }

    .sp-sponsor-scan { position: absolute; left: 0; right: 0; height: 1px; pointer-events: none; opacity: 0; transition: opacity .3s; }
    .sp-sponsor-card:hover .sp-sponsor-scan { opacity: 1; animation: scanLine 2.5s linear infinite; }

    .sp-sponsor-logo-area { padding: 36px 32px 28px; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .sp-sponsor-card.featured .sp-sponsor-logo-area { padding: 48px 40px; border-right: 1px solid rgba(255,255,255,.05); align-items: flex-start; text-align: left; justify-content: center; }

    .sp-logo-ring-wrap { position: relative; width: 72px; height: 72px; margin: 0 auto 16px; }
    .sp-sponsor-card.featured .sp-logo-ring-wrap { margin: 0 0 20px; }
    .sp-logo-ring { position: absolute; inset: -10px; border-radius: 50%; border: 1px dashed; opacity: .25; }
    .sp-sponsor-card:hover .sp-logo-ring { animation: rotateSlow 10s linear infinite; opacity: .5; }
    .sp-logo-box { width: 72px; height: 72px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid; position: relative; transition: transform .35s; }
    .sp-sponsor-card:hover .sp-logo-box { transform: scale(1.05) translateY(-2px); }
    /* Orbit dots on featured */
    .sp-orbit-dot { position: absolute; width: 7px; height: 7px; border-radius: 50%; top: 50%; left: 50%; margin: -3.5px 0 0 -3.5px; animation: orbitDot 3s linear infinite; }
    .sp-orbit-dot2 { position: absolute; width: 5px; height: 5px; border-radius: 50%; top: 50%; left: 50%; margin: -2.5px 0 0 -2.5px; animation: orbitDot2 5s linear infinite; }

    .sp-sponsor-name { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 900; color: white; margin-bottom: 4px; }
    .sp-sponsor-card.featured .sp-sponsor-name { font-size: 26px; }
    .sp-sponsor-tagline { font-size: 13px; color: #64748B; margin-bottom: 14px; line-height: 1.6; }
    .sp-sponsor-card.featured .sp-sponsor-tagline { max-width: 360px; font-size: 14px; }

    .sp-sponsor-tags { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
    .sp-sponsor-card.featured .sp-sponsor-tags { justify-content: flex-start; }
    .sp-sponsor-tag { padding: 3px 10px; border-radius: 999px; font-size: 10px; font-weight: 700; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.04); color: #64748B; font-family: 'Space Mono', monospace; }

    .sp-sponsor-perks-area { padding: 36px 32px; display: flex; flex-direction: column; justify-content: center; gap: 12px; }
    .sp-sponsor-perk-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,.04); background: rgba(255,255,255,.02); }
    .sp-sponsor-perk-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
    .sp-sponsor-perk-title { font-size: 13px; font-weight: 700; color: white; margin-bottom: 2px; }
    .sp-sponsor-perk-desc { font-size: 12px; color: #64748B; line-height: 1.6; }
    .sp-sponsor-card.featured .sp-sponsor-card-bar.side { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; height: 100%; }

    /* Small card details section */
    .sp-sponsor-body { padding: 18px 22px 22px; text-align: center; }
    .sp-sponsor-events { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 12px; }
    .sp-sponsor-event-chip { padding: 2px 10px; border-radius: 999px; font-size: 10px; font-weight: 700; font-family: 'Space Mono', monospace; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.03); color: #475569; }

    /* ── BENEFITS CARD ── */
    .sp-benefits-card { position: relative; border-radius: 28px; overflow: hidden; border: 1px solid rgba(0,238,255,.15); background: linear-gradient(135deg, #08142a 0%, #0d1f3c 50%, #0a1628 100%); }
    .sp-benefits-glow-tl { position: absolute; top: -60px; left: -60px; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(0,238,255,.12), transparent 65%); pointer-events: none; animation: pulseGlow 4s ease-in-out infinite; }
    .sp-benefits-glow-br { position: absolute; bottom: -60px; right: -60px; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle, rgba(167,139,250,.1), transparent 65%); pointer-events: none; animation: pulseGlow 4s 2s ease-in-out infinite; }
    .sp-benefits-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
    .sp-benefits-left { padding: 56px 48px; border-right: 1px solid rgba(255,255,255,.05); }
    .sp-benefits-right { padding: 56px 48px; display: flex; flex-direction: column; gap: 14px; }
    .sp-benefits-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 999px; border: 1px solid rgba(0,238,255,.25); background: rgba(0,238,255,.07); font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #00EEFF; font-family: 'Space Mono', monospace; margin-bottom: 20px; }
    .sp-benefits-title { font-family: 'Syne', sans-serif; font-size: clamp(28px, 3.5vw, 40px); font-weight: 900; color: white; letter-spacing: -.02em; line-height: 1.12; margin-bottom: 14px; }
    .sp-benefits-desc { color: #64748B; font-size: 14px; line-height: 1.8; margin-bottom: 32px; max-width: 400px; }
    .sp-benefits-metrics { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 36px; }
    .sp-benefits-metric { text-align: center; }
    .sp-benefits-metric-val { font-family: 'Space Mono', monospace; font-size: 24px; font-weight: 700; line-height: 1; margin-bottom: 3px; }
    .sp-benefits-metric-label { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: .12em; font-family: 'Space Mono', monospace; }
    .sp-apply-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 17px 40px; border-radius: 16px; font-weight: 800; font-size: 16px; color: #050D1A; background: linear-gradient(135deg, #00EEFF, #4F46E5); border: none; cursor: pointer; transition: transform .25s, box-shadow .25s, filter .25s; font-family: 'Manrope', sans-serif; text-decoration: none; width: fit-content; animation: borderPulse 3s ease-in-out infinite; }
    .sp-apply-btn:hover { transform: scale(1.05); box-shadow: 0 0 56px rgba(0,238,255,.45); filter: brightness(1.1); }
    .sp-contact-row { display: flex; align-items: center; gap: 12px; margin-top: 16px; }
    .sp-contact-item { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #475569; }
    .sp-contact-item a { color: #00EEFF; text-decoration: none; font-weight: 600; transition: color .2s; }
    .sp-contact-item a:hover { color: white; }

    /* Benefit row items */
    .sp-benefit-item { display: flex; align-items: flex-start; gap: 14px; padding: 18px 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,.05); background: rgba(255,255,255,.02); transition: border-color .3s, background .3s, transform .3s; }
    .sp-benefit-item:hover { border-color: rgba(0,238,255,.15); background: rgba(0,238,255,.04); transform: translateX(4px); }
    .sp-benefit-icon-box { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; border: 1px solid; }
    .sp-benefit-text-title { font-size: 14px; font-weight: 700; color: white; margin-bottom: 3px; }
    .sp-benefit-text-desc { font-size: 12px; color: #64748B; line-height: 1.6; }

    /* ── TIERS TABLE ── */
    .sp-tiers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .sp-tier-card { position: relative; border-radius: 24px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; overflow: hidden; padding: 32px 28px 36px; transition: transform .4s cubic-bezier(.23,1,.32,1), border-color .4s, box-shadow .4s; }
    .sp-tier-card:hover { transform: translateY(-8px); }
    .sp-tier-card.highlight { border-color: rgba(0,238,255,.2); }
    .sp-tier-top-bar { height: 4px; width: 100%; border-radius: 2px; margin-bottom: 28px; }
    .sp-tier-icon { font-size: 36px; margin-bottom: 14px; display: block; }
    .sp-tier-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: white; margin-bottom: 6px; }
    .sp-tier-desc { font-size: 13px; color: #64748B; line-height: 1.65; margin-bottom: 24px; }
    .sp-tier-features { display: flex; flex-direction: column; gap: 10px; }
    .sp-tier-feature { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #94A3B8; }
    .sp-tier-feature-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
    .sp-tier-popular-badge { position: absolute; top: 18px; right: 18px; padding: 4px 12px; border-radius: 999px; font-size: 10px; font-weight: 700; font-family: 'Space Mono', monospace; background: rgba(0,238,255,.12); border: 1px solid rgba(0,238,255,.3); color: #00EEFF; }

    /* ── TRUST BAR ── */
    .sp-trust-bar { padding: 28px 28px; background: rgba(255,255,255,.02); border-top: 1px solid rgba(255,255,255,.04); border-bottom: 1px solid rgba(255,255,255,.04); }
    .sp-trust-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
    .sp-trust-label { font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: .15em; font-family: 'Space Mono', monospace; }
    .sp-trust-logos { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
    .sp-trust-logo-chip { padding: 6px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.03); font-size: 12px; font-weight: 700; color: #475569; font-family: 'Space Mono', monospace; transition: all .25s; }
    .sp-trust-logo-chip:hover { border-color: rgba(0,238,255,.2); color: #94A3B8; }

    /* ── PROCESS ── */
    .sp-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position: relative; }
    .sp-process-grid::before { content:""; position:absolute; top:38px; left:10%; right:10%; height:1px; background:linear-gradient(90deg,transparent,rgba(0,238,255,.2),rgba(167,139,250,.2),transparent); pointer-events:none; }
    .sp-process-step { text-align: center; padding: 28px 20px; border-radius: 20px; border: 1px solid rgba(255,255,255,.04); background: #0A1628; transition: transform .3s, border-color .3s; position: relative; }
    .sp-process-step:hover { transform: translateY(-5px); border-color: rgba(0,238,255,.12); }
    .sp-process-num { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-size: 16px; font-weight: 700; margin: 0 auto 16px; border: 1px solid; background: #050D1A; position: relative; z-index: 1; transition: box-shadow .3s; }
    .sp-process-step:hover .sp-process-num { box-shadow: 0 0 24px rgba(0,238,255,.3); }
    .sp-process-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: white; margin-bottom: 8px; }
    .sp-process-desc { font-size: 13px; color: #64748B; line-height: 1.65; }

    /* ── RESPONSIVE ── */
    @media(max-width:1023px) {
      .sp-hero-content { grid-template-columns: 1fr; gap: 40px; }
      .sp-hero-stats { grid-template-columns: repeat(4,1fr); }
      .sp-showcase-grid { grid-template-columns: repeat(2,1fr); }
      .sp-sponsor-card.featured { grid-column: span 2; grid-template-columns: 1fr; }
      .sp-sponsor-card.featured .sp-sponsor-logo-area { border-right: none; border-bottom: 1px solid rgba(255,255,255,.05); }
      .sp-tiers-grid { grid-template-columns: 1fr; }
      .sp-process-grid { grid-template-columns: repeat(2,1fr); }
      .sp-process-grid::before { display: none; }
      .sp-benefits-inner { grid-template-columns: 1fr; }
      .sp-benefits-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,.05); padding: 40px 32px; }
      .sp-benefits-right { padding: 40px 32px; }
    }
    @media(max-width:767px) {
      .sp-hero { padding: 90px 16px 50px; min-height: auto; }
      .sp-hero-stats { grid-template-columns: 1fr 1fr; }
      .sp-section { padding: 0 16px 72px; }
      .sp-showcase-grid { grid-template-columns: 1fr; }
      .sp-sponsor-card.featured { grid-column: span 1; }
      .sp-trust-inner { flex-direction: column; align-items: flex-start; }
      .sp-benefits-left, .sp-benefits-right { padding: 32px 24px; }
      .sp-benefits-metrics { gap: 16px; }
    }
  `}</style>
);

// ─── ICONS ─────────────────────────────────────────────────────────────────────
const ArrowRight = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>;
const MailIcon = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>;
const PhoneIcon = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/></svg>;
const CheckIcon = () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5"/></svg>;
const SparkleIcon = () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>;

// ─── DATA ──────────────────────────────────────────────────────────────────────
const SPECIAL_SPONSORS = [
  {
    id: "tech4hack",
    name: "Tech4Hack",
    logo: "/logos/Tech4hack.jpeg",
    tier: "Venue",
    tierColor: "#94A3B8",
    tierBg: "rgba(148,163,184,.08)",
    tierBorder: "rgba(148,163,184,.25)",
    accent: "#94A3B8",
    gradient: "linear-gradient(135deg,#94A3B8,#64748B)",
    tagline: "Our longest-standing partner providing venues, technical resources, and community support for TechEra events.",
    tags: ["Venue Partner", "Open Source", "Community"],
    events: ["Dev Meetup 2026", "Hackathon 2025", "Workshop Series"],
    featured: false
  },
  {
    id: "edubuk",
    name: "Edubuk",
    logo: "/logos/Edubuk.jpeg",
    tier: "Job and Recruitment",
    tierColor: "#FEBC2E",
    tierBg: "rgba(254,188,46,.08)",
    tierBorder: "rgba(254,188,46,.3)",
    accent: "#FEBC2E",
    gradient: "linear-gradient(135deg,#FEBC2E,#F97316)",
    tagline: "Powering career growth through blockchain credentials and placements.",
    tags: ["Knowledge Partner", "Career", "Blockchain"],
    events: ["CV to Career Workshop", "Dev Meetup 2026"],
    featured: false,
  },
  {
    id: "osen",
    name: "OSEN",
    logo: "/logos/OSEN.png",
    tier: "In-Kind",
    tierColor: "#A78BFA",
    tierBg: "rgba(167,139,250,.08)",
    tierBorder: "rgba(167,139,250,.3)",
    accent: "#A78BFA",
    gradient: "linear-gradient(135deg,#A78BFA,#4F46E5)",
    tagline: "Curated goodies and swag for memorable TechEra events.",
    tags: ["Goodies Partner", "Swag"],
    events: ["Dev Meetup 2026"],
    featured: false,
  },
  {
    id: "MetaSpace",
    name: "MetaSpace",
    logo: "/logos/Metaspace.jpeg",
    tier: "Goodies",
    tierColor: "#FEBC2E",
    tierBg: "rgba(254,188,46,.08)",
    tierBorder: "rgba(254,188,46,.3)",
    accent: "#FEBC2E",
    gradient: "linear-gradient(135deg,#FEBC2E,#F97316)",
    tagline: "Career growth and verified credential partnerships.",
    tags: ["Knowledge Partner", "Career"],
    events: ["Dev Meetup 2026"],
    featured: false,
  },
  {
    id: "OppSkill",
    name: "Opp Skill",
    logo: "/logos/Oppskill.png",
    tier: "Innovation",
    tierColor: "#FEBC2E",
    tierBg: "rgba(254,188,46,.08)",
    tierBorder: "rgba(254,188,46,.3)",
    accent: "#FEBC2E",
    gradient: "linear-gradient(135deg,#FEBC2E,#F97316)",
    tagline: "Empowering developers with skill-based growth programs.",
    tags: ["Knowledge Partner", "Career"],
    events: ["Dev Meetup 2026"],
    featured: false,
  },
];

const BENEFITS = [
  { icon: "👁️", color: "#00EEFF", bg: "rgba(0,238,255,.1)", border: "rgba(0,238,255,.2)", title: "Brand Visibility", desc: "Your logo on all event materials, banners, digital assets, and social media posts reaching 10K+ developers." },
  { icon: "🎯", color: "#FEBC2E", bg: "rgba(254,188,46,.1)", border: "rgba(254,188,46,.2)", title: "Targeted Reach", desc: "Direct exposure to students, developers, designers, and founders actively building in India's tech ecosystem." },
  { icon: "🏢", color: "#A78BFA", bg: "rgba(167,139,250,.1)", border: "rgba(167,139,250,.2)", title: "Dedicated Booth / Slot", desc: "A dedicated space at in-person events to showcase products, recruit talent, and engage directly with attendees." },
  { icon: "📣", color: "#4ADE80", bg: "rgba(74,222,128,.1)", border: "rgba(74,222,128,.2)", title: "Social Amplification", desc: "Shoutouts, co-branded posts, and feature stories across our Instagram, LinkedIn, and community channels." },
  { icon: "🤝", color: "#F97316", bg: "rgba(249,115,22,.1)", border: "rgba(249,115,22,.2)", title: "Talent Pipeline", desc: "First access to our community of 2,000+ developers for internships, hiring, and brand ambassadorships." },
  { icon: "📄", color: "#06B6D4", bg: "rgba(6,182,212,.1)", border: "rgba(6,182,212,.2)", title: "Recap & Content", desc: "Featured in post-event reports, highlight reels, and media coverage — your brand story told authentically." },
];

const SPONSOR_TIERS = [
  {
    name: "Community", icon: "🌱", color: "#00EEFF", gradient: "linear-gradient(135deg,#00EEFF,#06B6D4)",
    desc: "Perfect for brands looking to associate with tech talent and build grassroots awareness.",
    features: ["Logo on event materials", "Social media mention", "Attendee goodie bag inclusion", "Certificate of partnership"],
    highlight: false,
  },
  {
    name: "Gold", icon: "⭐", color: "#FEBC2E", gradient: "linear-gradient(135deg,#FEBC2E,#F97316)",
    desc: "Prime positioning for brands wanting deep community engagement and visibility.",
    features: ["Everything in Community", "Dedicated booth at event", "5 minutes brand talk slot", "Co-branded social campaign", "Priority talent access"],
    highlight: true,
    popular: true,
  },
  {
    name: "Platinum", icon: "💎", color: "#94A3B8", gradient: "linear-gradient(135deg,#CBD5E1,#94A3B8)",
    desc: "Full-spectrum partnership for brands ready to become a core part of TechEra's identity.",
    features: ["Everything in Gold", "Year-round brand presence", "Co-hosted events", "Exclusive sponsor rights", "Direct hiring pipeline", "Featured sponsor profile"],
    highlight: false,
  },
];

const PROCESS_STEPS = [
  { num: "01", color: "#00EEFF", title: "Reach Out", desc: "Send us a message via the form or email — we'll get back within 24 hours." },
  { num: "02", color: "#FEBC2E", title: "Discovery Call", desc: "A 20-minute chat to understand your goals, audience, and ideal sponsorship fit." },
  { num: "03", color: "#A78BFA", title: "Custom Proposal", desc: "We craft a tailored sponsorship package aligned with your brand objectives." },
  { num: "04", color: "#4ADE80", title: "Go Live!", desc: "We activate your sponsorship and begin co-creating content and event experiences." },
];

// ─── ANIMATED CANVAS BG ────────────────────────────────────────────────────────
function HeroBgCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = canvas.parentElement.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 50 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0002, vy: (Math.random() - .5) * .0002, r: Math.random() * 1.5 + .3, a: Math.random() * .2 + .04 }));
    const draw = () => {
      const w = canvas.width, h = canvas.height; ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,238,255,${p.a})`; ctx.fill();
      });
      const thresh = Math.min(w, h) * .12;
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
        if (d < thresh) { ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.strokeStyle = `rgba(0,238,255,${.025 * (1 - d / thresh)})`; ctx.lineWidth = .5; ctx.stroke(); }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

// ─── FEATURED SPONSOR CARD ─────────────────────────────────────────────────────
function FeaturedSponsorCard({ sp }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="sp-sponsor-card featured"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderColor: hov ? `${sp.accent}35` : "rgba(255,255,255,.05)", boxShadow: hov ? `0 24px 64px ${sp.accent}12` : "none" }}
    >
      {/* side bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: sp.gradient, borderRadius: "22px 0 0 22px" }} />
      <div className="sp-sponsor-scan" style={{ background: `linear-gradient(90deg,transparent,${sp.accent}40,transparent)` }} />

      {/* Left: logo + info */}
      <div className="sp-sponsor-logo-area">
        <div className="sp-logo-ring-wrap" style={{ marginLeft: 0 }}>
          <div className="sp-logo-ring" style={{ borderColor: sp.accent }} />
          <div className="sp-logo-box" style={{ background: `${sp.accent}10`, borderColor: `${sp.accent}30`, boxShadow: hov ? `0 0 32px ${sp.accent}25` : "none" }}>
            {sp.logo ? <img src={sp.logo} alt={sp.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "14px" }} /> : sp.emoji}
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div className={`sp-tier-badge tier-${sp.tier.toLowerCase().replace(/\s+/g, '-')}`} style={{ marginBottom: 10 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: sp.tierColor, display: "inline-block", animation: "pulseGlow 2s infinite" }} />
            {sp.tier} Partner
          </div>
        </div>
        <div className="sp-sponsor-name">{sp.name}</div>
        <p className="sp-sponsor-tagline">{sp.tagline}</p>
        <div className="sp-sponsor-tags">
          {sp.tags.map(t => <span key={t} className="sp-sponsor-tag">{t}</span>)}
        </div>
        <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", fontFamily: "Space Mono,monospace", textTransform: "uppercase", letterSpacing: ".1em", width: "100%", marginBottom: 4 }}>Powered</div>
          {sp.events.map(e => <span key={e} className="sp-sponsor-event-chip">{e}</span>)}
        </div>
      </div>

      {/* Right: perks */}
      {sp.perks && (
        <div className="sp-sponsor-perks-area">
          <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".12em", fontFamily: "Space Mono,monospace", marginBottom: 4 }}>Partnership Highlights</div>
          {sp.perks.map((p, i) => (
            <div key={i} className="sp-sponsor-perk-row" style={{ borderColor: hov ? `${sp.accent}18` : "rgba(255,255,255,.04)" }}>
              <div className="sp-sponsor-perk-icon">{p.icon}</div>
              <div>
                <div className="sp-sponsor-perk-title">{p.title}</div>
                <div className="sp-sponsor-perk-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── REGULAR SPONSOR CARD ──────────────────────────────────────────────────────
function SponsorCard({ sp }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="sp-sponsor-card"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderColor: hov ? `${sp.accent}30` : "rgba(255,255,255,.05)", boxShadow: hov ? `0 16px 48px ${sp.accent}12` : "none" }}
    >
      <div className="sp-sponsor-card-bar" style={{ background: sp.gradient }} />
      <div className="sp-sponsor-scan" style={{ background: `linear-gradient(90deg,transparent,${sp.accent}40,transparent)` }} />
      <div className="sp-sponsor-logo-area">
        <div className="sp-logo-ring-wrap">
          <div className="sp-logo-ring" style={{ borderColor: sp.accent }} />
          <div className="sp-logo-box" style={{ background: `${sp.accent}10`, borderColor: `${sp.accent}28`, boxShadow: hov ? `0 0 22px ${sp.accent}20` : "none" }}>
            {sp.logo ? <img src={sp.logo} alt={sp.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "14px" }} /> : sp.emoji}
          </div>
        </div>
        <div className={`sp-tier-badge tier-${sp.tier.toLowerCase().replace(/\s+/g, '-')}`} style={{ marginBottom: 10 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: sp.tierColor, display: "inline-block" }} />
          {sp.tier} Partner
        </div>
        <div className="sp-sponsor-name">{sp.name}</div>
        <p className="sp-sponsor-tagline" style={{ fontSize: 13 }}>{sp.tagline}</p>
        <div className="sp-sponsor-tags">
          {sp.tags.map(t => <span key={t} className="sp-sponsor-tag">{t}</span>)}
        </div>
        <div className="sp-sponsor-events">
          {sp.events.map(e => <span key={e} className="sp-sponsor-event-chip">{e}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─── SPONSOR APPLICATION FORM (inline section) ─────────────────────────────────
function SponsorForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", tier: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const handleSend = () => { if (form.name && form.email && form.company) setSent(true); };

  if (sent) return (
    <div style={{ padding: "60px 32px", textAlign: "center", animation: "slideUp .4s ease-out both" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
      <div style={{ fontFamily: "Syne,sans-serif", fontSize: 26, fontWeight: 900, color: "white", marginBottom: 10 }}>We'll be in touch soon!</div>
      <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.75 }}>Our partnerships team will reach out within 24 hours to schedule a discovery call.</div>
    </div>
  );

  return (
    <div style={{ padding: "36px 40px 40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {[{ k: "name", label: "Your Full Name *", placeholder: "Rahul Sharma" }, { k: "company", label: "Company / Brand *", placeholder: "TechCorp India" }].map(({ k, label, placeholder }) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".1em", fontFamily: "Space Mono,monospace" }}>{label}</label>
            <input value={form[k]} onChange={set(k)} placeholder={placeholder}
              style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: 14, fontFamily: "Manrope,sans-serif", outline: "none", transition: "border-color .2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(0,238,255,.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {[{ k: "email", label: "Email Address *", placeholder: "you@company.com", type: "email" }, { k: "phone", label: "Phone Number", placeholder: "+91 XXXXX XXXXX" }].map(({ k, label, placeholder, type }) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".1em", fontFamily: "Space Mono,monospace" }}>{label}</label>
            <input type={type || "text"} value={form[k]} onChange={set(k)} placeholder={placeholder}
              style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: 14, fontFamily: "Manrope,sans-serif", outline: "none", transition: "border-color .2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(0,238,255,.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".1em", fontFamily: "Space Mono,monospace" }}>Preferred Tier</label>
        <select value={form.tier} onChange={set("tier")}
          style={{ appearance: "none", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "12px 16px", color: form.tier ? "white" : "#334155", fontSize: 14, fontFamily: "Manrope,sans-serif", outline: "none", cursor: "pointer", transition: "border-color .2s" }}
          onFocus={e => e.target.style.borderColor = "rgba(0,238,255,.4)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"}
        >
          <option value="">Select Sponsorship Tier</option>
          <option value="community">🌱 Community Partner</option>
          <option value="gold">⭐ Gold Partner</option>
          <option value="platinum">💎 Platinum Partner</option>
          <option value="custom">✨ Custom / Discuss</option>
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 28 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".1em", fontFamily: "Space Mono,monospace" }}>Tell us about your goals</label>
        <textarea value={form.message} onChange={set("message")} placeholder="What do you hope to achieve through this sponsorship? Tell us about your brand and audience..."
          style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: 14, fontFamily: "Manrope,sans-serif", outline: "none", resize: "vertical", minHeight: 100, transition: "border-color .2s" }}
          onFocus={e => e.target.style.borderColor = "rgba(0,238,255,.4)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"}
        />
      </div>
      <button onClick={handleSend} disabled={!form.name || !form.email || !form.company}
        style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 36px", borderRadius: 14, fontWeight: 800, fontSize: 15, color: "#050D1A", background: "linear-gradient(135deg,#00EEFF,#4F46E5)", border: "none", cursor: form.name && form.email && form.company ? "pointer" : "not-allowed", opacity: form.name && form.email && form.company ? 1 : .45, transition: "transform .25s, box-shadow .25s", fontFamily: "Manrope,sans-serif" }}
        onMouseEnter={e => { if (form.name && form.email && form.company) { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,238,255,.35)"; } }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <SparkleIcon /> Apply to Sponsor TechEra
      </button>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function SponsorsPage() {
  const featured = SPECIAL_SPONSORS.find(s => s.featured);
  const regular = SPECIAL_SPONSORS.filter(s => !s.featured);

  return (
    <div className="sp-page">
      <GlobalStyles />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="sp-hero">
        <div className="sp-hero-bg" />
        <div className="sp-hero-grid-lines" />
        <HeroBgCanvas />
        <div className="sp-hero-content">
          <div className="sp-hero-left">
            <div className="sp-eyebrow">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00EEFF", display: "inline-block", animation: "pulseGlow 2s ease-in-out infinite" }} />
              SPONSORSHIPS & PARTNERSHIPS
            </div>
            <h1 className="sp-hero-title">
              Grow your brand<br />
              where <span className="shimmer-text">builders</span><br />
              actually live.
            </h1>
            <p className="sp-hero-sub">
              TechEra connects your brand with India's most passionate developers, designers, and founders — at events that actually matter.
            </p>
            <div className="sp-cta-row">
              <a href="#apply" className="sp-cta-primary">
                <SparkleIcon /> Become a Sponsor
              </a>
              <a href="#sponsors" className="sp-cta-secondary">
                Meet Our Partners <ArrowRight />
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="sp-hero-right">
            <div className="sp-hero-stats">
              {[
                { val: "2K+", label: "Community Members", cls: "" },
                { val: "10+", label: "Partner Brands", cls: "gold" },
                { val: "3+", label: "Events Hosted", cls: "purple" },
                { val: "3+", label: "Expert Speakers", cls: "green" },
              ].map(({ val, label, cls }) => (
                <div key={label} className="sp-stat-card">
                  <div className={`sp-stat-val ${cls}`}>{val}</div>
                  <div className="sp-stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Mini trust row */}
            <div style={{ marginTop: 20, padding: "18px 20px", borderRadius: 16, border: "1px solid rgba(0,238,255,.1)", background: "rgba(0,238,255,.04)", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", fontFamily: "Space Mono,monospace", textTransform: "uppercase", letterSpacing: ".1em", flexShrink: 0 }}>Trusted by</div>
              {["Tech4Hack", "Edubuk", "OSEN", "MetaSpace", "Opp Skill"].map(name => (
                <div key={name} style={{ padding: "4px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.03)", fontSize: 11, fontWeight: 700, color: "#64748B", fontFamily: "Space Mono,monospace" }}>{name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────────── */}
      <div className="sp-trust-bar">
        <div className="sp-trust-inner">
          <div className="sp-trust-label">Official Partners →</div>
          <div className="sp-trust-logos">
            {["🚀 Tech4Hack", "🎓 Edubuk", "🎁 OSEN", "🤝 MetaSpace", "⚡ Opp Skill"].map(name => (
              <div key={name} className="sp-trust-logo-chip">{name}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OUR SPECIAL SPONSORS ─────────────────────────────────────────────── */}
      <div style={{ height: 80 }} />
      <section id="sponsors" className="sp-section">
        <div className="sp-section-head">
          <div className="sp-sec-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FEBC2E", display: "inline-block", animation: "pulseGlow 2s ease-in-out infinite" }} />
            OUR SPECIAL SPONSORS
          </div>
          <h2 className="sp-sec-title">The brands that power<br /><span className="shimmer-text">every TechEra experience</span></h2>
          <p className="sp-sec-sub">These aren't just logos on a banner — they're partners who've invested in the community and shown up, every single time.</p>
        </div>

        <div className="sp-showcase-grid">
          {/* Featured card */}
          {featured && <FeaturedSponsorCard sp={featured} />}
          {/* Regular cards */}
          {regular.map(sp => <SponsorCard key={sp.id} sp={sp} />)}
        </div>
      </section>

      <div className="sp-divider" />

      {/* ── SPONSOR BENEFITS CARD ─────────────────────────────────────────────── */}
      <section className="sp-section" id="benefits">
        <div className="sp-section-head">
          <div className="sp-sec-eyebrow" style={{ borderColor: "rgba(0,238,255,.25)", background: "rgba(0,238,255,.06)", color: "#00EEFF" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00EEFF", display: "inline-block", animation: "pulseGlow 2s ease-in-out infinite" }} />
            WHY SPONSOR US
          </div>
          <h2 className="sp-sec-title">What you get when you<br /><span className="grad-text">partner with TechEra</span></h2>
          <p className="sp-sec-sub">We don't just put your logo on a slide. We build real, lasting brand relationships with our community.</p>
        </div>

        {/* Benefits grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 80 }}>
          {BENEFITS.map((b, i) => (
            <div key={i} className="sp-benefit-item">
              <div className="sp-benefit-icon-box" style={{ background: b.bg, borderColor: b.border }}>
                <span style={{ fontSize: 18 }}>{b.icon}</span>
              </div>
              <div>
                <div className="sp-benefit-text-title">{b.title}</div>
                <div className="sp-benefit-text-desc">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Big CTA benefits card */}
        <div className="sp-benefits-card">
          <div className="sp-benefits-glow-tl" />
          <div className="sp-benefits-glow-br" />
          {/* animated top bar */}
          <div style={{ height: 4, background: "linear-gradient(90deg,#00EEFF,#4F46E5,#A78BFA,#00EEFF)", backgroundSize: "200% 100%", animation: "gradientShift 3s ease infinite" }} />
          <div className="sp-benefits-inner">
            <div className="sp-benefits-left">
              <div className="sp-benefits-eyebrow">
                <SparkleIcon /> BECOME A PARTNER
              </div>
              <h3 className="sp-benefits-title">
                Your brand deserves<br />
                an <span className="shimmer-text">engaged audience.</span>
              </h3>
              <p className="sp-benefits-desc">
                TechEra's community is built on curiosity, ambition, and action. Sponsoring an event means your brand is in the room when deals are made, ideas are born, and careers are launched.
              </p>
              <div className="sp-benefits-metrics">
                {[{ val: "2,000+", label: "Active Members", color: "#00EEFF" }, { val: "500+", label: "Event Attendees", color: "#FEBC2E" }, { val: "10K+", label: "Social Reach", color: "#A78BFA" }].map(({ val, label, color }) => (
                  <div key={label} className="sp-benefits-metric">
                    <div className="sp-benefits-metric-val" style={{ color }}>{val}</div>
                    <div className="sp-benefits-metric-label">{label}</div>
                  </div>
                ))}
              </div>
              <a href="#apply" className="sp-apply-btn">
                Apply to Sponsor <ArrowRight />
              </a>
              <div className="sp-contact-row">
                <div className="sp-contact-item">
                  <MailIcon />
                  <a href="mailto:techeraa151@gmail.com">techeraa151@gmail.com</a>
                </div>
                <div className="sp-contact-item" style={{ marginLeft: 16 }}>
                  <PhoneIcon />
                  <a href="tel:+919310526618">+91 93105 26618</a>
                </div>
              </div>
            </div>

            <div className="sp-benefits-right">
              <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".12em", fontFamily: "Space Mono,monospace", marginBottom: 4 }}>What's included</div>
              {[
                { icon: "✅", text: "Logo on all event banners & materials" },
                { icon: "✅", text: "Dedicated social media shoutouts" },
                { icon: "✅", text: "Booth space at in-person events" },
                { icon: "✅", text: "Access to talent pipeline & hiring" },
                { icon: "✅", text: "Co-branded blog & recap content" },
                { icon: "✅", text: "Certificate of official partnership" },
                { icon: "✅", text: "Custom activation slots available" },
                { icon: "✅", text: "Priority placement in future events" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 11, border: "1px solid rgba(255,255,255,.04)", background: "rgba(255,255,255,.02)", fontSize: 13, color: "#94A3B8", transition: "border-color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,238,255,.12)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.04)"}
                >
                  <span style={{ color: "#4ADE80", flexShrink: 0 }}>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="sp-section">
        <div className="sp-section-head">
          <div className="sp-sec-eyebrow" style={{ borderColor: "rgba(74,222,128,.25)", background: "rgba(74,222,128,.06)", color: "#4ADE80" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
            HOW IT WORKS
          </div>
          <h2 className="sp-sec-title">From <span className="grad-text">hello</span> to partnership<br />in 4 simple steps</h2>
          <p className="sp-sec-sub">We make it easy. No endless paperwork, no corporate hoops. Just a real conversation and a real deal.</p>
        </div>

        <div className="sp-process-grid">
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="sp-process-step"
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = `${step.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,.04)"; }}
            >
              <div className="sp-process-num" style={{ color: step.color, borderColor: `${step.color}35` }}>{step.num}</div>
              <div className="sp-process-title">{step.title}</div>
              <p className="sp-process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}