import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Education = () => {
  const sectionRef = useRef(null);
  useIntersectionObserver(sectionRef);

  const items = [
    {
      date: '2023 — present',
      title: 'B.Tech in Computer Science & Engineering',
      org: 'Odisha University of Technology and Research (OUTR)',
      desc: [
        'Relevant coursework: Data Structures & Algorithms, Object-Oriented Programming (Java/C++), DBMS, Computer Organization.',
        'Maintained excellent standings in core engineering subjects.'
      ]
    },
    {
      date: '2026',
      title: 'Generative AI Intensive Course',
      org: 'Google & Kaggle',
      desc: [
        'Focused on large language model applications, multi-agent frameworks, prompt engineering, and semantic systems.',
        'Designed and coded a four-agent secure interface Capstone project.'
      ]
    }
  ];

  return (
    <section id="education" ref={sectionRef} className="reveal-el">
      <span className="section-tag">education</span>
      <h2 className="section-title">Academic Background</h2>
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

export default Education;
