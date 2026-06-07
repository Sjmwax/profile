import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import { ProjectCard } from '../components/Cards';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filter,   setFilter]   = useState('all');

  useEffect(() => {
    portfolioAPI.getProjects()
      .then(res => setProjects(res.data))
      .catch(() => {});
  }, []);

  const categories       = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="min-h-screen py-24 pt-40 relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 15% 55%,rgba(139,92,246,0.05) 0%,transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          <span className="section-label">Portfolio</span>
          <h2
            className="text-4xl md:text-5xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Projects
          </h2>
          <p className="text-gray-500 text-sm max-w-md">
            Explore my work across different domains and technologies.
          </p>
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map(cat => {
            const active = filter === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300"
                style={active ? {
                  background: 'linear-gradient(135deg,rgba(14,165,233,0.18),rgba(139,92,246,0.14))',
                  border:     '1px solid rgba(14,165,233,0.30)',
                  color:      '#38bdf8',
                  boxShadow:  '0 4px 16px rgba(14,165,233,0.14)',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  border:     '1px solid rgba(255,255,255,0.08)',
                  color:      '#6b7280',
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y:-10 }}
            transition={{ duration: 0.28 }}
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <i className="fas fa-folder-open text-gray-700 text-xl" />
            </div>
            <p className="text-gray-700 text-sm">No projects in this category yet.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
