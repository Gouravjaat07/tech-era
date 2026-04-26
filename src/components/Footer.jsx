import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Heart,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const FOOTER_NAV = [
  {
    heading: "Ecosystem",
    links: [
      { label: "Home",     to: "/" },
      { label: "Events",   to: "/events" },
      { label: "Gallery",  to: "/gallery" },
      { label: "Our Team", to: "/team" },
      { label: "Resources", to: "/resources" },
    ],
  },
  {
    heading: "Participate",
    links: [
      { label: "Speakers",  to: "/speakers" },
      { label: "Sponsors",  to: "/sponsors" },
      { label: "Connect",   to: "/connect" },
      { label: "Newsletter", to: "/newsletter" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    heading: "Governance",
    links: [
      { label: "Code of Conduct", to: "/conduct" },
      { label: "Privacy Policy",  to: "/privacy" },
      { label: "Terms of Use",    to: "/terms" },
      { 
        label: "WhatsApp Group", 
        href: "https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO",
        external: true 
      },
    ],
  },
];

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/techera-community", icon: Github,    hover: "hover:text-white" },
  { label: "Twitter",   href: "https://twitter.com/techera_community", icon: Twitter,   hover: "hover:text-[#1DA1F2]" },
  { label: "LinkedIn",  href: "https://linkedin.com/company/techera-community", icon: Linkedin,  hover: "hover:text-[#0A66C2]" },
  { label: "Instagram", href: "https://instagram.com/techera.community", icon: Instagram, hover: "hover:text-[#E1306C]" },
  { label: "YouTube",   href: "https://youtube.com/@techera-community", icon: Youtube,   hover: "hover:text-[#FF0000]" },
];

function NewsletterMini() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSub = (e) => {
    e.preventDefault();
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-10 backdrop-blur-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
        <Mail className="w-24 h-24 -rotate-12" />
      </div>
      <h3 className="text-xl font-display font-black text-white mb-2 tracking-tight italic">Weekly Pulse</h3>
      <p className="text-slate-500 text-xs mb-8 leading-relaxed">High-density updates on tech trends and community opportunities.</p>
      
      <form onSubmit={handleSub} className="flex flex-col gap-3">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-primary/50 transition-all"
          required
        />
        <button className="w-full py-3 rounded-xl bg-primary text-dark font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn">
          Join Loop <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </form>
      
      <AnimatePresence>
        {status === "success" && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative mt-40 border-t border-white/5 bg-[#010409] pt-32 pb-16 overflow-hidden">
      {/* Premium Atmospheric Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Call to Action Banner */}
        <div className="footer-reveal mb-32 relative">
          <div className="relative bg-gradient-to-br from-primary via-indigo-600 to-accent rounded-[3.5rem] p-12 md:p-20 overflow-hidden group shadow-[0_30px_100px_rgba(0,238,255,0.2)]">
            <div className="absolute inset-0 bg-dark/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 blur-[100px] rounded-full animate-pulse" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
               <div className="max-w-xl text-center lg:text-left">
                 <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tighter leading-[0.9]">
                   Ready to ship the <span className="italic">Future?</span>
                 </h2>
                 <p className="text-white/80 text-lg font-medium leading-relaxed">
                   Join 5,000+ world-class builders in the fastest growing tech community in India.
                 </p>
               </div>
               
               <a 
                 href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO"
                 target="_blank"
                 className="px-12 py-6 rounded-[2rem] bg-dark text-white font-display font-black text-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-4 shadow-2xl group/cta"
               >
                 <MessageSquare className="w-6 h-6 text-primary group-hover/cta:rotate-12 transition-transform" /> 
                 Enter Warp
               </a>
            </div>
          </div>
        </div>

        {/* Informational Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-20 mb-32">
          
          <div className="footer-reveal lg:col-span-2 space-y-10">
            <NavLink to="/" className="inline-flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-700 shadow-xl">
                <img src="/images/logo.jpg" className="w-full h-full object-cover" alt="Logo" />
              </div>
              <span className="text-4xl font-display font-black text-white tracking-tighter uppercase italic">
                Tech<span className="text-primary">Era</span>
              </span>
            </NavLink>

            <p className="text-slate-400 text-base leading-relaxed font-body">
              The premier ecosystem for high-velocity student builders. We cultivate the next generation of founders and engineers.
            </p>

            <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
              <MapPin className="w-4 h-4 text-primary" /> India · Global Hub
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
              <Mail className="w-3.5 h-3.5 text-primary" /> techeraa151@gmail.com
            </div>

            <div className="flex gap-4">
              {SOCIALS.map((soc, i) => (
                <a 
                  key={i} 
                  href={soc.href} 
                  target="_blank"
                  className={`w-12 h-12 rounded-[1.25rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-500 transition-all duration-500 ${soc.hover} hover:bg-white/10 hover:border-white/30 hover:scale-110 shadow-lg`}
                >
                  <soc.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-reveal lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
             {FOOTER_NAV.map((col) => (
               <div key={col.heading} className="space-y-8">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">{col.heading}</h4>
                 <ul className="space-y-5">
                   {col.links.map((link) => (
                     <li key={link.label}>
                        {link.to ? (
                          <NavLink 
                            to={link.to} 
                            className="text-sm text-slate-400 hover:text-white transition-all group flex items-center gap-3"
                          >
                             <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-primary group-hover:scale-150 transition-all" />
                             {link.label}
                          </NavLink>
                        ) : (
                          <a 
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            className="text-sm text-slate-400 hover:text-white transition-all group flex items-center gap-3"
                          >
                             <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-primary group-hover:scale-150 transition-all" />
                             {link.label}
                             {link.external && <ExternalLink className="w-3 h-3 opacity-20" />}
                          </a>
                        )}
                     </li>
                   ))}
                 </ul>
               </div>
             ))}
          </div>

          <div className="footer-reveal lg:col-span-1">
             <NewsletterMini />
          </div>

        </div>

        {/* Detailed Horizontal Bar */}
        <div className="footer-reveal pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
             <span className="text-slate-600 text-[11px] font-bold uppercase tracking-widest italic">© {year} TechEra Community</span>
             <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/[0.03] border border-green-500/10 text-[9px] font-black text-green-500 uppercase tracking-[0.3em]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" /> 
                System Operational
             </div>
          </div>

          <div className="flex items-center gap-10 text-slate-600 text-[11px] font-black uppercase tracking-[0.3em]">
             <NavLink to="/privacy" className="hover:text-primary transition-colors">Privacy</NavLink>
             <NavLink to="/terms" className="hover:text-primary transition-colors">Terms</NavLink>
             <NavLink to="/conduct" className="hover:text-primary transition-colors">Code</NavLink>
          </div>

          <div className="flex items-center gap-3 text-slate-500 text-[11px] font-bold italic">
             Build with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> in 
             <span className="text-white font-black tracking-widest uppercase not-italic">India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}