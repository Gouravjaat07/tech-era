import React, { useState } from "react";
import { founders, coreTeam, departments } from "../data/teamData";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Code, Palette, Calendar, Users, Heart } from "lucide-react";

const SocialBtn = ({ href, icon: Icon, color }) => {
  const ok = href && href !== "#";
  return (
    <a 
      href={ok ? href : undefined} 
      target={ok ? "_blank" : undefined} 
      rel="noreferrer"
      className={`p-2 rounded-lg bg-white/5 border border-white/10 text-slate-500 transition-all ${ok ? 'hover:bg-primary/20 hover:text-primary hover:border-primary/30 cursor-pointer' : 'cursor-default opacity-30'}`}
    >
      <Icon className="w-4 h-4" />
    </a>
  );
};

const ProfileCard = ({ person, isLarge = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative group bg-card/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl ${isLarge ? 'p-8 md:p-10' : 'p-6'}`}
    >
      <div className={`flex flex-col ${isLarge ? 'md:flex-row' : ''} gap-8 items-center`}>
        <div className={`relative ${isLarge ? 'w-48 h-48' : 'w-32 h-32'} flex-shrink-0`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative w-full h-full rounded-full border-2 border-primary/30 p-1 overflow-hidden group-hover:scale-105 transition-transform duration-500">
             <img src={person.image} alt={person.name} className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
        
        <div className={`flex-1 text-center ${isLarge ? 'md:text-left' : ''}`}>
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <span className="text-[10px] font-mono text-primary tracking-widest uppercase font-bold">{person.tag}</span>
          </div>
          <h3 className={`${isLarge ? 'text-3xl' : 'text-xl'} font-display font-bold text-white mb-2`}>{person.name}</h3>
          <p className="text-secondary font-mono text-xs uppercase tracking-widest mb-4">{person.role}</p>
          <p className="text-slate-400 text-sm font-body leading-relaxed mb-6">
            {person.bio}
          </p>
          
          <div className={`flex gap-3 ${isLarge ? 'md:justify-start' : 'justify-center'}`}>
            <SocialBtn href={person.linkedin} icon={Linkedin} />
            <SocialBtn href={person.github} icon={Github} />
            <SocialBtn href={person.instagram} icon={Instagram} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Team() {
  return (
    <div className="min-h-screen bg-dark w-full overflow-x-hidden selection:bg-primary selection:text-dark">
      <main className="pt-40 pb-24">
        {/* HERO SECTION */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase">The Dream Team</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6">
            Meet the Builders <br />of <span className="text-primary">TechEra</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-body">
            TechEra is driven by a passionate group of students and tech enthusiasts dedicated to creating the best tech ecosystem for innovators.
          </p>
        </div>

        {/* FOUNDERS SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-display font-bold text-white whitespace-nowrap">Founders & Visionaries</h2>
            <div className="h-px bg-white/10 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-8">
            {founders.map((f) => (
              <ProfileCard key={f.id} person={f} isLarge={true} />
            ))}
          </div>
        </section>

        {/* CORE LEADERSHIP SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-display font-bold text-white whitespace-nowrap">Core Leadership</h2>
            <div className="h-px bg-white/10 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreTeam.map((c) => (
              <ProfileCard key={c.id} person={c} />
            ))}
          </div>
        </section>

        {/* DEPARTMENTS SECTION */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-display font-bold text-white whitespace-nowrap">Departments</h2>
            <div className="h-px bg-white/10 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((d, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-card/20 border border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6`} style={{ backgroundColor: `${d.color}15`, border: `1px solid ${d.color}30` }}>
                  {/* Mapping string icons back to components */}
                  {d.icon === 'Code' && <Code className="w-6 h-6" style={{ color: d.color }} />}
                  {d.icon === 'Palette' && <Palette className="w-6 h-6" style={{ color: d.color }} />}
                  {d.icon === 'Calendar' && <Calendar className="w-6 h-6" style={{ color: d.color }} />}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">{d.name}</h3>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">Leaders</p>
                  <p className="text-sm font-body font-medium text-slate-300">{d.lead}</p>
                  <p className="text-xs font-body text-slate-500">{d.coLead}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
             <div className="p-12 rounded-[3rem] bg-card/60 border border-white/10 backdrop-blur-2xl text-center">
                <Heart className="w-12 h-12 text-secondary mx-auto mb-6 animate-pulse" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Want to Build With Us?</h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">We're always looking for passionate students to join our core team and help shape the future of TechEra.</p>
                <a 
                   href="https://docs.google.com/forms/d/e/1FAIpQLSehz9Yy6i5WFw1O3tDYtEkb414jtoWGlf1FFKYlbZG_W8Useg/viewform"
                   className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-dark font-display font-black hover:scale-105 transition-transform"
                >
                  Apply for Core Team
                </a>
             </div>
        </section>
      </main>
    </div>
  );
}