import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Calendar, Clock, Ticket } from 'lucide-react';

const FeaturedEvent = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.from(visualRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark py-32 relative overflow-hidden">
      {/* Structural Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] -skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div ref={contentRef} className="flex-1 w-full text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/10 mb-8 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-secondary tracking-[0.3em] uppercase font-black">Main Event</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter leading-[0.9]">
              Forge the <span className="text-glow text-primary italic font-serif">Future</span> Together.
            </h2>
            
            <p className="text-slate-400 text-lg md:text-xl mb-12 font-body max-w-xl leading-relaxed whitespace-pre-line lg:mx-0 mx-auto">
              Deep-dive into the bleeding edge of engineering at our flagship annual gathering. 
              Networking, workshops, and high-octane innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-12 justify-center lg:justify-start">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-primary transition-all duration-500">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Date</p>
                  <p className="text-white font-display font-black text-sm uppercase">Oct 26, 2024</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-primary transition-all duration-500">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white font-display font-black text-sm uppercase">Global Virtual Hub</p>
                </div>
              </div>
            </div>

            <a 
              href="/events" 
              className="inline-flex items-center gap-4 px-10 py-5 rounded-[2rem] bg-white text-dark font-display font-black text-lg hover:scale-110 active:scale-95 transition-all shadow-2xl group"
            >
              Secure Pass <Ticket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </div>

          <div ref={visualRef} className="flex-1 w-full relative">
            <div className="relative rounded-[3rem] overflow-hidden border border-white/5 group bg-white/[0.02]">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-dark/40 to-transparent z-10" />
              
              <img 
                src="/images/Meetup-banner.png" 
                alt="TechEra Annual Summit" 
                className="w-full h-[500px] object-cover filter brightness-[0.8] group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000" 
              />
              
              <div className="absolute bottom-8 left-8 right-8 p-10 bg-dark/60 backdrop-blur-2xl rounded-[2rem] border border-white/10 group-hover:border-primary/40 transition-all duration-700">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      <span className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Registration Open</span>
                    </div>
                    <h3 className="text-2xl font-display font-black text-white tracking-tight uppercase italic">TechEra Annual Summit</h3>
                  </div>
                  <div className="px-6 py-3 bg-primary/10 border border-primary/20 text-primary font-mono font-black rounded-xl text-sm tracking-widest shadow-[0_0_20px_rgba(0,238,255,0.15)]">
                    FREE
                  </div>
                </div>
              </div>
            </div>
            
            {/* Atmospheric Depth */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/10 blur-[100px] -z-10 animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 blur-[100px] -z-10 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;

