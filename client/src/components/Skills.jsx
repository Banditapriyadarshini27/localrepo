import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Skills = () => {
  const sectionRef = useRef(null);
  useIntersectionObserver(sectionRef);

  const categories = [
    {
      title: 'Languages',
      skills: ['C', 'C++', 'Java', 'JavaScript', 'SQL']
    },
    {
      title: 'Frameworks & Tools',
      skills: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'WebSocket', 'Git']
    },
    {
      title: 'AI & Security',
      skills: ['Generative AI', 'Multi-Agent Systems', 'OT Security', 'Zero Standing Privilege']
    },
    {
      title: 'Design',
      skills: ['UI/UX Design']
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="reveal-el">
      <span className="section-tag">technical skills</span>
      <h2 className="section-title">My Development Stack</h2>
      <div className="skills-grid">
        {categories.map((cat, groupIdx) => (
          <div 
            key={cat.title} 
            className="skill-group reveal-child"
            style={{ transitionDelay: `${groupIdx * 80}ms` }}
          >
            <h3>
              <svg className="hex-bullet" width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="5,0.5 9,2.5 9,7.5 5,9.5 1,7.5 1,2.5"/>
              </svg>
              {cat.title}
            </h3>
            <div className="chips">
              {cat.skills.map((skill, chipIdx) => (
                <span 
                  key={skill} 
                  className="chip reveal-child"
                  style={{ transitionDelay: `${chipIdx * 80}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
