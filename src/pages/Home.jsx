import React, { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import StatsCounter from "../components/StatsCounter";
import WhatWeDo from "../components/WhatWeDo";
import FeaturedEvent from "../components/FeaturedEvent";
import GalleryPreview from "../components/GalleryPreview";
import FeaturedSpeakers from "../components/FeaturedSpeakers";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import WhyTechEra from "../components/WhyTechEra";
import LogoMarquee from "../components/LogoMarquee";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";

export default function Home() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ctaRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
        {/* HERO SECTION */}
        <Hero />

        {/* STATS SECTION */}
        <StatsCounter />

        {/* WHAT WE DO SECTION */}
        <WhatWeDo />

        {/* FEATURED EVENT SECTION */}
        <FeaturedEvent />

        {/* COLLABORATION SECTION (LOGOS) */}
        <LogoMarquee />

        {/* GALLERY PREVIEW SECTION */}
        <GalleryPreview />

        {/* SPEAKERS SECTION */}
        <FeaturedSpeakers />

        {/* WHY TECHERA SECTION */}
        <WhyTechEra />

        {/* TESTIMONIALS SECTION */}
        <TestimonialsCarousel />

        {/* FINAL CTA SECTION */}
        <section className="bg-dark py-40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div ref={ctaRef} className="relative bg-gradient-to-br from-indigo-600 via-primary to-accent rounded-[4rem] p-12 md:p-32 overflow-hidden group shadow-[0_50px_100px_rgba(0,238,255,0.3)] text-center">
              {/* Refined Background Elements */}
              <div className="absolute inset-0 bg-dark/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 blur-[120px] rounded-full animate-pulse" />
              
              <div className="relative z-10 space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl mb-4">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span className="text-[10px] font-mono text-white tracking-[0.3em] uppercase font-black">Secure Your Future</span>
                </div>
                
                <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-none">
                  Ship the <span className="italic">Impossible.</span>
                </h2>
                
                <p className="text-white/90 text-lg md:text-2xl mb-16 font-body font-medium max-w-2xl mx-auto leading-relaxed">
                  Join a high-velocity ecosystem designed to accelerate your growth and transform your technical vision into global scale.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a 
                    href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO"
                    target="_blank"
                    className="px-12 py-6 bg-dark text-white rounded-[2rem] font-display font-black text-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-2xl group/btn"
                  >
                    Enter the Warp <MessageSquare className="w-6 h-6 text-primary group-hover/btn:rotate-12 transition-transform" />
                  </a>
                  <a 
                    href="/sponsors"
                    className="px-12 py-6 bg-transparent border-2 border-white text-white rounded-[2rem] font-display font-black text-xl hover:bg-white hover:text-dark transition-all flex items-center justify-center"
                  >
                    Partner with Us
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background depth atmospheric effects */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[180px] -z-0" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[180px] -z-0" />
        </section>
    </>
  );
}