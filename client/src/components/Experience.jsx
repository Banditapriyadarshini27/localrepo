import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Experience = () => {
  const sectionRef = useRef(null);
  useIntersectionObserver(sectionRef);

  const items = [
    {
      date: 'ongoing',
      title: 'Technical Team Member',
      org: 'SheCodesAI',
      desc: [
        'Collaborated cross-functionally on AI solution architectures and technical systems documentation.',
        'Led front-end interface development and refined responsive UI/UX across project workflows.'
      ]
    },
    {
      date: '2026',
      title: 'Participant & Prototype Developer',
      org: 'Smart India Hackathon',
      desc: [
        'Cleared the institutional round at OUTR with a high-performance agricultural voice application.',
        'Collaborated in a fast-paced development sprint to bridge backend database pipelines with design layouts.'
      ]
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="reveal-el">
      <span className="section-tag">experience</span>
      <h2 className="section-title">Professional Involvement</h2>
      <div className="timeline">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="timeline-item reveal-child"
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            <span className="timeline-date">{item.date}</span>
            <h3 className="timeline-title">{item.title}</h3>
            <div className="timeline-org">{item.org}</div>
            <ul className="timeline-desc">
              {item.desc.map((bullet, bulletIdx) => (
                <li key={bulletIdx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
