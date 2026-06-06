import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';

export const Header = ({ isMenuOpen, toggleMenu }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 w-full bg-dark-900/50 md:bg-dark-900/95 backdrop-blur-md border-b border-white/10 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          Portfolio
        </motion.div>
        
        <div className="hidden md:flex gap-8">
          {['Home', 'About', 'Projects', 'Contact'].map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            return (
              <motion.button 
                key={item}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`transition-smooth ${isActive ? 'text-primary-400 font-semibold' : 'text-gray-300 hover:text-primary-400'}`}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.button>
            );
          })}
        </div>

        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-white"
        >
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'} text-xl`}></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-dark-900/50 border-t border-white/10 px-4 py-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {['Home', 'About', 'Projects', 'Contact'].map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <motion.button 
                  key={item}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMenu(); // Close mobile menu first
                    // Scroll after a small delay to let the menu collapse start
                    setTimeout(() => {
                      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`block w-full text-left py-2 px-4 rounded-lg transition-smooth ${isActive ? 'text-primary-400 bg-white/5 font-semibold' : 'text-gray-300 hover:text-primary-400 hover:bg-white/5'}`}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export const Footer = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await portfolioAPI.getPortfolio();
        setPortfolio(res.data[0] || {});
      } catch (error) {
        console.error('Error fetching portfolio in Footer:', error);
      }
    };
    fetchPortfolio();
  }, []);

  const socialLinks = [];
  if (portfolio?.github) socialLinks.push({ icon: 'github', href: portfolio.github });
  if (portfolio?.linkedin) socialLinks.push({ icon: 'linkedin', href: portfolio.linkedin });
  if (portfolio?.twitter) socialLinks.push({ icon: 'twitter', href: portfolio.twitter });
  if (portfolio?.facebook) socialLinks.push({ icon: 'facebook-f', href: portfolio.facebook });
  if (portfolio?.whatsapp) socialLinks.push({ icon: 'whatsapp', href: portfolio.whatsapp });

  return (
    <footer className="bg-dark-900 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} {portfolio?.name || 'Portfolio'}. All rights reserved.</p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a 
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-smooth"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <i className={`fab fa-${social.icon}`}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
