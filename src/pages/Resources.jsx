import React, { useState } from "react";
import { 
  BookOpen, 
  Code, 
  Terminal, 
  Lightbulb, 
  ExternalLink,
  Search,
  Github,
  Youtube,
  Cpu,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Development", "Design", "Career", "Open Source"];

const RESOURCES = [
  {
    id: 1,
    title: "MERN Stack Roadmap",
    desc: "A complete step-by-step guide to becoming a Full-stack developer in 2026.",
    category: "Development",
    icon: Code,
    links: [{ label: "View Guide", href: "#", icon: BookOpen }],
    accent: "#00EEFF"
  },
  {
    id: 2,
    title: "Open Source Kit",
    desc: "Everything you need to make your first contribution to real-world projects.",
    category: "Open Source",
    icon: Github,
    links: [{ label: "GitHub Org", href: "https://github.com/techera-community", icon: Github }],
    accent: "#4ADE80"
  },
  {
    id: 3,
    title: "UI/UX Best Practices",
    desc: "Modern design principles for developers who want to build beautiful products.",
    category: "Design",
    icon: Lightbulb,
    links: [{ label: "Resources", href: "#", icon: Globe }],
    accent: "#A78BFA"
  },
  {
    id: 4,
    title: "System Design 101",
    desc: "Learn how to scale applications from 100 to 1 million users effectively.",
    category: "Development",
    icon: Cpu,
    links: [{ label: "Watch Playlist", href: "#", icon: Youtube }],
    accent: "#F97316"
  },
  {
    id: 5,
    title: "Command Line Mastery",
    desc: "Stop being afraid of the terminal. Learn ZSH, Bash and Vim like a pro.",
    category: "Development",
    icon: Terminal,
    links: [{ label: "Cheat Sheet", href: "#", icon: ExternalLink }],
    accent: "#6366F1"
  }
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = RESOURCES.filter(res => 
    (activeTab === "All" || res.category === activeTab) &&
    (res.title.toLowerCase().includes(query.toLowerCase()) || res.desc.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="bg-dark min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-8 text-[10px] font-black uppercase text-primary tracking-[0.2em]"
          >
            <Lightbulb className="w-3.5 h-3.5" /> Community Knowledge Base
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-black text-white leading-tight mb-8"
          >
            Level Up Your <br/>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Tech Stack</span>
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Curated roadmaps, cheat sheets, and toolkits hand-picked by the TechEra community to help you build faster.
          </p>
        </section>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
           <div className="flex flex-wrap gap-2">
             {CATEGORIES.map(cat => (
               <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat ? "bg-primary text-dark" : "text-slate-400 hover:bg-white/5"
                }`}
               >
                 {cat}
               </button>
             ))}
           </div>
           
           <div className="relative w-full md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <input 
               type="text" 
               placeholder="Search resources..."
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:border-primary/50 outline-none"
             />
           </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[#0A1628] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/30 transition-all duration-500 flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 p-8">
                  <item.icon className="w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors" />
                </div>

                <div className="mb-6">
                  <span className="px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>

                <div className="flex gap-3">
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-white font-bold text-xs hover:bg-primary hover:text-dark transition-all"
                    >
                      <link.icon className="w-3.5 h-3.5" /> {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
