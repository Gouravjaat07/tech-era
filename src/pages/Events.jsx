// import { useState, useRef, useEffect } from "react";
// import Navbar from "../components/Navbar";

// // ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
// const GlobalStyles = () => (
//   <style>{`
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

//     @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

//     @keyframes shimmer     { 0%{background-position:0% center}100%{background-position:200% center} }
//     @keyframes pulseGlow   { 0%,100%{opacity:.45}50%{opacity:1} }
//     @keyframes slideIn     { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
//     @keyframes accordionOpen{ from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)} }
//     @keyframes modalIn     { from{opacity:0;transform:scale(.96) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)} }
//     @keyframes fadeIn      { from{opacity:0}to{opacity:1} }
//     @keyframes pingAnim    { 75%,100%{transform:scale(2.1);opacity:0} }
//     @keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
//     @keyframes rotateSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
//     @keyframes scanLine    { 0%{top:-2px} 100%{top:100%} }

//     .ev-page { font-family: 'Manrope', system-ui, sans-serif; background: #050D1A; color: white; min-height: 100vh; }
//     .shimmer-text { background: linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }
//     .grad-text { background: linear-gradient(135deg,#00EEFF,#4F46E5); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

//     .evl-hero { padding: 100px 28px 48px; max-width: 1200px; margin: 0 auto; }
//     .evl-hero-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 36px; }
//     .evl-pill { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 999px; border: 1px solid rgba(0,238,255,.2); background: rgba(0,238,255,.05); font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #00EEFF; font-family: 'Space Mono', monospace; margin-bottom: 14px; }
//     .evl-title { font-family: 'Syne', sans-serif; font-size: clamp(30px,5vw,56px); font-weight: 900; line-height: 1.05; letter-spacing: -.03em; color: white; }
//     .evl-sub { color: #64748B; font-size: 15px; line-height: 1.75; max-width: 460px; margin-top: 10px; }
//     .evl-create-btn { display: inline-flex; align-items: center; gap: 9px; padding: 13px 26px; border-radius: 14px; font-weight: 800; font-size: 14px; color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5); border: none; cursor: pointer; transition: transform .25s, box-shadow .25s; font-family: 'Manrope', sans-serif; white-space: nowrap; flex-shrink: 0; }
//     .evl-create-btn:hover { transform: scale(1.05); box-shadow: 0 0 36px rgba(0,238,255,.35); }

//     .evl-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; padding: 0 28px; max-width: 1200px; margin-left: auto; margin-right: auto; }
//     .evl-filter-btn { padding: 7px 18px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #64748B; cursor: pointer; transition: all .2s; font-family: 'Manrope', sans-serif; }
//     .evl-filter-btn:hover { border-color: rgba(0,238,255,.25); color: #94A3B8; }
//     .evl-filter-btn.active { border-color: rgba(0,238,255,.35); background: rgba(0,238,255,.08); color: #00EEFF; }

//     .evl-search-wrap { position: relative; max-width: 340px; width: 100%; }
//     .evl-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #475569; pointer-events: none; }
//     .evl-search { width: 100%; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 11px 16px 11px 40px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; outline: none; transition: border-color .2s; }
//     .evl-search:focus { border-color: rgba(0,238,255,.3); }
//     .evl-search::placeholder { color: #334155; }

//     .evl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; padding: 0 28px 80px; }
//     .ev-card { position: relative; border-radius: 20px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; overflow: hidden; cursor: pointer; transition: transform .35s cubic-bezier(.23,1,.32,1), border-color .35s, box-shadow .35s; }
//     .ev-card:hover { transform: translateY(-6px); }
//     .ev-card-banner { width: 100%; height: 180px; overflow: hidden; position: relative; }
//     .ev-card-mode-badge { position: absolute; top: 12px; right: 12px; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; font-family: 'Space Mono', monospace; backdrop-filter: blur(8px); }
//     .ev-card-body { padding: 18px 20px 20px; }
//     .ev-card-org { font-size: 11px; font-weight: 700; color: #4F46E5; letter-spacing: .1em; text-transform: uppercase; font-family: 'Space Mono', monospace; margin-bottom: 6px; }
//     .ev-card-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: white; line-height: 1.3; margin-bottom: 12px; }
//     .ev-card-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
//     .ev-card-meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #64748B; }
//     .ev-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.05); }
//     .ev-card-view-btn { padding: 7px 16px; border-radius: 9px; font-size: 12px; font-weight: 700; background: rgba(0,238,255,.08); border: 1px solid rgba(0,238,255,.2); color: #00EEFF; cursor: pointer; transition: background .2s, transform .2s; font-family: 'Manrope', sans-serif; }
//     .ev-card-view-btn:hover { background: rgba(0,238,255,.15); transform: scale(1.04); }

//     .gi-section { max-width: 1200px; margin: 0 auto; padding: 0 28px 100px; }
//     .gi-header { text-align: center; margin-bottom: 56px; }
//     .gi-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 16px; border-radius: 999px; border: 1px solid rgba(0,238,255,.2); background: rgba(0,238,255,.05); font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #00EEFF; font-family: 'Space Mono', monospace; margin-bottom: 16px; }
//     .gi-title { font-family: 'Syne', sans-serif; font-size: clamp(26px,4vw,46px); font-weight: 900; color: white; letter-spacing: -.03em; line-height: 1.08; margin-bottom: 12px; }
//     .gi-subtitle { color: #64748B; font-size: 15px; line-height: 1.75; max-width: 500px; margin: 0 auto; }
//     .gi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
//     .gi-card { position: relative; border-radius: 24px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; overflow: hidden; transition: transform .4s cubic-bezier(.23,1,.32,1), border-color .4s, box-shadow .4s; }
//     .gi-card:hover { transform: translateY(-10px); }
//     .gi-card-bar { height: 3px; width: 100%; }
//     .gi-scan { position: absolute; left: 0; right: 0; height: 1px; pointer-events: none; opacity: 0; transition: opacity .3s; }
//     .gi-card:hover .gi-scan { opacity: 1; animation: scanLine 3s linear infinite; }
//     .gi-glow { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s; }
//     .gi-card:hover .gi-glow { opacity: 1; }
//     .gi-icon-wrap { position: relative; width: 80px; height: 80px; margin: 32px auto 0; }
//     .gi-icon-ring { position: absolute; inset: -8px; border-radius: 50%; border: 1px dashed; opacity: .3; transition: opacity .3s; }
//     .gi-card:hover .gi-icon-ring { opacity: .6; animation: rotateSlow 12s linear infinite; }
//     .gi-icon-inner { width: 80px; height: 80px; border-radius: 22px; display: flex; align-items: center; justify-content: center; font-size: 32px; position: relative; border: 1px solid; transition: transform .35s; }
//     .gi-card:hover .gi-icon-inner { transform: translateY(-4px) scale(1.05); animation: floatY 3s ease-in-out infinite; }
//     .gi-card-body { padding: 20px 28px 28px; text-align: center; }
//     .gi-tag { display: inline-block; padding: 3px 12px; border-radius: 999px; font-size: 10px; font-weight: 700; font-family: 'Space Mono', monospace; letter-spacing: .1em; margin-bottom: 12px; border: 1px solid; }
//     .gi-card-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: white; letter-spacing: -.02em; margin-bottom: 10px; }
//     .gi-card-desc { color: #64748B; font-size: 13.5px; line-height: 1.75; margin-bottom: 24px; }
//     .gi-perks { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; text-align: left; }
//     .gi-perk { display: flex; align-items: center; gap: 10px; padding: 9px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,.05); background: rgba(255,255,255,.02); font-size: 13px; color: #94A3B8; transition: border-color .2s, background .2s, color .2s; }
//     .gi-card:hover .gi-perk { border-color: rgba(255,255,255,.07); background: rgba(255,255,255,.03); }
//     .gi-perk-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
//     .gi-apply-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px 24px; border-radius: 14px; font-weight: 800; font-size: 14px; border: none; cursor: pointer; transition: transform .25s, box-shadow .25s, filter .25s; font-family: 'Manrope', sans-serif; letter-spacing: .01em; text-decoration: none; }
//     .gi-apply-btn:hover { transform: scale(1.04); filter: brightness(1.1); }
//     .gi-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(0,238,255,.18), transparent); max-width: 1200px; margin: 0 auto 80px; }

//     /* ── EVENT DETAIL ── */
//     .evd-header { padding: 84px 28px 0; max-width: 1200px; margin: 0 auto; }
//     .evd-back-btn { display: inline-flex; align-items: center; gap: 7px; padding: 7px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #64748B; font-size: 13px; font-weight: 600; cursor: pointer; transition: color .2s, border-color .2s; margin-bottom: 24px; font-family: 'Manrope', sans-serif; }
//     .evd-back-btn:hover { color: #00EEFF; border-color: rgba(0,238,255,.25); }
//     .evd-org-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(0,238,255,.2); background: rgba(0,238,255,.05); font-size: 13px; font-weight: 700; color: #00EEFF; margin-bottom: 10px; font-family: 'Space Mono', monospace; }
//     .evd-title { font-family: 'Syne', sans-serif; font-size: clamp(26px,5vw,52px); font-weight: 900; line-height: 1.05; letter-spacing: -.02em; }
//     .evd-attendee-badge { display: flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(167,139,250,.2); background: rgba(167,139,250,.06); font-size: 13px; font-weight: 700; color: #A78BFA; font-family: 'Space Mono', monospace; white-space: nowrap; }

//     /* BANNER FIX — dedicated padded wrapper keeps rounded corners intact */
//     .evd-cover-wrap { padding: 22px 28px 0; max-width: 1200px; margin: 0 auto; }
//     .evd-cover { width: 100%; height: clamp(220px,35vw,420px); border-radius: 22px; overflow: hidden; border: 1px solid rgba(255,255,255,.06); position: relative; }

//     .evd-cover-badge { position: absolute; top: 18px; right: 18px; padding: 8px 16px; border-radius: 12px; background: rgba(5,13,26,.8); border: 1px solid rgba(0,238,255,.2); color: #00EEFF; font-size: 12px; font-weight: 700; font-family: 'Space Mono', monospace; backdrop-filter: blur(8px); }
//     .evd-cover-badge-upcoming { position: absolute; top: 18px; right: 18px; padding: 8px 16px; border-radius: 12px; background: rgba(5,13,26,.8); border: 1px solid rgba(167,139,250,.3); color: #A78BFA; font-size: 12px; font-weight: 700; font-family: 'Space Mono', monospace; backdrop-filter: blur(8px); }
//     .evd-meta-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 16px auto 28px; padding: 0 28px; max-width: 1200px; }
//     .evd-meta-pill { display: flex; flex-direction: column; align-items: flex-start; padding: 12px 18px; border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; min-width: 100px; transition: border-color .3s, background .3s; cursor: default; }
//     .evd-meta-pill:hover { border-color: rgba(0,238,255,.2); background: rgba(0,238,255,.04); }
//     .evd-meta-label { font-size: 10px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: .14em; font-family: 'Space Mono', monospace; margin-bottom: 4px; }
//     .evd-meta-val { font-size: 14px; font-weight: 800; color: white; }

//     .evd-tabs-wrap { position: sticky; top: 64px; z-index: 50; background: rgba(5,13,26,.92); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,.05); }
//     .evd-tabs { max-width: 1200px; margin: 0 auto; display: flex; overflow-x: auto; padding: 0 28px; scrollbar-width: none; }
//     .evd-tabs::-webkit-scrollbar { display: none; }
//     .evd-tab { padding: 16px 20px; font-size: 13px; font-weight: 700; color: #475569; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; transition: color .25s, border-color .25s; white-space: nowrap; font-family: 'Manrope', sans-serif; }
//     .evd-tab:hover { color: #94A3B8; }
//     .evd-tab.active { color: #00EEFF; border-bottom-color: #00EEFF; }

//     .evd-section { max-width: 1200px; margin: 0 auto; padding: 48px 28px 72px; animation: slideIn .4s ease-out both; }
//     .evd-sec-head { margin-bottom: 28px; }
//     .evd-sec-pill { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 999px; margin-bottom: 12px; font-size: 11px; font-weight: 700; letter-spacing: .2em; font-family: 'Space Mono', monospace; }
//     .evd-sec-h2 { font-family: 'Syne', sans-serif; font-size: clamp(22px,3.5vw,34px); font-weight: 900; color: white; letter-spacing: -.02em; margin-bottom: 8px; }
//     .evd-sec-sub { color: #64748B; font-size: 14px; max-width: 480px; line-height: 1.7; }
//     .evd-divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(0,238,255,.18),transparent); margin: 40px 0; }

//     .evd-form-card { border-radius: 20px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; overflow: hidden; }
//     .evd-form-header { padding: 24px 28px 20px; border-bottom: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; gap: 12px; }
//     .evd-form-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
//     .evd-form-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 900; color: white; }
//     .evd-form-subtitle { color: #64748B; font-size: 13px; margin-top: 2px; }
//     .evd-form-body { padding: 28px; }
//     .evd-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
//     .evd-form-group { display: flex; flex-direction: column; gap: 6px; }
//     .evd-form-label { font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: .1em; font-family: 'Space Mono', monospace; }
//     .evd-input { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 16px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; transition: border-color .2s, background .2s; outline: none; width: 100%; }
//     .evd-input:focus { border-color: rgba(0,238,255,.4); background: rgba(0,238,255,.04); }
//     .evd-input::placeholder { color: #334155; }
//     .evd-select { appearance: none; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 16px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; transition: border-color .2s; outline: none; cursor: pointer; width: 100%; }
//     .evd-select:focus { border-color: rgba(0,238,255,.4); }
//     .evd-select option { background: #0A1628; }
//     .evd-textarea { resize: vertical; min-height: 100px; }
//     .evd-submit-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 32px; border-radius: 14px; font-weight: 800; font-size: 15px; color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5); border: none; cursor: pointer; transition: transform .25s, box-shadow .25s; font-family: 'Manrope', sans-serif; }
//     .evd-submit-btn:hover { transform: scale(1.04); box-shadow: 0 0 36px rgba(0,238,255,.35); }
//     .evd-submit-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }

//     .evd-agenda-list { display: flex; flex-direction: column; gap: 10px; }
//     .evd-agenda-item { display: flex; align-items: center; gap: 16px; padding: 16px 22px; border-radius: 16px; border: 1px solid; transition: transform .25s; }
//     .evd-agenda-item:hover { transform: translateX(4px); }
//     .evd-agenda-time { font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; min-width: 160px; flex-shrink: 0; }
//     .evd-agenda-title { font-size: 15px; font-weight: 700; color: white; }
//     .evd-agenda-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

//     .evd-people-section { margin-bottom: 40px; }
//     .evd-people-section-title { display: flex; align-items: center; gap: 12px; font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; margin-bottom: 20px; padding: 16px 20px; border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; }
//     .evd-people-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
//     .evd-person-card { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; transition: border-color .3s, transform .3s, box-shadow .3s; }
//     .evd-person-card:hover { transform: translateY(-3px); }
//     .evd-person-avatar { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-size: 15px; font-weight: 700; flex-shrink: 0; }
//     .evd-person-name { font-size: 15px; font-weight: 800; color: white; margin-bottom: 2px; }
//     .evd-person-tagline { font-size: 12px; color: #64748B; margin-bottom: 6px; }
//     .evd-person-socials { display: flex; gap: 8px; }
//     .evd-soc { width: 26px; height: 26px; border-radius: 7px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); display: flex; align-items: center; justify-content: center; color: #475569; text-decoration: none; font-size: 10px; transition: color .2s, border-color .2s; }
//     .evd-soc:hover { color: #00EEFF; border-color: rgba(0,238,255,.3); }

//     .evd-faq-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
//     .evd-faq-item { border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; overflow: hidden; transition: border-color .3s; }
//     .evd-faq-item.open { border-color: rgba(0,238,255,.2); }
//     .evd-faq-q { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 22px; cursor: pointer; font-size: 15px; font-weight: 700; color: white; }
//     .evd-faq-chevron { width: 20px; height: 20px; border-radius: 6px; border: 1px solid rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; transition: transform .3s, background .3s; flex-shrink: 0; }
//     .evd-faq-item.open .evd-faq-chevron { transform: rotate(180deg); background: rgba(0,238,255,.1); }
//     .evd-faq-a { padding: 0 22px 18px; color: #64748B; font-size: 14px; line-height: 1.75; animation: accordionOpen .25s ease-out both; }

//     .evd-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
//     .evd-contact-info { display: flex; flex-direction: column; gap: 16px; }
//     .evd-contact-info-card { padding: 18px 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; }

//     /* ── REGISTRATION BANNER ── */
//     .evd-register-banner { max-width: 1200px; margin: 0 auto 60px; padding: 0 28px; animation: slideIn .4s ease-out both; }
//     .evd-register-inner { position: relative; border-radius: 24px; overflow: hidden; padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; border: 1px solid rgba(0,238,255,.2); background: linear-gradient(135deg, rgba(0,238,255,.06) 0%, rgba(79,70,229,.08) 50%, rgba(167,139,250,.05) 100%); }
//     .evd-register-glow { position: absolute; top: -40px; left: -40px; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(0,238,255,.18), transparent 70%); pointer-events: none; }
//     .evd-register-glow-r { position: absolute; bottom: -40px; right: -40px; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(167,139,250,.15), transparent 70%); pointer-events: none; }
//     .evd-register-text h3 { font-family: 'Syne', sans-serif; font-size: clamp(20px, 3vw, 28px); font-weight: 900; color: white; letter-spacing: -.02em; margin-bottom: 6px; }
//     .evd-register-text p { color: #64748B; font-size: 14px; line-height: 1.65; max-width: 420px; }
//     .evd-seats-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 999px; border: 1px solid rgba(74,222,128,.3); background: rgba(74,222,128,.08); font-size: 11px; font-weight: 700; color: #4ADE80; font-family: 'Space Mono', monospace; margin-top: 10px; width: fit-content; }
//     .evd-register-btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; border-radius: 16px; font-weight: 800; font-size: 16px; color: #050D1A; background: linear-gradient(135deg, #00EEFF, #4F46E5); border: none; cursor: pointer; text-decoration: none; transition: transform .25s, box-shadow .25s, filter .25s; font-family: 'Manrope', sans-serif; white-space: nowrap; flex-shrink: 0; }
//     .evd-register-btn:hover { transform: scale(1.06); box-shadow: 0 0 48px rgba(0,238,255,.4); filter: brightness(1.08); }

//     /* ── CREATE MODAL ── */
//     .modal-overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(5,13,26,.9); backdrop-filter: blur(14px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .22s ease-out; }
//     .modal-box { background: #0A1628; border: 1px solid rgba(255,255,255,.08); border-radius: 28px; width: 100%; max-width: 720px; max-height: 90vh; overflow-y: auto; animation: modalIn .32s cubic-bezier(.23,1,.32,1); scrollbar-width: thin; scrollbar-color: rgba(0,238,255,.2) transparent; }
//     .modal-box::-webkit-scrollbar { width: 4px; }
//     .modal-box::-webkit-scrollbar-thumb { background: rgba(0,238,255,.2); border-radius: 2px; }
//     .modal-header { padding: 28px 32px 20px; border-bottom: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #0A1628; z-index: 1; border-radius: 28px 28px 0 0; }
//     .modal-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: white; }
//     .modal-close { width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.04); display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748B; transition: color .2s, border-color .2s; font-size: 16px; line-height: 1; }
//     .modal-close:hover { color: white; border-color: rgba(255,255,255,.2); }
//     .modal-body { padding: 28px 32px 32px; }

//     .banner-upload-area { width: 100%; height: 170px; border-radius: 16px; border: 2px dashed rgba(0,238,255,.2); background: rgba(0,238,255,.03); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: border-color .2s, background .2s; position: relative; overflow: hidden; margin-bottom: 20px; }
//     .banner-upload-area:hover { border-color: rgba(0,238,255,.4); background: rgba(0,238,255,.06); }
//     .banner-upload-area.has-image { border-style: solid; border-color: rgba(0,238,255,.25); }
//     .banner-preview-img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
//     .banner-hover-overlay { position: absolute; inset: 0; background: rgba(5,13,26,.65); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; opacity: 0; transition: opacity .2s; }
//     .banner-upload-area:hover .banner-hover-overlay { opacity: 1; }

