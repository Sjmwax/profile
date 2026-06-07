import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';

/* ── Floating geometric decoration ──────────────────────────────── */
const Orb = ({ style, delay = 0 }) => (
  <motion.div
    style={{ position: 'absolute', borderRadius: '50%', ...style }}
    animate={{ y: [0, -18, 0], rotate: [0, 4, 0], opacity: [0.35, 0.55, 0.35] }}
    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const Diamond = ({ style, delay = 0 }) => (
  <motion.div
    style={{ position: 'absolute', ...style }}
    animate={{ rotate: ['45deg','100deg','45deg'], opacity: [0.3, 0.55, 0.3] }}
    transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ── Stagger helpers ─────────────────────────────────────────────── */
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

/* ── Home Page ───────────────────────────────────────────────────── */
export const HomePage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [projects,  setProjects]  = useState([]);
  const [skills,    setSkills]    = useState([]);

  useEffect(() => {
    Promise.all([
      portfolioAPI.getPortfolio(),
      portfolioAPI.getFeaturedProjects(),
      portfolioAPI.getSkills(),
    ])
      .then(([pRes, prRes, skRes]) => {
        setPortfolio(pRes.data[0] || {});
        setProjects(prRes.data);
        setSkills(skRes.data.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  const socials = [
    portfolio?.github    && { icon: 'github',     href: portfolio.github,    label: 'GitHub'   },
    portfolio?.linkedin  && { icon: 'linkedin',   href: portfolio.linkedin,  label: 'LinkedIn' },
    portfolio?.twitter   && { icon: 'twitter',    href: portfolio.twitter,   label: 'Twitter'  },
    portfolio?.facebook  && { icon: 'facebook-f', href: portfolio.facebook,  label: 'Facebook' },
    portfolio?.whatsapp  && { icon: 'whatsapp',   href: portfolio.whatsapp,  label: 'WhatsApp' },
  ].filter(Boolean);

  return (
    <div className="pt-20">

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        id="home"
        className="min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Background image */}
        {portfolio?.landing_background && (
          <div
            className="absolute inset-0 bg-cover bg-center lg:bg-top z-0"
            style={{
              backgroundImage: `url(${portfolio.landing_background})`,
              opacity: 0.15,
            }}
          />
        )}

        {/* Radial gradient overlays */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: [
              'radial-gradient(ellipse at 18% 52%, rgba(14,165,233,0.10) 0%, transparent 55%)',
              'radial-gradient(ellipse at 82% 18%, rgba(139,92,246,0.09) 0%, transparent 55%)',
            ].join(','),
          }}
        />

        {/* Floating decorations */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Orb
            delay={0}
            style={{
              width: 320, height: 320,
              top: '12%', right: '8%',
              border: '1px solid rgba(14,165,233,0.10)',
              background: 'radial-gradient(circle,rgba(14,165,233,0.04) 0%,transparent 70%)',
            }}
          />
          <Orb
            delay={2}
            style={{
              width: 160, height: 160,
              top: '30%', right: '18%',
              border: '1px solid rgba(139,92,246,0.14)',
            }}
          />
          <Diamond
            delay={1}
            style={{
              width: 64, height: 64, borderRadius: '14px',
              bottom: '22%', right: '7%',
              background: 'rgba(14,165,233,0.06)',
              border: '1px solid rgba(14,165,233,0.15)',
            }}
          />
          <Diamond
            delay={3}
            style={{
              width: 32, height: 32, borderRadius: '8px',
              top: '58%', right: '28%',
              background: 'rgba(139,92,246,0.07)',
              border: '1px solid rgba(139,92,246,0.20)',
            }}
          />
          <motion.div
            style={{
              position: 'absolute', width: 8, height: 8,
              borderRadius: '50%', top: '45%', right: '12%',
              background: '#38bdf8',
              boxShadow: '0 0 16px rgba(56,189,248,0.8)',
            }}
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute', width: 5, height: 5,
              borderRadius: '50%', top: '25%', right: '35%',
              background: '#a78bfa',
              boxShadow: '0 0 12px rgba(167,139,250,0.8)',
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.6, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
        </div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full py-24">
          <motion.div
            className="max-w-3xl"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Availability badge */}
            <motion.div variants={item} className="mb-7">
              <span
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(14,165,233,0.07)',
                  border: '1px solid rgba(14,165,233,0.18)',
                  color: '#7dd3fc',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl font-extrabold mb-5 leading-[1.05]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="gradient-text">{portfolio?.name || 'Your Name'}</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={item}
              className="text-2xl md:text-3xl font-light mb-6 leading-snug"
              style={{ color: 'rgba(209,213,219,0.82)' }}
            >
              {portfolio?.title || 'Software Engineer & Designer'}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-base md:text-lg mb-11 max-w-2xl leading-relaxed"
              style={{ color: 'rgba(156,163,175,0.78)' }}
            >
              {portfolio?.bio || 'Building beautiful, functional digital experiences that make a difference.'}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4 mb-14">
              <motion.button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <i className="fas fa-arrow-down mr-2" />Explore My Work
              </motion.button>
              {portfolio?.resume && (
                <motion.a
                  href={portfolio.resume}
                  className="btn-secondary"
                  download
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <i className="fas fa-download mr-2" />Download Resume
                </motion.a>
              )}
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border:     '1px solid rgba(255,255,255,0.08)',
                    color:      '#6b7280',
                  }}
                  whileHover={{
                    scale:       1.18,
                    rotate:      8,
                    background: 'rgba(14,165,233,0.12)',
                    borderColor: 'rgba(14,165,233,0.26)',
                    color:       '#38bdf8',
                    boxShadow:  '0 8px 24px rgba(14,165,233,0.22)',
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={`fab fa-${s.icon}`} />
                </motion.a>
              ))}
            </motion.div>

            {/* Quick stats */}
            {(projects.length > 0 || skills.length > 0) && (
              <motion.div
                variants={item}
                className="mt-16 flex gap-8"
              >
                {[
                  { label: 'Projects',  value: `${projects.length}+` },
                  { label: 'Skills',    value: `${skills.length}+`   },
                  { label: 'Years Exp', value: '3+'                  },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-2xl font-bold gradient-text"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.18em] text-gray-600">Scroll</span>
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center p-1"
            style={{ border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <motion.div
              className="w-1.5 h-3 rounded-full"
              style={{ background: 'linear-gradient(180deg,#38bdf8,#8b5cf6)' }}
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED PROJECTS ──────────────────────────────────────── */}
      <section className="py-28 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%,rgba(139,92,246,0.05) 0%,transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="mb-16"
          >
            <span className="section-label">Work</span>
            <h2
              className="text-4xl md:text-5xl font-bold gradient-text mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Featured Projects
            </h2>
            <p className="text-gray-500 max-w-md text-sm">
              A curated selection of my most impactful and creative work.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="group rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.018) 100%)',
                  border:     '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(14px)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{
                  y:           -7,
                  borderColor: 'rgba(14,165,233,0.22)',
                  boxShadow:   '0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(14,165,233,0.10)',
                }}
              >
                <div className="p-6">
                  {/* Icon */}
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-base"
                    style={{ background: 'rgba(14,165,233,0.10)', color: '#38bdf8' }}
                    whileHover={{ rotate: 8, scale: 1.1 }}
                  >
                    <i className="fas fa-code" />
                  </motion.div>

                  <h3 className="text-base font-semibold mb-2 text-white group-hover:text-sky-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-2">
                    {project.short_description}
                  </p>

                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group/link"
                      style={{ color: '#38bdf8' }}
                    >
                      View Project
                      <motion.i
                        className="fas fa-arrow-right text-xs"
                        animate={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
