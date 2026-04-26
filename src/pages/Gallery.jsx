import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight, Expand, Sparkles, Image as ImageIcon } from "lucide-react";

// --- GALLERY DATA ---
const GALLERY_ITEMS = [
  { id: 1, src: "/event_images/developers_meetup1.jpeg", caption: "Opening Keynote", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 2, src: "/event_images/developers_meetup2.jpeg", caption: "Networking Session", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 3, src: "/event_images/developers_meetup3.jpeg", caption: "Speaker 1 — Q&A", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 4, src: "/event_images/developers_meetup4.jpeg", caption: "Group Activity", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 5, src: "/event_images/developers_meetup5.jpeg", caption: "Speaker 2 on Stage", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 6, src: "/event_images/developers_meetup6.jpeg", caption: "Group Photo", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 7, src: "/event_images/developers_meetup7.jpeg", caption: "Competition Segment", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 8, src: "/event_images/developers_meetup8.jpeg", caption: "Lunch & Networking", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 9, src: "/event_images/developers_meetup9.jpeg", caption: "Our team", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 10, src: "/event_images/developers_meetup10.jpeg", caption: "Speaker honouring", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 11, src: "/event_images/developers_meetup11.jpg", caption: "Venue", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 12, src: "/event_images/developers_meetup12.jpg", caption: "Speaker 3 on stage", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 13, src: "/event_images/developers_meetup13.jpg", caption: "Doubt session", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 14, src: "/event_images/developers_meetup14.jpg", caption: "Game Arena", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 15, src: "/event_images/developers_meetup15.jpg", caption: "Participants pitching", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
  { id: 16, src: "/event_images/developers_meetup16.jpg", caption: "Our Winners", event: "Developers Meetup 2026", category: "Meetup", accent: "#00EEFF" },
];

const FILTERS = ["All", "Meetup", "Workshop", "Collabs", "BTS"];

const BENTO_CLASSES = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-2",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = GALLERY_ITEMS.filter(item =>
    (filter === "All" || item.category === filter) &&
    (!search || item.caption.toLowerCase().includes(search.toLowerCase()))
  );

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="bg-dark min-h-screen selection:bg-primary selection:text-dark">

      {/* Hero Header */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit mx-auto mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase text-primary tracking-widest">Memories in High Def</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-8"
          >
            Our Story, <br/>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Frame by Frame</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            A visual journey through hackathons, meetups, and late-night building sessions that define the TechEra community.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[80px] z-50 px-6 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-dark/40 backdrop-blur-3xl border border-white/5 rounded-[2rem]">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  filter === f 
                    ? "bg-primary text-dark shadow-[0_0_20px_rgba(0,238,255,0.3)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search moments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-primary/50 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.1 }}
              onClick={() => openLightbox(i)}
              className={`group relative rounded-[2rem] overflow-hidden border border-white/5 bg-white/5 cursor-pointer shadow-2xl ${BENTO_CLASSES[i % BENTO_CLASSES.length]}`}
            >
              <img 
                src={item.src} 
                alt={item.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-gradient-to-br from-dark to-slate-900 flex-col items-center justify-center gap-4 text-white/10">
                 <ImageIcon className="w-16 h-16" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Missing Asset</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-black text-primary uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{item.caption}</h3>
                <p className="text-sm text-slate-400">{item.event}</p>
                <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Expand className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-dark/95 backdrop-blur-3xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-6xl w-full flex flex-col items-center gap-8"
            >
              <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-card shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                 <img src={filtered[lightboxIndex].src} className="w-full h-full object-contain" alt="" />
                 
                 <button 
                  onClick={closeLightbox}
                  className="absolute top-8 right-8 w-14 h-14 flex items-center justify-center rounded-2xl bg-dark/50 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
                 >
                   <X className="w-6 h-6" />
                 </button>

                 <div className="absolute inset-y-0 left-8 flex items-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev - 1 + filtered.length) % filtered.length) }}
                      className="w-14 h-14 flex items-center justify-center rounded-2xl bg-dark/50 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                 </div>

                 <div className="absolute inset-y-0 right-8 flex items-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev + 1) % filtered.length) }}
                      className="w-14 h-14 flex items-center justify-center rounded-2xl bg-dark/50 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                 </div>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-display font-black text-white mb-2">{filtered[lightboxIndex].caption}</h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{filtered[lightboxIndex].event}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}