//     .ev-footer { background: #050D1A; border-top: 1px solid rgba(255,255,255,.04); padding: 48px 28px 28px; }
//     .ev-footer-inner { max-width: 1200px; margin: 0 auto; }
//     .ev-footer-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 32px; margin-bottom: 40px; }
//     .ev-footer-bottom { border-top: 1px solid rgba(255,255,255,.05); padding-top: 20px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }

//     @media(max-width:1023px) {
//       .evl-grid { grid-template-columns: repeat(2,1fr); }
//       .gi-grid { grid-template-columns: repeat(2,1fr); }
//     }
//     @media(max-width:767px) {
//       .evl-grid { grid-template-columns: 1fr; padding: 0 14px 60px; }
//       .gi-grid { grid-template-columns: 1fr; }
//       .evd-form-row { grid-template-columns: 1fr; }
//       .evd-people-grid { grid-template-columns: 1fr; }
//       .evd-contact-grid { grid-template-columns: 1fr; }
//       .evd-agenda-time { min-width: 110px; font-size: 10px; }
//       .evd-header { padding-top: 80px; }
//       .evl-hero { padding-left: 14px; padding-right: 14px; }
//       .evl-filters { padding: 0 14px; }
//       .evl-hero-top { align-items: flex-start; }
//       .modal-body, .modal-header { padding-left: 18px; padding-right: 18px; }
//       .gi-section { padding: 0 14px 80px; }
//       .evd-cover-wrap { padding: 16px 14px 0; }
//       .evd-meta-row { padding: 0 14px; }
//       .evd-register-inner { padding: 28px 24px; }
//       .evd-register-banner { padding: 0 14px; }
//     }
//     @media(max-width:479px) {
//       .evd-section { padding: 32px 14px 56px; }
//       .evd-tabs { padding: 0 14px; }
//       .evd-tab { padding: 14px 10px; font-size: 11px; }
//     }
//   `}</style>
// );

// const AGENDA_TYPE_STYLES = {
//   logistics: { color:"#94A3B8", bg:"rgba(148,163,184,.1)",  border:"rgba(148,163,184,.2)" },
//   keynote:   { color:"#FEBC2E", bg:"rgba(254,188,46,.08)",  border:"rgba(254,188,46,.2)"  },
//   session:   { color:"#00EEFF", bg:"rgba(0,238,255,.08)",   border:"rgba(0,238,255,.2)"   },
//   break:     { color:"#4ADE80", bg:"rgba(74,222,128,.08)",  border:"rgba(74,222,128,.2)"  },
//   workshop:  { color:"#A78BFA", bg:"rgba(167,139,250,.08)", border:"rgba(167,139,250,.2)" },
//   panel:     { color:"#F97316", bg:"rgba(249,115,22,.08)",  border:"rgba(249,115,22,.2)"  },
//   qa:        { color:"#4F46E5", bg:"rgba(79,70,229,.08)",   border:"rgba(79,70,229,.2)"   },
// };
// const DETAIL_TABS = ["Event Descriptions","Agenda / Track","People & Partners","FAQ & Contact Us"];

// const GitHubIcon   = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
// const LinkedInIcon = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
// const InstaIcon    = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
// const WebIcon      = () => <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
// const ChevDown     = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>;
// const SendIcon     = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
// const CalIcon      = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
// const LocIcon      = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
// const UserIcon     = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
// const UploadIcon   = () => <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>;
// const ArrowLeft    = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/></svg>;
// const ArrowRight   = () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>;
// const TicketIcon   = () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>;

// const INITIAL_EVENTS = [
//   {
//     id:1, name:"🚀 Developers Meetup 2026", organizer:"​TechEra × Tech4Hack Presents",
//     date:"07th March 2026", day:"Saturday", time:"09:30 AM ONWARDS", fees:"Free", mode:"Offline",
//     location:"ThoughtWork Office, Gurugram", attendees:"200 Limited Seats", category:"Meetup",
//     status:"active",
//     registerLink:"https://luma.com/esw4feoh",
//     bannerUrl: "/images/Meetup-banner_2.png", bannerGradient:"linear-gradient(135deg,#050D1A 0%,#0D1F3C 60%,#050D1A 100%)", accentColor:"#00EEFF",
//     description:`​The Developers Meetup 2026 is a premium offline community gathering designed to bring together developers, designers, builders, founders, and ambitious tech enthusiasts who are passionate about building, learning, and growing within the technology ecosystem.
// ​This meetup is more than just an event — it is a high-energy networking and opportunity-driven experience where participants will interact with like-minded individuals, discover collaboration opportunities, explore internships and project possibilities, and become part of a fast-growing developer network focused on real impact.
// ​Whether you are a beginner starting your journey, a student exploring opportunities, or an experienced developer looking to expand your network, this meetup is structured to help you connect, collaborate, and grow faster.`,
//     links:{ website:"https://luma.com/esw4feoh", linkedin:"https://www.linkedin.com/company/techeraa/", instagram:"https://www.instagram.com/tech__eraa?igsh=ZTNlcXBobWZ0NG16" },
//     agenda:[
//       {time:"09:30 AM – 10:00 AM",title:"Verification & Check-in",type:"logistics"},
//       {time:"10:00 AM – 12:30 PM",title:"Welcome & Opening Remarks",type:"keynote"},
//       {time:"12:30 PM – 1:30 PM", title:"Understanding Fabric Data Agents",type:"session"},
//       {time:"1:30 PM – 2:00 PM",  title:"Lunch Break",type:"break"},
//       {time:"2:00 PM – 3:30 PM",  title:"Guided Hands-on / Demo-Assisted Session",type:"workshop"},
//       {time:"3:30 PM – 4:30 PM",  title:"General Tech Panel Discussion",type:"panel"},
//       {time:"4:30 PM – 5:00 PM",  title:"Q&A, Learning Paths & Certifications",type:"qa"},
//     ],
//     organiserTeam:[
//       {name:"Aditya ",  tagline:"Founder",       initials:"AM",accent:"#00EEFF"},
//       {name:"Arnav", tagline:"Co-Founder",      initials:"PS",accent:"#A78BFA"},
//       {name:"Amrita",  tagline:"Co-Founder", initials:"RV",accent:"#4F46E5"},
//       {name:"Biswa",  tagline:"Community Manager", initials:"SG",accent:"#06B6D4"},
//       {name:"Raj",  tagline:"Senior Coordinator", initials:"SG",accent:"#b4e166"},
//       {name:"Gourav",  tagline:"Technical Team", initials:"SG",accent:"#65b4c2"},
//       {name:"Kaashvi",  tagline:"Video Editing", initials:"SG",accent:"#2d5cba"},
//       {name:"Parth and Shaurya",  tagline:"Marketing and PR", initials:"SG",accent:"#30c274"},
//       {name:"Harsh and Abhijna",  tagline:"Design Team", initials:"SG",accent:"#7e4cc9"},
//       {name:"Shambhavi and Kritika",  tagline:"Event Management Team", initials:"SG",accent:"#d153a9"},
//       {name:"Raja",  tagline:"Content Team", initials:"SG",accent:"#d153a9"},
//     ],
//     speakers:[{name:"Pragati Srivastava",tagline:"Java Backend Developer, Ex-Amazon",initials:"AR",accent:"#00EEFF"}],
//     sponsors:[
//       {name:"Tech4Hack",tagline:"Venue Partner",initials:"TC",accent:"#FEBC2E"},
//       {name:"Edubuk",tagline:"Job and knowledge Partner",initials:"CB",accent:"#94A3B8"},
//       {name:"OSEN ",tagline:"Goodies Partner",initials:"DS",accent:"#00EEFF"},
//       {name:"Digimation Flight",tagline:"Food Partner",initials:"IV",accent:"#A78BFA"},
//     ],
//     communityPartners:[
//       {name:"Tech4Hack",tagline:"Open Source Community",initials:"GN",accent:"#4F46E5"},
//       {name:"Cracked",tagline:"Open Source Community",initials:"ML",accent:"#00EEFF"},
//       {name:"Idevion",tagline:"Open Source Community",initials:"HC",accent:"#A78BFA"},
//       {name:"Hackfinity",tagline:"Open Source Community",initials:"OF",accent:"#06B6D4"},
//     ],
//     faqs:[
//       {q:"Is this event free to attend?",a:"Yes! Completely free for all registered attendees. Just sign up and show up."},
//       {q:"Who can attend?",a:"Anyone passionate about open source, AI, Web3, or tech. Students, developers, designers, and founders are all welcome."},
//       {q:"Will sessions be recorded?",a:"Selected sessions will be recorded and shared with registered attendees after the event via email."},
//       {q:"How do I become a speaker or sponsor?",a:"Use the contact form on this page to reach out. Our team will get back to you within 48 hours."},
//       {q:"Is there a networking session?",a:"Absolutely! Post the formal agenda, there's dedicated networking time for all attendees, speakers, and partners."},
//       {q:"What should I bring?",a:"Just your laptop, curiosity, and energy! We'll handle the rest including lunch for all in-person attendees."},
//     ],
//   },
//   {
//     id:2, name:"Upcoming Hackathon 2026", organizer:"TechEra Community",
//     date:"TBA", day:"TBA", time:"TBA", fees:"Free", mode:"TBA",
//     location:"TBA", attendees:"TBA", category:"Hackathon",
//     status:"upcoming",
//     registerLink:"#",
//     bannerUrl:null, bannerGradient:"linear-gradient(135deg,#1a050d 0%,#3c0d1f 60%,#1a050d 100%)", accentColor:"#A78BFA",
//     description:"Stay tuned — details for TechEra Hackathon 2025 will be announced soon. Follow us on LinkedIn and Instagram to be the first to know.",
//     links:{website:"#",linkedin:"#",instagram:"#"},
//     agenda:[],
//     organiserTeam:[
//       {name:"Aditya ",  tagline:"Founder",       initials:"AM",accent:"#00EEFF"},
//       {name:"Arnav", tagline:"Co-Founder",      initials:"PS",accent:"#A78BFA"},
//       {name:"Amrita",  tagline:"Co-Founder", initials:"RV",accent:"#4F46E5"},
//       {name:"Biswa",  tagline:"Community Manager", initials:"SG",accent:"#06B6D4"},
//       {name:"Raj",  tagline:"Senior Coordinator", initials:"SG",accent:"#b4e166"},
//     ],
//     speakers:[],sponsors:[],communityPartners:[],
//     faqs:[
//       {q:"What's the team size?",a:"Teams of 2–4 members. Solo participation is also allowed."},
//       {q:"Is accommodation provided?",a:"Yes, for outstation participants. Please mention in registration."},
//     ],
//   },
//   {
//     id:3, name:"CV TO CAREER", organizer:"EDUBUK X TechEra",
//     date:"8th February 2025", day:"Sunday", time:"12:00 PM – 1:30 PM (IST)", fees:"Free", mode:"Google Meet",
//     location:"Virtual", attendees:"200+", category:"Workshop",
//     status:"expired",
//     registerLink:"#",
//     bannerUrl:"/images/Workshop-banner.png", bannerGradient:"linear-gradient(135deg,#050d1a 0%,#0f2c1a 60%,#050d1a 100%)", accentColor:"#4ADE80",
//     description:"EDUBUK in collaboration with TechEra presents an exclusive online career-focused session for students and early professionals.\n ​'CV to Career: A TruTalk by EDUBUK × TechEra' is a live interactive session designed to help participants understand how blockchain-verified learning, certifications, and career platforms are reshaping internships, placements, and long-term career growth.\n ​Through this session, participants will gain insights into how TruCV & TruJobs, powered by EDUBUK, enable trusted professional profiles and unlock national and international career opportunities through verified credentials.",
//     links:{website:"#",linkedin:"#",instagram:"#"},
//     agenda:[
//       {time:"12:00 PM – 12:05 PM",title:"Welcome & Introduction (EDUBUK × TechEra)",type:"keynote"},
//       {time:"​12:05 PM – 12:25 PM",title:"From CV to Career: Why Verification Matters",type:"session"},
//       {time:"12:25 PM – 12:45 PM",title:"TruCV & TruJobs: Building Trusted Career Profiles",type:"workshop"},
//       {time:"12:45 PM – 01:05 PM",title:"Certifications, Internships & Career Opportunities",type:"break"},
//       {time:"​01:05 PM – 01:20 PM",title:"Live Q&A and Student Interaction",type:"panel"},
//       {time:"​01:20 PM – 01:30 PM",title:"Surprise Giveaway & Closing Note",type:"qa"},
//     ],
//     organiserTeam:[
//       {name:"Aditya ",  tagline:"Founder",       initials:"AM",accent:"#00EEFF"},
//       {name:"Arnav", tagline:"Co-Founder",      initials:"PS",accent:"#A78BFA"},
//       {name:"Amrita",  tagline:"Co-Founder", initials:"RV",accent:"#4F46E5"},
//       {name:"Biswa",  tagline:"Community Manager", initials:"SG",accent:"#06B6D4"},
//       {name:"Raj",  tagline:"Senior Coordinator", initials:"SG",accent:"#b4e166"},
//     ],
//     speakers:[
//       {name:"Shivani Mehrotra",tagline:"Co-Founder and COO of Edubuk",initials:"SM",accent:"#4ADE80"},
//       {name:"Apoorva Bajaj",tagline:"Co-Founder and CEO of Edubuk",initials:"AB",accent:"#00EEFF"},
//     ],
//     sponsors:[{name:"EDUBUK",tagline:"Event Sponser",initials:"OA",accent:"#4ADE80"}],
//     communityPartners:[],
//     faqs:[
//       {q:"How do I get the meeting link?",a:"You'll receive it via email after registration."},
//       {q:"Is it recorded?",a:"Yes, all sessions will be available on demand post event."},
//     ],
//   },
// ];

// const INVOLVEMENT_ROLES = [
//   {
//     id:"sponsor", icon:"🤝", tag:"SUPPORT US", title:"Become a Sponsor",
//     desc:"Partner with TechEra to put your brand in front of thousands of passionate developers, designers, and builders at our events.",
//     accent:"#FEBC2E", gradient:"linear-gradient(135deg,#FEBC2E,#F97316)",
//     bgGradient:"linear-gradient(135deg,rgba(254,188,46,.08),rgba(249,115,22,.05))",
//     applyLink:"https://your-sponsor-application-link.com",
//     perks:["Brand visibility across all event materials","Dedicated booth / branding slot at events","Shoutout on all social channels (10K+ reach)","Direct access to top student talent","Co-branded content & recap features"],
//   },
//   {
//     id:"speaker", icon:"🎤", tag:"SHARE YOUR EXPERTISE", title:"Apply as Speaker",
//     desc:"Got knowledge worth sharing? Take the stage at TechEra events and inspire the next generation of innovators across India.",
//     accent:"#A78BFA", gradient:"linear-gradient(135deg,#A78BFA,#4F46E5)",
//     bgGradient:"linear-gradient(135deg,rgba(167,139,250,.08),rgba(79,70,229,.05))",
//     applyLink:"https://your-speaker-application-link.com",
//     perks:["Speak at upcoming TechEra events","Featured speaker profile on our platforms","Network with 500–1000+ attendees per event","Content amplification on social media","Speaker certificate & recognition"],
//   },
//   {
//     id:"volunteer", icon:"⚡", tag:"JOIN THE CREW", title:"Volunteer with Us",
//     desc:"Be part of the action behind the scenes. Volunteers are the heartbeat of every TechEra event — help us run the show.",
//     accent:"#00EEFF", gradient:"linear-gradient(135deg,#00EEFF,#4F46E5)",
//     bgGradient:"linear-gradient(135deg,rgba(0,238,255,.08),rgba(79,70,229,.05))",
//     applyLink:"https://docs.google.com/forms/d/e/1FAIpQLSehz9Yy6i5WFw1O3tDYtEkb414jtoWGlf1FFKYlbZG_W8Useg/viewform",
//     perks:["Hands-on event management experience","Exclusive volunteer merch & goodies","Certificate of volunteering","Network with speakers & organizers","Priority access to all future TechEra events"],
//   },
// ];

// function GetInvolved() {
//   return (
//     <>
//       <div className="gi-divider" />
//       <section className="gi-section">
//         <div className="gi-header">
//           <div className="gi-eyebrow">
//             <span style={{width:7,height:7,borderRadius:"50%",background:"#00EEFF",display:"inline-block",animation:"pulseGlow 2s ease-in-out infinite"}} />
//             GET INVOLVED
//           </div>
//           <h2 className="gi-title">Be part of something<br /><span className="shimmer-text">bigger than a ticket</span></h2>
//           <p className="gi-subtitle">Our events thrive because of sponsors, speakers, and volunteers. Pick your role and help us build the future of tech communities in India.</p>
//         </div>
//         <div className="gi-grid">
//           {INVOLVEMENT_ROLES.map((role,i)=><RoleCard key={role.id} role={role} index={i} />)}
//         </div>
//       </section>
//     </>
//   );
// }

// function RoleCard({role,index}) {
//   const [hov,setHov]=useState(false);
//   return (
//     <div className="gi-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
//       style={{borderColor:hov?`${role.accent}35`:"rgba(255,255,255,.05)",boxShadow:hov?`0 24px 64px ${role.accent}14, 0 0 0 1px ${role.accent}20`:"none",animationDelay:`${index*.08}s`}}
//     >
//       <div className="gi-card-bar" style={{background:role.gradient}} />
//       <div className="gi-glow" style={{background:`radial-gradient(ellipse at top, ${role.accent}0D, transparent 55%)`}} />
//       <div className="gi-scan" style={{background:`linear-gradient(90deg,transparent,${role.accent}50,transparent)`}} />
//       <div style={{position:"absolute",inset:0,background:role.bgGradient,opacity:hov?1:0,transition:"opacity .4s",pointerEvents:"none"}} />
//       <div className="gi-icon-wrap">
//         <div className="gi-icon-ring" style={{borderColor:role.accent}} />
//         <div className="gi-icon-inner" style={{background:`${role.accent}12`,borderColor:`${role.accent}30`,boxShadow:hov?`0 0 24px ${role.accent}25`:"none"}}>{role.icon}</div>
//       </div>
//       <div className="gi-card-body">
//         <div className="gi-tag" style={{color:role.accent,borderColor:`${role.accent}30`,background:`${role.accent}10`}}>{role.tag}</div>
//         <div className="gi-card-title">{role.title}</div>
//         <p className="gi-card-desc">{role.desc}</p>
//         <div className="gi-perks">
//           {role.perks.map((perk,pi)=>(
//             <div key={pi} className="gi-perk">
//               <div className="gi-perk-dot" style={{background:role.accent,boxShadow:`0 0 6px ${role.accent}70`}} />
//               {perk}
//             </div>
//           ))}
//         </div>
//         <a href={role.applyLink} target="_blank" rel="noreferrer" className="gi-apply-btn"
//           style={{background:role.gradient,color:"#050D1A",boxShadow:hov?`0 0 32px ${role.accent}30`:"none"}}>
//           Apply Now <ArrowRight />
//         </a>
//       </div>
//     </div>
//   );
// }

