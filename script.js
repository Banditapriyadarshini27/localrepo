// Global Case Study Expand Toggle handler (needed by onclick attribute in projects.html)
function toggleCaseStudy(btn) {
  const content = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  if (isOpen) {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    content.classList.remove('open');
    content.style.maxHeight = '0px';
  } else {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    content.classList.add('open');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

// Master coordinator on page load
document.addEventListener("DOMContentLoaded", () => {
  const sectionFiles = [
    'sections/hero.html',
    'sections/about.html',
    'sections/skills.html',
    'sections/projects.html',
    'sections/experience.html',
    'sections/education.html',
    'sections/achievements.html',
    'sections/contact.html'
  ];

  // 1. Start loading screen compiler logs typing
  const typingPromise = startLoader();

  // 2. Fetch and inject sections in sequence
  const fetchPromise = loadSections(sectionFiles);

  // 3. Wait for both animation and fetches to resolve
  Promise.all([typingPromise, fetchPromise]).then(([isInstant]) => {
    // Actually reveal the #app container and remove the loader
    revealApp(isInstant);
    // Initialize interactive scripts now that DOM elements exist
    initializeBehaviors();
  });
});

// Loading screen compiler terminal log simulation
function startLoader() {
  return new Promise((resolve) => {
    const overlay = document.getElementById('loadingScreen');
    const body = document.getElementById('loadingBody');
    if (!overlay || !body) {
      resolve(true);
      return;
    }
    
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const lines = [
      { text: '> warning: ClassCastException: expected "senior engineer", found "3rd-year CSE student"', delayAfter: 80, class: 'warning-line' },
      { text: '> hot-fixing... patch applied: ambition += curiosity', delayAfter: 80, class: 'patch-line' },
      { text: '> compilation successful. launching...', delayAfter: 50 }
    ];
    
    let isDismissed = false;
    
    function dismiss(instant = false) {
      if (isDismissed) return;
      isDismissed = true;
      resolve(reduce || instant);
    }
    
    window.addEventListener('keydown', () => dismiss(false));
    overlay.addEventListener('click', () => dismiss(false));
    
    if (reduce) {
      dismiss(true);
      return;
    }
    
    let currentLineIndex = 0;
    
    function typeLine() {
      if (isDismissed) return;
      if (currentLineIndex >= lines.length) {
        setTimeout(() => dismiss(false), 200);
        return;
      }
      
      const lineData = lines[currentLineIndex];
      const p = document.createElement('p');
      p.className = 'log-line' + (lineData.class ? ' ' + lineData.class : '');
      body.appendChild(p);
      
      const cursor = document.createElement('span');
      cursor.className = 'log-cursor';
      p.appendChild(cursor);
      
      let charIndex = 0;
      const text = lineData.text;
      
      function typeChar() {
        if (isDismissed) return;
        if (charIndex < text.length) {
          cursor.before(text.charAt(charIndex));
          charIndex++;
          setTimeout(typeChar, 8);
        } else {
          cursor.remove();
          currentLineIndex++;
          setTimeout(typeLine, lineData.delayAfter);
        }
      }
      
      typeChar();
    }
    
    typeLine();
  });
}

// Fetch sections sequentially and inject into main container
async function loadSections(urls) {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;
  
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url} (status ${response.status})`);
      }
      const text = await response.text();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text.trim();
      
      while (tempDiv.firstChild) {
        appContainer.appendChild(tempDiv.firstChild);
      }
    } catch (err) {
      console.error(`Graceful load error: Could not fetch section from ${url}`, err);
    }
  }
}

// Dismiss loader screen and fade in main content wrap
function revealApp(instant = false) {
  const overlay = document.getElementById('loadingScreen');
  if (!overlay) return;
  
  document.body.classList.add('loaded'); // Page load animation trigger
  
  if (instant) {
    overlay.remove();
  } else {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    setTimeout(() => {
      overlay.remove();
    }, 400);
  }
}

// Initialize all DOM-dependent scripts
function initializeBehaviors() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Hexagonal Background Grid Generator in Hero
  (function(){
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'hero-hex-grid';
    gridContainer.setAttribute('aria-hidden', 'true');
    hero.appendChild(gridContainer);
    
    const rows = 5;
    const cols = 9;
    const R = 36;
    const W = R * Math.sqrt(3);
    const H = R * 2;
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
    
    hero.addEventListener('mousemove', (e) => {
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
    });
    
    hero.addEventListener('mouseleave', () => {
      hexes.forEach(hex => {
        hex.el.style.opacity = '';
        hex.el.style.stroke = '';
        hex.el.style.strokeWidth = '';
      });
    });
  })();

  // 2. Visual Theme Switch Controller (Dark/Light mode switch)
  (function(){
    let currentTheme = 'light';
    const themeBtn = document.getElementById('themeToggle');
    const body = document.body;
    if (!themeBtn) return;

    function applyTheme(theme) {
      currentTheme = theme;
      if (theme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
      }
    }

    applyTheme('light');

    const toggleAction = () => {
      if (currentTheme === 'light') {
        applyTheme('dark');
      } else {
        applyTheme('light');
      }
    };

    themeBtn.addEventListener('click', toggleAction);
    themeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAction();
      }
    });
  })();

  // 3. Dynamic status filter controller on projects list
  (function(){
    const buttons = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.project-row');
    const projectsList = document.querySelector('.projects-list');
    if (buttons.length === 0) return;
    
    const emptyState = document.createElement('div');
    emptyState.id = 'noProjectsMessage';
    emptyState.textContent = 'Nothing matches that filter yet — like most good projects at some point.';
    emptyState.style.display = 'none';
    emptyState.style.textAlign = 'center';
    emptyState.style.color = 'var(--text-faint)';
    emptyState.style.fontFamily = 'var(--mono)';
    emptyState.style.padding = '48px 0';
    emptyState.style.fontSize = '13.5px';
    
    if (projectsList) {
      projectsList.appendChild(emptyState);
    }
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
          const status = row.getAttribute('data-status');
          if (filter === 'all' || status === filter) {
            row.classList.remove('hidden-filter');
            visibleCount++;
          } else {
            row.classList.add('hidden-filter');
            const csBtn = row.querySelector('.case-study-btn');
            if (csBtn && csBtn.classList.contains('open')) {
              toggleCaseStudy(csBtn);
            }
          }
        });
        
        if (visibleCount === 0) {
          emptyState.style.display = 'block';
        } else {
          emptyState.style.display = 'none';
        }
      });
    });
  })();

  // 4. Scroll reveals and cascading staggers using IntersectionObserver
  (function(){
    if (reduce) return;
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('reveal-el');
      
      const containers = section.querySelectorAll('.skills-grid, .chips, .projects-list, .timeline, .badges, .about-grid');
      containers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
          child.classList.add('reveal-child');
          child.style.transitionDelay = `${index * 80}ms`;
        });
      });
      
      const aboutLeft = section.querySelector('.about-left');
      if (aboutLeft) {
        const paragraphs = aboutLeft.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
          p.classList.add('reveal-child');
          p.style.transitionDelay = `${index * 80}ms`;
        });
      }
      
      const statsContainer = section.querySelector('.about-card');
      if (statsContainer) {
        const stats = statsContainer.querySelectorAll('.about-card-stat');
        stats.forEach((stat, index) => {
          stat.classList.add('reveal-child');
          stat.style.transitionDelay = `${(index + 1) * 80}ms`;
        });
      }
      
      const contactPanel = section.querySelector('.contact-panel');
      if (contactPanel) {
        Array.from(contactPanel.children).forEach((child, index) => {
          child.classList.add('reveal-child');
          child.style.transitionDelay = `${index * 80}ms`;
        });
      }
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });
    
    sections.forEach(el => observer.observe(el));
  })();

  // 5. Card Tilt & Sheen reflection effect on Code Mockup Window
  (function(){
    const card = document.querySelector('.code-window');
    if (!card || reduce) return;
    
    const sheen = document.createElement('div');
    sheen.className = 'card-sheen';
    card.appendChild(sheen);
    
    card.addEventListener('mousemove', (e) => {
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
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.boxShadow = '';
      sheen.style.opacity = '0';
      sheen.style.transition = 'opacity 0.5s ease, background 0.5s ease';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      sheen.style.transition = 'none';
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    });
  })();
}
