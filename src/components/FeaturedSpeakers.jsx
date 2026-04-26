import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter } from 'lucide-react';

const speakers = [
  {
    name: "Biswamohan Singh",
    role: "Founder",
    company: "TechEra",
    image: "/images/founder-techera.jpg",
    accent: "#00EEFF"
  },
  {
    name: "Pragati Srivastava",
    role: "Core Member",
    company: "TechEra",
    image: "/images/pragati-srivastava.png",
    accent: "#4F46E5"
  },
  {
    name: "Bhawna Chauhan",
    role: "Speaker",
    company: "TechEra",
    image: "/images/Bhawna.png",
    accent: "#A78BFA"
  }
];

const SpeakerCard = ({ speaker, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.4,
        delay: index * 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%",
        }
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative"
    >
      <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-700 group-hover:border-primary/30 shadow-2xl">
        <img 
          src={speaker.image} 
          alt={speaker.name} 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 brightness-90 group-hover:brightness-110" 
        />
        
        {/* Advanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <div className="mb-6 transform transition-transform duration-700 group-hover:-translate-y-2">
            <h4 className="text-3xl font-display font-black text-white mb-2 leading-tight tracking-tighter">
              {speaker.name}
            </h4>
            <div className="flex items-center gap-2">
               <div className="h-px w-4 bg-primary" />
               <p className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] font-black">
                 {speaker.role} @ {speaker.company}
               </p>
            </div>
          </div>
          
          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
             <a href="#" className="w-10 h-10 rounded-xl glass bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-500 hover:scale-110">
                <Linkedin className="w-4 h-4" />
             </a>
             <a href="#" className="w-10 h-10 rounded-xl glass bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-500 hover:scale-110">
                <Twitter className="w-4 h-4" />
             </a>
             <a href="#" className="w-10 h-10 rounded-xl glass bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-500 hover:scale-110">
                <Github className="w-4 h-4" />
             </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Accent Glow */}
      <div 
        className="absolute -inset-1 rounded-[2.5rem] opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-1000 -z-10"
        style={{ backgroundColor: speaker.accent }}
      />
    </div>
  );
};

const FeaturedSpeakers = () => {
  return (
    <section className="bg-dark py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/10 mb-6 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-secondary tracking-[0.3em] uppercase font-black">Thought Leaders</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none">
              Meet the <span className="text-glow text-primary italic">Visionaries.</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md font-body text-lg leading-relaxed opacity-80">
            Learn from the architects of the digital era. Our speakers are pioneers shaping the global tech landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {speakers.map((s, i) => (
            <SpeakerCard key={i} speaker={s} index={i} />
          ))}
        </div>
      </div>
      
      {/* Atmospheric Decorations */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] -z-0" />
    </section>
  );
};

export default FeaturedSpeakers;

