import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronRight, 
  X, 
  ExternalLink,
  Ticket,
  Clock,
  ArrowLeft,
  Sparkles,
  Award,
  Video,
  Mic,
  ArrowRight
} from "lucide-react";


// --- DATA (PRESERVED) ---
const INITIAL_EVENTS = [
  {
    id: 1, name: "Developers Meetup 2026", organizer: "​TechEra Presents",
    date: "07th March 2026", day: "Saturday", time: "09:30 AM ONWARDS", fees: "Free", mode: "Offline",
    location: "ThoughtWork Office, Gurugram", attendees: "200 Limited Seats", category: "Meetup",
    status: "active",
    registerLink: "https://luma.com/esw4feoh",
    bannerUrl: "/images/Meetup-banner_2.png", bannerGradient: "linear-gradient(135deg,#050D1A 0%,#0D1F3C 60%,#050D1A 100%)", accentColor: "#00EEFF",
    description: `​The Developers Meetup 2026 is a premium offline community gathering designed to bring together developers, designers, builders, founders, and ambitious tech enthusiasts who are passionate about building, learning, and growing within the technology ecosystem.
​This meetup is more than just an event — it is a high-energy networking and opportunity-driven experience where participants will interact with like-minded individuals, discover collaboration opportunities, explore internships and project possibilities, and become part of a fast-growing developer network focused on real impact.
​Whether you are a beginner starting your journey, a student exploring opportunities, or an experienced developer looking to expand your network, this meetup is structured to help you connect, collaborate, and grow faster.`,
    links: { website: "https://luma.com/esw4feoh", linkedin: "https://www.linkedin.com/company/techeraa/", instagram: "https://www.instagram.com/tech__eraa?igsh=ZTNlcXBobWZ0NG16" },
    agenda: [
      { time: "09:30 AM – 10:00 AM", title: "Verification & Check-in", type: "logistics" },
      { time: "10:15 AM – 10:45 AM", title: "Welcome & Event Overview", type: "keynote" },
      { time: "10:48 AM – 11:28 AM", title: "Key Speaker 1", type: "session" },
      { time: "11:31 AM – 12:01 PM", title: "Tech4Hack Presentation", type: "presentation" },
      { time: "12:04 PM – 12:24 PM", title: "Coffee Break", type: "break" },
      { time: "12:27 PM – 12:32 PM", title: "Team Distribution", type: "activity" },
      { time: "12:32 PM – 01:02 PM", title: "Lunch and Networking", type: "break" },
      { time: "01:05 PM – 01:45 PM", title: "Fun Group Activity", type: "activity" },
      { time: "01:48 PM – 02:28 PM", title: "Key Speaker 2", type: "session" },
      { time: "02:31 PM – 02:46 PM", title: "Competition Segment", type: "competition" },
      { time: "02:49 PM – 03:04 PM", title: "Upskilling Partner", type: "sponsor" },
      { time: "03:07 PM – 03:22 PM", title: "MetaSpace Address and Final Results", type: "closing" },
      { time: "03:22 PM – 03:30 PM", title: "Closing With Some Group Pictures", type: "closing" },
    ],
    organiserTeam: [
      { name: "Aditya", tagline: "Founder", initials: "A", accent: "#00EEFF", linkedin: "https://www.linkedin.com/in/aditya-c-366b90305/" },
      { name: "Arnav", tagline: "Co-Founder", initials: "A", accent: "#A78BFA", linkedin: "https://www.linkedin.com/in/arnav-raj-18983a33a" },
      { name: "Amrita", tagline: "Co-Founder", initials: "A", accent: "#4F46E5", linkedin: "https://www.linkedin.com/in/amrita-singh-579262331/?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Biswa", tagline: "Community Manager", initials: "BM", accent: "#06B6D4", linkedin: "https://www.linkedin.com/in/bb-shark/" },
      { name: "Raj", tagline: "Senior Coordinator", initials: "RJ", accent: "#b4e166", linkedin: "https://www.linkedin.com/in/raj-mishra-030b04327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Gourav", tagline: "Technical Team", initials: "G", accent: "#65b4c2", linkedin: "https://www.linkedin.com/in/gourav-jaat/" },
      { name: "Kaashvi", tagline: "Video Editing", initials: "KV", accent: "#2d5cba", linkedin: "https://www.linkedin.com/in/kaashvi-gupta?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Gautam Kumar", tagline: "", initials: "GK", accent: "#00EEFF", linkedin: "https://www.linkedin.com/in/gautammanak1/" },
    ],
    sponsors: [
      { name: "Tech4Hack", tagline: "Venue Partner", initials: "TH", accent: "#FEBC2E", linkedin: "https://www.linkedin.com/company/tech4hack/" },
      { name: "Edubuk", tagline: "Job and knowledge Partner", initials: "EB", accent: "#94A3B8", linkedin: "https://www.linkedin.com/company/edubuk-ai-web3/" },
      { name: "OSEN", tagline: "Goodies Partner", initials: "OS", accent: "#00EEFF", linkedin: "https://www.linkedin.com/company/osenofficial/" },
      { name: "Digimation Flight", tagline: "Food Partner", initials: "DF", accent: "#A78BFA", linkedin: "https://www.linkedin.com/company/digimationflight/" },
      { name: "Ops-skill", tagline: "Innovation Partner", initials: "OK", accent: "#bae7bd", linkedin: "#" },
      { name: "MetaSpace", tagline: "Goodies Partner", initials: "MS", accent: "#cce883", linkedin: "https://www.linkedin.com/company/metaspace-verse/" },
    ],
    communityPartners: [
      { name: "Tech4Hack", tagline: "Open Source Community", initials: "TH", accent: "#4F46E5", linkedin: "https://www.linkedin.com/company/tech4hack/" },
      { name: "Cracked", tagline: "Open Source Community", initials: "CK", accent: "#00EEFF", linkedin: "https://www.linkedin.com/company/crackedcommunity/" },
      { name: "Idevion", tagline: "Open Source Community", initials: "I", accent: "#A78BFA", linkedin: "https://www.linkedin.com/company/idevion/" },
      { name: "Hackfinity", tagline: "Open Source Community", initials: "HF", accent: "#06B6D4", linkedin: "https://www.linkedin.com/company/hacknfinity/" },
    ],
    faqs: [
      { q: "Is this event free to attend?", a: "Yes! Completely free for all registered attendees. Just sign up and show up." },
      { q: "Who can attend?", a: "Anyone passionate about open source, AI, Web3, or tech. Students, developers, designers, and founders are all welcome." },
      { q: "Will sessions be recorded?", a: "Selected sessions will be recorded and shared with registered attendees after the event via email." },
      { q: "How do I become a speaker or sponsor?", a: "Use the contact form on this page to reach out. Our team will get back to you within 48 hours." },
      { q: "Is there a networking session?", a: "Absolutely! Post the formal agenda, there's dedicated networking time for all attendees, speakers, and partners." },
      { q: "What should I bring?", a: "Just your laptop, curiosity, and energy! We'll handle the rest including lunch for all in-person attendees." },
    ],
  },
  {
    id: 2, name: "Upcoming Hackathon 2026", organizer: "TechEra Community",
    date: "TBA", day: "TBA", time: "TBA", fees: "Free", mode: "TBA",
    location: "TBA", attendees: "TBA", category: "Hackathon",
    status: "upcoming",
    registerLink: "#",
    bannerUrl: null, bannerGradient: "linear-gradient(135deg,#1a050d 0%,#3c0d1f 60%,#1a050d 100%)", accentColor: "#A78BFA",
    description: "Stay tuned — details for TechEra Hackathon 2025 will be announced soon. Follow us on LinkedIn and Instagram to be the first to know.",
    links: { website: "#", linkedin: "#", instagram: "#" },
    agenda: [],
    organiserTeam: [
      { name: "Aditya", tagline: "Founder", initials: "AM", accent: "#00EEFF", linkedin: "https://www.linkedin.com/in/aditya-c-366b90305" },
      { name: "Arnav", tagline: "Co-Founder", initials: "PS", accent: "#A78BFA", linkedin: "https://www.linkedin.com/in/arnav-raj-18983a33a" },
      { name: "Amrita", tagline: "Co-Founder", initials: "RV", accent: "#4F46E5", linkedin: "https://www.linkedin.com/in/amrita-singh-579262331/?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Biswa", tagline: "Community Manager", initials: "BS", accent: "#06B6D4", linkedin: "https://www.linkedin.com/in/bb-shark/" },
      { name: "Raj", tagline: "Senior Coordinator", initials: "RM", accent: "#b4e166", linkedin: "https://www.linkedin.com/in/raj-mishra-030b04327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    ],
    speakers: [], sponsors: [], communityPartners: [],
    faqs: [
      { q: "What's the team size?", a: "Teams of 2–4 members. Solo participation is also allowed." },
      { q: "Is accommodation provided?", a: "Yes, for outstation participants. Please mention in registration." },
    ],
  },
  {
    id: 3, name: "CV TO CAREER", organizer: "EDUBUK X TechEra",
    date: "8th February 2025", day: "Sunday", time: "12:00 PM – 1:30 PM (IST)", fees: "Free", mode: "Google Meet",
    location: "Virtual", attendees: "200+", category: "Workshop",
    status: "expired",
    registerLink: "#",
    bannerUrl: "/images/Workshop-banner.png", bannerGradient: "linear-gradient(135deg,#050d1a 0%,#0f2c1a 60%,#050d1a 100%)", accentColor: "#4ADE80",
    description: "EDUBUK in collaboration with TechEra presents an exclusive online career-focused session for students and early professionals.\n ​'CV to Career: A TruTalk by EDUBUK × TechEra' is a live interactive session designed to help participants understand how blockchain-verified learning, certifications, and career platforms are reshaping internships, placements, and long-term career growth.\n ​Through this session, participants will gain insights into how TruCV & TruJobs, powered by EDUBUK, enable trusted professional profiles and unlock national and international career opportunities through verified credentials.",
    links: { website: "#", linkedin: "#", instagram: "#" },
    agenda: [
      { time: "12:00 PM – 12:05 PM", title: "Welcome & Introduction (EDUBUK × TechEra)", type: "keynote" },
      { time: "12:05 PM – 12:25 PM", title: "From CV to Career: Why Verification Matters", type: "session" },
      { time: "12:25 PM – 12:45 PM", title: "TruCV & TruJobs: Building Trusted Career Profiles", type: "presentation" },
      { time: "12:45 PM – 01:05 PM", title: "Certifications, Internships & Career Opportunities", type: "session" },
      { time: "01:05 PM – 01:20 PM", title: "Live Q&A and Student Interaction", type: "activity" },
      { time: "01:20 PM – 01:30 PM", title: "Surprise Giveaway & Closing Note", type: "closing" },
    ],
    organiserTeam: [
      { name: "Aditya", tagline: "Founder", initials: "AM", accent: "#00EEFF", linkedin: "https://www.linkedin.com/in/aditya-c-366b90305" },
      { name: "Arnav", tagline: "Co-Founder", initials: "PS", accent: "#A78BFA", linkedin: "https://www.linkedin.com/in/arnav-raj-18983a33a" },
      { name: "Amrita", tagline: "Co-Founder", initials: "RV", accent: "#4F46E5", linkedin: "https://www.linkedin.com/in/amrita-singh-579262331/?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Biswa", tagline: "Community Manager", initials: "BS", accent: "#06B6D4", linkedin: "https://www.linkedin.com/in/bb-shark/" },
      { name: "Raj", tagline: "Senior Coordinator", initials: "RM", accent: "#b4e166", linkedin: "https://www.linkedin.com/in/raj-mishra-030b04327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    ],
    speakers: [
      { name: "Shivani Mehrotra", tagline: "Co-Founder and COO of Edubuk", initials: "SM", accent: "#4ADE80", linkedin: "#" },
      { name: "Apoorva Bajaj", tagline: "Co-Founder and CEO of Edubuk", initials: "AB", accent: "#00EEFF", linkedin: "#" },
    ],
    sponsors: [{ name: "EDUBUK", tagline: "Event Sponser", initials: "OA", accent: "#4ADE80", linkedin: "#" }],
    communityPartners: [],
    faqs: [
      { q: "How do I get the meeting link?", a: "You'll receive it via email after registration." },
      { q: "Is it recorded?", a: "Yes, all sessions will be available on demand post event." },
    ],
  },
];

const CATEGORIES = ["All", "Meetup", "Hackathon", "Workshop", "Collaborations"];

const RECENT_EVENTS = [
  { id: 101, name: "CV to Career", img: "/images/Workshop-banner.png", type: "Workshop" },
  { id: 102, name: "Technical Day 5.0", img: null, type: "Collaboration" },
  { id: 103, name: "LockedIn", img: null, type: "Collaboration" },
];

export default function Events() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = INITIAL_EVENTS.filter(ev => {
    const matchesFilter = filter === "All" || ev.category === filter;
    const matchesSearch = ev.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-dark min-h-screen">
      
      {/* Hero Header */}
      <section className="pt-40 pb-12 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">The Calendar</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight tracking-tighter">
              World-Class <br /> 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Tech Experiences</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 text-left md:text-right"
          >
             <p className="text-slate-400 max-w-sm ml-auto">
               From high-stakes hackathons to intimate builder meetups. Join the events shaping the next era.
             </p>
             <div className="relative w-full max-w-md ml-auto">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
               <input 
                 type="text" 
                 placeholder="Search events, cities, partners..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-primary/50 outline-none transition-all focus:bg-white/10"
               />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 border ${
                filter === cat 
                  ? "bg-primary/10 border-primary/30 text-primary" 
                  : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev, i) => (
            <EventCard key={ev.id} event={ev} i={i} onClick={setSelectedEvent} />
          ))}
          {/* Recent/Past Events Bar (Bento-fying) */}
          <div className="lg:col-span-3 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
             <div className="lg:col-span-1 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col justify-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                   <Award className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-black text-white font-display">Past Highlights</h3>
                <p className="text-sm text-slate-400">Relive the moments and sparks from our previous encounters.</p>
             </div>
             {RECENT_EVENTS.map((rev, idx) => (
               <div key={rev.id} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 aspect-square lg:aspect-auto">
                 <img 
                   src={rev.img || `/images/Meetup-banner.png`} 
                   className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
                   alt={rev.name}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
                 <div className="absolute bottom-6 left-6 pr-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rev.type}</span>
                    <h4 className="text-xl font-bold text-white mt-1">{rev.name}</h4>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>
      
      {/* Modals */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EventCard({ event, i, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      onClick={() => onClick(event)}
      className="group relative flex flex-col p-1 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2.1rem]">
        {event.bannerUrl ? (
            <img 
              src={event.bannerUrl} 
              alt={event.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
        ) : (
            <div 
              className="w-full h-full flex items-center justify-center text-white/10"
              style={{ background: event.bannerGradient }}
            >
              <Sparkles className="w-16 h-16 opacity-10" />
            </div>
        )}
        <div className="absolute top-4 right-4 px-3 py-1 bg-dark/60 backdrop-blur-xl border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
          {event.mode}
        </div>
      </div>

      <div className="p-7">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.2em]">
            {event.organizer}
          </span>
        </div>
        <h3 className="text-2xl font-display font-black text-white mb-6 group-hover:text-primary transition-colors duration-300 tracking-tight leading-tight">
          {event.name}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-8 h-full">
           <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2 text-slate-500">
               <Calendar className="w-3 h-4" />
               <span className="text-[11px] font-bold uppercase tracking-wide">Date</span>
             </div>
             <span className="text-white text-sm font-medium">{event.date}</span>
           </div>
           <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2 text-slate-500">
               <MapPin className="w-3 h-4" />
               <span className="text-[11px] font-bold uppercase tracking-wide">Location</span>
             </div>
             <span className="text-white text-sm font-medium line-clamp-1">{event.location}</span>
           </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Ticket className="w-4 h-4 text-primary" />
             </div>
             <span className="text-xs font-bold text-white">{event.fees}</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-xs font-black text-white hover:bg-primary hover:text-dark transition-all duration-300">
            Details <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function EventDetailModal({ event, onClose }) {
  const [activeTab, setActiveTab] = useState("Info");

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-dark/95 backdrop-blur-3xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-card border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[90vh] flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Modal Header/Banner */}
          <div className="h-[300px] relative">
            <div className="absolute inset-0" style={{ background: event.bannerGradient }}>
               {event.bannerUrl && <img src={event.bannerUrl} className="w-full h-full object-cover opacity-50" alt="" />}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            
            <div className="absolute bottom-8 left-12 pr-12">
               <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full w-fit mb-4">
                 <span className="text-[10px] font-black uppercase text-primary tracking-widest">{event.category}</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
                 {event.name}
               </h2>
            </div>
          </div>

          <div className="p-12 pt-8">
            {/* Nav Tabs */}
            <div className="flex gap-8 border-b border-white/5 mb-10 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
              {["Info", "Agenda", "Organizers", "FAQ"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold pb-4 transition-all relative ${
                    activeTab === tab ? "text-primary " : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="modalActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_#00EEFF]" />
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {activeTab === "Info" && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     <h3 className="text-xl font-bold text-white mb-4">About the Event</h3>
                     <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-line">
                       {event.description}
                     </p>
                   </motion.div>
                )}

                {activeTab === "Agenda" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                     {event.agenda.length > 0 ? event.agenda.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                         <div className="text-xs font-mono font-black text-slate-500 group-hover:text-primary transition-colors min-w-[140px]">
                           {item.time}
                         </div>
                         <div className="h-2 w-2 rounded-full bg-primary" />
                         <div className="text-white font-bold">{item.title}</div>
                       </div>
                     )) : (
                       <div className="py-12 text-center text-slate-500 font-mono italic text-sm">
                         Detailed agenda will be revealed soon.
                       </div>
                     )}
                  </motion.div>
                )}

                {activeTab === "Organizers" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {/* Speaker or Team placeholders */}
                       <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                          <h4 className="text-white font-bold mb-4">TechEra Core Team</h4>
                          <p className="text-sm text-slate-400">Led by our founders and dedicated community managers.</p>
                       </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
                   <div className="space-y-4">
                      <SidebarItem icon={Calendar} label="Date & Time" value={`${event.date} | ${event.time}`} />
                      <SidebarItem icon={MapPin} label="Location" value={event.location} />
                      <SidebarItem icon={Clock} label="Status" value={event.status === 'active' ? 'Live & Open' : event.status} />
                      <SidebarItem icon={Users} label="Attendees" value={event.attendees} />
                   </div>
                   
                   <a 
                    href={event.registerLink}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-dark font-black hover:scale-[1.02] transition-transform shadow-[0_10px_30px_rgba(0,238,255,0.2)]"
                   >
                     Book Ticket <ArrowRight className="w-5 h-5" />
                   </a>
                </div>

                <div className="flex justify-center gap-4">
                   <SocialIcon icon="linkedin" href={event.links.linkedin} />
                   <SocialIcon icon="instagram" href={event.links.instagram} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="text-sm font-bold text-white leading-snug">
        {value}
      </div>
    </div>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"
    >
       <ExternalLink className="w-4 h-4" />
    </a>
  );
}
