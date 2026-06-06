import React from 'react';
import { motion } from 'framer-motion';

export const Header = ({ isMenuOpen, toggleMenu }) => {
  return (
    <motion.header 
      className="fixed top-0 w-full bg-dark-900/95 backdrop-blur-md border-b border-white/10 z-50"
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
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-primary-400 transition-smooth"
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-white"
        >
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'} text-xl`}></i>
        </button>
      </nav>
    </motion.header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <div className="flex gap-4">
            {[
              { icon: 'github', href: '#' },
              { icon: 'linkedin', href: '#' },
              { icon: 'twitter', href: '#' }
            ].map((social) => (
              <motion.a 
                key={social.icon}
                href={social.href}
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
