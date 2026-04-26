import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const logos = [
  { name: 'Digimation', url: '/logos/Digimation.jpeg' },
  { name: 'Edubuk', url: '/logos/Edubuk.jpeg' },
  { name: 'Idevison', url: '/logos/Idevison.jpeg' },
  { name: 'Metaspace', url: '/logos/Metaspace.jpeg' },
  { name: 'OSEN', url: '/logos/OSEN.png' },
  { name: 'Oppskill', url: '/logos/Oppskill.png' },
  { name: 'Tech4hack', url: '/logos/Tech4hack.jpeg' },
];

const Row = ({ direction = 1, speed = 25 }) => {
  return (
    <div className="flex overflow-hidden select-none gap-10 py-6">
      <motion.div
        animate={{
          x: direction > 0 ? [0, -50 + '%'] : [-50 + '%', 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-nowrap gap-10 min-w-max"
      >
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 h-24 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 backdrop-blur-3xl p-6 group hover:bg-white/[0.05] hover:border-white/10"
          >
            <img src={logo.url} alt={logo.name} className="max-w-full max-h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const LogoMarquee = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-dark py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center lg:text-left">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/10 mb-6 font-mono text-indigo-400 font-bold uppercase tracking-widest text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Strategic Partnerships
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tighter leading-tight">
          Growing with <span className="text-glow text-primary italic">Global Titans.</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl font-body leading-relaxed">
          We collaborate with the world's most influential technology organizations to provide unparalleled opportunities for our members.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Row direction={1} speed={30} />
        <Row direction={-1} speed={35} />
      </div>

      {/* Premium masking gradients */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-dark via-dark/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-dark via-dark/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default LogoMarquee;
