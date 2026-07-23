import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);

  useIntersectionObserver(sectionRef);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (response.ok && result.success) {
          setStatus({ type: 'success', message: result.message });
          setFormData({ name: '', email: '', message: '' });
        } else {
          const errorMsg = result.errors 
            ? result.errors.map(err => err.msg).join(' ') 
            : (result.error || 'Something went wrong. Please try again.');
          setStatus({ type: 'error', message: errorMsg });
        }
      } else {
        // Standalone client mode (Vercel static host without backend)
        const mailtoSubject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:bandita28288sony@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        
        setStatus({ 
          type: 'success', 
          message: 'Thank you for reaching out! Opening your mail app to send the message directly to Bandita.' 
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus({ type: 'error', message: 'Something went wrong. Please try emailing directly at bandita28288sony@gmail.com.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="reveal-el">
      <div className="contact-panel">
        <div className="reveal-child" style={{ flex: '1', minWidth: '280px', transitionDelay: '0ms' }}>
          <h3>Let's Connect</h3>
          <p style={{ marginBottom: '24px' }}>
            I am looking for internship opportunities and collaborative software engineering projects.
          </p>
          <p style={{ fontSize: '13.5px', color: 'var(--text-faint)' }}>
            Or email directly at:{' '}
            <a 
              href="mailto:bandita28288sony@gmail.com" 
              style={{ color: 'var(--indigo)', textDecoration: 'underline' }}
            >
              bandita28288sony@gmail.com
            </a>
          </p>
        </div>

        <form 
          className="contact-form reveal-child" 
          style={{ flex: '1.2', minWidth: '280px', transitionDelay: '80ms' }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="form-name">Name</label>
            <input 
              type="text" 
              id="form-name" 
              name="name" 
              className="form-input" 
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="form-email">Email</label>
            <input 
              type="email" 
              id="form-email" 
              name="email" 
              className="form-input" 
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="form-message">Message</label>
            <textarea 
              id="form-message" 
              name="message" 
              className="form-textarea" 
              placeholder="Your message details..."
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn primary" 
            style={{ alignSelf: 'flex-start' }}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message ↳'}
          </button>

          {status.message && (
            <div className={`form-status ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
