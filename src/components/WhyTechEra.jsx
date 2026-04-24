import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, Rocket, Shield, Zap, Target } from 'lucide-react';

const benefits = [
  {
    icon: Network,
    title: "Global Synergy",
    description: "Connect with a high-density network of ambitious builders and tech strategists.",
    accent: "#00EEFF"
  },
  {
    icon: Zap,
    title: "Velocity Learning",
    description: "Accelerate your mastery through hands-on labs and peer-driven knowledge loops.",
    accent: "#4F46E5"
  },
  {
    icon: Rocket,
    title: "Venture Exposure",
    description: "Direct pipeline to top-tier tech firms and exclusive foundry opportunities.",
    accent: "#A78BFA"
  },
  {
    icon: Shield,
    title: "Foundry Perks",
    description: "Access premium infrastructure, cloud credits, and physical innovation hubs.",
    accent: "#06B6D4"
  }
];

const WhyTechEra = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.to(".floating-orb", {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark py-32 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div>
            <div className="why-reveal inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase font-black">Competitive Edge</span>
            </div>
            
            <h2 className="why-reveal text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter leading-none">
              The Engine for <span className="text-glow text-primary italic font-serif">Ambition.</span>
            </h2>
            
            <p className="why-reveal text-slate-400 text-lg md:text-xl mb-16 font-body leading-relaxed max-w-xl opacity-80">
              We provide the framework, capital network, and peer ecosystem to transform your technical vision into global impact.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {benefits.map((b, i) => (
                <div key={i} className="why-reveal flex flex-col gap-5 group">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl" 
                    style={{ 
                      backgroundColor: `${b.accent}08`, 
                      border: `1px solid ${b.accent}20`,
                      boxShadow: `0 0 40px ${b.accent}05`
                    }}
                  >
                    <b.icon className="w-7 h-7 transition-colors duration-500" style={{ color: b.accent }} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors duration-500">{b.title}</h4>
                    <p className="text-slate-500 text-sm font-body leading-relaxed group-hover:text-slate-400 transition-colors duration-500">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="why-reveal relative perspective-1000">
            <div className="relative z-10 animate-float">
                <div className="p-10 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] group">
                    <div className="bg-[#020617] rounded-[3rem] overflow-hidden aspect-square flex items-center justify-center p-12 border border-white/5 relative">
                        {/* Internal Atmospheric Glow */}
                        <div className="absolute inset-0 bg-primary/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        <img 
                          src="/images/logo.jpg" 
                          alt="TechEra Founders" 
                          className="w-full h-full object-cover rounded-full shadow-[0_0_80px_rgba(0,238,255,0.25)] relative z-10 transform transition-transform duration-1000 group-hover:scale-110" 
                        />
                    </div>
                </div>
            </div>
            
            {/* Advanced Floating Elements */}
            <div className="floating-orb absolute -top-16 -right-16 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
            <div className="floating-orb absolute -bottom-16 -left-16 w-40 h-40 bg-secondary/20 rounded-full blur-[80px]" />
            
            {/* Decorative Vector */}
            <div className="absolute inset-0 border border-primary/10 rounded-[4rem] scale-105 -rotate-3 -z-10 group-hover:rotate-0 transition-transform duration-1000" />
            <div className="absolute inset-0 border border-secondary/10 rounded-[4rem] scale-110 rotate-3 -z-10 group-hover:rotate-0 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTechEra;

