import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, Lightbulb, Handshake } from 'lucide-react';

const Card = ({ icon: Icon, title, description, color, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: index * 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        }
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-700 group relative overflow-hidden"
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 shadow-2xl"
        style={{ 
          backgroundColor: `${color}10`, 
          border: `1px solid ${color}20`,
          boxShadow: `0 0 30px ${color}10`
        }}
      >
        <Icon className="w-8 h-8 transition-colors duration-500" style={{ color: color }} />
      </div>
      
      <h3 className="text-2xl font-display font-black text-white mb-4 tracking-tight group-hover:text-primary transition-colors duration-500">
        {title}
      </h3>
      
      <p className="text-slate-400 text-base leading-relaxed font-body group-hover:text-slate-300 transition-colors duration-500">
        {description}
      </p>
      
      {/* Dynamic atmospheric glow on hover */}
      <div 
        className="absolute -bottom-12 -right-12 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-30 transition-all duration-1000"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

const WhatWeDo = () => {
  const items = [
    {
      icon: Calendar,
      title: "Impactful Events",
      description: "We host high-octane hackathons, workshops, and summits that push the boundaries of student innovation.",
      color: "#00EEFF"
    },
    {
      icon: Users,
      title: "Elite Community",
      description: "Connect with a curated ecosystem of ambitious developers, designers, and tech strategists.",
      color: "#4F46E5"
    },
    {
      icon: Lightbulb,
      title: "Mastery Learning",
      description: "Deep-dive workshops and collaborative peer-learning sessions to master cutting-edge technologies.",
      color: "#A78BFA"
    },
    {
      icon: Handshake,
      title: "Strategic Collabs",
      description: "Bridging the gap between talent and industry through exclusive partnerships with world-class tech firms.",
      color: "#06B6D4"
    }
  ];

  return (
    <section className="bg-dark py-32 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6 backdrop-blur-xl">
            <span className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase font-black">Our Mission</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter">
            Ship the <span className="text-primary italic">Impossible.</span>
          </h2>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-body leading-relaxed opacity-80">
            TechEra empowers the next generation of builders through a radical, hands-on approach to community and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <Card key={index} {...item} index={index} />
          ))}
        </div>
      </div>
      
      {/* Background atmosphere */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[150px] -z-0" />
    </section>
  );
};

export default WhatWeDo;

