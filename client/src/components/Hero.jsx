import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const sheenRef = useRef(null);

  // 1. Hexagonal Background Grid Accent logic
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = heroRef.current;
    if (!hero) return;

    const gridContainer = document.createElement('div');
    gridContainer.className = 'hero-hex-grid';
    gridContainer.setAttribute('aria-hidden', 'true');
    hero.appendChild(gridContainer);

    const rows = 5;
    const cols = 9;
    const R = 36;
    const W = R * Math.sqrt(3);
    const colSpacing = W;
    const rowSpacing = R * 1.5;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    gridContainer.appendChild(svg);

    function getHexPoints(cx, cy, r) {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 30) * Math.PI / 180;
        points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
      }
      return points.join(' ');
    }

    const hexes = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * colSpacing + (r % 2 === 1 ? colSpacing / 2 : 0) + 40;
        const cy = r * rowSpacing + 40;

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', getHexPoints(cx, cy, R));
        polygon.setAttribute('class', 'hex-polygon');
        svg.appendChild(polygon);

        hexes.push({ el: polygon, cx, cy });
      }
    }

    if (reduce) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      hexes.forEach(hex => {
        const dx = mx - hex.cx;
        const dy = my - hex.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const factor = 1 - (dist / 150);
          hex.el.style.opacity = 0.15 + factor * 0.65;
          hex.el.style.stroke = 'var(--indigo)';
          hex.el.style.strokeWidth = 0.75 + factor * 1.0;
        } else {
          hex.el.style.opacity = '';
          hex.el.style.stroke = '';
          hex.el.style.strokeWidth = '';
        }
      });
    };

    const handleMouseLeave = () => {
      hexes.forEach(hex => {
        hex.el.style.opacity = '';
        hex.el.style.stroke = '';
        hex.el.style.strokeWidth = '';
      });
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      gridContainer.remove();
    };
  }, []);

  // 2. 3D Card Tilt & Sheen reflection effect logic
  useEffect(() => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!card || !sheen || reduce) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const rotateX = -(y - yc) / (rect.height / 2) * 8;
      const rotateY = (x - xc) / (rect.width / 2) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      sheen.style.background = `radial-gradient(circle 120px at ${px}% ${py}%, rgba(255, 255, 255, 0.08), transparent 80%)`;
      sheen.style.opacity = '1';

      const shadowX = -(x - xc) / 8;
      const shadowY = -(y - yc) / 8;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 35px -12px rgba(0,0,0,0.6), 0 30px 60px -30px rgba(0,0,0,0.5)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.boxShadow = '';
      sheen.style.opacity = '0';
      sheen.style.transition = 'opacity 0.5s ease, background 0.5s ease';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    const handleMouseEnter = () => {
      sheen.style.transition = 'none';
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} style={{ borderTop: 'none' }}>
      <div className="hero-grid">
        <div className="hero-left">
          <span className="tagline">Welcome to my space</span>
          <h1>Bandita Priyadarshini</h1>
          <div className="role">Computer Science Student &amp; Software Developer</div>
          <p className="lede">
            3rd-year CSE undergrad at Odisha University of Technology and Research (OUTR). 
            Focused on building clean front-ends, structured backends, and exploring security integrations and applied AI models.
          </p>
          
          <div className="currently-exploring">
            <span className="exploring-label">Status</span>
            <span className="exploring-text">Currently exploring AI agent security architectures &amp; OT infrastructure protection.</span>
          </div>

          <div className="hero-actions">
            <a className="btn primary" href="#contact">
              <span>Get in Touch</span> ↳
            </a>
            <div className="social-links">
              <a className="social-icon" href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a className="social-icon" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="code-window" ref={cardRef} aria-hidden="true">
            <div className="code-header">
              <div className="code-dots">
                <span className="code-dot red"></span>
                <span className="code-dot yellow"></span>
                <span className="code-dot green"></span>
              </div>
              <span className="code-title">developer.json</span>
            </div>
            <div className="code-content">
              <span className="token-bracket">{'{'}</span><br />
              <span className="token-indent"></span><span class="token-key">"name"</span>: <span className="token-string">"Bandita"</span>,<br />
              <span className="token-indent"></span><span class="token-key">"role"</span>: <span className="token-string">"CSE Student"</span>,<br />
              <span className="token-indent"></span><span class="token-key">"academic_year"</span>: <span className="token-number">3</span>,<br />
              <span className="token-indent"></span><span class="token-key">"current_focus"</span>: <span className="token-bracket">[</span><br />
              <span className="token-indent"></span><span className="token-indent"></span><span className="token-string">"Full-Stack Dev"</span>,<br />
              <span className="token-indent"></span><span class="token-indent"></span><span className="token-string">"Applied AI"</span>,<br />
              <span className="token-indent"></span><span class="token-indent"></span><span className="token-string">"Systems Security"</span><br />
              <span className="token-indent"></span><span className="token-bracket">]</span>,<br />
              <span className="token-indent"></span><span class="token-key">"origin"</span>: <span className="token-string">"Odisha, India"</span><br />
              <span className="token-bracket">{'}'}</span>
            </div>
            <div className="card-sheen" ref={sheenRef}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