// function AnimatedCover({accentColor="#00EEFF",bannerUrl}) {
//   const canvasRef=useRef(null);
//   useEffect(()=>{
//     if(bannerUrl)return;
//     const canvas=canvasRef.current; if(!canvas)return;
//     const ctx=canvas.getContext("2d"); let raf;
//     const resize=()=>{canvas.width=canvas.parentElement.clientWidth;canvas.height=canvas.parentElement.clientHeight;};
//     resize();
//     const ro=new ResizeObserver(resize); ro.observe(canvas.parentElement);
//     const r=parseInt(accentColor.slice(1,3),16),g=parseInt(accentColor.slice(3,5),16),b=parseInt(accentColor.slice(5,7),16);
//     const pts=Array.from({length:28},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0004,vy:(Math.random()-.5)*.0004,rad:Math.random()*1.2+.4,a:Math.random()*.26+.08}));
//     const draw=()=>{
//       const w=canvas.width,h=canvas.height; ctx.clearRect(0,0,w,h);
//       pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>1)p.vx*=-1;if(p.y<0||p.y>1)p.vy*=-1;ctx.beginPath();ctx.arc(p.x*w,p.y*h,p.rad,0,Math.PI*2);ctx.fillStyle=`rgba(${r},${g},${b},${p.a})`;ctx.fill();});
//       const thresh=Math.min(w,h)*.14;
//       pts.forEach((a,i)=>pts.slice(i+1).forEach(b2=>{const d=Math.hypot((a.x-b2.x)*w,(a.y-b2.y)*h);if(d<thresh){ctx.beginPath();ctx.moveTo(a.x*w,a.y*h);ctx.lineTo(b2.x*w,b2.y*h);ctx.strokeStyle=`rgba(${r},${g},${b},${.04*(1-d/thresh)})`;ctx.lineWidth=.4;ctx.stroke();}}));
//       raf=requestAnimationFrame(draw);
//     };
//     draw();
//     return()=>{cancelAnimationFrame(raf);ro.disconnect();};
//   },[accentColor,bannerUrl]);
//   if(bannerUrl)return <img src={bannerUrl} alt="banner" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />;
//   return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} />;
// }

// function PersonCard({person}) {
//   const [hov,setHov]=useState(false);
//   return (
//     <div className="evd-person-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
//       style={{borderColor:hov?`${person.accent}33`:"rgba(255,255,255,.05)",boxShadow:hov?`0 8px 28px ${person.accent}14`:"none"}}>
//       <div className="evd-person-avatar" style={{background:`${person.accent}18`,border:`1.5px solid ${person.accent}35`,color:person.accent}}>{person.initials}</div>
//       <div>
//         <div className="evd-person-name">{person.name}</div>
//         <div className="evd-person-tagline">{person.tagline}</div>
//         <div className="evd-person-socials">
//           {[{Icon:GitHubIcon,l:"GH"},{Icon:LinkedInIcon,l:"LI"},{Icon:InstaIcon,l:"IG"}].map(({Icon,l})=>(
//             <a key={l} href="#" className="evd-soc" aria-label={l}
//               onMouseEnter={e=>{e.currentTarget.style.color=person.accent;e.currentTarget.style.borderColor=`${person.accent}40`;}}
//               onMouseLeave={e=>{e.currentTarget.style.color="#475569";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}
//             ><Icon /></a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function DescriptionTab({ev}) {
//   return (
//     <div className="evd-section">
//       <div className="evd-sec-head">
//         <div className="evd-sec-pill" style={{border:"1px solid rgba(167,139,250,.2)",background:"rgba(167,139,250,.06)",color:"#A78BFA"}}>ABOUT THE EVENT</div>
//         <h2 className="evd-sec-h2">Event <span className="grad-text">Description</span></h2>
//       </div>
//       <div className="evd-form-card" style={{padding:"32px"}}>
//         <div style={{position:"relative"}}>
//           <div style={{position:"absolute",top:0,left:0,width:"3px",height:"100%",background:"linear-gradient(#00EEFF,#4F46E5,#A78BFA)",borderRadius:"0 2px 2px 0"}} />
//           <p style={{paddingLeft:24,color:"#94A3B8",fontSize:15,lineHeight:1.85,whiteSpace:"pre-line"}}>{ev.description}</p>
//         </div>
//         <div className="evd-divider" />
//         <p style={{color:"#64748B",fontSize:14,marginBottom:14}}>🔗 Learn more & stay connected:</p>
//         <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
//           {[{Icon:WebIcon,label:"Website",href:ev.links.website},{Icon:LinkedInIcon,label:"LinkedIn",href:ev.links.linkedin},{Icon:InstaIcon,label:"Instagram",href:ev.links.instagram}].map(({Icon,label,href})=>(
//             <a key={label} href={href} target="_blank" rel="noreferrer"
//               style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",borderRadius:10,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.03)",color:"#94A3B8",fontSize:13,fontWeight:600,textDecoration:"none",transition:"all .2s"}}
//               onMouseEnter={e=>{e.currentTarget.style.color="#00EEFF";e.currentTarget.style.borderColor="rgba(0,238,255,.25)";e.currentTarget.style.background="rgba(0,238,255,.06)";}}
//               onMouseLeave={e=>{e.currentTarget.style.color="#94A3B8";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";e.currentTarget.style.background="rgba(255,255,255,.03)";}}
//             ><Icon />{label}</a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function AgendaTab({ev}) {
//   return (
//     <div className="evd-section">
//       <div className="evd-sec-head">
//         <div className="evd-sec-pill" style={{border:"1px solid rgba(254,188,46,.2)",background:"rgba(254,188,46,.06)",color:"#FEBC2E"}}>SCHEDULE</div>
//         <h2 className="evd-sec-h2">Event <span className="grad-text">Agenda / Track</span></h2>
//         <p className="evd-sec-sub">A full day of learning, building, and connecting — curated for builders.</p>
//       </div>
//       {ev.agenda.length===0
//         ?<div style={{padding:"48px 24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.08)",borderRadius:16,color:"#475569"}}>
//             <div style={{fontSize:32,marginBottom:10}}>📋</div>
//             <div style={{fontWeight:700,color:"#64748B",marginBottom:4}}>No agenda added yet</div>
//             <div style={{fontSize:13}}>Check back later or contact the organizer</div>
//           </div>
//         :<>
//           <div className="evd-agenda-list">
//             {ev.agenda.map((item,i)=>{const s=AGENDA_TYPE_STYLES[item.type];return(
//               <div key={i} className="evd-agenda-item" style={{background:s.bg,borderColor:s.border}}>
//                 <div className="evd-agenda-dot" style={{background:s.color,boxShadow:`0 0 8px ${s.color}60`}} />
//                 <div className="evd-agenda-time" style={{color:s.color}}>{item.time}</div>
//                 <div className="evd-agenda-title">{item.title}</div>
//                 <div style={{marginLeft:"auto",padding:"4px 12px",borderRadius:"999px",fontSize:11,fontWeight:700,fontFamily:"Space Mono,monospace",color:s.color,border:`1px solid ${s.border}`,background:s.bg,whiteSpace:"nowrap"}}>{item.type.toUpperCase()}</div>
//               </div>
//             );})}
//           </div>
//           <div style={{marginTop:24,display:"flex",flexWrap:"wrap",gap:8}}>
//             {Object.entries(AGENDA_TYPE_STYLES).map(([type,s])=>(
//               <div key={type} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:999,border:`1px solid ${s.border}`,background:s.bg}}>
//                 <div style={{width:6,height:6,borderRadius:"50%",background:s.color}} />
//                 <span style={{fontSize:10,fontWeight:700,color:s.color,fontFamily:"Space Mono,monospace",textTransform:"uppercase"}}>{type}</span>
//               </div>
//             ))}
//           </div>
//         </>
//       }
//     </div>
//   );
// }

// function PeopleTab({ev}) {
//   const sections=[
//     {title:"Event Organisers Team",icon:"🌐",people:ev.organiserTeam,accent:"#00EEFF"},
//     {title:"Our Speakers",icon:"🎤",people:ev.speakers,accent:"#A78BFA"},
//     {title:"Our Sponsors",icon:"🤝",people:ev.sponsors,accent:"#FEBC2E"},
//     {title:"Our Community Partners",icon:"🌍",people:ev.communityPartners,accent:"#4F46E5"},
//   ];
//   return (
//     <div className="evd-section">
//       <div className="evd-sec-head">
//         <div className="evd-sec-pill" style={{border:"1px solid rgba(79,70,229,.2)",background:"rgba(79,70,229,.06)",color:"#A78BFA"}}>THE COMMUNITY</div>
//         <h2 className="evd-sec-h2">People & <span className="grad-text">Partners</span></h2>
//         <p className="evd-sec-sub">The brilliant minds organizing, speaking, sponsoring, and partnering to make this happen.</p>
//       </div>
//       {sections.map(({title,icon,people,accent})=>(
//         <div key={title} className="evd-people-section">
//           <div className="evd-people-section-title">
//             <div style={{width:36,height:36,borderRadius:10,background:`${accent}14`,border:`1px solid ${accent}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
//             <span>{title}</span>
//           </div>
//           {people.length===0
//             ?<div style={{padding:"24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.06)",borderRadius:12,color:"#475569",fontSize:13}}>Not announced yet</div>
//             :<div className="evd-people-grid">{people.map(p=><PersonCard key={p.name} person={p} />)}</div>
//           }
//         </div>
//       ))}
//     </div>
//   );
// }

// function FAQContactTab({ev}) {
//   const [openIdx,setOpenIdx]=useState(null);
//   const [cf,setCf]=useState({name:"",email:"",phone:"",type:"",message:""});
//   const setC=k=>e=>setCf(p=>({...p,[k]:e.target.value}));
//   return (
//     <div className="evd-section">
//       <div className="evd-sec-head">
//         <div className="evd-sec-pill" style={{border:"1px solid rgba(0,238,255,.2)",background:"rgba(0,238,255,.06)",color:"#00EEFF"}}>FREQUENTLY ASKED</div>
//         <h2 className="evd-sec-h2">Got <span className="grad-text">Questions?</span></h2>
//         <p className="evd-sec-sub">Find quick answers to common questions below.</p>
//       </div>
//       {ev.faqs.length===0
//         ?<div style={{padding:"40px 24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.06)",borderRadius:16,color:"#475569",marginBottom:40}}>
//             <div style={{fontSize:28,marginBottom:8}}>❓</div>
//             <div style={{fontWeight:700,color:"#64748B"}}>No FAQs yet — contact the organizer below</div>
//           </div>
//         :<div className="evd-faq-list">
//             {ev.faqs.map((faq,i)=>(
//               <div key={i} className={`evd-faq-item${openIdx===i?" open":""}`}>
//                 <div className="evd-faq-q" onClick={()=>setOpenIdx(openIdx===i?null:i)}>
//                   <span>{faq.q}</span>
//                   <div className="evd-faq-chevron"><ChevDown /></div>
//                 </div>
//                 {openIdx===i&&<div className="evd-faq-a">{faq.a}</div>}
//               </div>
//             ))}
//           </div>
//       }
//       <div className="evd-divider" />
//       <div className="evd-sec-head">
//         <div className="evd-sec-pill" style={{border:"1px solid rgba(167,139,250,.2)",background:"rgba(167,139,250,.06)",color:"#A78BFA"}}>LET'S CONNECT</div>
//         <h2 className="evd-sec-h2">Contact <span className="grad-text">Us</span></h2>
//         <p className="evd-sec-sub">For mentorship help, internship support, partnerships, or anything else.</p>
//       </div>
//       <div className="evd-contact-grid">
//         <div className="evd-contact-info">
//           {[{icon:"📧",label:"Email",val:"techera@gmail.com",accent:"#00EEFF"},{icon:"📞",label:"Phone",val:"+91 93105 26618",accent:"#A78BFA"},{icon:"📍",label:"Location",val:"Hybrid, India",accent:"#4F46E5"}].map(({icon,label,val,accent})=>(
//             <div key={label} className="evd-contact-info-card" style={{display:"flex",alignItems:"center",gap:14}}>
//               <div style={{width:44,height:44,borderRadius:13,background:`${accent}14`,border:`1px solid ${accent}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
//               <div>
//                 <div style={{fontSize:11,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:3}}>{label}</div>
//                 <div style={{fontSize:14,fontWeight:700,color:"white"}}>{val}</div>
//               </div>
//             </div>
//           ))}
//           <div className="evd-contact-info-card">
//             <div style={{fontSize:12,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:12}}>Quick Links</div>
//             {["Browse Events","Our Courses","About Us","Success Stories","Become a Mentor"].map(l=>(
//               <a key={l} href="#" style={{color:"#64748B",fontSize:14,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:6,marginBottom:8,transition:"color .2s"}}
//                 onMouseEnter={e=>e.currentTarget.style.color="#00EEFF"} onMouseLeave={e=>e.currentTarget.style.color="#64748B"}
//               ><span style={{color:"#4F46E5"}}>›</span>{l}</a>
//             ))}
//           </div>
//         </div>
//         <div className="evd-form-card">
//           <div className="evd-form-header">
//             <div className="evd-form-icon" style={{background:"rgba(167,139,250,.1)",border:"1px solid rgba(167,139,250,.2)"}}>✉️</div>
//             <div><div className="evd-form-title">Send a Message</div><div className="evd-form-subtitle">We'll get back to you within 24 hours</div></div>
//           </div>
//           <div className="evd-form-body">
//             <div className="evd-form-row">
//               <div className="evd-form-group"><label className="evd-form-label">Full Name</label><input className="evd-input" placeholder="Your name" value={cf.name} onChange={setC("name")} /></div>
//               <div className="evd-form-group"><label className="evd-form-label">Email Address</label><input className="evd-input" type="email" placeholder="you@example.com" value={cf.email} onChange={setC("email")} /></div>
//             </div>
//             <div className="evd-form-group" style={{marginBottom:16}}><label className="evd-form-label">Mobile Number</label><input className="evd-input" placeholder="+91 XXXXX XXXXX" value={cf.phone} onChange={setC("phone")} /></div>
//             <div className="evd-form-group" style={{marginBottom:16}}>
//               <label className="evd-form-label">Type of Query</label>
//               <select className="evd-select" value={cf.type} onChange={setC("type")}>
//                 <option value="">Select Your Query</option>
//                 <option value="mentorship">Mentorship</option>
//                 <option value="internship">Internship Support</option>
//                 <option value="sponsorship">Sponsorship</option>
//                 <option value="speaker">Speaking Opportunity</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <div className="evd-form-group" style={{marginBottom:24}}><label className="evd-form-label">Message</label><textarea className="evd-input evd-textarea" placeholder="Tell us how we can help..." value={cf.message} onChange={setC("message")} /></div>
//             <button className="evd-submit-btn">Send Message <SendIcon /></button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── REGISTRATION BANNER — only renders for status="active" events ─────────────
// function RegistrationBanner({ev}) {
//   if (ev.status !== "active") return null;
//   return (
//     <div className="evd-register-banner">
//       <div className="evd-register-inner">
//         <div className="evd-register-glow" />
//         <div className="evd-register-glow-r" />
//         <div className="evd-register-text" style={{position:"relative",zIndex:1}}>
//           <h3>Secure your spot at <span className="shimmer-text">{ev.name.replace(/^[\W\s]+/, "")}</span></h3>
//           <p>Seats are limited — register before they run out. Registration is completely free.</p>
//           <div className="evd-seats-badge">
//             <span style={{width:6,height:6,borderRadius:"50%",background:"#4ADE80",display:"inline-block",animation:"pulseGlow 1.5s ease-in-out infinite"}} />
//             {ev.attendees} · Registrations Open
//           </div>
//         </div>
//         <a href={ev.registerLink} target="_blank" rel="noreferrer" className="evd-register-btn" style={{position:"relative",zIndex:1}}>
//           <TicketIcon />
//           Register Now — It's Free
//         </a>
//       </div>
//     </div>
//   );
// }

// function EventDetail({ev,onBack}) {
//   const [activeTab,setActiveTab]=useState(0);
//   const panels=[<DescriptionTab key="d" ev={ev}/>,<AgendaTab key="a" ev={ev}/>,<PeopleTab key="p" ev={ev}/>,<FAQContactTab key="f" ev={ev}/>];

//   const statusBadge = {
//     active:  { label:"🟢 Registrations Open",  cls:"evd-cover-badge",          style:{} },
//     upcoming:{ label:"🟣 Upcoming",             cls:"evd-cover-badge-upcoming",  style:{} },
//     expired: { label:"⚫ Event Concluded",       cls:"evd-cover-badge",          style:{borderColor:"rgba(148,163,184,.2)",color:"#94A3B8"} },
//   }[ev.status] || { label:"🟢 Registrations Open", cls:"evd-cover-badge", style:{} };

//   return (
//     <div style={{animation:"slideIn .35s ease-out both"}}>
//       {/* Header */}
//       <div className="evd-header">
//         <button className="evd-back-btn" onClick={onBack}><ArrowLeft /> Back to Events</button>
//         <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:12}}>
//           <div>
//             <div className="evd-org-badge">
//               <div style={{width:8,height:8,borderRadius:"50%",background:ev.accentColor,animation:"pulseGlow 2s ease-in-out infinite",flexShrink:0}} />
//               By: {ev.organizer}
//             </div>
//             <h1 className="evd-title"><span className="shimmer-text">{ev.name}</span></h1>
//           </div>
//           <div className="evd-attendee-badge">
//             <span style={{width:8,height:8,borderRadius:"50%",background:"#A78BFA",display:"inline-block"}} />
//             {ev.attendees} Attendees
//           </div>
//         </div>
//       </div>

//       {/* Banner — wrapped in padded container to fix bleed issue */}
//       <div className="evd-cover-wrap">
//         <div className="evd-cover" style={{background:ev.bannerGradient}}>
//           <AnimatedCover accentColor={ev.accentColor} bannerUrl={ev.bannerUrl} />
//           <div style={{position:"absolute",top:"30%",left:"30%",transform:"translate(-50%,-50%)",width:"40%",height:"60%",borderRadius:"50%",background:`${ev.accentColor}12`,filter:"blur(60px)",pointerEvents:"none"}} />
//           <div className={statusBadge.cls} style={statusBadge.style}>{statusBadge.label}</div>
//         </div>
//       </div>

//       {/* Meta pills */}
//       <div className="evd-meta-row">
//         {[{label:"Event Date",val:ev.date,icon:"📅"},{label:"Event Day",val:ev.day,icon:"📆"},{label:"Event Time",val:ev.time,icon:"⏰"},{label:"Event Fees",val:ev.fees,icon:"🎟"},{label:"Event Mode",val:ev.mode,icon:"💻"},{label:"Location",val:ev.location,icon:"📍"}].map(({label,val,icon})=>(
//           <div key={label} className="evd-meta-pill"><span className="evd-meta-label">{label}</span><span className="evd-meta-val">{icon} {val}</span></div>
//         ))}
//       </div>

//       {/* Tabs */}
//       <div className="evd-tabs-wrap">
//         <div className="evd-tabs">
//           {DETAIL_TABS.map((tab,i)=>(
//             <button key={tab} className={`evd-tab${activeTab===i?" active":""}`} onClick={()=>setActiveTab(i)}>{tab}</button>
//           ))}
//         </div>
//       </div>

//       <div key={activeTab}>{panels[activeTab]}</div>

//       {/* Registration CTA — only shown for active events */}
//       <RegistrationBanner ev={ev} />
//     </div>
//   );
// }

