import React from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full" />
      
      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono text-red-500 font-black uppercase tracking-[0.2em]">Error 404</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-8xl md:text-[12rem] font-display font-black text-white leading-none tracking-tighter mb-8"
        >
          Lost <br/>
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">Space.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-md mx-auto mb-12 leading-relaxed"
        >
          The page you're looking for has drifted into another dimension. Let's get you back to the ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-dark font-display font-black hover:scale-105 transition-transform"
          >
            <Home className="w-4 h-4" /> Back to Base
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-display font-black hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Vector
          </button>
        </motion.div>
      </div>
    </div>
  );
}
