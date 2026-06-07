import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';

/* ── Reusable glass input style ──────────────────────────────────── */
const baseInput = {
  width:         '100%',
  background:    'rgba(255,255,255,0.042)',
  border:        '1px solid rgba(255,255,255,0.085)',
  borderRadius:  '0.875rem',
  padding:       '0.75rem 1rem',
  color:         '#f3f4f6',
  fontSize:      '0.875rem',
  outline:       'none',
  transition:    'all 0.28s cubic-bezier(0.4,0,0.2,1)',
  backdropFilter:'blur(8px)',
};

const focusStyle = {
  border:     '1px solid rgba(14,165,233,0.42)',
  background: 'rgba(14,165,233,0.04)',
  boxShadow:  '0 0 0 3px rgba(14,165,233,0.07)',
};

const blurStyle = {
  border:     '1px solid rgba(255,255,255,0.085)',
  background: 'rgba(255,255,255,0.042)',
  boxShadow:  'none',
};

const GlassInput = ({ as: Tag = 'input', label, ...props }) => (
  <div>
    <label
      className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
      style={{ color: 'rgba(156,163,175,0.65)' }}
    >
      {label}
    </label>
    <Tag
      style={baseInput}
      onFocus={e => Object.assign(e.target.style, focusStyle)}
      onBlur={e  => Object.assign(e.target.style, blurStyle)}
      {...props}
    />
  </div>
);

/* ── Contact info item ───────────────────────────────────────────── */
const InfoCard = ({ icon, label, value, color, bg, delay }) => (
  <motion.div
    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
    style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.06)' }}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{
      background:  'rgba(255,255,255,0.038)',
      borderColor: color + '30',
      boxShadow:   `0 8px 28px rgba(0,0,0,0.22)`,
      y:           -2,
    }}
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: bg, color }}
    >
      <i className={`fas fa-${icon}`} />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(107,114,128,0.65)' }}>
        {label}
      </p>
      <p className="text-sm font-medium text-gray-200">{value}</p>
    </div>
  </motion.div>
);

/* ── Page ────────────────────────────────────────────────────────── */
export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status,   setStatus]   = useState('');
  const [loading,  setLoading]  = useState(false);
  const [portfolio, setPortfolio] = useState(null);

  React.useEffect(() => {
    portfolioAPI.getPortfolio()
      .then(res => setPortfolio(res.data[0] || {}))
      .catch(() => {});
  }, []);

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await portfolioAPI.sendMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(''), 6000);
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: 'envelope', label: 'Email',
      value: portfolio?.email    || 'your.email@example.com',
      color: '#38bdf8', bg: 'rgba(14,165,233,0.10)',
    },
    {
      icon: 'phone',    label: 'Phone',
      value: portfolio?.phone    || '+1 (555) 123-4567',
      color: '#a78bfa', bg: 'rgba(139,92,246,0.10)',
    },
    {
      icon: 'map-marker-alt', label: 'Location',
      value: portfolio?.location || 'Your City, Country',
      color: '#34d399', bg: 'rgba(52,211,153,0.10)',
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center py-24 relative">
      {/* Bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 75% 50%,rgba(14,165,233,0.05) 0%,transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <span className="section-label">Contact</span>
          <h2
            className="text-4xl md:text-5xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Get In Touch
          </h2>
          <p className="text-gray-500 text-sm max-w-md">
            Have a project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Form ── */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl p-7"
            style={{
              background:    'linear-gradient(135deg,rgba(255,255,255,0.042) 0%,rgba(255,255,255,0.012) 100%)',
              border:        '1px solid rgba(255,255,255,0.072)',
              backdropFilter:'blur(18px)',
              WebkitBackdropFilter:'blur(18px)',
            }}
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassInput
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
              <GlassInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <GlassInput
              label="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What's this about?"
            />

            <GlassInput
              as="textarea"
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Tell me about your project..."
              style={{ ...baseInput, resize: 'none' }}
            />

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <motion.i
                    className="fas fa-circle-notch mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  />
                  Sending…
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2" />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Status toast */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-xl text-sm"
                  style={{
                    background: 'rgba(52,211,153,0.09)',
                    border:     '1px solid rgba(52,211,153,0.20)',
                    color:      '#34d399',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{   opacity: 0, y:-8 }}
                >
                  <i className="fas fa-check-circle" />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-xl text-sm"
                  style={{
                    background: 'rgba(239,68,68,0.09)',
                    border:     '1px solid rgba(239,68,68,0.20)',
                    color:      '#f87171',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{   opacity: 0, y:-8 }}
                >
                  <i className="fas fa-exclamation-circle" />
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* ── Info panel ── */}
          <motion.div
            className="space-y-4 flex flex-col"
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Whether you have a project idea, want to collaborate, or just want to say hello —
              I'd love to hear from you. I typically respond within 24 hours.
            </p>

            {contactItems.map((item, i) => (
              <InfoCard key={item.label} {...item} delay={i * 0.1} />
            ))}

            {/* Availability card */}
            <motion.div
              className="p-5 rounded-2xl mt-2"
              style={{
                background: 'linear-gradient(135deg,rgba(14,165,233,0.06),rgba(139,92,246,0.06))',
                border:     '1px solid rgba(14,165,233,0.10)',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-gray-200">Currently available</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Open to freelance projects, full-time roles, and interesting collaborations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