// function CreateEventModal({onClose,onSubmit}) {
//   const fileRef=useRef(null);
//   const [step,setStep]=useState(1);
//   const [bannerPreview,setBannerPreview]=useState(null);
//   const [form,setForm]=useState({name:"",organizer:"",date:"",day:"",time:"",fees:"",mode:"",location:"",attendees:"",category:"",description:"",website:"",linkedin:"",instagram:""});
//   const set=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
//   const handleBanner=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>setBannerPreview(ev.target.result);reader.readAsDataURL(file);};
//   const handleSubmit=()=>{
//     onSubmit({id:Date.now(),...form,bannerUrl:bannerPreview,bannerGradient:"linear-gradient(135deg,#050D1A 0%,#0D1F3C 60%,#050D1A 100%)",accentColor:"#00EEFF",status:"active",registerLink:form.website||"#",links:{website:form.website||"#",linkedin:form.linkedin||"#",instagram:form.instagram||"#"},agenda:[],organiserTeam:[],speakers:[],sponsors:[],communityPartners:[],faqs:[]});
//     onClose();
//   };
//   return (
//     <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
//       <div className="modal-box">
//         <div className="modal-header">
//           <div>
//             <div style={{fontSize:11,fontWeight:700,color:"#4F46E5",letterSpacing:".15em",fontFamily:"Space Mono,monospace",marginBottom:4}}>NEW EVENT · STEP {step}/2</div>
//             <div className="modal-title">Create <span className="grad-text">Event</span></div>
//           </div>
//           <div style={{display:"flex",alignItems:"center",gap:12}}>
//             <div style={{display:"flex",gap:6}}>
//               {[1,2].map(s=><div key={s} style={{width:28,height:5,borderRadius:3,background:step>=s?"linear-gradient(135deg,#00EEFF,#4F46E5)":"rgba(255,255,255,.07)",transition:"background .3s"}} />)}
//             </div>
//             <button className="modal-close" onClick={onClose}>✕</button>
//           </div>
//         </div>
//         <div className="modal-body">
//           {step===1&&(
//             <div style={{animation:"slideIn .28s ease-out both"}}>
//               <p style={{color:"#64748B",fontSize:13,marginBottom:22}}>Step 1 — Basic info & banner</p>
//               <label className="evd-form-label" style={{marginBottom:8,display:"block"}}>Event Banner</label>
//               <div className={`banner-upload-area${bannerPreview?" has-image":""}`} onClick={()=>fileRef.current?.click()}>
//                 {bannerPreview
//                   ?<><img src={bannerPreview} alt="preview" className="banner-preview-img" /><div className="banner-hover-overlay"><UploadIcon /><span style={{color:"#00EEFF",fontSize:13,fontWeight:700,fontFamily:"Space Mono,monospace"}}>Change Banner</span></div></>
//                   :<><div style={{color:"#475569"}}><UploadIcon /></div><span style={{fontSize:13,fontWeight:700,color:"#00EEFF",fontFamily:"Space Mono,monospace"}}>Upload Event Banner</span><span style={{fontSize:11,color:"#475569"}}>PNG, JPG, WEBP — 1200×630px recommended</span></>
//                 }
//                 <input ref={fileRef} type="file" accept="image/*" onChange={handleBanner} style={{display:"none"}} />
//               </div>
//               <div className="evd-form-row">
//                 <div className="evd-form-group"><label className="evd-form-label">Event Name *</label><input className="evd-input" placeholder="TechEra Hackathon 2025" value={form.name} onChange={set("name")} /></div>
//                 <div className="evd-form-group"><label className="evd-form-label">Organizer *</label><input className="evd-input" placeholder="TechEra Community" value={form.organizer} onChange={set("organizer")} /></div>
//               </div>
//               <div className="evd-form-row">
//                 <div className="evd-form-group"><label className="evd-form-label">Event Date *</label><input className="evd-input" type="date" value={form.date} onChange={set("date")} /></div>
//                 <div className="evd-form-group">
//                   <label className="evd-form-label">Event Day</label>
//                   <select className="evd-select" value={form.day} onChange={set("day")}>
//                     <option value="">Select Day</option>
//                     {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d=><option key={d} value={d}>{d}</option>)}
//                   </select>
//                 </div>
//               </div>
//               <div className="evd-form-row">
//                 <div className="evd-form-group"><label className="evd-form-label">Time *</label><input className="evd-input" type="time" value={form.time} onChange={set("time")} /></div>
//                 <div className="evd-form-group">
//                   <label className="evd-form-label">Mode *</label>
//                   <select className="evd-select" value={form.mode} onChange={set("mode")}>
//                     <option value="">Select Mode</option>
//                     {["In-Person","Online","Hybrid"].map(m=><option key={m} value={m}>{m}</option>)}
//                   </select>
//                 </div>
//               </div>
//               <div className="evd-form-row">
//                 <div className="evd-form-group"><label className="evd-form-label">Location</label><input className="evd-input" placeholder="Delhi, NCR / Virtual" value={form.location} onChange={set("location")} /></div>
//                 <div className="evd-form-group"><label className="evd-form-label">Entry Fees</label><input className="evd-input" placeholder="Free / ₹200" value={form.fees} onChange={set("fees")} /></div>
//               </div>
//               <div className="evd-form-row">
//                 <div className="evd-form-group">
//                   <label className="evd-form-label">Category</label>
//                   <select className="evd-select" value={form.category} onChange={set("category")}>
//                     <option value="">Select Category</option>
//                     {["Open Source","Hackathon","Summit","Workshop","Meetup","Conference","Webinar"].map(c=><option key={c} value={c}>{c}</option>)}
//                   </select>
//                 </div>
//                 <div className="evd-form-group"><label className="evd-form-label">Expected Attendees</label><input className="evd-input" placeholder="500+" value={form.attendees} onChange={set("attendees")} /></div>
//               </div>
//               <div style={{display:"flex",justifyContent:"flex-end",marginTop:6}}>
//                 <button className="evd-submit-btn" onClick={()=>setStep(2)} disabled={!form.name||!form.organizer}>Next: Details →</button>
//               </div>
//             </div>
//           )}
//           {step===2&&(
//             <div style={{animation:"slideIn .28s ease-out both"}}>
//               <p style={{color:"#64748B",fontSize:13,marginBottom:22}}>Step 2 — Description & links</p>
//               <div className="evd-form-group" style={{marginBottom:16}}>
//                 <label className="evd-form-label">Event Description *</label>
//                 <textarea className="evd-input evd-textarea" style={{minHeight:130}} placeholder="Describe what attendees can expect..." value={form.description} onChange={set("description")} />
//               </div>
//               <div style={{fontSize:12,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:12}}>Social & Links</div>
//               <div className="evd-form-group" style={{marginBottom:12}}><label className="evd-form-label">Website URL</label><input className="evd-input" placeholder="https://your-event.com" value={form.website} onChange={set("website")} /></div>
//               <div className="evd-form-row">
//                 <div className="evd-form-group"><label className="evd-form-label">LinkedIn</label><input className="evd-input" placeholder="https://linkedin.com/..." value={form.linkedin} onChange={set("linkedin")} /></div>
//                 <div className="evd-form-group"><label className="evd-form-label">Instagram</label><input className="evd-input" placeholder="https://instagram.com/..." value={form.instagram} onChange={set("instagram")} /></div>
//               </div>
//               <div style={{marginTop:6,marginBottom:24,padding:"14px 18px",borderRadius:14,border:"1px solid rgba(0,238,255,.1)",background:"rgba(0,238,255,.04)",display:"flex",alignItems:"flex-start",gap:10}}>
//                 <span style={{fontSize:16,flexShrink:0}}>ℹ️</span>
//                 <span style={{fontSize:13,color:"#64748B",lineHeight:1.6}}>After creating the event, you can add Agenda, Team, Speakers, Sponsors & FAQs from the event detail page.</span>
//               </div>
//               <div style={{display:"flex",justifyContent:"space-between",gap:12}}>
//                 <button onClick={()=>setStep(1)}
//                   style={{padding:"12px 22px",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.03)",color:"#64748B",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Manrope,sans-serif",transition:"all .2s"}}
//                   onMouseEnter={e=>{e.currentTarget.style.color="white";e.currentTarget.style.borderColor="rgba(255,255,255,.2)";}}
//                   onMouseLeave={e=>{e.currentTarget.style.color="#64748B";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";}}
//                 >← Back</button>
//                 <button className="evd-submit-btn" onClick={handleSubmit} disabled={!form.description}>🚀 Create Event</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function EventCard({ev,onClick}) {
//   const [hov,setHov]=useState(false);
//   const modeC={"In-Person":{c:"#4ADE80",bg:"rgba(74,222,128,.12)"},"Online":{c:"#00EEFF",bg:"rgba(0,238,255,.1)"},"Hybrid":{c:"#A78BFA",bg:"rgba(167,139,250,.1)"}}[ev.mode]||{c:"#00EEFF",bg:"rgba(0,238,255,.1)"};
//   return (
//     <div className="ev-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}
//       style={{borderColor:hov?`${ev.accentColor}30`:"rgba(255,255,255,.05)",boxShadow:hov?`0 16px 48px ${ev.accentColor}14`:"none"}}>
//       <div className="ev-card-banner" style={{background:ev.bannerGradient,position:"relative"}}>
//         <AnimatedCover accentColor={ev.accentColor} bannerUrl={ev.bannerUrl} />
//         <div className="ev-card-mode-badge" style={{color:modeC.c,background:modeC.bg,border:`1px solid ${modeC.c}30`}}>{ev.mode}</div>
//       </div>
//       <div className="ev-card-body">
//         <div className="ev-card-org">{ev.organizer}</div>
//         <div className="ev-card-name">{ev.name}</div>
//         <div className="ev-card-meta">
//           <div className="ev-card-meta-item"><CalIcon />{ev.date}</div>
//           <div className="ev-card-meta-item"><LocIcon />{ev.location}</div>
//         </div>
//         <div className="ev-card-footer">
//           <div>
//             <div style={{fontSize:10,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:3}}>Entry</div>
//             <div style={{fontSize:14,fontWeight:800,color:ev.fees==="Free"?"#4ADE80":"#FEBC2E"}}>{ev.fees}</div>
//           </div>
//           <div style={{display:"flex",alignItems:"center",gap:10}}>
//             <div style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#475569"}}><UserIcon />{ev.attendees}</div>
//             <button className="ev-card-view-btn">View →</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function EventsListing({events,onViewEvent,onCreateEvent}) {
//   const [filter,setFilter]=useState("All");
//   const [search,setSearch]=useState("");
//   const FILTERS=["All","Meetup","Hackathon","Workshop","Collab"];
//   const filtered=events.filter(ev=>(filter==="All"||ev.category===filter)&&(!search||ev.name.toLowerCase().includes(search.toLowerCase())||ev.organizer.toLowerCase().includes(search.toLowerCase())));
//   return (
//     <div>
//       <div className="evl-hero">
//         <div className="evl-hero-top">
//           <div>
//             <div className="evl-pill"><div style={{width:8,height:8,borderRadius:"50%",background:"#00EEFF",animation:"pulseGlow 2s ease-in-out infinite"}} />EVENTS / COMMUNITY</div>
//             <h1 className="evl-title">Discover &<br /><span className="shimmer-text">Join Events</span></h1>
//             <p className="evl-sub">Explore hackathons, summits, workshops, and more — curated for builders like you.</p>
//           </div>
//           <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end"}}>
//             <div className="evl-search-wrap">
//               <span className="evl-search-icon"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
//               <input className="evl-search" placeholder="Search events…" value={search} onChange={e=>setSearch(e.target.value)} />
//             </div>
//           </div>
//         </div>
//         <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
//           {[{val:`${events.length}`,lbl:"Total Events"},{val:"50+",lbl:"Speakers"},{val:"2K+",lbl:"Community"},{val:"10+",lbl:"Partners"}].map(({val,lbl})=>(
//             <div key={lbl} style={{padding:"11px 20px",borderRadius:14,border:"1px solid rgba(255,255,255,.05)",background:"#0A1628",textAlign:"center"}}>
//               <div style={{fontSize:20,fontWeight:900,color:"#00EEFF",fontFamily:"Space Mono,monospace"}}>{val}</div>
//               <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:".12em",marginTop:3}}>{lbl}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="evl-filters">
//         {FILTERS.map(f=><button key={f} className={`evl-filter-btn${filter===f?" active":""}`} onClick={()=>setFilter(f)}>{f}</button>)}
//       </div>
//       <div className="evl-grid">
//         {filtered.length===0
//           ?<div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 20px",color:"#475569"}}>
//               <div style={{fontSize:40,marginBottom:12}}>🔍</div>
//               <div style={{fontSize:16,fontWeight:700,color:"#64748B",marginBottom:6}}>No events found</div>
//               <div style={{fontSize:13}}>Try a different search or filter</div>
//             </div>
//           :filtered.map(ev=><EventCard key={ev.id} ev={ev} onClick={()=>onViewEvent(ev)} />)
//         }
//       </div>
//       <GetInvolved />
//     </div>
//   );
// }

