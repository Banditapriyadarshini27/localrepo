import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ProjectVisual = ({ id }) => {
  if (id === 'agent-passport-zsp') {
    return (
      <svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: '180px' }}>
        <path d="M40,60 L100,25 L160,60 L100,95 Z" stroke="var(--indigo)" strokeWidth="1" strokeDasharray="3,3" fill="none" opacity="0.4"/>
        <line x1="40" y1="60" x2="160" y2="60" stroke="var(--indigo)" strokeWidth="1" opacity="0.2"/>
        <line x1="100" y1="25" x2="100" y2="95" stroke="var(--indigo)" strokeWidth="1" opacity="0.2"/>
        <circle cx="100" cy="25" r="6" fill="var(--bg)" stroke="var(--indigo)" strokeWidth="2"/>
        <circle cx="40" cy="60" r="6" fill="var(--bg)" stroke="var(--indigo)" strokeWidth="2"/>
        <circle cx="160" cy="60" r="6" fill="var(--bg)" stroke="var(--indigo)" stroke-width="2"/>
        <circle cx="100" cy="95" r="6" fill="var(--bg)" stroke="var(--indigo)" stroke-width="2"/>
        <circle cx="100" cy="25" r="12" fill="none" stroke="var(--indigo)" strokeWidth="1" opacity="0.15"/>
        <circle cx="40" cy="60" r="12" fill="none" stroke="var(--indigo)" strokeWidth="1" opacity="0.15"/>
        <circle cx="160" cy="60" r="12" fill="none" stroke="var(--indigo)" strokeWidth="1" opacity="0.15"/>
        <circle cx="100" cy="95" r="12" fill="none" stroke="var(--indigo)" strokeWidth="1" opacity="0.15"/>
      </svg>
    );
  }
  if (id === 'khetibadimitra') {
    return (
      <svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: '180px' }}>
        <circle cx="100" cy="60" r="32" stroke="var(--indigo)" strokeWidth="1" fill="none" opacity="0.2"/>
        <ellipse cx="100" cy="60" rx="32" ry="10" stroke="var(--indigo)" strokeWidth="1" fill="none" opacity="0.3"/>
        <ellipse cx="100" cy="60" rx="14" ry="32" stroke="var(--indigo)" strokeWidth="1" fill="none" opacity="0.3"/>
        <path d="M120,40 L150,40 A4,4 0 0,1 154,44 L154,64 A4,4 0 0,1 150,68 L135,68 L126,77 L126,68 A4,4 0 0,1 120,64 Z" fill="var(--surface-2)" stroke="var(--indigo)" strokeWidth="1.5"/>
        <line x1="128" y1="49" x2="146" y2="49" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="128" y1="57" x2="139" y2="57" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (id === 'weather-pulse') {
    return (
      <svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: '180px' }}>
        <circle cx="85" cy="50" r="20" fill="none" stroke="var(--indigo)" strokeWidth="1.5"/>
        <circle cx="85" cy="50" r="14" fill="none" stroke="var(--indigo)" strokeWidth="1" opacity="0.2"/>
        <line x1="85" y1="20" x2="85" y2="25" stroke="var(--indigo)" strokeWidth="1.5"/>
        <line x1="85" y1="75" x2="85" y2="80" stroke="var(--indigo)" strokeWidth="1.5"/>
        <line x1="55" y1="50" x2="60" y2="50" stroke="var(--indigo)" strokeWidth="1.5"/>
        <line x1="110" y1="50" x2="115" y2="50" stroke="var(--indigo)" strokeWidth="1.5"/>
        <path d="M100,70 L135,70 A12,12 0 0,0 135,46 A15,15 0 0,0 109,42 A14,14 0 0,0 96,56 A12,12 0 0,0 100,70 Z" fill="var(--surface-2)" stroke="var(--indigo)" strokeWidth="1.5" opacity="0.85"/>
      </svg>
    );
  }
  if (id === 'substation-anomaly-detector') {
    return (
      <svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: '180px' }}>
        <line x1="30" y1="60" x2="170" y2="60" stroke="var(--border-strong)" strokeWidth="1"/>
        <line x1="30" y1="30" x2="170" y2="30" stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="30" y1="90" x2="170" y2="90" stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4"/>
        <path d="M30,60 Q50,30 70,60 T110,60 L120,20 L130,100 L140,60 T170,60" fill="none" stroke="var(--indigo)" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="125" cy="60" r="14" fill="none" stroke="var(--indigo)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
        <circle cx="125" cy="60" r="4" fill="var(--indigo)"/>
      </svg>
    );
  }
  return null;
};

