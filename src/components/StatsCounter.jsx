import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const StatItem = ({ value, label, index }) => {
  const numberRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const suffix = value.replace(/[0-9]/g, '');

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        }
      });

      // Counting animation
      const obj = { val: 0 };
      gsap.to(obj, {
        val: numericValue,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.floor(obj.val);
          }
        },
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        }
      });
    });

    return () => ctx.revert();
  }, [value, index]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-center py-10 px-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative group overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="text-5xl md:text-6xl font-display font-black text-white mb-3 flex items-baseline tracking-tighter">
        <span ref={numberRef} className="text-glow">0</span>
        <span className="text-primary ml-1">{value.replace(/[0-9]/g, '')}</span>
      </div>
      
      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] font-bold group-hover:text-slate-300 transition-colors">
        {label}
      </div>
    </div>
  );
};

const StatsCounter = () => {
  const stats = [
    { value: "1.5k+", label: "Builders" },
    { value: "12+", label: "Events" },
    { value: "30+", label: "Chapters" },
    { value: "50+", label: "Startups" },
  ];

  return (
    <div className="bg-dark py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} index={index} />
          ))}
        </div>
      </div>
      
      {/* Dynamic atmospheric glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 blur-[150px] pointer-events-none" />
    </div>
  );
};

export default StatsCounter;

