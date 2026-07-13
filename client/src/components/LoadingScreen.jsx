import React, { useEffect, useState, useRef } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const isDismissed = useRef(false);

  const logs = [
    { text: '> warning: ClassCastException: expected "senior engineer", found "3rd-year CSE student"', delayAfter: 80, class: 'warning-line' },
    { text: '> hot-fixing... patch applied: ambition += curiosity', delayAfter: 80, class: 'patch-line' },
    { text: '> compilation successful. launching...', delayAfter: 50 }
  ];

  const dismiss = (instant = false) => {
    if (isDismissed.current) return;
    isDismissed.current = true;
    onComplete(instant);
  };

  useEffect(() => {
    // Reduced motion support
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      dismiss(true);
      return;
    }

    const handleKeyDown = () => dismiss(false);
    const handleClick = () => dismiss(false);

    window.addEventListener('keydown', handleKeyDown);
    const screen = document.getElementById('loadingScreen');
    if (screen) {
      screen.addEventListener('click', handleClick);
    }

    let currentLineIndex = 0;

    const typeLine = () => {
      if (isDismissed.current) return;
      if (currentLineIndex >= logs.length) {
        setTimeout(() => dismiss(false), 200);
        return;
      }

      const lineData = logs[currentLineIndex];
      let charIndex = 0;
      let typedText = '';

      setLines((prev) => [...prev, { text: '', class: lineData.class, active: true }]);

      const typeChar = () => {
        if (isDismissed.current) return;
        if (charIndex < lineData.text.length) {
          typedText += lineData.text.charAt(charIndex);
          setLines((prev) => {
            const next = [...prev];
            next[currentLineIndex] = { ...next[currentLineIndex], text: typedText };
            return next;
          });
          charIndex++;
          setTimeout(typeChar, 8);
        } else {
          setLines((prev) => {
            const next = [...prev];
            next[currentLineIndex] = { ...next[currentLineIndex], active: false };
            return next;
          });
          currentLineIndex++;
          setTimeout(typeLine, lineData.delayAfter);
        }
      };

      typeChar();
    };

    typeLine();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (screen) {
        screen.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div id="loadingScreen" role="dialog" aria-modal="true" aria-label="Loading portfolio" tabIndex="-1">
      <div className="loading-container">
        <div className="loading-header">
          <div className="loading-dots">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
          <span className="loading-title">compiler.sh</span>
          <span className="loading-skip">Press any key to skip</span>
        </div>
        <div className="loading-body" id="loadingBody">
          {lines.map((line, idx) => (
            <p key={idx} className={`log-line ${line.class || ''}`}>
              {line.text}
              {line.active && <span className="log-cursor"></span>}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
