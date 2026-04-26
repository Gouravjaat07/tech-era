import React from "react";
import { Shield, CheckCircle2, AlertCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function CodeOfConduct() {
  return (
    <div className="bg-dark min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit mb-8"
        >
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase text-primary tracking-widest">Community Guidelines</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-8"
        >
          Code of <br/>
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Conduct</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-slate max-w-none"
        >
          <section className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 mb-12 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500" /> Our Pledge
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8">
              <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Be Awesome
              </h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>• Use welcoming and inclusive language</li>
                <li>• Respect different viewpoints and experiences</li>
                <li>• Gracefully accept constructive criticism</li>
                <li>• Focus on what is best for the community</li>
                <li>• Show empathy towards other community members</li>
              </ul>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
              <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Unacceptable Behavior
              </h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>• Sexual language and imagery</li>
                <li>• Trolling, insulting or derogatory comments</li>
                <li>• Public or private harassment</li>
                <li>• Publishing others' private information (doxing)</li>
                <li>• Other conduct which could reasonably be considered inappropriate</li>
              </ul>
            </div>
          </div>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Reporting an Issue</h2>
            <p className="text-slate-400 text-sm mb-6">
              Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the community team at:
            </p>
            <a 
              href="mailto:report@techera.community" 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-dark font-black text-xs uppercase tracking-wider hover:scale-105 transition-all"
            >
              report@techera.community
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
