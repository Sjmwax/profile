import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';

/* ── Header ──────────────────────────────────────────────────────── */
export const Header = ({ isMenuOpen, toggleMenu }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled]           = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections       = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top    = el.getBoundingClientRect().top + window.scrollY;
          const bottom = el.getBoundingClientRect().bottom + window.scrollY;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <motion.header
      className="fixed top-0 w-full z-50"
      style={{
        background:    scrolled ? 'rgba(7,11,20,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)'         : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(22px)'  : 'none',
        borderBottom:  scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow:     scrolled ? '0 4px 32px rgba(0,0,0,0.35)'      : 'none',
        transition:    'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,    opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <motion.div
          className="text-xl font-bold gradient-text cursor-pointer select-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Portfolio
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const id       = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <motion.button
                key={item}
                type="button"
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300"
                style={{ color: isActive ? '#38bdf8' : 'rgba(209,213,219,0.75)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'rgba(14,165,233,0.10)',
                      border: '1px solid rgba(14,165,233,0.20)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </motion.button>
            );
          })}

          {/* CTA */}
          <motion.button
            className="ml-4 btn-primary text-sm py-2 px-5"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border:     '1px solid rgba(255,255,255,0.10)',
          }}
          whileTap={{ scale: 0.93 }}
        >
          <motion.i
            className={`fas fa-${isMenuOpen ? 'times' : 'bars'} text-gray-300`}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.22 }}
          />
        </motion.button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mx-4 mb-4 rounded-2xl overflow-hidden"
            style={{
              background:    'rgba(7,11,20,0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0,   height: 'auto' }}
            exit={{   opacity: 0, y: -12,  height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => {
                const id       = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={item}
                    type="button"
                    onClick={() => {
                      toggleMenu();
                      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
                    }}
                    className="block w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color:      isActive ? '#38bdf8'                      : '#9ca3af',
                      background: isActive ? 'rgba(14,165,233,0.10)'        : 'transparent',
                      border:     isActive ? '1px solid rgba(14,165,233,0.18)' : '1px solid transparent',
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {item}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ── Footer ──────────────────────────────────────────────────────── */
export const Footer = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    portfolioAPI.getPortfolio()
      .then(res => setPortfolio(res.data[0] || {}))
      .catch(() => {});
  }, []);

  const socialLinks = [
    portfolio?.github    && { icon: 'github',     href: portfolio.github,    label: 'GitHub'    },
    portfolio?.linkedin  && { icon: 'linkedin',   href: portfolio.linkedin,  label: 'LinkedIn'  },
    portfolio?.twitter   && { icon: 'twitter',    href: portfolio.twitter,   label: 'Twitter'   },
    portfolio?.facebook  && { icon: 'facebook-f', href: portfolio.facebook,  label: 'Facebook'  },
    portfolio?.whatsapp  && { icon: 'whatsapp',   href: portfolio.whatsapp,  label: 'WhatsApp'  },
  ].filter(Boolean);

  return (
    <footer
      className="relative pt-12 pb-8 mt-16"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.055)',
        background: 'linear-gradient(180deg,transparent 0%,rgba(14,165,233,0.025) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Brand */}
          <span
            className="text-xl font-bold gradient-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {portfolio?.name || 'Portfolio'}
          </span>

          {/* Social icons */}
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <motion.a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border:     '1px solid rgba(255,255,255,0.08)',
                  color:      '#6b7280',
                }}
                whileHover={{
                  scale:       1.15,
                  rotate:      6,
                  background: 'rgba(14,165,233,0.14)',
                  borderColor:'rgba(14,165,233,0.28)',
                  color:       '#38bdf8',
                  boxShadow:  '0 6px 20px rgba(14,165,233,0.18)',
                }}
                whileTap={{ scale: 0.92 }}
              >
                <i className={`fab fa-${s.icon}`} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: 'rgba(107,114,128,0.7)' }}>
            © {new Date().getFullYear()} {portfolio?.name || 'Portfolio'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
