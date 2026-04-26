import React from "react";
import { Scale, CheckCircle2, AlertTriangle, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsOfUse() {
  const terms = [
    { title: "Acceptance", desc: "By accessing this website, you are agreeing to be bound by these web site Terms and Conditions of Use." },
    { title: "Use License", desc: "Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only." },
    { title: "Disclaimer", desc: "The materials on TechEra's web site are provided 'as is'. TechEra makes no warranties, expressed or implied." },
    { title: "Limitations", desc: "In no event shall TechEra or its suppliers be liable for any damages arising out of the use or inability to use the materials." }
  ];

  return (
    <div className="bg-dark min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full w-fit mb-8"
        >
          <Scale className="w-4 h-4 text-secondary" />
          <span className="text-[10px] font-black uppercase text-secondary tracking-widest">Legal Framework</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-8"
        >
          Terms of <br/>
          <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">Use</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
           {terms.map((term, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-secondary/30 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-secondary group-hover:scale-110 transition-transform"><CheckCircle2 className="w-5 h-5" /></span>
                  <h3 className="text-lg font-bold text-white">{term.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{term.desc}</p>
             </div>
           ))}
        </motion.div>

        <section className="bg-secondary/5 border border-secondary/20 rounded-[2rem] p-8 md:p-12 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-secondary" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Important Notice</h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            These terms govern your use of the TechEra platform and community spaces. We reserve the right to update these terms at any time. Significant changes will be announced via our Discord or WhatsApp channels.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">v1.2 // Stable</div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Region: Global</div>
          </div>
        </section>

        <div className="flex justify-center">
           <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">
             <FileCheck className="w-3.5 h-3.5" /> Reviewed by TechEra Legal Team
           </div>
        </div>
      </div>
    </div>
  );
}
