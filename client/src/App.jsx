import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

const MainApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = (instant = false) => {
    document.body.classList.add('loaded'); // Trigger page load animations in index.css

    if (instant) {
      setIsLoading(false);
    } else {
      const loader = document.getElementById('loadingScreen');
      if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 400); // Match CSS transition duration
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Nav />
      <main id="app" className="wrap">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

export default App;
