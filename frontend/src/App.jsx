import React, { useState } from 'react';
import { Header, Footer } from './components/Layout';
import { HomePage }    from './pages/HomePage';
import { AboutPage }   from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import './styles/globals.css';

/* ── Ambient animated background orbs ───────────────────────────── */
/* Skill rule: animate max 1-2 key elements per view — reduced to 2 static-ish orbs */
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Blue orb — top-left (slow drift) */}
    <div
      className="absolute animate-orb-1"
      style={{
        width: '650px', height: '650px',
        top: '-12%', left: '-10%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 68%)',
        filter: 'blur(52px)',
      }}
    />
    {/* Violet orb — bottom-right (slow drift, opposite phase) */}
    <div
      className="absolute animate-orb-2"
      style={{
        width: '550px', height: '550px',
        bottom: '0%', right: '-6%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 68%)',
        filter: 'blur(56px)',
      }}
    />

    {/* Subtle noise texture */}
    <div
      className="absolute inset-0 noise-overlay opacity-10"
      style={{ backgroundSize: '180px' }}
    />
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ background: '#070b14' }} className="min-h-screen relative">
      <AmbientBackground />

      <div className="relative z-10">
        <Header isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

        <main>
          <HomePage />
          <div className="section-divider" />
          <AboutPage />
          <div className="section-divider" />
          <ProjectsPage />
          <div className="section-divider" />
          <ContactPage />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
