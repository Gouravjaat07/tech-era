import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Surya Chauhan",
    role: "Founding Engineer",
    text: "TechEra isn't just a community; it's an accelerator for ambition. The high-entropy environment pushed me to ship faster than I ever thought possible.",
    avatar: "/images/tech-colead.jpeg"
  },
  {
    name: "Rewa Gupta",
    role: "Lead Strategist",
    text: "The collective intelligence here is staggering. Collaborating with top-tier builders helped me navigate complex architectural challenges with ease.",
    avatar: "/images/Marketing-lead.jpeg"
  },
  {
    name: "Gourav Jaat",
    role: "DevOps Specialist",
    text: "Unparalleled mentorship and a culture of radical transparency. TechEra provided the foundry I needed to refine my technical edge.",
    avatar: "/images/Gourav_IMG_2.png"
  },
];

const TestimonialsCarousel = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-dark py-32 relative overflow-hidden border-y border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-full bg-primary/[0.03] blur-[150px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-full bg-secondary/[0.03] blur-[150px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/10 mb-6 backdrop-blur-xl">
            <Star className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
            <span className="text-[10px] font-mono text-indigo-400 tracking-[0.4em] uppercase font-black">Success Stories</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">
            Echoes of <span className="text-glow text-primary italic font-serif">Impact.</span>
          </h2>
        </div>

        <Swiper
          spaceBetween={40}
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper max-w-5xl"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="p-12 md:p-20 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl flex flex-col items-center text-center relative overflow-hidden group">
                <Quote className="absolute top-12 left-12 w-20 h-20 text-primary/5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                
                <div className="relative mb-10">
                    <div className="w-24 h-24 rounded-full border-2 border-primary/20 p-1.5 bg-dark shadow-2xl relative z-10">
                      <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 border border-primary/10 rounded-full animate-spin-slow pointer-events-none" />
                </div>

                <p className="text-xl md:text-3xl text-slate-300 italic mb-12 leading-relaxed font-body max-w-3xl font-medium tracking-tight">
                  "{t.text}"
                </p>
                
                <div className="transform transition-transform duration-700 group-hover:-translate-y-2">
                  <h4 className="text-2xl font-display font-black text-white mb-2 tracking-tight uppercase italic">{t.name}</h4>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="h-px w-4 bg-primary" />
                    <p className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-black">{t.role}</p>
                    <div className="h-px w-4 bg-primary" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.1) !important;
          opacity: 1 !important;
          width: 8px !important;
          height: 8px !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swiper-pagination-bullet-active {
          background: #00EEFF !important;
          width: 32px !important;
          border-radius: 4px !important;
          box-shadow: 0 0 15px rgba(0, 238, 255, 0.5);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;

