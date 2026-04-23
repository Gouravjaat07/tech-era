import React, { useState } from "react";
import { Mail, MessageSquare, Send, Globe, Github, Twitter, Linkedin, Instagram, MapPin, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", msg: "" });
    }, 2000);
  };

  const socials = [
    { icon: Github, href: "https://github.com/techera-community", color: "hover:text-white" },
    { icon: Twitter, href: "https://twitter.com/techera_community", color: "hover:text-[#1DA1F2]" },
    { icon: Linkedin, href: "https://linkedin.com/company/techera-community", color: "hover:text-[#0A66C2]" },
    { icon: Instagram, href: "https://instagram.com/techera.community", color: "hover:text-[#E1306C]" },
  ];

  return (
    <div className="bg-dark min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-8 text-[10px] font-black uppercase text-primary tracking-widest">
              <Zap className="w-3.5 h-3.5" /> Reach Out
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-8">
              Let's <br/>
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Connect.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Have a question about an event, want to sponsor us, or just want to say hi? We're all ears.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:border-primary/30 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Email Us</p>
                <p className="text-white font-bold">techeraa151@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:border-primary/30 transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Location</p>
                <p className="text-white font-bold">India · Digital Nomads</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Follow the journey</p>
            <div className="flex gap-4">
               {socials.map((soc, i) => (
                 <a 
                   key={i} 
                   href={soc.href} 
                   target="_blank"
                   className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 transition-all ${soc.color} hover:bg-white/10 hover:border-white/20 hover:scale-110`}
                 >
                   <soc.icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full" />
          <form 
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl space-y-8"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Your Name</label>
              <input 
                type="text" 
                required
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
                placeholder="Tony Stark"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-700 outline-none focus:border-primary/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
              <input 
                type="email" 
                required
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
                placeholder="tony@stark.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-700 outline-none focus:border-primary/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Message</label>
              <textarea 
                rows="5"
                required
                value={formState.msg}
                onChange={(e) => setFormState({...formState, msg: e.target.value})}
                placeholder="How can we help you build the future?"
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white placeholder-slate-700 outline-none focus:border-primary/50 transition-all resize-none"
              />
            </div>

            <button 
              disabled={status === "sending"}
              className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                status === "success" 
                ? "bg-green-500 text-dark" 
                : "bg-primary text-dark hover:scale-[1.02] shadow-[0_0_30px_rgba(0,238,255,0.2)]"
              }`}
            >
              {status === "sending" ? (
                "Encrypting Signal..."
              ) : status === "success" ? (
                <>Signal Sent! <MessageSquare className="w-4 h-4" /></>
              ) : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
