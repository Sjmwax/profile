import React from 'react';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="card group cursor-pointer"
      whileHover={{ y: -5, boxShadow: '0 20px 25px rgba(14, 165, 233, 0.2)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="overflow-hidden rounded-lg h-48 mb-4">
        <motion.img 
          src={project.image || '/placeholder.jpg'}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-smooth">
        {project.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4">{project.short_description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies_list?.map((tech) => (
          <span 
            key={tech}
            className="text-xs bg-primary-600/20 text-primary-300 px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3">
        {project.github_link && (
          <a 
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            <i className="fab fa-github mr-2"></i>Code
          </a>
        )}
        {project.live_link && (
          <a 
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            <i className="fas fa-external-link-alt mr-2"></i>Live
          </a>
        )}
      </div>
    </motion.div>
  );
};

export const SkillBar = ({ skill }) => {
  return (
    <motion.div 
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          {skill.icon && <i className={`${skill.icon} mr-2`}></i>}
          {skill.name}
        </span>
        <span className="text-xs text-primary-400">{skill.proficiency}%</span>
      </div>
      
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

export const ExperienceCard = ({ experience }) => {
  return (
    <motion.div 
      className="card border-l-4 border-primary-500"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold">{experience.position}</h3>
          <p className="text-primary-400">{experience.company}</p>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(experience.start_date).getFullYear()} - {experience.current ? 'Present' : new Date(experience.end_date).getFullYear()}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{experience.description}</p>
    </motion.div>
  );
};

export const EducationCard = ({ education }) => {
  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-lg font-semibold mb-1">{education.degree}</h3>
      <p className="text-primary-400 mb-1">{education.institution}</p>
      <p className="text-gray-400 text-sm mb-3">{education.field}</p>
      <p className="text-xs text-gray-500">
        {new Date(education.start_date).getFullYear()} - {education.end_date ? new Date(education.end_date).getFullYear() : 'Present'}
      </p>
      {education.description && (
        <p className="text-sm text-gray-400 mt-3">{education.description}</p>
      )}
    </motion.div>
  );
};