// function Footer() {
//   return (
//     <footer className="ev-footer">
//       <div className="ev-footer-inner">
//         <div className="ev-footer-grid">
//           <div>
//             <div style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:900,background:"linear-gradient(135deg,#00EEFF,#4F46E5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",marginBottom:10}}>TechEra</div>
//             <p style={{color:"#475569",fontSize:13,lineHeight:1.75,maxWidth:240}}>Transforming education through creative events, collaborative learning, and expert mentorship.</p>
//             <div style={{display:"flex",gap:10,marginTop:14}}>
//               {[LinkedInIcon,InstaIcon,GitHubIcon].map((Icon,i)=>(
//                 <a key={i} href="#" style={{width:32,height:32,borderRadius:9,border:"1px solid rgba(255,255,255,.07)",background:"rgba(255,255,255,.03)",display:"flex",alignItems:"center",justifyContent:"center",color:"#475569",textDecoration:"none",transition:"color .2s,border-color .2s"}}
//                   onMouseEnter={e=>{e.currentTarget.style.color="#00EEFF";e.currentTarget.style.borderColor="rgba(0,238,255,.3)";}}
//                   onMouseLeave={e=>{e.currentTarget.style.color="#475569";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}
//                 ><Icon /></a>
//               ))}
//             </div>
//           </div>
//           {[{title:"Quick Links",links:["Browse Events","Our Courses","About Us","Success Stories","Become a Mentor"]},{title:"Resources",links:["Help Center","Event Guidelines","Community Forum","Blog","Privacy Policy"]}].map(({title,links})=>(
//             <div key={title}>
//               <div style={{fontSize:13,fontWeight:800,color:"white",marginBottom:14,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace"}}>{title}</div>
//               {links.map(l=><a key={l} href="#" style={{color:"#475569",fontSize:13,textDecoration:"none",display:"block",marginBottom:8,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#00EEFF"} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>{l}</a>)}
//             </div>
//           ))}
//           <div>
//             <div style={{fontSize:13,fontWeight:800,color:"white",marginBottom:14,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace"}}>Stay Updated</div>
//             {["📧 techera@gmail.com","📞 +91 9310526618","📍 Hybrid, India"].map(item=>(
//               <div key={item} style={{color:"#475569",fontSize:13,marginBottom:6}}>{item}</div>
//             ))}
//             <div style={{marginTop:14}}>
//               <div style={{fontSize:12,fontWeight:700,color:"#475569",marginBottom:8}}>Subscribe to newsletter</div>
//               <div style={{display:"flex",gap:8}}>
//                 <input placeholder="Your email" style={{flex:1,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"8px 12px",color:"white",fontSize:13,outline:"none"}} />
//                 <button style={{padding:"8px 16px",borderRadius:10,background:"linear-gradient(135deg,#4F46E5,#00EEFF)",color:"#050D1A",fontWeight:800,fontSize:13,border:"none",cursor:"pointer"}}>Subscribe</button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="ev-footer-bottom">
//           <span style={{color:"#475569",fontSize:12}}>© 2025 TechEra Community. All rights reserved.</span>
//           <div style={{display:"flex",gap:20}}>
//             {["Terms of Service","Privacy Policy","Cookie Policy"].map(l=>(
//               <a key={l} href="#" style={{color:"#475569",fontSize:12,textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#94A3B8"} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>{l}</a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default function EventsPage() {
//   const [events,setEvents]=useState(INITIAL_EVENTS);
//   const [selected,setSelected]=useState(null);
//   const [showCreate,setShowCreate]=useState(false);
//   return (
//     <div className="ev-page">
//       <GlobalStyles />
//       <Navbar />
//       {selected
//         ?<EventDetail ev={selected} onBack={()=>{setSelected(null);window.scrollTo(0,0);}} />
//         :<EventsListing events={events} onViewEvent={ev=>{setSelected(ev);window.scrollTo(0,0);}} onCreateEvent={()=>setShowCreate(true)} />
//       }
//       <Footer />
//       {showCreate&&(
//         <CreateEventModal onClose={()=>setShowCreate(false)} onSubmit={newEv=>setEvents(prev=>[newEv,...prev])} />
//       )}
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

    @keyframes shimmer     { 0%{background-position:0% center}100%{background-position:200% center} }
    @keyframes pulseGlow   { 0%,100%{opacity:.45}50%{opacity:1} }
    @keyframes slideIn     { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
    @keyframes accordionOpen{ from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)} }
    @keyframes modalIn     { from{opacity:0;transform:scale(.96) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes fadeIn      { from{opacity:0}to{opacity:1} }
    @keyframes pingAnim    { 75%,100%{transform:scale(2.1);opacity:0} }
    @keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
    @keyframes rotateSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes scanLine    { 0%{top:-2px} 100%{top:100%} }

    .ev-page { font-family: 'Manrope', system-ui, sans-serif; background: #050D1A; color: white; min-height: 100vh; }
    .shimmer-text { background: linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }
    .grad-text { background: linear-gradient(135deg,#00EEFF,#4F46E5); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

    .evl-hero { padding: 100px 28px 48px; max-width: 1200px; margin: 0 auto; }
    .evl-hero-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 36px; }
    .evl-pill { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 999px; border: 1px solid rgba(0,238,255,.2); background: rgba(0,238,255,.05); font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #00EEFF; font-family: 'Space Mono', monospace; margin-bottom: 14px; }
    .evl-title { font-family: 'Syne', sans-serif; font-size: clamp(30px,5vw,56px); font-weight: 900; line-height: 1.05; letter-spacing: -.03em; color: white; }
    .evl-sub { color: #64748B; font-size: 15px; line-height: 1.75; max-width: 460px; margin-top: 10px; }
    .evl-create-btn { display: inline-flex; align-items: center; gap: 9px; padding: 13px 26px; border-radius: 14px; font-weight: 800; font-size: 14px; color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5); border: none; cursor: pointer; transition: transform .25s, box-shadow .25s; font-family: 'Manrope', sans-serif; white-space: nowrap; flex-shrink: 0; }
    .evl-create-btn:hover { transform: scale(1.05); box-shadow: 0 0 36px rgba(0,238,255,.35); }

    .evl-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; padding: 0 28px; max-width: 1200px; margin-left: auto; margin-right: auto; }
    .evl-filter-btn { padding: 7px 18px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #64748B; cursor: pointer; transition: all .2s; font-family: 'Manrope', sans-serif; }
    .evl-filter-btn:hover { border-color: rgba(0,238,255,.25); color: #94A3B8; }
    .evl-filter-btn.active { border-color: rgba(0,238,255,.35); background: rgba(0,238,255,.08); color: #00EEFF; }

    .evl-search-wrap { position: relative; max-width: 340px; width: 100%; }
    .evl-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #475569; pointer-events: none; }
    .evl-search { width: 100%; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 11px 16px 11px 40px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; outline: none; transition: border-color .2s; }
    .evl-search:focus { border-color: rgba(0,238,255,.3); }
    .evl-search::placeholder { color: #334155; }

    .evl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; padding: 0 28px 80px; }
    .ev-card { position: relative; border-radius: 20px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; overflow: hidden; cursor: pointer; transition: transform .35s cubic-bezier(.23,1,.32,1), border-color .35s, box-shadow .35s; }
    .ev-card:hover { transform: translateY(-6px); }
    .ev-card.collab-card { cursor: default; }
    .ev-card-banner { width: 100%; height: 180px; overflow: hidden; position: relative; }
    .ev-card-banner.collab-banner-tall { height: 260px; }
    .ev-card-mode-badge { position: absolute; top: 12px; right: 12px; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; font-family: 'Space Mono', monospace; backdrop-filter: blur(8px); }
    .ev-card-body { padding: 18px 20px 20px; }
    .ev-card-org { font-size: 11px; font-weight: 700; color: #4F46E5; letter-spacing: .1em; text-transform: uppercase; font-family: 'Space Mono', monospace; margin-bottom: 6px; }
    .ev-card-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: white; line-height: 1.3; margin-bottom: 12px; }
    .ev-card-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
    .ev-card-meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #64748B; }
    .ev-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.05); }
    .ev-card-view-btn { padding: 7px 16px; border-radius: 9px; font-size: 12px; font-weight: 700; background: rgba(0,238,255,.08); border: 1px solid rgba(0,238,255,.2); color: #00EEFF; cursor: pointer; transition: background .2s, transform .2s; font-family: 'Manrope', sans-serif; }
    .ev-card-view-btn:hover { background: rgba(0,238,255,.15); transform: scale(1.04); }

    /* ── COLLAB BANNER ── */
    .ev-collab-banner { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .ev-collab-banner-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: white; letter-spacing: -.02em; text-align: center; position: relative; z-index: 2; line-height: 1.2; padding: 0 12px; }
    .ev-collab-banner-badge { position: relative; z-index: 2; margin-top: 10px; padding: 4px 14px; border-radius: 999px; font-size: 10px; font-weight: 700; font-family: 'Space Mono', monospace; letter-spacing: .12em; border: 1px solid; }
    .ev-collab-partner-row { position: relative; z-index: 2; display: flex; align-items: center; gap: 8px; margin-top: 12px; }
    .ev-collab-partner-chip { padding: 3px 12px; border-radius: 999px; font-size: 10px; font-weight: 700; font-family: 'Space Mono', monospace; border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.07); color: rgba(255,255,255,.75); }

    .gi-section { max-width: 1200px; margin: 0 auto; padding: 0 28px 100px; }
    .gi-header { text-align: center; margin-bottom: 56px; }
    .gi-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 16px; border-radius: 999px; border: 1px solid rgba(0,238,255,.2); background: rgba(0,238,255,.05); font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #00EEFF; font-family: 'Space Mono', monospace; margin-bottom: 16px; }
    .gi-title { font-family: 'Syne', sans-serif; font-size: clamp(26px,4vw,46px); font-weight: 900; color: white; letter-spacing: -.03em; line-height: 1.08; margin-bottom: 12px; }
    .gi-subtitle { color: #64748B; font-size: 15px; line-height: 1.75; max-width: 500px; margin: 0 auto; }
    .gi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .gi-card { position: relative; border-radius: 24px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; overflow: hidden; transition: transform .4s cubic-bezier(.23,1,.32,1), border-color .4s, box-shadow .4s; }
    .gi-card:hover { transform: translateY(-10px); }
    .gi-card-bar { height: 3px; width: 100%; }
    .gi-scan { position: absolute; left: 0; right: 0; height: 1px; pointer-events: none; opacity: 0; transition: opacity .3s; }
    .gi-card:hover .gi-scan { opacity: 1; animation: scanLine 3s linear infinite; }
    .gi-glow { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s; }
    .gi-card:hover .gi-glow { opacity: 1; }
    .gi-icon-wrap { position: relative; width: 80px; height: 80px; margin: 32px auto 0; }
    .gi-icon-ring { position: absolute; inset: -8px; border-radius: 50%; border: 1px dashed; opacity: .3; transition: opacity .3s; }
    .gi-card:hover .gi-icon-ring { opacity: .6; animation: rotateSlow 12s linear infinite; }
    .gi-icon-inner { width: 80px; height: 80px; border-radius: 22px; display: flex; align-items: center; justify-content: center; font-size: 32px; position: relative; border: 1px solid; transition: transform .35s; }
    .gi-card:hover .gi-icon-inner { transform: translateY(-4px) scale(1.05); animation: floatY 3s ease-in-out infinite; }
    .gi-card-body { padding: 20px 28px 28px; text-align: center; }
    .gi-tag { display: inline-block; padding: 3px 12px; border-radius: 999px; font-size: 10px; font-weight: 700; font-family: 'Space Mono', monospace; letter-spacing: .1em; margin-bottom: 12px; border: 1px solid; }
    .gi-card-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: white; letter-spacing: -.02em; margin-bottom: 10px; }
    .gi-card-desc { color: #64748B; font-size: 13.5px; line-height: 1.75; margin-bottom: 24px; }
    .gi-perks { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; text-align: left; }
    .gi-perk { display: flex; align-items: center; gap: 10px; padding: 9px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,.05); background: rgba(255,255,255,.02); font-size: 13px; color: #94A3B8; transition: border-color .2s, background .2s, color .2s; }
    .gi-card:hover .gi-perk { border-color: rgba(255,255,255,.07); background: rgba(255,255,255,.03); }
    .gi-perk-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
    .gi-apply-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px 24px; border-radius: 14px; font-weight: 800; font-size: 14px; border: none; cursor: pointer; transition: transform .25s, box-shadow .25s, filter .25s; font-family: 'Manrope', sans-serif; letter-spacing: .01em; text-decoration: none; }
    .gi-apply-btn:hover { transform: scale(1.04); filter: brightness(1.1); }
    .gi-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(0,238,255,.18), transparent); max-width: 1200px; margin: 0 auto 80px; }

    /* ── EVENT DETAIL ── */
    .evd-header { padding: 84px 28px 0; max-width: 1200px; margin: 0 auto; }
    .evd-back-btn { display: inline-flex; align-items: center; gap: 7px; padding: 7px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #64748B; font-size: 13px; font-weight: 600; cursor: pointer; transition: color .2s, border-color .2s; margin-bottom: 24px; font-family: 'Manrope', sans-serif; }
    .evd-back-btn:hover { color: #00EEFF; border-color: rgba(0,238,255,.25); }
    .evd-org-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(0,238,255,.2); background: rgba(0,238,255,.05); font-size: 13px; font-weight: 700; color: #00EEFF; margin-bottom: 10px; font-family: 'Space Mono', monospace; }
    .evd-title { font-family: 'Syne', sans-serif; font-size: clamp(26px,5vw,52px); font-weight: 900; line-height: 1.05; letter-spacing: -.02em; }
    .evd-attendee-badge { display: flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(167,139,250,.2); background: rgba(167,139,250,.06); font-size: 13px; font-weight: 700; color: #A78BFA; font-family: 'Space Mono', monospace; white-space: nowrap; }

    .evd-cover-wrap { padding: 22px 28px 0; max-width: 1200px; margin: 0 auto; }
    .evd-cover { width: 100%; height: clamp(220px,35vw,420px); border-radius: 22px; overflow: hidden; border: 1px solid rgba(255,255,255,.06); position: relative; }

    .evd-cover-badge { position: absolute; top: 18px; right: 18px; padding: 8px 16px; border-radius: 12px; background: rgba(5,13,26,.8); border: 1px solid rgba(0,238,255,.2); color: #00EEFF; font-size: 12px; font-weight: 700; font-family: 'Space Mono', monospace; backdrop-filter: blur(8px); }
    .evd-cover-badge-upcoming { position: absolute; top: 18px; right: 18px; padding: 8px 16px; border-radius: 12px; background: rgba(5,13,26,.8); border: 1px solid rgba(167,139,250,.3); color: #A78BFA; font-size: 12px; font-weight: 700; font-family: 'Space Mono', monospace; backdrop-filter: blur(8px); }
    .evd-meta-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 16px auto 28px; padding: 0 28px; max-width: 1200px; }
    .evd-meta-pill { display: flex; flex-direction: column; align-items: flex-start; padding: 12px 18px; border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; min-width: 100px; transition: border-color .3s, background .3s; cursor: default; }
    .evd-meta-pill:hover { border-color: rgba(0,238,255,.2); background: rgba(0,238,255,.04); }
    .evd-meta-label { font-size: 10px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: .14em; font-family: 'Space Mono', monospace; margin-bottom: 4px; }
    .evd-meta-val { font-size: 14px; font-weight: 800; color: white; }

    .evd-tabs-wrap { position: sticky; top: 64px; z-index: 50; background: rgba(5,13,26,.92); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,.05); }
    .evd-tabs { max-width: 1200px; margin: 0 auto; display: flex; overflow-x: auto; padding: 0 28px; scrollbar-width: none; }
    .evd-tabs::-webkit-scrollbar { display: none; }
    .evd-tab { padding: 16px 20px; font-size: 13px; font-weight: 700; color: #475569; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; transition: color .25s, border-color .25s; white-space: nowrap; font-family: 'Manrope', sans-serif; }
    .evd-tab:hover { color: #94A3B8; }
    .evd-tab.active { color: #00EEFF; border-bottom-color: #00EEFF; }

    .evd-section { max-width: 1200px; margin: 0 auto; padding: 48px 28px 72px; animation: slideIn .4s ease-out both; }
    .evd-sec-head { margin-bottom: 28px; }
    .evd-sec-pill { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 999px; margin-bottom: 12px; font-size: 11px; font-weight: 700; letter-spacing: .2em; font-family: 'Space Mono', monospace; }
    .evd-sec-h2 { font-family: 'Syne', sans-serif; font-size: clamp(22px,3.5vw,34px); font-weight: 900; color: white; letter-spacing: -.02em; margin-bottom: 8px; }
    .evd-sec-sub { color: #64748B; font-size: 14px; max-width: 480px; line-height: 1.7; }
    .evd-divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(0,238,255,.18),transparent); margin: 40px 0; }

    .evd-form-card { border-radius: 20px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; overflow: hidden; }
    .evd-form-header { padding: 24px 28px 20px; border-bottom: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; gap: 12px; }
    .evd-form-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
    .evd-form-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 900; color: white; }
    .evd-form-subtitle { color: #64748B; font-size: 13px; margin-top: 2px; }
    .evd-form-body { padding: 28px; }
    .evd-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .evd-form-group { display: flex; flex-direction: column; gap: 6px; }
    .evd-form-label { font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: .1em; font-family: 'Space Mono', monospace; }
    .evd-input { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 16px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; transition: border-color .2s, background .2s; outline: none; width: 100%; }
    .evd-input:focus { border-color: rgba(0,238,255,.4); background: rgba(0,238,255,.04); }
    .evd-input::placeholder { color: #334155; }
    .evd-select { appearance: none; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 16px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; transition: border-color .2s; outline: none; cursor: pointer; width: 100%; }
    .evd-select:focus { border-color: rgba(0,238,255,.4); }
    .evd-select option { background: #0A1628; }
    .evd-textarea { resize: vertical; min-height: 100px; }
    .evd-submit-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 32px; border-radius: 14px; font-weight: 800; font-size: 15px; color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5); border: none; cursor: pointer; transition: transform .25s, box-shadow .25s; font-family: 'Manrope', sans-serif; }
    .evd-submit-btn:hover { transform: scale(1.04); box-shadow: 0 0 36px rgba(0,238,255,.35); }
    .evd-submit-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }

    .evd-agenda-list { display: flex; flex-direction: column; gap: 10px; }
    .evd-agenda-item { display: flex; align-items: center; gap: 16px; padding: 16px 22px; border-radius: 16px; border: 1px solid; transition: transform .25s; }
    .evd-agenda-item:hover { transform: translateX(4px); }
    .evd-agenda-time { font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; min-width: 160px; flex-shrink: 0; }
    .evd-agenda-title { font-size: 15px; font-weight: 700; color: white; }
    .evd-agenda-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

    .evd-people-section { margin-bottom: 40px; }
    .evd-people-section-title { display: flex; align-items: center; gap: 12px; font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; margin-bottom: 20px; padding: 16px 20px; border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; }
    .evd-people-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
    .evd-person-card { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; transition: border-color .3s, transform .3s, box-shadow .3s; }
    .evd-person-card:hover { transform: translateY(-3px); }
    .evd-person-avatar { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-size: 15px; font-weight: 700; flex-shrink: 0; }
    .evd-person-name { font-size: 15px; font-weight: 800; color: white; margin-bottom: 2px; }
    .evd-person-tagline { font-size: 12px; color: #64748B; margin-bottom: 6px; }
    .evd-person-socials { display: flex; gap: 8px; }
    .evd-soc { width: 26px; height: 26px; border-radius: 7px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); display: flex; align-items: center; justify-content: center; color: #475569; text-decoration: none; font-size: 10px; transition: color .2s, border-color .2s; }
    .evd-soc:hover { color: #00EEFF; border-color: rgba(0,238,255,.3); }

    .evd-faq-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
    .evd-faq-item { border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; overflow: hidden; transition: border-color .3s; }
    .evd-faq-item.open { border-color: rgba(0,238,255,.2); }
    .evd-faq-q { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 22px; cursor: pointer; font-size: 15px; font-weight: 700; color: white; }
    .evd-faq-chevron { width: 20px; height: 20px; border-radius: 6px; border: 1px solid rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; transition: transform .3s, background .3s; flex-shrink: 0; }
    .evd-faq-item.open .evd-faq-chevron { transform: rotate(180deg); background: rgba(0,238,255,.1); }
    .evd-faq-a { padding: 0 22px 18px; color: #64748B; font-size: 14px; line-height: 1.75; animation: accordionOpen .25s ease-out both; }

    .evd-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .evd-contact-info { display: flex; flex-direction: column; gap: 16px; }
    .evd-contact-info-card { padding: 18px 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; }

    /* ── REGISTRATION BANNER ── */
    .evd-register-banner { max-width: 1200px; margin: 0 auto 60px; padding: 0 28px; animation: slideIn .4s ease-out both; }
    .evd-register-inner { position: relative; border-radius: 24px; overflow: hidden; padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; border: 1px solid rgba(0,238,255,.2); background: linear-gradient(135deg, rgba(0,238,255,.06) 0%, rgba(79,70,229,.08) 50%, rgba(167,139,250,.05) 100%); }
    .evd-register-glow { position: absolute; top: -40px; left: -40px; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(0,238,255,.18), transparent 70%); pointer-events: none; }
    .evd-register-glow-r { position: absolute; bottom: -40px; right: -40px; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(167,139,250,.15), transparent 70%); pointer-events: none; }
    .evd-register-text h3 { font-family: 'Syne', sans-serif; font-size: clamp(20px, 3vw, 28px); font-weight: 900; color: white; letter-spacing: -.02em; margin-bottom: 6px; }
    .evd-register-text p { color: #64748B; font-size: 14px; line-height: 1.65; max-width: 420px; }
    .evd-seats-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 999px; border: 1px solid rgba(74,222,128,.3); background: rgba(74,222,128,.08); font-size: 11px; font-weight: 700; color: #4ADE80; font-family: 'Space Mono', monospace; margin-top: 10px; width: fit-content; }
    .evd-register-btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; border-radius: 16px; font-weight: 800; font-size: 16px; color: #050D1A; background: linear-gradient(135deg, #00EEFF, #4F46E5); border: none; cursor: pointer; text-decoration: none; transition: transform .25s, box-shadow .25s, filter .25s; font-family: 'Manrope', sans-serif; white-space: nowrap; flex-shrink: 0; }
    .evd-register-btn:hover { transform: scale(1.06); box-shadow: 0 0 48px rgba(0,238,255,.4); filter: brightness(1.08); }

    /* ── CREATE MODAL ── */
    .modal-overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(5,13,26,.9); backdrop-filter: blur(14px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .22s ease-out; }
    .modal-box { background: #0A1628; border: 1px solid rgba(255,255,255,.08); border-radius: 28px; width: 100%; max-width: 720px; max-height: 90vh; overflow-y: auto; animation: modalIn .32s cubic-bezier(.23,1,.32,1); scrollbar-width: thin; scrollbar-color: rgba(0,238,255,.2) transparent; }
    .modal-box::-webkit-scrollbar { width: 4px; }
    .modal-box::-webkit-scrollbar-thumb { background: rgba(0,238,255,.2); border-radius: 2px; }
    .modal-header { padding: 28px 32px 20px; border-bottom: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #0A1628; z-index: 1; border-radius: 28px 28px 0 0; }
    .modal-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: white; }
    .modal-close { width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.04); display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748B; transition: color .2s, border-color .2s; font-size: 16px; line-height: 1; }
    .modal-close:hover { color: white; border-color: rgba(255,255,255,.2); }
    .modal-body { padding: 28px 32px 32px; }

    .banner-upload-area { width: 100%; height: 170px; border-radius: 16px; border: 2px dashed rgba(0,238,255,.2); background: rgba(0,238,255,.03); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: border-color .2s, background .2s; position: relative; overflow: hidden; margin-bottom: 20px; }
    .banner-upload-area:hover { border-color: rgba(0,238,255,.4); background: rgba(0,238,255,.06); }
    .banner-upload-area.has-image { border-style: solid; border-color: rgba(0,238,255,.25); }
    .banner-preview-img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
    .banner-hover-overlay { position: absolute; inset: 0; background: rgba(5,13,26,.65); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; opacity: 0; transition: opacity .2s; }
    .banner-upload-area:hover .banner-hover-overlay { opacity: 1; }

    .ev-footer { background: #050D1A; border-top: 1px solid rgba(255,255,255,.04); padding: 48px 28px 28px; }
    .ev-footer-inner { max-width: 1200px; margin: 0 auto; }
    .ev-footer-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 32px; margin-bottom: 40px; }
    .ev-footer-bottom { border-top: 1px solid rgba(255,255,255,.05); padding-top: 20px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }

    @media(max-width:1023px) {
      .evl-grid { grid-template-columns: repeat(2,1fr); }
      .gi-grid { grid-template-columns: repeat(2,1fr); }
    }
    @media(max-width:767px) {
      .evl-grid { grid-template-columns: 1fr; padding: 0 14px 60px; }
      .gi-grid { grid-template-columns: 1fr; }
      .evd-form-row { grid-template-columns: 1fr; }
      .evd-people-grid { grid-template-columns: 1fr; }
      .evd-contact-grid { grid-template-columns: 1fr; }
      .evd-agenda-time { min-width: 110px; font-size: 10px; }
      .evd-header { padding-top: 80px; }
      .evl-hero { padding-left: 14px; padding-right: 14px; }
      .evl-filters { padding: 0 14px; }
      .evl-hero-top { align-items: flex-start; }
      .modal-body, .modal-header { padding-left: 18px; padding-right: 18px; }
      .gi-section { padding: 0 14px 80px; }
      .evd-cover-wrap { padding: 16px 14px 0; }
      .evd-meta-row { padding: 0 14px; }
      .evd-register-inner { padding: 28px 24px; }
      .evd-register-banner { padding: 0 14px; }
    }
    @media(max-width:479px) {
      .evd-section { padding: 32px 14px 56px; }
      .evd-tabs { padding: 0 14px; }
      .evd-tab { padding: 14px 10px; font-size: 11px; }
    }
  `}</style>
);

const AGENDA_TYPE_STYLES = {
  logistics:   { color:"#94A3B8", bg:"rgba(148,163,184,.1)",  border:"rgba(148,163,184,.2)" },
  keynote:     { color:"#FEBC2E", bg:"rgba(254,188,46,.08)",  border:"rgba(254,188,46,.2)"  },
  session:     { color:"#00EEFF", bg:"rgba(0,238,255,.08)",   border:"rgba(0,238,255,.2)"   },
  presentation:{ color:"#38BDF8", bg:"rgba(56,189,248,.08)", border:"rgba(56,189,248,.2)" },
  break:       { color:"#4ADE80", bg:"rgba(74,222,128,.08)",  border:"rgba(74,222,128,.2)"  },
  activity:    { color:"#A78BFA", bg:"rgba(167,139,250,.08)", border:"rgba(167,139,250,.2)" },
  competition: { color:"#F43F5E", bg:"rgba(244,63,94,.08)",  border:"rgba(244,63,94,.2)"  },
  sponsor:     { color:"#F97316", bg:"rgba(249,115,22,.08)",  border:"rgba(249,115,22,.2)"  },
  closing:     { color:"#4F46E5", bg:"rgba(79,70,229,.08)",   border:"rgba(79,70,229,.2)"   },
};
const DETAIL_TABS = ["Event Descriptions","Agenda / Track","People & Partners","FAQ & Contact Us"];

// ─── COLLAB BANNER COMPONENT ──────────────────────────────────────────────────
function CollabBanner({ ev }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    const acc = ev.accentColor || "#00EEFF";
    const r = parseInt(acc.slice(1,3),16);
    const g = parseInt(acc.slice(3,5),16);
    const b = parseInt(acc.slice(5,7),16);
    const pts = Array.from({length:22},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.0003, vy:(Math.random()-.5)*.0003,
      rad:Math.random()*1.4+.5, a:Math.random()*.3+.08
    }));
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0,0,w,h);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1)p.vx*=-1;
        if(p.y<0||p.y>1)p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x*w,p.y*h,p.rad,0,Math.PI*2);
        ctx.fillStyle=`rgba(${r},${g},${b},${p.a})`;
        ctx.fill();
      });
      const thresh = Math.min(w,h)*.16;
      pts.forEach((a,i) => pts.slice(i+1).forEach(b2 => {
        const d = Math.hypot((a.x-b2.x)*w,(a.y-b2.y)*h);
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
  }, [ev.accentColor]);

  const acc = ev.accentColor || "#00EEFF";
  const partners = (ev.sponsors||[]).concat(ev.communityPartners||[]).filter(p=>p.name!=="TechEra");

  return (
    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden",background:ev.bannerGradient}}>
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} />
      {/* Glow orb */}
      <div style={{position:"absolute",top:"10%",left:"50%",transform:"translateX(-50%)",width:"60%",height:"70%",borderRadius:"50%",background:`radial-gradient(ellipse, ${acc}18, transparent 70%)`,pointerEvents:"none"}} />
      {/* Content */}
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,padding:"0 16px",zIndex:2}}>
        {/* Collab badge */}
        <div style={{padding:"3px 12px",borderRadius:999,border:`1px solid ${acc}50`,background:`${acc}18`,fontSize:10,fontWeight:700,fontFamily:"Space Mono,monospace",color:acc,letterSpacing:".15em",marginBottom:2}}>
          🤝 COMMUNITY PARTNER
        </div>
        {/* Event name */}
        <div style={{fontFamily:"Syne,sans-serif",fontSize:20,fontWeight:900,color:"white",textAlign:"center",lineHeight:1.2,letterSpacing:"-.02em",textShadow:`0 0 24px ${acc}50`}}>
          {ev.name}
        </div>
        {/* Powered by row */}
        {partners.length > 0 && (
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4,flexWrap:"wrap",justifyContent:"center"}}>
            <span style={{fontSize:10,color:"rgba(255,255,255,.4)",fontFamily:"Space Mono,monospace"}}>powered by</span>
            {partners.map((p,i) => (
              <span key={i} style={{padding:"2px 10px",borderRadius:999,fontSize:10,fontWeight:700,fontFamily:"Space Mono,monospace",border:"1px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.07)",color:"rgba(255,255,255,.8)"}}>
                {p.name}
              </span>
            ))}
          </div>
        )}
        {/* Date + location row */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:6,flexWrap:"wrap",justifyContent:"center"}}>
          <span style={{fontSize:11,color:"rgba(255,255,255,.55)",display:"flex",alignItems:"center",gap:4}}>
            📅 {ev.date}
          </span>
          <span style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,.25)",flexShrink:0}} />
          <span style={{fontSize:11,color:"rgba(255,255,255,.55)",display:"flex",alignItems:"center",gap:4}}>
            📍 {ev.location}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const GitHubIcon   = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const LinkedInIcon = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const InstaIcon    = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const WebIcon      = () => <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const ChevDown     = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>;
const SendIcon     = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const CalIcon      = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const LocIcon      = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
const UserIcon     = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const UploadIcon   = () => <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>;
const ArrowLeft    = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/></svg>;
const ArrowRight   = () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>;
const TicketIcon   = () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INITIAL_EVENTS = [
  {
    id:1, name:"🚀 Developers Meetup 2026", organizer:"​TechEra Presents",
    date:"07th March 2026", day:"Saturday", time:"09:30 AM ONWARDS", fees:"Free", mode:"Offline",
    location:"ThoughtWork Office, Gurugram", attendees:"200 Limited Seats", category:"Meetup",
    status:"active",
    registerLink:"https://luma.com/esw4feoh",
    bannerUrl: "/images/Meetup-banner_2.png", bannerGradient:"linear-gradient(135deg,#050D1A 0%,#0D1F3C 60%,#050D1A 100%)", accentColor:"#00EEFF",
    description:`​The Developers Meetup 2026 is a premium offline community gathering designed to bring together developers, designers, builders, founders, and ambitious tech enthusiasts who are passionate about building, learning, and growing within the technology ecosystem.
​This meetup is more than just an event — it is a high-energy networking and opportunity-driven experience where participants will interact with like-minded individuals, discover collaboration opportunities, explore internships and project possibilities, and become part of a fast-growing developer network focused on real impact.
​Whether you are a beginner starting your journey, a student exploring opportunities, or an experienced developer looking to expand your network, this meetup is structured to help you connect, collaborate, and grow faster.`,
    links:{ website:"https://luma.com/esw4feoh", linkedin:"https://www.linkedin.com/company/techeraa/", instagram:"https://www.instagram.com/tech__eraa?igsh=ZTNlcXBobWZ0NG16" },
    agenda: [
      { time: "09:30 AM – 10:00 AM", title: "Verification & Check-in", type: "logistics" },
      { time: "10:15 AM – 10:45 AM", title: "Welcome & Event Overview", type: "keynote" },
      { time: "10:48 AM – 11:28 AM", title: "Key Speaker 1", type: "session" },
      { time: "11:31 AM – 12:01 PM", title: "Tech4Hack Presentation", type: "presentation" },
      { time: "12:04 PM – 12:24 PM", title: "Coffee Break", type: "break" },
      { time: "12:27 PM – 12:32 PM", title: "Team Distribution", type: "activity" },
      { time: "12:32 PM – 01:02 PM", title: "Lunch and Networking", type: "break" },
      { time: "01:05 PM – 01:45 PM", title: "Fun Group Activity", type: "activity" },
      { time: "01:48 PM – 02:28 PM", title: "Key Speaker 2", type: "session" },
      { time: "02:31 PM – 02:46 PM", title: "Competition Segment", type: "competition" },
      { time: "02:49 PM – 03:04 PM", title: "Pizza Sponsor", type: "sponsor" },
      { time: "03:07 PM – 03:22 PM", title: "MetaSpace Address and Final Results", type: "closing" },
      { time: "03:22 PM – 03:30 PM", title: "Closing With Some Group Pictures", type: "closing" },
    ],
    organiserTeam:[
      {name:"Aditya ",  tagline:"Founder",       initials:"AM",accent:"#00EEFF"},
      {name:"Arnav", tagline:"Co-Founder",      initials:"PS",accent:"#A78BFA"},
      {name:"Amrita",  tagline:"Co-Founder", initials:"RV",accent:"#4F46E5"},
      {name:"Biswa",  tagline:"Community Manager", initials:"SG",accent:"#06B6D4"},
      {name:"Raj",  tagline:"Senior Coordinator", initials:"SG",accent:"#b4e166"},
      {name:"Gourav",  tagline:"Technical Team", initials:"SG",accent:"#65b4c2"},
      {name:"Kaashvi",  tagline:"Video Editing", initials:"SG",accent:"#2d5cba"},
      {name:"Parth and Shaurya",  tagline:"Marketing and PR", initials:"SG",accent:"#30c274"},
      {name:"Harsh and Abhijna",  tagline:"Design Team", initials:"SG",accent:"#7e4cc9"},
      {name:"Shambhavi and Kritika",  tagline:"Event Management Team", initials:"SG",accent:"#d153a9"},
      {name:"Raja",  tagline:"Content Team", initials:"SG",accent:"#d153a9"},
    ],
    speakers:[{name:"Pragati Srivastava",tagline:"Java Backend Developer, Ex-Amazon",initials:"AR",accent:"#00EEFF"}],
    sponsors:[
      {name:"Tech4Hack",tagline:"Venue Partner",initials:"TC",accent:"#FEBC2E"},
      {name:"Edubuk",tagline:"Job and knowledge Partner",initials:"CB",accent:"#94A3B8"},
      {name:"OSEN ",tagline:"Goodies Partner",initials:"DS",accent:"#00EEFF"},
      {name:"Digimation Flight",tagline:"Food Partner",initials:"IV",accent:"#A78BFA"},
      {name:"Ops-skill",tagline:"Innovation Partner",initials:"IV",accent:"#bae7bd"},
      {name:"MetaSpace",tagline:"Goodies Partner",initials:"IV",accent:"#cce883"},
    ],
    communityPartners:[
      {name:"Tech4Hack",tagline:"Open Source Community",initials:"GN",accent:"#4F46E5"},
      {name:"Cracked",tagline:"Open Source Community",initials:"ML",accent:"#00EEFF"},
      {name:"Idevion",tagline:"Open Source Community",initials:"HC",accent:"#A78BFA"},
      {name:"Hackfinity",tagline:"Open Source Community",initials:"OF",accent:"#06B6D4"},
    ],
    faqs:[
      {q:"Is this event free to attend?",a:"Yes! Completely free for all registered attendees. Just sign up and show up."},
      {q:"Who can attend?",a:"Anyone passionate about open source, AI, Web3, or tech. Students, developers, designers, and founders are all welcome."},
      {q:"Will sessions be recorded?",a:"Selected sessions will be recorded and shared with registered attendees after the event via email."},
      {q:"How do I become a speaker or sponsor?",a:"Use the contact form on this page to reach out. Our team will get back to you within 48 hours."},
      {q:"Is there a networking session?",a:"Absolutely! Post the formal agenda, there's dedicated networking time for all attendees, speakers, and partners."},
      {q:"What should I bring?",a:"Just your laptop, curiosity, and energy! We'll handle the rest including lunch for all in-person attendees."},
    ],
  },
  {
    id:2, name:"Upcoming Hackathon 2026", organizer:"TechEra Community",
    date:"TBA", day:"TBA", time:"TBA", fees:"Free", mode:"TBA",
    location:"TBA", attendees:"TBA", category:"Hackathon",
    status:"upcoming",
    registerLink:"#",
    bannerUrl:null, bannerGradient:"linear-gradient(135deg,#1a050d 0%,#3c0d1f 60%,#1a050d 100%)", accentColor:"#A78BFA",
    description:"Stay tuned — details for TechEra Hackathon 2025 will be announced soon. Follow us on LinkedIn and Instagram to be the first to know.",
    links:{website:"#",linkedin:"#",instagram:"#"},
    agenda:[],
    organiserTeam:[
      {name:"Aditya ",  tagline:"Founder",       initials:"AM",accent:"#00EEFF"},
      {name:"Arnav", tagline:"Co-Founder",      initials:"PS",accent:"#A78BFA"},
      {name:"Amrita",  tagline:"Co-Founder", initials:"RV",accent:"#4F46E5"},
      {name:"Biswa",  tagline:"Community Manager", initials:"SG",accent:"#06B6D4"},
      {name:"Raj",  tagline:"Senior Coordinator", initials:"SG",accent:"#b4e166"},
    ],
    speakers:[],sponsors:[],communityPartners:[],
    faqs:[
      {q:"What's the team size?",a:"Teams of 2–4 members. Solo participation is also allowed."},
      {q:"Is accommodation provided?",a:"Yes, for outstation participants. Please mention in registration."},
    ],
  },
  {
    id:3, name:"CV TO CAREER", organizer:"EDUBUK X TechEra",
    date:"8th February 2025", day:"Sunday", time:"12:00 PM – 1:30 PM (IST)", fees:"Free", mode:"Google Meet",
    location:"Virtual", attendees:"200+", category:"Workshop",
    status:"expired",
    registerLink:"#",
    bannerUrl:"/images/Workshop-banner.png", bannerGradient:"linear-gradient(135deg,#050d1a 0%,#0f2c1a 60%,#050d1a 100%)", accentColor:"#4ADE80",
    description:"EDUBUK in collaboration with TechEra presents an exclusive online career-focused session for students and early professionals.\n ​'CV to Career: A TruTalk by EDUBUK × TechEra' is a live interactive session designed to help participants understand how blockchain-verified learning, certifications, and career platforms are reshaping internships, placements, and long-term career growth.\n ​Through this session, participants will gain insights into how TruCV & TruJobs, powered by EDUBUK, enable trusted professional profiles and unlock national and international career opportunities through verified credentials.",
    links:{website:"#",linkedin:"#",instagram:"#"},
    agenda: [
      { time: "12:00 PM – 12:05 PM", title: "Welcome & Introduction (EDUBUK × TechEra)", type: "keynote" },
      { time: "12:05 PM – 12:25 PM", title: "From CV to Career: Why Verification Matters", type: "session" },
      { time: "12:25 PM – 12:45 PM", title: "TruCV & TruJobs: Building Trusted Career Profiles", type: "presentation" },
      { time: "12:45 PM – 01:05 PM", title: "Certifications, Internships & Career Opportunities", type: "session" },
      { time: "01:05 PM – 01:20 PM", title: "Live Q&A and Student Interaction", type: "activity" },
      { time: "01:20 PM – 01:30 PM", title: "Surprise Giveaway & Closing Note", type: "closing" },
    ],
    organiserTeam:[
      {name:"Aditya ",  tagline:"Founder",       initials:"AM",accent:"#00EEFF"},
      {name:"Arnav", tagline:"Co-Founder",      initials:"PS",accent:"#A78BFA"},
      {name:"Amrita",  tagline:"Co-Founder", initials:"RV",accent:"#4F46E5"},
      {name:"Biswa",  tagline:"Community Manager", initials:"SG",accent:"#06B6D4"},
      {name:"Raj",  tagline:"Senior Coordinator", initials:"SG",accent:"#b4e166"},
    ],
    speakers:[
      {name:"Shivani Mehrotra",tagline:"Co-Founder and COO of Edubuk",initials:"SM",accent:"#4ADE80"},
      {name:"Apoorva Bajaj",tagline:"Co-Founder and CEO of Edubuk",initials:"AB",accent:"#00EEFF"},
    ],
    sponsors:[{name:"EDUBUK",tagline:"Event Sponser",initials:"OA",accent:"#4ADE80"}],
    communityPartners:[],
    faqs:[
      {q:"How do I get the meeting link?",a:"You'll receive it via email after registration."},
      {q:"Is it recorded?",a:"Yes, all sessions will be available on demand post event."},
    ],
  },
  // ─── COLLAB EVENTS ───────────────────────────────────────────────────────────
  {
    id:4,
    name:"LockedIn",
    organizer:"CracKed × HERMEiAS",
    date:"1st November 2025",
    day:"Saturday",
    time:"Evening",
    fees:"Free",
    mode:"Offline",
    location:"Delhi",
    attendees:"TBA",
    category:"Collaborations",
    status:"expired",
    registerLink:"#",
    bannerUrl:null,
    bannerGradient:"linear-gradient(135deg,#0a0515 0%,#1a0a2e 45%,#0d1a2e 100%)",
    accentColor:"#A78BFA",
    description:"TechEra is the proud Community Partner for LockedIn — powered by CracKed and HERMEiAS.\n\nAn evening where builders, coders, and creators come together to showcase what they've been working on, share ideas, and connect over good food & great energy.\n\nThis event brought together passionate developers from across Delhi for an intimate evening of demos, networking, and community building. TechEra was honored to be the official Community Partner for this initiative.",
    links:{ website:"#", linkedin:"#", instagram:"#" },
    agenda:[],
    organiserTeam:[],
    speakers:[],
    sponsors:[
      {name:"CracKed",  tagline:"Powered By",      initials:"CK", accent:"#A78BFA"},
      {name:"HERMEiAS", tagline:"Powered By",      initials:"HM", accent:"#4F46E5"},
    ],
    communityPartners:[
      {name:"TechEra",  tagline:"Community Partner", initials:"TE", accent:"#00EEFF"},
    ],
    faqs:[
      {q:"What was LockedIn about?",a:"LockedIn was an evening community event for builders, coders, and creators to showcase their work, share ideas, and network over food and great energy."},
      {q:"Who organised LockedIn?",a:"LockedIn was powered by CracKed and HERMEiAS, with TechEra as the official Community Partner."},
    ],
  },
  {
    id:5,
    name:"Technical Day 5.0",
    organizer:"ACE – Association of Computer Enthusiasts",
    date:"30–31 October 2025",
    day:"Thursday & Friday",
    time:"All Day",
    fees:"Free",
    mode:"Offline",
    location:"VIPS Campus, New Delhi",
    attendees:"TBA",
    category:"Collaborations",
    status:"expired",
    registerLink:"#",
    bannerUrl:null,
    bannerGradient:"linear-gradient(135deg,#050d1a 0%,#061f0a 45%,#050d1a 100%)",
    accentColor:"#4ADE80",
    description:"The biggest tech fest of the year — organized by ACE (Association of Computer Enthusiasts) at VIPS campus, New Delhi, and proudly partnered with TechEra.\n\nGet ready for two power-packed days of innovation, collaboration, and hands-on experiences designed to ignite your inner techie.\n\nTechnical Day 5.0 featured competitions, workshops, and talks spread across two energetic days. TechEra was honored to be the Community Partner for this landmark edition of ACE's flagship annual event.",
    links:{ website:"#", linkedin:"#", instagram:"#" },
    agenda:[],
    organiserTeam:[],
    speakers:[],
    sponsors:[
      {name:"ACE", tagline:"Organized By", initials:"AC", accent:"#4ADE80"},
    ],
    communityPartners:[
      {name:"TechEra", tagline:"Community Partner", initials:"TE", accent:"#00EEFF"},
    ],
    faqs:[
      {q:"What is Technical Day 5.0?",a:"Technical Day 5.0 is the flagship annual tech fest organized by ACE (Association of Computer Enthusiasts) at VIPS campus, New Delhi, featuring competitions, workshops, and speaker sessions."},
      {q:"What was TechEra's role?",a:"TechEra was the proud Community Partner for Technical Day 5.0, supporting the event with community reach and developer network engagement."},
    ],
  },
  {
    id:6, name:"PROMTHEIST", organizer:"Neuroplex",
    date:"22nd November 2025", day:"Saturday", time:"TBA", mode:"Offline",
    location:"Noida, Delhi", attendees:"TBA", category:"Collaborations",
    status:"expired", registerLink:"#",
    bannerUrl:null, bannerGradient:"linear-gradient(135deg,#0a0a1a 0%,#1a0a2e 40%,#0d0a1f 100%)", accentColor:"#F97316",
    description:"PromptHeist is a prompt engineering challenge designed to uncover the smartest minds who can bend AI to their will.\n\nIn this high-stakes competition, participants enter the world of AI prompt strategy, creativity, and manipulation — where the mission is simple: outsmart the machine before others do.\n\nTechEra was proud to be the Community Partner for this one-of-a-kind AI challenge by Neuroplex.",
    links:{website:"#",linkedin:"#",instagram:"#"},
    agenda:[], organiserTeam:[], speakers:[],
    sponsors:[{name:"Neuroplex",tagline:"Organized By",initials:"NP",accent:"#F97316"}],
    communityPartners:[{name:"TechEra",tagline:"Community Partner",initials:"TE",accent:"#00EEFF"}],
    faqs:[
      {q:"What was PROMTHEIST?",a:"PromptHeist is a prompt engineering challenge where participants compete to outsmart AI using creative and strategic prompting techniques."},
      {q:"What was TechEra's role?",a:"TechEra served as the official Community Partner for PROMTHEIST by Neuroplex."},
    ],
  },
  {
    id:7, name:"CODEZEN 2", organizer:"CodeGeeks – GTB4CEC",
    date:"February 2026", day:"TBA", time:"TBA", mode:"Offline",
    location:"Delhi NCR", attendees:"TBA", category:"Collaborations",
    status:"expired", registerLink:"#",
    bannerUrl:null, bannerGradient:"linear-gradient(135deg,#0a0515 0%,#1a0528 40%,#100a1a 100%)", accentColor:"#EC4899",
    description:"TechEra is thrilled to collaborate with CodeGeeks, the coding society of GTB4CEC, as Community Partners for CodeZen — the national-level hackathon where creators, coders, and innovators unite to build the extraordinary.\n\nThis edition comes with a Stranger Things-inspired theme, bringing a spooky, electrifying atmosphere that will push your creativity beyond the ordinary.",
    links:{website:"#",linkedin:"#",instagram:"#"},
    agenda:[], organiserTeam:[], speakers:[],
    sponsors:[{name:"CodeGeeks",tagline:"Organized By",initials:"CG",accent:"#EC4899"}],
    communityPartners:[{name:"TechEra",tagline:"Community Partner",initials:"TE",accent:"#00EEFF"}],
    faqs:[
      {q:"What is CodeZen 2?",a:"CodeZen 2 is a national-level hackathon organized by CodeGeeks (GTB4CEC) with a Stranger Things-inspired theme."},
      {q:"What was TechEra's role?",a:"TechEra participated as the official Community Partner for CodeZen 2."},
    ],
  },
  {
    id:8, name:"DUALITY HACKATHON: Genesis", organizer:"Genesis",
    date:"13th December 2025", day:"Saturday", time:"All Day", mode:"Offline",
    location:"Gurugram, Haryana", attendees:"TBA", category:"Collaborations",
    status:"expired", registerLink:"#",
    bannerUrl:null, bannerGradient:"linear-gradient(135deg,#050d1a 0%,#0a1528 40%,#050d1a 100%)", accentColor:"#06B6D4",
    description:"What started as a hackathon quickly turned into an exciting day full of ideas, teamwork, learning, and fun.\n\nDuality AI Hackathon, organized by Genesis, delivered a great overall experience — engaging, well-managed, and genuinely enjoyable from start to finish.\n\nTechEra was honored to be the Community Partner for this fantastic event in Gurugram.",
    links:{website:"#",linkedin:"#",instagram:"#"},
    agenda:[], organiserTeam:[], speakers:[],
    sponsors:[{name:"Genesis",tagline:"Organized By",initials:"GN",accent:"#06B6D4"}],
    communityPartners:[{name:"TechEra",tagline:"Community Partner",initials:"TE",accent:"#00EEFF"}],
    faqs:[
      {q:"What was Duality Hackathon: Genesis?",a:"An AI-focused hackathon organized by Genesis in Gurugram — a full day of ideas, teamwork, and innovation."},
      {q:"What was TechEra's role?",a:"TechEra was the official Community Partner for Duality Hackathon: Genesis."},
    ],
  },
];

const INVOLVEMENT_ROLES = [
  {
    id:"sponsor", icon:"🤝", tag:"SUPPORT US", title:"Become a Sponsor",
    desc:"Partner with TechEra to put your brand in front of thousands of passionate developers, designers, and builders at our events.",
    accent:"#FEBC2E", gradient:"linear-gradient(135deg,#FEBC2E,#F97316)",
    bgGradient:"linear-gradient(135deg,rgba(254,188,46,.08),rgba(249,115,22,.05))",
    applyLink:"https://your-sponsor-application-link.com",
    perks:["Brand visibility across all event materials","Dedicated booth / branding slot at events","Shoutout on all social channels (10K+ reach)","Direct access to top student talent","Co-branded content & recap features"],
  },
  {
    id:"speaker", icon:"🎤", tag:"SHARE YOUR EXPERTISE", title:"Apply as Speaker",
    desc:"Got knowledge worth sharing? Take the stage at TechEra events and inspire the next generation of innovators across India.",
    accent:"#A78BFA", gradient:"linear-gradient(135deg,#A78BFA,#4F46E5)",
    bgGradient:"linear-gradient(135deg,rgba(167,139,250,.08),rgba(79,70,229,.05))",
    applyLink:"https://your-speaker-application-link.com",
    perks:["Speak at upcoming TechEra events","Featured speaker profile on our platforms","Network with 500–1000+ attendees per event","Content amplification on social media","Speaker certificate & recognition"],
  },
  {
    id:"volunteer", icon:"⚡", tag:"JOIN THE CREW", title:"Volunteer with Us",
    desc:"Be part of the action behind the scenes. Volunteers are the heartbeat of every TechEra event — help us run the show.",
    accent:"#00EEFF", gradient:"linear-gradient(135deg,#00EEFF,#4F46E5)",
    bgGradient:"linear-gradient(135deg,rgba(0,238,255,.08),rgba(79,70,229,.05))",
    applyLink:"https://docs.google.com/forms/d/e/1FAIpQLSehz9Yy6i5WFw1O3tDYtEkb414jtoWGlf1FFKYlbZG_W8Useg/viewform",
    perks:["Hands-on event management experience","Exclusive volunteer merch & goodies","Certificate of volunteering","Network with speakers & organizers","Priority access to all future TechEra events"],
  },
];

function GetInvolved() {
  return (
    <>
      {/* <div className="gi-divider" />
      <section className="gi-section">
        <div className="gi-header">
          <div className="gi-eyebrow">
            <span style={{width:7,height:7,borderRadius:"50%",background:"#00EEFF",display:"inline-block",animation:"pulseGlow 2s ease-in-out infinite"}} />
            GET INVOLVED
          </div>
          <h2 className="gi-title">Be part of something<br /><span className="shimmer-text">bigger than a ticket</span></h2>
          <p className="gi-subtitle">Our events thrive because of sponsors, speakers, and volunteers. Pick your role and help us build the future of tech communities in India.</p>
        </div>
        <div className="gi-grid">
          {INVOLVEMENT_ROLES.map((role,i)=><RoleCard key={role.id} role={role} index={i} />)}
        </div>
      </section> */}
    </>
  );
}

function RoleCard({role,index}) {
  const [hov,setHov]=useState(false);
  return (
    <div className="gi-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{borderColor:hov?`${role.accent}35`:"rgba(255,255,255,.05)",boxShadow:hov?`0 24px 64px ${role.accent}14, 0 0 0 1px ${role.accent}20`:"none",animationDelay:`${index*.08}s`}}
    >
      <div className="gi-card-bar" style={{background:role.gradient}} />
      <div className="gi-glow" style={{background:`radial-gradient(ellipse at top, ${role.accent}0D, transparent 55%)`}} />
      <div className="gi-scan" style={{background:`linear-gradient(90deg,transparent,${role.accent}50,transparent)`}} />
      <div style={{position:"absolute",inset:0,background:role.bgGradient,opacity:hov?1:0,transition:"opacity .4s",pointerEvents:"none"}} />
      <div className="gi-icon-wrap">
        <div className="gi-icon-ring" style={{borderColor:role.accent}} />
        <div className="gi-icon-inner" style={{background:`${role.accent}12`,borderColor:`${role.accent}30`,boxShadow:hov?`0 0 24px ${role.accent}25`:"none"}}>{role.icon}</div>
      </div>
      <div className="gi-card-body">
        <div className="gi-tag" style={{color:role.accent,borderColor:`${role.accent}30`,background:`${role.accent}10`}}>{role.tag}</div>
        <div className="gi-card-title">{role.title}</div>
        <p className="gi-card-desc">{role.desc}</p>
        <div className="gi-perks">
          {role.perks.map((perk,pi)=>(
            <div key={pi} className="gi-perk">
              <div className="gi-perk-dot" style={{background:role.accent,boxShadow:`0 0 6px ${role.accent}70`}} />
              {perk}
            </div>
          ))}
        </div>
        <a href={role.applyLink} target="_blank" rel="noreferrer" className="gi-apply-btn"
          style={{background:role.gradient,color:"#050D1A",boxShadow:hov?`0 0 32px ${role.accent}30`:"none"}}>
          Apply Now <ArrowRight />
        </a>
      </div>
    </div>
  );
}

function AnimatedCover({accentColor="#00EEFF",bannerUrl}) {
  const canvasRef=useRef(null);
  useEffect(()=>{
    if(bannerUrl)return;
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext("2d"); let raf;
    const resize=()=>{canvas.width=canvas.parentElement.clientWidth;canvas.height=canvas.parentElement.clientHeight;};
    resize();
    const ro=new ResizeObserver(resize); ro.observe(canvas.parentElement);
    const r=parseInt(accentColor.slice(1,3),16),g=parseInt(accentColor.slice(3,5),16),b=parseInt(accentColor.slice(5,7),16);
    const pts=Array.from({length:28},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0004,vy:(Math.random()-.5)*.0004,rad:Math.random()*1.2+.4,a:Math.random()*.26+.08}));
    const draw=()=>{
      const w=canvas.width,h=canvas.height; ctx.clearRect(0,0,w,h);
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>1)p.vx*=-1;if(p.y<0||p.y>1)p.vy*=-1;ctx.beginPath();ctx.arc(p.x*w,p.y*h,p.rad,0,Math.PI*2);ctx.fillStyle=`rgba(${r},${g},${b},${p.a})`;ctx.fill();});
      const thresh=Math.min(w,h)*.14;
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b2=>{const d=Math.hypot((a.x-b2.x)*w,(a.y-b2.y)*h);if(d<thresh){ctx.beginPath();ctx.moveTo(a.x*w,a.y*h);ctx.lineTo(b2.x*w,b2.y*h);ctx.strokeStyle=`rgba(${r},${g},${b},${.04*(1-d/thresh)})`;ctx.lineWidth=.4;ctx.stroke();}}));
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);ro.disconnect();};
  },[accentColor,bannerUrl]);
  if(bannerUrl)return <img src={bannerUrl} alt="banner" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />;
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} />;
}

function PersonCard({person}) {
  const [hov,setHov]=useState(false);
  return (
    <div className="evd-person-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{borderColor:hov?`${person.accent}33`:"rgba(255,255,255,.05)",boxShadow:hov?`0 8px 28px ${person.accent}14`:"none"}}>
      <div className="evd-person-avatar" style={{background:`${person.accent}18`,border:`1.5px solid ${person.accent}35`,color:person.accent}}>{person.initials}</div>
      <div>
        <div className="evd-person-name">{person.name}</div>
        <div className="evd-person-tagline">{person.tagline}</div>
        <div className="evd-person-socials">
          {[{Icon:LinkedInIcon,l:"LI"},{Icon:InstaIcon,l:"IG"}].map(({Icon,l})=>(
            <a key={l} href="#" className="evd-soc" aria-label={l}
              onMouseEnter={e=>{
                e.currentTarget.style.color=person.accent;
                e.currentTarget.style.borderColor=`${person.accent}40`;
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.color="#475569";
                e.currentTarget.style.borderColor="rgba(255,255,255,.07)";
              }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function DescriptionTab({ev}) {
  return (
    <div className="evd-section">
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(167,139,250,.2)",background:"rgba(167,139,250,.06)",color:"#A78BFA"}}>ABOUT THE EVENT</div>
        <h2 className="evd-sec-h2">Event <span className="grad-text">Description</span></h2>
      </div>
      <div className="evd-form-card" style={{padding:"32px"}}>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,width:"3px",height:"100%",background:"linear-gradient(#00EEFF,#4F46E5,#A78BFA)",borderRadius:"0 2px 2px 0"}} />
          <p style={{paddingLeft:24,color:"#94A3B8",fontSize:15,lineHeight:1.85,whiteSpace:"pre-line"}}>{ev.description}</p>
        </div>
        <div className="evd-divider" />
        <p style={{color:"#64748B",fontSize:14,marginBottom:14}}>🔗 Learn more & stay connected:</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {[{Icon:WebIcon,label:"Website",href:ev.links.website},{Icon:LinkedInIcon,label:"LinkedIn",href:ev.links.linkedin},{Icon:InstaIcon,label:"Instagram",href:ev.links.instagram}].map(({Icon,label,href})=>(
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",borderRadius:10,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.03)",color:"#94A3B8",fontSize:13,fontWeight:600,textDecoration:"none",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.color="#00EEFF";e.currentTarget.style.borderColor="rgba(0,238,255,.25)";e.currentTarget.style.background="rgba(0,238,255,.06)";}}
              onMouseLeave={e=>{e.currentTarget.style.color="#94A3B8";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";e.currentTarget.style.background="rgba(255,255,255,.03)";}}
            ><Icon />{label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgendaTab({ev}) {
  return (
    <div className="evd-section">
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(254,188,46,.2)",background:"rgba(254,188,46,.06)",color:"#FEBC2E"}}>SCHEDULE</div>
        <h2 className="evd-sec-h2">Event <span className="grad-text">Agenda / Track</span></h2>
        <p className="evd-sec-sub">A full day of learning, building, and connecting — curated for builders.</p>
      </div>
      {ev.agenda.length===0
        ?<div style={{padding:"48px 24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.08)",borderRadius:16,color:"#475569"}}>
            <div style={{fontSize:32,marginBottom:10}}>📋</div>
            <div style={{fontWeight:700,color:"#64748B",marginBottom:4}}>No agenda added yet</div>
            <div style={{fontSize:13}}>Check back later or contact the organizer</div>
          </div>
        :<>
          <div className="evd-agenda-list">
            {ev.agenda.map((item,i)=>{const s=AGENDA_TYPE_STYLES[item.type];return(
              <div key={i} className="evd-agenda-item" style={{background:s.bg,borderColor:s.border}}>
                <div className="evd-agenda-dot" style={{background:s.color,boxShadow:`0 0 8px ${s.color}60`}} />
                <div className="evd-agenda-time" style={{color:s.color}}>{item.time}</div>
                <div className="evd-agenda-title">{item.title}</div>
                <div style={{marginLeft:"auto",padding:"4px 12px",borderRadius:"999px",fontSize:11,fontWeight:700,fontFamily:"Space Mono,monospace",color:s.color,border:`1px solid ${s.border}`,background:s.bg,whiteSpace:"nowrap"}}>{item.type.toUpperCase()}</div>
              </div>
            );})}
          </div>
          <div style={{marginTop:24,display:"flex",flexWrap:"wrap",gap:8}}>
            {Object.entries(AGENDA_TYPE_STYLES).map(([type,s])=>(
              <div key={type} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:999,border:`1px solid ${s.border}`,background:s.bg}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:s.color}} />
                <span style={{fontSize:10,fontWeight:700,color:s.color,fontFamily:"Space Mono,monospace",textTransform:"uppercase"}}>{type}</span>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
}

function PeopleTab({ev}) {
  const sections=[
    {title:"Event Organisers Team",icon:"🌐",people:ev.organiserTeam,accent:"#00EEFF"},
    {title:"Our Speakers",icon:"🎤",people:ev.speakers,accent:"#A78BFA"},
    {title:"Our Sponsors",icon:"🤝",people:ev.sponsors,accent:"#FEBC2E"},
    {title:"Our Community Partners",icon:"🌍",people:ev.communityPartners,accent:"#4F46E5"},
  ];
  return (
    <div className="evd-section">
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(79,70,229,.2)",background:"rgba(79,70,229,.06)",color:"#A78BFA"}}>THE COMMUNITY</div>
        <h2 className="evd-sec-h2">People & <span className="grad-text">Partners</span></h2>
        <p className="evd-sec-sub">The brilliant minds organizing, speaking, sponsoring, and partnering to make this happen.</p>
      </div>
      {sections.map(({title,icon,people,accent})=>(
        <div key={title} className="evd-people-section">
          <div className="evd-people-section-title">
            <div style={{width:36,height:36,borderRadius:10,background:`${accent}14`,border:`1px solid ${accent}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
            <span>{title}</span>
          </div>
          {people.length===0
            ?<div style={{padding:"24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.06)",borderRadius:12,color:"#475569",fontSize:13}}>Not announced yet</div>
            :<div className="evd-people-grid">{people.map(p=><PersonCard key={p.name} person={p} />)}</div>
          }
        </div>
      ))}
    </div>
  );
}

function FAQContactTab({ev}) {
  const [openIdx,setOpenIdx]=useState(null);
  const [cf,setCf]=useState({name:"",email:"",phone:"",type:"",message:""});
  const setC=k=>e=>setCf(p=>({...p,[k]:e.target.value}));
  return (
    <div className="evd-section">
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(0,238,255,.2)",background:"rgba(0,238,255,.06)",color:"#00EEFF"}}>FREQUENTLY ASKED</div>
        <h2 className="evd-sec-h2">Got <span className="grad-text">Questions?</span></h2>
        <p className="evd-sec-sub">Find quick answers to common questions below.</p>
      </div>
      {ev.faqs.length===0
        ?<div style={{padding:"40px 24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.06)",borderRadius:16,color:"#475569",marginBottom:40}}>
            <div style={{fontSize:28,marginBottom:8}}>❓</div>
            <div style={{fontWeight:700,color:"#64748B"}}>No FAQs yet — contact the organizer below</div>
          </div>
        :<div className="evd-faq-list">
            {ev.faqs.map((faq,i)=>(
              <div key={i} className={`evd-faq-item${openIdx===i?" open":""}`}>
                <div className="evd-faq-q" onClick={()=>setOpenIdx(openIdx===i?null:i)}>
                  <span>{faq.q}</span>
                  <div className="evd-faq-chevron"><ChevDown /></div>
                </div>
                {openIdx===i&&<div className="evd-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
      }
      <div className="evd-divider" />
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(167,139,250,.2)",background:"rgba(167,139,250,.06)",color:"#A78BFA"}}>LET'S CONNECT</div>
        <h2 className="evd-sec-h2">Contact <span className="grad-text">Us</span></h2>
        <p className="evd-sec-sub">For mentorship help, internship support, partnerships, or anything else.</p>
      </div>
      <div className="evd-contact-grid">
        <div className="evd-contact-info">
          {[{icon:"📧",label:"Email",val:"techera@gmail.com",accent:"#00EEFF"},{icon:"📞",label:"Phone",val:"+91 93105 26618",accent:"#A78BFA"},{icon:"📍",label:"Location",val:"Hybrid, India",accent:"#4F46E5"}].map(({icon,label,val,accent})=>(
            <div key={label} className="evd-contact-info-card" style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:44,height:44,borderRadius:13,background:`${accent}14`,border:`1px solid ${accent}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:3}}>{label}</div>
                <div style={{fontSize:14,fontWeight:700,color:"white"}}>{val}</div>
              </div>
            </div>
          ))}
          <div className="evd-contact-info-card">
            <div style={{fontSize:12,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:12}}>Quick Links</div>
            {["Browse Events","Our Courses","About Us","Success Stories","Become a Mentor"].map(l=>(
              <a key={l} href="#" style={{color:"#64748B",fontSize:14,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:6,marginBottom:8,transition:"color .2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#00EEFF"} onMouseLeave={e=>e.currentTarget.style.color="#64748B"}
              ><span style={{color:"#4F46E5"}}>›</span>{l}</a>
            ))}
          </div>
        </div>
        <div className="evd-form-card">
          <div className="evd-form-header">
            <div className="evd-form-icon" style={{background:"rgba(167,139,250,.1)",border:"1px solid rgba(167,139,250,.2)"}}>✉️</div>
            <div><div className="evd-form-title">Send a Message</div><div className="evd-form-subtitle">We'll get back to you within 24 hours</div></div>
          </div>
          <div className="evd-form-body">
            <div className="evd-form-row">
              <div className="evd-form-group"><label className="evd-form-label">Full Name</label><input className="evd-input" placeholder="Your name" value={cf.name} onChange={setC("name")} /></div>
              <div className="evd-form-group"><label className="evd-form-label">Email Address</label><input className="evd-input" type="email" placeholder="you@example.com" value={cf.email} onChange={setC("email")} /></div>
            </div>
            <div className="evd-form-group" style={{marginBottom:16}}><label className="evd-form-label">Mobile Number</label><input className="evd-input" placeholder="+91 XXXXX XXXXX" value={cf.phone} onChange={setC("phone")} /></div>
            <div className="evd-form-group" style={{marginBottom:16}}>
              <label className="evd-form-label">Type of Query</label>
              <select className="evd-select" value={cf.type} onChange={setC("type")}>
                <option value="">Select Your Query</option>
                <option value="mentorship">Mentorship</option>
                <option value="internship">Internship Support</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="speaker">Speaking Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="evd-form-group" style={{marginBottom:24}}><label className="evd-form-label">Message</label><textarea className="evd-input evd-textarea" placeholder="Tell us how we can help..." value={cf.message} onChange={setC("message")} /></div>
            <button className="evd-submit-btn">Send Message <SendIcon /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistrationBanner({ev}) {
  if (ev.status !== "active") return null;
  return (
    <div className="evd-register-banner">
      <div className="evd-register-inner">
        <div className="evd-register-glow" />
        <div className="evd-register-glow-r" />
        <div className="evd-register-text" style={{position:"relative",zIndex:1}}>
          <h3>Secure your spot at <span className="shimmer-text">{ev.name.replace(/^[\W\s]+/, "")}</span></h3>
          <p>Seats are limited — register before they run out. Registration is completely free.</p>
          <div className="evd-seats-badge">
            <span style={{width:6,height:6,borderRadius:"50%",background:"#4ADE80",display:"inline-block",animation:"pulseGlow 1.5s ease-in-out infinite"}} />
            {ev.attendees} · Registrations Open
          </div>
        </div>
        <a href={ev.registerLink} target="_blank" rel="noreferrer" className="evd-register-btn" style={{position:"relative",zIndex:1}}>
          <TicketIcon />
          Register Now — It's Free
        </a>
      </div>
    </div>
  );
}

function EventDetail({ev,onBack}) {
  const [activeTab,setActiveTab]=useState(0);
  const panels=[<DescriptionTab key="d" ev={ev}/>,<AgendaTab key="a" ev={ev}/>,<PeopleTab key="p" ev={ev}/>,<FAQContactTab key="f" ev={ev}/>];

  const statusBadge = {
    active:  { label:"🟢 Registrations Open",  cls:"evd-cover-badge",          style:{} },
    upcoming:{ label:"🟣 Upcoming",             cls:"evd-cover-badge-upcoming",  style:{} },
    expired: { label:"⚫ Event Concluded",       cls:"evd-cover-badge",          style:{borderColor:"rgba(148,163,184,.2)",color:"#94A3B8"} },
  }[ev.status] || { label:"🟢 Registrations Open", cls:"evd-cover-badge", style:{} };

  return (
    <div style={{animation:"slideIn .35s ease-out both"}}>
      <div className="evd-header">
        <button className="evd-back-btn" onClick={onBack}><ArrowLeft /> Back to Events</button>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:12}}>
          <div>
            <div className="evd-org-badge">
              <div style={{width:8,height:8,borderRadius:"50%",background:ev.accentColor,animation:"pulseGlow 2s ease-in-out infinite",flexShrink:0}} />
              By: {ev.organizer}
            </div>
            <h1 className="evd-title"><span className="shimmer-text">{ev.name}</span></h1>
          </div>
          <div className="evd-attendee-badge">
            <span style={{width:8,height:8,borderRadius:"50%",background:"#A78BFA",display:"inline-block"}} />
            {ev.attendees} Attendees
          </div>
        </div>
      </div>

      <div className="evd-cover-wrap">
        <div className="evd-cover" style={{background:ev.bannerGradient}}>
          {ev.category === "Collaborations"
            ? <CollabBanner ev={ev} />
            : <AnimatedCover accentColor={ev.accentColor} bannerUrl={ev.bannerUrl} />
          }
          <div style={{position:"absolute",top:"30%",left:"30%",transform:"translate(-50%,-50%)",width:"40%",height:"60%",borderRadius:"50%",background:`${ev.accentColor}12`,filter:"blur(60px)",pointerEvents:"none"}} />
          <div className={statusBadge.cls} style={statusBadge.style}>{statusBadge.label}</div>
        </div>
      </div>

      <div className="evd-meta-row">
        {[{label:"Event Date",val:ev.date,icon:"📅"},{label:"Event Day",val:ev.day,icon:"📆"},{label:"Event Time",val:ev.time,icon:"⏰"},{label:"Event Fees",val:ev.fees,icon:"🎟"},{label:"Event Mode",val:ev.mode,icon:"💻"},{label:"Location",val:ev.location,icon:"📍"}].map(({label,val,icon})=>(
          <div key={label} className="evd-meta-pill"><span className="evd-meta-label">{label}</span><span className="evd-meta-val">{icon} {val}</span></div>
        ))}
      </div>

      <div className="evd-tabs-wrap">
        <div className="evd-tabs">
          {DETAIL_TABS.map((tab,i)=>(
            <button key={tab} className={`evd-tab${activeTab===i?" active":""}`} onClick={()=>setActiveTab(i)}>{tab}</button>
          ))}
        </div>
      </div>

      <div key={activeTab}>{panels[activeTab]}</div>
      <RegistrationBanner ev={ev} />
    </div>
  );
}

function CreateEventModal({onClose,onSubmit}) {
  const fileRef=useRef(null);
  const [step,setStep]=useState(1);
  const [bannerPreview,setBannerPreview]=useState(null);
  const [form,setForm]=useState({name:"",organizer:"",date:"",day:"",time:"",fees:"",mode:"",location:"",attendees:"",category:"",description:"",website:"",linkedin:"",instagram:""});
  const set=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const handleBanner=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>setBannerPreview(ev.target.result);reader.readAsDataURL(file);};
  const handleSubmit=()=>{
    onSubmit({id:Date.now(),...form,bannerUrl:bannerPreview,bannerGradient:"linear-gradient(135deg,#050D1A 0%,#0D1F3C 60%,#050D1A 100%)",accentColor:"#00EEFF",status:"active",registerLink:form.website||"#",links:{website:form.website||"#",linkedin:form.linkedin||"#",instagram:form.instagram||"#"},agenda:[],organiserTeam:[],speakers:[],sponsors:[],communityPartners:[],faqs:[]});
    onClose();
  };
  return (
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#4F46E5",letterSpacing:".15em",fontFamily:"Space Mono,monospace",marginBottom:4}}>NEW EVENT · STEP {step}/2</div>
            <div className="modal-title">Create <span className="grad-text">Event</span></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{display:"flex",gap:6}}>
              {[1,2].map(s=><div key={s} style={{width:28,height:5,borderRadius:3,background:step>=s?"linear-gradient(135deg,#00EEFF,#4F46E5)":"rgba(255,255,255,.07)",transition:"background .3s"}} />)}
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="modal-body">
          {step===1&&(
            <div style={{animation:"slideIn .28s ease-out both"}}>
              <p style={{color:"#64748B",fontSize:13,marginBottom:22}}>Step 1 — Basic info & banner</p>
              <label className="evd-form-label" style={{marginBottom:8,display:"block"}}>Event Banner</label>
              <div className={`banner-upload-area${bannerPreview?" has-image":""}`} onClick={()=>fileRef.current?.click()}>
                {bannerPreview
                  ?<><img src={bannerPreview} alt="preview" className="banner-preview-img" /><div className="banner-hover-overlay"><UploadIcon /><span style={{color:"#00EEFF",fontSize:13,fontWeight:700,fontFamily:"Space Mono,monospace"}}>Change Banner</span></div></>
                  :<><div style={{color:"#475569"}}><UploadIcon /></div><span style={{fontSize:13,fontWeight:700,color:"#00EEFF",fontFamily:"Space Mono,monospace"}}>Upload Event Banner</span><span style={{fontSize:11,color:"#475569"}}>PNG, JPG, WEBP — 1200×630px recommended</span></>
                }
                <input ref={fileRef} type="file" accept="image/*" onChange={handleBanner} style={{display:"none"}} />
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">Event Name *</label><input className="evd-input" placeholder="TechEra Hackathon 2025" value={form.name} onChange={set("name")} /></div>
                <div className="evd-form-group"><label className="evd-form-label">Organizer *</label><input className="evd-input" placeholder="TechEra Community" value={form.organizer} onChange={set("organizer")} /></div>
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">Event Date *</label><input className="evd-input" type="date" value={form.date} onChange={set("date")} /></div>
                <div className="evd-form-group">
                  <label className="evd-form-label">Event Day</label>
                  <select className="evd-select" value={form.day} onChange={set("day")}>
                    <option value="">Select Day</option>
                    {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">Time *</label><input className="evd-input" type="time" value={form.time} onChange={set("time")} /></div>
                <div className="evd-form-group">
                  <label className="evd-form-label">Mode *</label>
                  <select className="evd-select" value={form.mode} onChange={set("mode")}>
                    <option value="">Select Mode</option>
                    {["In-Person","Online","Hybrid"].map(m=><option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">Location</label><input className="evd-input" placeholder="Delhi, NCR / Virtual" value={form.location} onChange={set("location")} /></div>
                <div className="evd-form-group"><label className="evd-form-label">Entry Fees</label><input className="evd-input" placeholder="Free / ₹200" value={form.fees} onChange={set("fees")} /></div>
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group">
                  <label className="evd-form-label">Category</label>
                  <select className="evd-select" value={form.category} onChange={set("category")}>
                    <option value="">Select Category</option>
                    {["Open Source","Hackathon","Summit","Workshop","Meetup","Conference","Webinar","Collaborations"].map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="evd-form-group"><label className="evd-form-label">Expected Attendees</label><input className="evd-input" placeholder="500+" value={form.attendees} onChange={set("attendees")} /></div>
              </div>
              <div style={{display:"flex",justifyContent:"flex-end",marginTop:6}}>
                <button className="evd-submit-btn" onClick={()=>setStep(2)} disabled={!form.name||!form.organizer}>Next: Details →</button>
              </div>
            </div>
          )}
          {step===2&&(
            <div style={{animation:"slideIn .28s ease-out both"}}>
              <p style={{color:"#64748B",fontSize:13,marginBottom:22}}>Step 2 — Description & links</p>
              <div className="evd-form-group" style={{marginBottom:16}}>
                <label className="evd-form-label">Event Description *</label>
                <textarea className="evd-input evd-textarea" style={{minHeight:130}} placeholder="Describe what attendees can expect..." value={form.description} onChange={set("description")} />
              </div>
              <div style={{fontSize:12,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:12}}>Social & Links</div>
              <div className="evd-form-group" style={{marginBottom:12}}><label className="evd-form-label">Website URL</label><input className="evd-input" placeholder="https://your-event.com" value={form.website} onChange={set("website")} /></div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">LinkedIn</label><input className="evd-input" placeholder="https://linkedin.com/..." value={form.linkedin} onChange={set("linkedin")} /></div>
                <div className="evd-form-group"><label className="evd-form-label">Instagram</label><input className="evd-input" placeholder="https://instagram.com/..." value={form.instagram} onChange={set("instagram")} /></div>
              </div>
              <div style={{marginTop:6,marginBottom:24,padding:"14px 18px",borderRadius:14,border:"1px solid rgba(0,238,255,.1)",background:"rgba(0,238,255,.04)",display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:16,flexShrink:0}}>ℹ️</span>
                <span style={{fontSize:13,color:"#64748B",lineHeight:1.6}}>After creating the event, you can add Agenda, Team, Speakers, Sponsors & FAQs from the event detail page.</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",gap:12}}>
                <button onClick={()=>setStep(1)}
                  style={{padding:"12px 22px",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.03)",color:"#64748B",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Manrope,sans-serif",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.color="white";e.currentTarget.style.borderColor="rgba(255,255,255,.2)";}}
                  onMouseLeave={e=>{e.currentTarget.style.color="#64748B";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";}}
                >← Back</button>
                <button className="evd-submit-btn" onClick={handleSubmit} disabled={!form.description}>🚀 Create Event</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CollabCard({ev}) {
  const [hov,setHov]=useState(false);
  const modeC={"Offline":{c:"#4ADE80",bg:"rgba(74,222,128,.15)"},"Online":{c:"#00EEFF",bg:"rgba(0,238,255,.12)"},"Hybrid":{c:"#A78BFA",bg:"rgba(167,139,250,.13)"}}[ev.mode]||{c:"#4ADE80",bg:"rgba(74,222,128,.15)"};
  const acc = ev.accentColor || "#00EEFF";
  const partners = (ev.sponsors||[]).filter(p=>p.name!=="TechEra");

  return (
    <div
      className="ev-card collab-card"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{borderColor:hov?`${acc}40`:"rgba(255,255,255,.05)",boxShadow:hov?`0 20px 56px ${acc}18, 0 0 0 1px ${acc}18`:"none",transform:hov?"translateY(-6px)":"none",transition:"transform .35s cubic-bezier(.23,1,.32,1), border-color .35s, box-shadow .35s"}}
    >
      {/* Banner — taller, shows all info */}
      <div className="ev-card-banner collab-banner-tall" style={{background:ev.bannerGradient,position:"relative"}}>
        <CollabBanner ev={ev} />
        {/* Mode badge */}
        <div className="ev-card-mode-badge" style={{color:modeC.c,background:modeC.bg,border:`1px solid ${modeC.c}40`,backdropFilter:"blur(10px)"}}>{ev.mode}</div>
      </div>

      {/* Card body — overview info */}
      <div className="ev-card-body">
        {/* Org name */}
        <div className="ev-card-org" style={{color:acc}}>{ev.organizer}</div>
        {/* Event name */}
        <div className="ev-card-name">{ev.name}</div>
        {/* Date + location */}
        <div className="ev-card-meta">
          <div className="ev-card-meta-item"><CalIcon />{ev.date}</div>
          <div className="ev-card-meta-item"><LocIcon />{ev.location}</div>
        </div>
        {/* Footer — mode tag only, no entry/fees */}
        <div className="ev-card-footer" style={{justifyContent:"flex-end"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:999,border:`1px solid ${acc}30`,background:`${acc}0D`,fontSize:11,fontWeight:700,fontFamily:"Space Mono,monospace",color:acc,letterSpacing:".08em"}}>
            🤝 COMMUNITY PARTNER
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ev,onClick}) {
  const [hov,setHov]=useState(false);
  const modeC={
    "In-Person":{c:"#4ADE80",bg:"rgba(74,222,128,.12)"},
    "Online":{c:"#00EEFF",bg:"rgba(0,238,255,.1)"},
    "Hybrid":{c:"#A78BFA",bg:"rgba(167,139,250,.1)"},
    "Offline":{c:"#4ADE80",bg:"rgba(74,222,128,.12)"},
    "Google Meet":{c:"#00EEFF",bg:"rgba(0,238,255,.1)"},
  }[ev.mode]||{c:"#00EEFF",bg:"rgba(0,238,255,.1)"};

  if (ev.category === "Collaborations") return <CollabCard ev={ev} />;

  return (
    <div className="ev-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}
      style={{borderColor:hov?`${ev.accentColor}30`:"rgba(255,255,255,.05)",boxShadow:hov?`0 16px 48px ${ev.accentColor}14`:"none"}}>
      <div className="ev-card-banner" style={{background:ev.bannerGradient,position:"relative"}}>
        <AnimatedCover accentColor={ev.accentColor} bannerUrl={ev.bannerUrl} />
        <div className="ev-card-mode-badge" style={{color:modeC.c,background:modeC.bg,border:`1px solid ${modeC.c}30`}}>{ev.mode}</div>
      </div>
      <div className="ev-card-body">
        <div className="ev-card-org">{ev.organizer}</div>
        <div className="ev-card-name">{ev.name}</div>
        <div className="ev-card-meta">
          <div className="ev-card-meta-item"><CalIcon />{ev.date}</div>
          <div className="ev-card-meta-item"><LocIcon />{ev.location}</div>
        </div>
        <div className="ev-card-footer">
          <div>
            <div style={{fontSize:10,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:3}}>Entry</div>
            <div style={{fontSize:14,fontWeight:800,color:ev.fees==="Free"?"#4ADE80":"#FEBC2E"}}>{ev.fees}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#475569"}}><UserIcon />{ev.attendees}</div>
            <button className="ev-card-view-btn">View →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsListing({events,onViewEvent,onCreateEvent}) {
  const [filter,setFilter]=useState("All");
  const [search,setSearch]=useState("");
  const FILTERS=["All","Meetup","Hackathon","Workshop","Collaborations"];
  const filtered=events.filter(ev=>(filter==="All"||ev.category===filter)&&(!search||ev.name.toLowerCase().includes(search.toLowerCase())||ev.organizer.toLowerCase().includes(search.toLowerCase())));
  return (
    <div>
      <div className="evl-hero">
        <div className="evl-hero-top">
          <div>
            <div className="evl-pill"><div style={{width:8,height:8,borderRadius:"50%",background:"#00EEFF",animation:"pulseGlow 2s ease-in-out infinite"}} />EVENTS / COMMUNITY</div>
            <h1 className="evl-title">Discover &<br /><span className="shimmer-text">Join Events</span></h1>
            <p className="evl-sub">Explore hackathons, summits, workshops, and more — curated for builders like you.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end"}}>
            <div className="evl-search-wrap">
              <span className="evl-search-icon"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
              <input className="evl-search" placeholder="Search events…" value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          {[{val:`${events.length}`,lbl:"Total Events"},{val:"50+",lbl:"Speakers"},{val:"2K+",lbl:"Community"},{val:"10+",lbl:"Partners"}].map(({val,lbl})=>(
            <div key={lbl} style={{padding:"11px 20px",borderRadius:14,border:"1px solid rgba(255,255,255,.05)",background:"#0A1628",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:900,color:"#00EEFF",fontFamily:"Space Mono,monospace"}}>{val}</div>
              <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:".12em",marginTop:3}}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="evl-filters">
        {FILTERS.map(f=><button key={f} className={`evl-filter-btn${filter===f?" active":""}`} onClick={()=>setFilter(f)}>{f}</button>)}
      </div>
      <div className="evl-grid">
        {filtered.length===0
          ?<div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 20px",color:"#475569"}}>
              <div style={{fontSize:40,marginBottom:12}}>🔍</div>
              <div style={{fontSize:16,fontWeight:700,color:"#64748B",marginBottom:6}}>No events found</div>
              <div style={{fontSize:13}}>Try a different search or filter</div>
            </div>
          :filtered.map(ev=><EventCard key={ev.id} ev={ev} onClick={ev.category==="Collaborations"?undefined:()=>onViewEvent(ev)} />)
        }
      </div>
      <GetInvolved />
    </div>
  );
}

function Footer() {
  return (
    <footer className="ev-footer">
      <div className="ev-footer-inner">
        <div className="ev-footer-grid">
          <div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:900,background:"linear-gradient(135deg,#00EEFF,#4F46E5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",marginBottom:10}}>TechEra</div>
            <p style={{color:"#475569",fontSize:13,lineHeight:1.75,maxWidth:240}}>Transforming education through creative events, collaborative learning, and expert mentorship.</p>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              {[LinkedInIcon,InstaIcon,GitHubIcon].map((Icon,i)=>(
                <a key={i} href="#" style={{width:32,height:32,borderRadius:9,border:"1px solid rgba(255,255,255,.07)",background:"rgba(255,255,255,.03)",display:"flex",alignItems:"center",justifyContent:"center",color:"#475569",textDecoration:"none",transition:"color .2s,border-color .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.color="#00EEFF";e.currentTarget.style.borderColor="rgba(0,238,255,.3)";}}
                  onMouseLeave={e=>{e.currentTarget.style.color="#475569";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}
                ><Icon /></a>
              ))}
            </div>
          </div>
          {[{title:"Quick Links",links:["Browse Events","Our Courses","About Us","Success Stories","Become a Mentor"]},{title:"Resources",links:["Help Center","Event Guidelines","Community Forum","Blog","Privacy Policy"]}].map(({title,links})=>(
            <div key={title}>
              <div style={{fontSize:13,fontWeight:800,color:"white",marginBottom:14,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace"}}>{title}</div>
              {links.map(l=><a key={l} href="#" style={{color:"#475569",fontSize:13,textDecoration:"none",display:"block",marginBottom:8,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#00EEFF"} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>{l}</a>)}
            </div>
          ))}
          <div>
            <div style={{fontSize:13,fontWeight:800,color:"white",marginBottom:14,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace"}}>Stay Updated</div>
            {["📧 techera@gmail.com","📞 +91 9310526618","📍 Hybrid, India"].map(item=>(
              <div key={item} style={{color:"#475569",fontSize:13,marginBottom:6}}>{item}</div>
            ))}
            <div style={{marginTop:14}}>
              <div style={{fontSize:12,fontWeight:700,color:"#475569",marginBottom:8}}>Subscribe to newsletter</div>
              <div style={{display:"flex",gap:8}}>
                <input placeholder="Your email" style={{flex:1,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"8px 12px",color:"white",fontSize:13,outline:"none"}} />
                <button style={{padding:"8px 16px",borderRadius:10,background:"linear-gradient(135deg,#4F46E5,#00EEFF)",color:"#050D1A",fontWeight:800,fontSize:13,border:"none",cursor:"pointer"}}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ev-footer-bottom">
          <span style={{color:"#475569",fontSize:12}}>© 2025 TechEra Community. All rights reserved.</span>
          <div style={{display:"flex",gap:20}}>
            {["Terms of Service","Privacy Policy","Cookie Policy"].map(l=>(
              <a key={l} href="#" style={{color:"#475569",fontSize:12,textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#94A3B8"} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function EventsPage() {
  const [events,setEvents]=useState(INITIAL_EVENTS);
  const [selected,setSelected]=useState(null);
  const [showCreate,setShowCreate]=useState(false);
  return (
    <div className="ev-page">
      <GlobalStyles />
      <Navbar />
      {selected
        ?<EventDetail ev={selected} onBack={()=>{setSelected(null);window.scrollTo(0,0);}} />
        :<EventsListing events={events} onViewEvent={ev=>{setSelected(ev);window.scrollTo(0,0);}} onCreateEvent={()=>setShowCreate(true)} />
      }
      <Footer />
      {showCreate&&(
        <CreateEventModal onClose={()=>setShowCreate(false)} onSubmit={newEv=>setEvents(prev=>[newEv,...prev])} />
      )}
    </div>
  );
}