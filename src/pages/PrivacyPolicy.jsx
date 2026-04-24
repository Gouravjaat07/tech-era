import React from "react";
import { Lock, Eye, FileText, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: "When you join TechEra, register for events, or subscribe to our newsletter, we collect information such as your name, email address, GitHub profile, and university affiliation. These details help us tailor the experience and keep you updated on community events."
    },
    {
      title: "How We Use Data",
      icon: Database,
      content: "We use your data strictly for community communication (newsletters, event reminders), improving our platform through analytics, and occasionally sharing aggregate (non-identifiable) growth metrics with our sponsors."
    },
    {
      title: "Data Protection",
      icon: Lock,
      content: "We take reasonable measures to protect your information from unauthorized access, loss, or misuse. We never sell your personal data to third parties."
    }
  ];

  return (
    <div className="bg-dark min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit mb-8"
        >
          <Lock className="w-4 h-4 text-accent" />
          <span className="text-[10px] font-black uppercase text-accent tracking-widest">Privacy Controls</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-8"
        >
          Privacy <br/>
          <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">Policy</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl">
            <p className="text-slate-400 text-lg leading-relaxed italic mb-8">
              "Your privacy is a fundamental right. We are committed to being transparent about how we handle your data."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {sections.map((sec, i) => (
                 <div key={i} className="space-y-4">
                   <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                     <sec.icon className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-bold text-white">{sec.title}</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">{sec.content}</p>
                 </div>
               ))}
            </div>
          </div>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
               <FileText className="w-5 h-5 text-secondary" /> Cookie Policy
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We use small cookies to remember your session and preferences. By continuing to use our site, you agree to our use of these essential cookies for platform performance.
            </p>
          </section>

          <div className="text-center pt-8">
            <p className="text-slate-500 text-xs font-mono">Last updated: April 20, 2026</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
