import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomIn, Camera, ArrowRight } from 'lucide-react';

const images = [
  "/event_images/developers_meetup1.jpeg",
  "/event_images/developers_meetup2.jpeg",
  "/event_images/developers_meetup3.jpeg",
  "/event_images/developers_meetup4.jpeg",
  "/event_images/developers_meetup5.jpeg",
  "/event_images/developers_meetup6.jpeg",
];

const GalleryPreview = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-card", {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-dark py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 mb-6 backdrop-blur-xl">
            <Camera className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase font-black">Visual Chronicles</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tighter">
            Capturing the <span className="text-glow text-primary italic">Momentum.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-body">
            A window into the high-energy environments where our community builds the future.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-card relative group rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer bg-white/[0.02]"
            >
              <img 
                src={img} 
                alt="TechEra Event" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1" 
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-white text-dark flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                  <ZoomIn className="w-7 h-7" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
             <a 
               href="/gallery" 
               className="inline-flex items-center gap-3 text-xs font-mono text-slate-500 hover:text-primary tracking-[0.4em] uppercase transition-all group font-black"
             >
                Explore Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </a>
        </div>
      </div>
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] -z-0" />
    </section>
  );
};

export default GalleryPreview;

