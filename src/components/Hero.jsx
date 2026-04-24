import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const visualRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Grid
      gsap.to(gridRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Split text-like reveal for title
      gsap.from(".hero-reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        delay: 0.8
      });

      // Visual element float parallax
      gsap.to(visualRef.current, {
        y: -50,
        rotate: 5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-dark overflow-hidden pt-20"
    >
      {/* Background Grid Pattern with Parallax */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 opacity-[0.15] animate-grid" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 238, 255, 0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(0, 238, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} 
      />
      
      {/* Dynamic Glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full -z-10 mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10 items-center">
        <div className="flex flex-col justify-center text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-8 w-fit backdrop-blur-3xl shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-mono text-slate-300 tracking-[0.3em] uppercase font-bold">The Future of Building is Here</span>
          </motion.div>
          
          <div className="overflow-hidden mb-8">
            <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-[110px] font-display font-black text-white leading-[0.85] tracking-tighter">
              <span className="hero-reveal block">Build for the</span>
              <span className="hero-reveal block bg-gradient-to-r from-primary via-indigo-400 to-accent bg-clip-text text-transparent text-glow py-2">
                Digital Era
              </span>
            </h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-slate-400 text-lg md:text-xl font-body max-w-xl mb-12 leading-relaxed"
          >
            TechEra is the premier ecosystem for world-class student builders to collaborate, innovate, and ship high-impact products.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-wrap gap-5"
          >
            <a 
              href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO" 
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-dark font-display font-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="/events" 
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-display font-bold hover:bg-white/[0.08] transition-all group backdrop-blur-3xl"
            >
              Upcoming Events <MoveRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-16 pt-8 border-t border-white/5 flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[
                { name: 'Aditya', img: '/images/founder-techera.jpg' },
                { name: 'Arnav', img: '/images/cofounder-1.jpg' },
                { name: 'Surya', img: '/images/tech-colead.jpeg' },
                { name: 'Rewa', img: '/images/Marketing-lead.jpeg' }
              ].map((member, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-dark bg-card overflow-hidden ring-4 ring-primary/5">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-base">1.5k+ Members</span>
              <span className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">Shipping real products daily</span>
            </div>
          </motion.div>
        </div>

        <div
          ref={visualRef}
          className="relative hidden lg:flex items-center justify-center p-12"
        >
          {/* Main Visual Component - Premium Orbit Design */}
          <div className="relative w-full aspect-square max-w-[550px]">
             {/* Rotating Rings with subtle colors */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border border-white/5 rounded-[5rem]"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="absolute inset-10 border border-primary/10 rounded-[4rem]"
             />
             
             {/* Central Premium Card */}
             <div className="absolute inset-20 glass-card rounded-[3.5rem] p-10 flex flex-col items-center justify-center gap-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
                
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 rounded-[2.5rem] bg-dark/50 p-6 flex items-center justify-center border border-white/10 shadow-2xl relative z-10"
                >
                   <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-50" />
                   <img src="/images/logo.jpg" alt="Logo" className="w-full h-full object-contain relative z-10" />
                </motion.div>

                <div className="text-center relative z-10">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] font-black mb-2">Pioneering</div>
                  <div className="text-4xl font-display font-black text-white tracking-tighter">TECHERA</div>
                </div>
             </div>

             {/* Floating UI Elements */}
             <div className="absolute -top-4 -right-4 w-40 glass rounded-3xl p-5 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full" />
             </div>
             
             <div className="absolute bottom-12 -left-12 w-48 glass rounded-3xl p-5 shadow-2xl animate-float">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Active</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/10 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Minimal Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;

