import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import { SkillBar, ExperienceCard, EducationCard } from '../components/Cards';

export const AboutPage = () => {
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [skillsRes, expRes, eduRes] = await Promise.all([
        portfolioAPI.getSkills(),
        portfolioAPI.getExperience(),
        portfolioAPI.getEducation()
      ]);

      setSkills(skillsRes.data);
      setExperience(expRes.data);
      setEducation(eduRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="pt-20">
      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.h2 
            className="text-4xl font-bold mb-12 gradient-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          {/* Skills Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-8">Technical Skills</h3>
              {skills.filter(s => s.category === 'frontend').map(skill => (
                <SkillBar key={skill.id} skill={skill} />
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-8">Backend & Tools</h3>
              {skills.filter(s => s.category === 'backend').map(skill => (
                <SkillBar key={skill.id} skill={skill} />
              ))}
            </motion.div>
          </div>

          {/* Experience */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-8">Experience</h3>
            <div className="space-y-6 mb-16">
              {experience.map(exp => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-8">Education</h3>
            <div className="grid md:grid-cols-2 gap-6">
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
