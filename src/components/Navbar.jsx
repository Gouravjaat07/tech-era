import React, { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Events",   href: "/events" },
  { label: "Speakers", href: "/speakers" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Team",     href: "/team" },
  { label: "Sponsors", href: "/sponsors" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const linksRef = useRef([]);

  /* ── Entrance Animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the main header
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
      
      // Simpler link reveal (less prone to sticking)
      gsap.from(linksRef.current, {
        y: -10,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.2
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Scroll listener ── */
  const onScroll = useCallback(() => setScrolled(window.scrollY > 30), []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* ── Prevent body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-700 ${
          scrolled ? "py-2" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`flex items-center justify-between px-5 sm:px-8 py-3 rounded-2xl transition-all duration-700 ${
              scrolled
                ? "bg-dark/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "bg-transparent border border-white/0"
            }`}
          >
            {/* ── Logo ── */}
            <NavLink
              to="/"
              className="flex items-center gap-3 group shrink-0"
            >
              <div
                className="w-10 h-10 rounded-xl overflow-hidden border border-white/10
                            group-hover:border-primary/50 transition-all duration-500
                            group-hover:shadow-[0_0_20px_rgba(0,238,255,0.25)]"
              >
                <img
                  src="/images/logo.jpg"
                  alt="TechEra logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Tech<span className="text-primary italic">Era</span>
              </span>
            </NavLink>

            {/* ── Desktop Nav Links ── */}
            <nav
              className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/5"
            >
              {NAV_LINKS.map((link, i) => (
                <NavLink
                  key={link.href}
                  ref={el => linksRef.current[i] = el}
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <>
                          <motion.span
                            layoutId="activeNav"
                            className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                          <motion.span
                            layoutId="navDot"
                            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2
                                       w-1 h-1 rounded-full bg-primary
                                       shadow-[0_0_8px_#00EEFF]"
                          />
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ── CTA + mobile toggle ── */}
            <div className="flex items-center gap-3">
              <a
                href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-primary text-dark text-[10px] font-black uppercase tracking-wider
                           hover:scale-105 active:scale-95 transition-all duration-500
                           shadow-[0_0_30px_rgba(0,238,255,0.2)] group"
              >
                Join Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden w-11 h-11 flex items-center justify-center
                           rounded-xl bg-white/5 border border-white/10 text-white
                           hover:bg-white/10 transition-all active:scale-90"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] lg:hidden bg-dark/95 backdrop-blur-3xl"
          >
             <div className="flex flex-col h-full pt-32 px-8 pb-12">
                <nav className="flex flex-col gap-4">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavLink
                        to={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-5xl font-display font-black tracking-tight transition-all ${
                            isActive ? "text-primary italic" : "text-white/20 hover:text-white"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-auto"
                >
                  <a
                    href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO"
                    className="flex items-center justify-center gap-3 py-6 px-8 rounded-2xl bg-primary text-dark font-black text-xl shadow-[0_20px_40px_rgba(0,238,255,0.2)]"
                  >
                    Join The Community
                  </a>
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}