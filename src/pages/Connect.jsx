import React from "react";
import { MessageSquare, Twitter, Github, Linkedin, Instagram, Youtube, Globe, Heart, Zap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const LINKS = [
  { 
    label: "Join WhatsApp Community", 
    desc: "Hackathons, resources & updates", 
    href: "https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO", 
    icon: MessageSquare,
    accent: "from-[#25D366] to-[#128C7E]",
    featured: true
  },
  { 
    label: "Follow on Twitter / X", 
    desc: "Daily tech news & community wins", 
    href: "https://twitter.com/techera_community", 
    icon: Twitter,
    accent: "from-[#1DA1F2] to-[#0D8BD9]"
  },
  { 
    label: "Our GitHub Hub", 
    desc: "Contribute to community projects", 
    href: "https://github.com/techera-community", 
    icon: Github,
    accent: "from-[#333] to-[#000]"
  },
  { 
    label: "LinkedIn Professional", 
    desc: "Networking & formal announcements", 
    href: "https://linkedin.com/company/techera-community", 
    icon: Linkedin,
    accent: "from-[#0A66C2] to-[#004182]"
  },
  { 
    label: "Instagram Stories", 
    desc: "Behind the scenes & event vibes", 
    href: "https://instagram.com/techera.community", 
    icon: Instagram,
    accent: "from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"
  },
  { 
    label: "Watch on YouTube", 
    desc: "Workshops and speaker recordings", 
    href: "https://youtube.com/@techera-community", 
    icon: Youtube,
    accent: "from-[#FF0000] to-[#CC0000]"
  }
];

export default function Connect() {
  return (
    <div className="bg-[#020617] min-h-screen pt-40 pb-20 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-primary/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-2xl mx-auto text-center">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <div className="w-28 h-28 rounded-[2.5rem] p-1 bg-gradient-to-br from-primary via-accent to-secondary mx-auto mb-6">
            <img 
              src="/images/logo.jpg" 
              className="w-full h-full object-cover rounded-[2.2rem] border-2 border-dark"
              alt="Logo"
            />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2">TechEra Community</h1>
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <Globe className="w-3.5 h-3.5" /> techera.community
          </p>
        </motion.div>

        {/* Links */}
        <div className="space-y-4 mb-20">
           {LINKS.map((link, i) => (
             <motion.a 
               key={i}
               href={link.href}
               target="_blank"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className={`group relative flex items-center gap-4 p-5 rounded-3xl border border-white/5 bg-white/3 backdrop-blur-xl hover:border-white/20 transition-all duration-300 ${link.featured ? "shadow-[0_0_40px_rgba(37,211,102,0.1)] border-[#25D366]/20" : ""}`}
             >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.accent} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <link.icon className="w-6 h-6" />
                </div>
                <div className="text-left flex-grow">
                  <h3 className="text-white font-bold text-sm mb-0.5 flex items-center gap-2">
                    {link.label}
                    {link.featured && <Zap className="w-3 h-3 text-[#25D366] fill-[#25D366]" />}
                  </h3>
                  <p className="text-slate-500 text-xs">{link.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors" />
             </motion.a>
           ))}
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
             <Heart className="w-3 h-3 text-red-500 fill-red-500" /> Powered by the community
          </div>
          <p className="text-[#00EEFF] font-black text-xl italic tracking-tighter">TechEra</p>
        </motion.div>
      </div>
    </div>
  );
}
