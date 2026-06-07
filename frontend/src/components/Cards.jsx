import React from 'react';
import { motion } from 'framer-motion';

/* ── Project Card ─────────────────────────────────────────────────── */
export const ProjectCard = ({ project }) => (
  <motion.div
    className="group cursor-pointer rounded-2xl overflow-hidden h-full flex flex-col"
    style={{
      background:    'linear-gradient(135deg,rgba(255,255,255,0.052) 0%,rgba(255,255,255,0.016) 100%)',
      border:        '1px solid rgba(255,255,255,0.075)',
      backdropFilter:'blur(18px)',
      WebkitBackdropFilter:'blur(18px)',
    }}
    whileHover={{
      y:           -7,
      borderColor: 'rgba(14,165,233,0.26)',
      boxShadow:   '0 24px 64px rgba(0,0,0,0.50), 0 0 0 1px rgba(14,165,233,0.12), inset 0 1px 0 rgba(255,255,255,0.09)',
    }}
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55 }}
  >
    {/* Image */}
    <div className="relative overflow-hidden h-48 flex-shrink-0">
      <motion.img
        src={project.image || '/placeholder.jpg'}
        alt={project.title}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.09 }}
        transition={{ duration: 0.55 }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,transparent 30%,rgba(7,11,20,0.75) 100%)' }}
      />
      {/* Category pill */}
      {project.category && (
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium"
          style={{
            background:    'rgba(7,11,20,0.72)',
            backdropFilter:'blur(8px)',
            border:        '1px solid rgba(255,255,255,0.10)',
            color:         '#7dd3fc',
          }}
        >
          {project.category}
        </div>
      )}
      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-medium"
          style={{
            background:    'rgba(14,165,233,0.16)',
            backdropFilter:'blur(8px)',
            border:        '1px solid rgba(14,165,233,0.22)',
            color:         '#38bdf8',
          }}
        >
          ★ Featured
        </div>
      )}
    </div>

    {/* Body */}
    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-base font-semibold mb-2 text-white group-hover:text-sky-400 transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
        {project.short_description}
      </p>

      {/* Tech badges */}
      {project.technologies_list?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies_list.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
          {project.technologies_list.length > 4 && (
            <span className="text-xs text-gray-700">+{project.technologies_list.length - 4}</span>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2.5 mt-auto">
        {project.github_link && (
          <motion.a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border:     '1px solid rgba(255,255,255,0.09)',
              color:      '#9ca3af',
            }}
            whileHover={{
              background: 'rgba(255,255,255,0.10)',
              color:      '#e5e7eb',
            }}
          >
            <i className="fab fa-github text-sm" /> Code
          </motion.a>
        )}
        {project.live_link && (
          <motion.a
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: 'rgba(14,165,233,0.10)',
              border:     '1px solid rgba(14,165,233,0.20)',
              color:      '#38bdf8',
            }}
            whileHover={{
              background: 'rgba(14,165,233,0.20)',
              boxShadow:  '0 4px 16px rgba(14,165,233,0.22)',
            }}
          >
            <i className="fas fa-external-link-alt text-xs" /> Live
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
);

/* ── Skill Bar ───────────────────────────────────────────────────── */
export const SkillBar = ({ skill }) => (
  <motion.div
    className="mb-5"
    initial={{ opacity: 0, x: -18 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
        {skill.icon && (
          <i className={`${skill.icon} text-sky-400 text-xs w-4`} />
        )}
        {skill.name}
      </span>
      <span
        className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: 'rgba(14,165,233,0.10)',
          border:     '1px solid rgba(14,165,233,0.16)',
          color:      '#38bdf8',
        }}
      >
        {skill.proficiency}%
      </span>
    </div>

    {/* Track */}
    <div
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      {/* Fill with shimmer */}
      <motion.div
        className="h-full rounded-full relative overflow-hidden"
        style={{ background: 'linear-gradient(90deg,#0ea5e9,#8b5cf6,#c084fc)' }}
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.proficiency}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.25, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:     'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.32) 50%,transparent 100%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% center', '-200% center'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 1.2 }}
        />
      </motion.div>
    </div>
  </motion.div>
);

/* ── Experience Card (timeline style) ───────────────────────────── */
export const ExperienceCard = ({ experience }) => (
  <motion.div
    className="relative pl-7 pb-8 last:pb-0"
    initial={{ opacity: 0, x: -18 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Timeline line */}
    <div
      className="absolute left-0 top-2.5 bottom-0 w-px"
      style={{
        background: 'linear-gradient(180deg,rgba(14,165,233,0.55),rgba(139,92,246,0.18),transparent)',
      }}
    />
    {/* Glowing dot */}
    <motion.div
      className="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full -translate-x-[4px]"
      style={{
        background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)',
        boxShadow:  '0 0 10px rgba(14,165,233,0.65)',
      }}
      whileInView={{
        boxShadow: ['0 0 10px rgba(14,165,233,0.65)', '0 0 20px rgba(14,165,233,0.90)', '0 0 10px rgba(14,165,233,0.65)'],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Card */}
    <div
      className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'linear-gradient(135deg,rgba(255,255,255,0.042) 0%,rgba(255,255,255,0.012) 100%)',
        border:     '1px solid rgba(255,255,255,0.065)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
        <div>
          <h3 className="text-sm font-semibold text-white">{experience.position}</h3>
          <p className="text-sm font-medium mt-0.5" style={{ color: '#38bdf8' }}>{experience.company}</p>
        </div>
        <span
          className="text-[11px] px-3 py-1 rounded-full flex-shrink-0"
          style={{
            background: 'rgba(14,165,233,0.08)',
            border:     '1px solid rgba(14,165,233,0.12)',
            color:      '#7dd3fc',
          }}
        >
          {new Date(experience.start_date).getFullYear()} —{' '}
          {experience.current ? 'Present' : new Date(experience.end_date).getFullYear()}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{experience.description}</p>
    </div>
  </motion.div>
);

/* ── Education Card ──────────────────────────────────────────────── */
export const EducationCard = ({ education }) => (
  <motion.div
    className="rounded-2xl p-5 transition-all duration-300 group"
    style={{
      background: 'linear-gradient(135deg,rgba(139,92,246,0.06) 0%,rgba(255,255,255,0.018) 100%)',
      border:     '1px solid rgba(139,92,246,0.10)',
      backdropFilter: 'blur(14px)',
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55 }}
    whileHover={{
      borderColor: 'rgba(139,92,246,0.28)',
      boxShadow:   '0 12px 40px rgba(0,0,0,0.32), 0 0 0 1px rgba(139,92,246,0.10)',
      y:           -4,
    }}
  >
    {/* Icon */}
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
      style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}
    >
      <i className="fas fa-graduation-cap" />
    </div>

    <h3 className="text-sm font-semibold mb-1 text-white">{education.degree}</h3>
    <p className="text-sm font-medium mb-1" style={{ color: '#a78bfa' }}>{education.institution}</p>
    <p className="text-xs text-gray-600 mb-2">{education.field}</p>
    <p className="text-[11px]" style={{ color: 'rgba(107,114,128,0.65)' }}>
      {new Date(education.start_date).getFullYear()} —{' '}
      {education.end_date ? new Date(education.end_date).getFullYear() : 'Present'}
    </p>

    {education.description && (
      <p
        className="text-xs text-gray-600 mt-3 pt-3 leading-relaxed"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {education.description}
      </p>
    )}
  </motion.div>
);
