import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Sparkles, Inbox, Share2, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  const perks = [
    { title: "Early Access", desc: "Get notified about hackathons 48 hours before the general public.", icon: Star },
    { title: "Exclusive Resources", desc: "Monthly curated list of tools and roadmaps for modern devs.", icon: Sparkles },
    { title: "Job Board", desc: "Hand-picked internships and full-time roles from our partner network.", icon: Inbox },
  ];

  return (
    <div className="bg-dark min-h-screen pt-40 pb-32 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-12 text-[11px] font-black uppercase text-secondary tracking-[0.2em]"
        >
          <Mail className="w-4 h-4" /> Join The Inner Circle
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-display font-black text-white leading-[0.85] tracking-tighter mb-12"
        >
          The Signal, <br/>
          <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent italic">Not The Noise.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          No spam. No fluff. Just high-density ecosystem updates, project ideas, and career opportunities delivered once a week.
        </motion.p>

        {/* Subscription Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-md mx-auto mb-24"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl">
             <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@build.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-700 outline-none focus:border-secondary/50 transition-all text-center"
                />
                <button 
                  disabled={status === "loading" || status === "success"}
                  className="w-full py-4 rounded-2xl bg-secondary text-white font-black text-xs uppercase tracking-widest hover:scale-[1.02] shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  {status === "loading" ? "Syncing..." : status === "success" ? "You're In!" : "Subscribe Now"} 
                  <ArrowRight className="w-4 h-4" />
                </button>
             </form>
             {status === "success" && (
               <motion.p 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="mt-6 text-green-400 text-xs font-bold flex items-center justify-center gap-2"
               >
                 <CheckCircle2 className="w-4 h-4" /> Welcome to the future of TechEra.
               </motion.p>
             )}
          </div>
        </motion.div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {perks.map((perk, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-left p-6 rounded-3xl bg-white/3 border border-white/5"
             >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <perk.icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold mb-2">{perk.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{perk.desc}</p>
             </motion.div>
           ))}
        </div>

        <div className="mt-20 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Already 5,000+ subscribers strong</p>
        </div>
      </div>
    </div>
  );
}
