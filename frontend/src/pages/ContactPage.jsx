import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState(null);

  React.useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await portfolioAPI.getPortfolio();
        setPortfolio(res.data[0] || {});
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    fetchPortfolio();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await portfolioAPI.sendMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.h2 
          className="text-4xl font-bold mb-12 gradient-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-smooth"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-smooth"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-smooth"
                placeholder="Subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-smooth resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <motion.button 
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>

            {status === 'success' && (
              <motion.p 
                className="text-green-400 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Message sent successfully!
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p 
                className="text-red-400 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Error sending message. Please try again.
              </motion.p>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <i className="fas fa-envelope text-3xl text-primary-400 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-400">{portfolio?.email || 'your.email@example.com'}</p>
            </div>

            <div className="card">
              <i className="fas fa-phone text-3xl text-primary-400 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-400">{portfolio?.phone || '+1 (555) 123-4567'}</p>
            </div>

            <div className="card">
              <i className="fas fa-map-marker-alt text-3xl text-primary-400 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-400">{portfolio?.location || 'Your City, Country'}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
