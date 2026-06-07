import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import { SkillBar, ExperienceCard, EducationCard } from '../components/Cards';

export const AboutPage = () => {
  const [skills,     setSkills]     = useState([]);
  const [experience, setExperience] = useState([]);
  const [education,  setEducation]  = useState([]);

  useEffect(() => {
    Promise.all([
      portfolioAPI.getSkills(),
      portfolioAPI.getExperience(),
      portfolioAPI.getEducation(),
    ])
      .then(([skRes, expRes, eduRes]) => {
        setSkills(skRes.data);
        setExperience(expRes.data);
        setEducation(eduRes.data);
      })
      .catch(() => {});
  }, []);

  const skillSection = (label, category, iconClass, iconColor, iconBg) => (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(255,255,255,0.022)',
        border:     '1px solid rgba(255,255,255,0.062)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <h3 className="text-base font-semibold mb-6 flex items-center gap-3">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ background: iconBg, color: iconColor }}
        >
          <i className={iconClass} />
        </span>
        <span className="text-white">{label}</span>
      </h3>
      {skills.filter(s => s.category === category).map(skill => (
        <SkillBar key={skill.id} skill={skill} />
      ))}
    </motion.div>
  );

  return (
    <div className="pt-20">
      <section id="about" className="min-h-screen py-24 relative">
        {/* Background radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 85% 50%,rgba(14,165,233,0.05) 0%,transparent 60%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="mb-16"
          >
            <span className="section-label">About</span>
            <h2
              className="text-4xl md:text-5xl font-bold gradient-text mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              About Me
            </h2>
            <p className="text-gray-500 text-sm max-w-md">
              My skills, experience, and educational journey.
            </p>
          </motion.div>

          {/* ── Skills ── */}
          <div className="grid md:grid-cols-2 gap-6 mb-24">
            {skillSection('Frontend', 'frontend', 'fas fa-laptop-code', '#38bdf8', 'rgba(14,165,233,0.10)')}
            {skillSection('Backend & Tools', 'backend', 'fas fa-server', '#a78bfa', 'rgba(139,92,246,0.10)')}
          </div>

          {/* ── Experience ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <span className="section-label">Career</span>
            <h3
              className="text-2xl font-bold text-white mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Experience
            </h3>
            <div className="max-w-2xl">
              {experience.map(exp => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </motion.div>

          {/* ── Education ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Academic</span>
            <h3
              className="text-2xl font-bold text-white mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Education
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              {education.map(edu => (
                <EducationCard key={edu.id} education={edu} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
