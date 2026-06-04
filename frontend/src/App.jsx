import React, { useState } from 'react';
import { Header, Footer } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import './styles/globals.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-dark-900 min-h-screen">
      <Header isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      
      <main>
        <HomePage />
        <AboutPage />
        <ProjectsPage />
        <ContactPage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
