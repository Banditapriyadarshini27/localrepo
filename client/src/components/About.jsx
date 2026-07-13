import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About = () => {
  const sectionRef = useRef(null);
  useIntersectionObserver(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="reveal-el">
      <span className="section-tag">about me</span>
      <h2 className="section-title">Background &amp; Ambitions</h2>
      <div className="about-grid">
        <div className="about-left">
          <p className="reveal-child" style={{ transitionDelay: '0ms' }}>
            I am a 3rd-year Computer Science &amp; Engineering undergraduate student at Odisha University of Technology and Research (OUTR). 
            My development journey is focused on creating responsive, intuitive front-ends combined with secure and efficient backend architectures.
          </p>
          <p className="reveal-child" style={{ transitionDelay: '80ms' }}>
            Recently, I completed the Google &amp; Kaggle 5-Day Generative AI Intensive Course. 
            This training expanded my background in multi-agent frameworks, prompt structures, and AI integrations, prompting me to work closely on how intelligence and secure web systems interface.
          </p>
        </div>
        <div className="about-card">
          <div className="about-card-stat reveal-child" style={{ transitionDelay: '80ms' }}>
            <span className="about-card-num">3rd</span>
            <span className="about-card-label">Year CSE Student</span>
          </div>
          <div className="about-card-stat reveal-child" style={{ transitionDelay: '160ms' }}>
            <span className="about-card-num">5+</span>
            <span className="about-card-label">Projects Built</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