const ProjectRow = ({ project, index, isFiltered }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isFiltered) {
      setIsExpanded(false);
    }
  }, [isFiltered]);

  const toggleCaseStudy = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`project-row reveal-child ${isFiltered ? 'hidden-filter' : ''}`}
      data-status={project.status}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="project-visual" aria-hidden="true">
        <ProjectVisual id={project.id} />
      </div>
      <div className="project-info">
        <div className="project-header">
          <h3 className="project-name">{project.name}</h3>
          <div className="project-status-marker" data-status={project.status}>
            <span className="status-dot"></span>
            <span className="status-label">{project.status}</span>
          </div>
        </div>
        <span className="project-tagline">{project.tagline}</span>
        <p className="project-desc">{project.description}</p>
        
        {project.hasCaseStudy && (
          <div className="case-study-toggle-wrapper">
            <button 
              className={`case-study-btn ${isExpanded ? 'open' : ''}`}
              aria-expanded={isExpanded} 
              onClick={toggleCaseStudy}
              tabIndex={0}
            >
              View Case Study <span className="chevron">▼</span>
            </button>
            <div 
              className={`case-study-content ${isExpanded ? 'open' : ''}`}
              ref={contentRef}
              style={{ maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px' }}
            >
              <div className="case-study-inner">
                <div className="cs-field">
                  <span className="cs-label">Problem</span>
                  <span className="cs-val">{project.caseStudy?.problem}</span>
                </div>
                <div className="cs-field">
                  <span className="cs-label">Tradeoffs</span>
                  <span className="cs-val">{project.caseStudy?.tradeoffs}</span>
                </div>
                <div className="cs-field">
                  <span className="cs-label">Approach</span>
                  <span className="cs-val">{project.caseStudy?.approach}</span>
                </div>
                <div className="cs-field">
                  <span className="cs-label">Result</span>
                  <span className="cs-val">{project.caseStudy?.result}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="stack-row">
          {project.stack.map(tech => <span key={tech}>{tech}</span>)}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  useIntersectionObserver(sectionRef);

  useEffect(() => {
    // Fetch projects from express backend endpoint
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch project listings');
        }
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error('Projects load error:', err);
        setError(err.message);
      });
  }, []);

  const filters = ['all', 'live', 'research'];
  const filteredCount = projects.filter(p => activeFilter === 'all' || p.status === activeFilter).length;

  return (
    <section id="projects" ref={sectionRef} className="reveal-el">
      <span className="section-tag">projects</span>
      <h2 className="section-title">Featured Applications &amp; Research</h2>
      
      <div className="project-filter-bar">
        {filters.map(filter => (
          <button 
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
            tabIndex={0}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)} Projects
          </button>
        ))}
      </div>

      <div className="projects-list">
        {error && (
          <div style={{ color: 'red', fontFamily: 'var(--mono)', padding: '20px 0' }}>
            Error loading projects: {error}
          </div>
        )}

        {projects.map((project, idx) => {
          const isFiltered = activeFilter !== 'all' && project.status !== activeFilter;
          return (
            <ProjectRow 
              key={project.id}
              project={project}
              index={idx}
              isFiltered={isFiltered}
            />
          );
        })}

        {filteredCount === 0 && !error && projects.length > 0 && (
          <div 
            id="noProjectsMessage"
            style={{
              textAlign: 'center',
              color: 'var(--text-faint)',
              fontFamily: 'var(--mono)',
              padding: '48px 0',
              fontSize: '13.5px'
            }}
          >
            Nothing matches that filter yet — like most good projects at some point.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
