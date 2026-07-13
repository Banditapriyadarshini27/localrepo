import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Achievements = () => {
  const sectionRef = useRef(null);
  useIntersectionObserver(sectionRef);

  const achievements = [
    'Institutional Winner, Academic Excellence Award',
    'Cleared the institutional round of Smart India Hackathon at OUTR',
    'Developed voice systems bridging technology language barriers in rural farming areas',
    'Maintained exceptional subject records across CSE Spring 2026 sessions'
  ];

  return (
    <section id="achievements" ref={sectionRef} className="reveal-el">
      <span className="section-tag">achievements</span>
      <h2 className="section-title">Notable Entries</h2>
      <div className="badges">
        {achievements.map((item, idx) => (
          <div 
            key={idx} 
            className="badge reveal-child"
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            <span className="mark">✓</span>
            <div className="badge-text">{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
