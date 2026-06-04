import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';

export const HomePage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [portfolioRes, projectsRes, skillsRes] = await Promise.all([
        portfolioAPI.getPortfolio(),
        portfolioAPI.getFeaturedProjects(),
        portfolioAPI.getSkills()
      ]);

      setPortfolio(portfolioRes.data[0] || {});
      setProjects(projectsRes.data);
      setSkills(skillsRes.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {portfolio?.name || 'Portfolio'}
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {portfolio?.title || 'Software Engineer & Designer'}
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-400 mb-8 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {portfolio?.bio || 'Building beautiful, functional digital experiences'}
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button className="btn-primary">
                <i className="fas fa-arrow-down mr-2"></i>Explore My Work
              </button>
              {portfolio?.resume && (
                <a href={portfolio.resume} className="btn-secondary" download>
                  <i className="fas fa-download mr-2"></i>Download Resume
                </a>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {portfolio?.github && (
                <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="group">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary-600 transition-smooth"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <i className="fab fa-github text-xl"></i>
                  </motion.div>
                </a>
              )}
              {portfolio?.linkedin && (
                <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="group">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary-600 transition-smooth"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <i className="fab fa-linkedin text-xl"></i>
                  </motion.div>
                </a>
              )}
              {portfolio?.twitter && (
                <a href={portfolio.twitter} target="_blank" rel="noopener noreferrer" className="group">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary-600 transition-smooth"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <i className="fab fa-twitter text-xl"></i>
                  </motion.div>
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="fas fa-chevron-down text-2xl text-primary-400"></i>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold mb-12 gradient-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.short_description}</p>
                {project.live_link && (
                  <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    View Project
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
