const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Middleware to log visitor events when client requests project data (representing main page load)
app.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/api/projects') {
    try {
      db.prepare('INSERT INTO visitors (page) VALUES (?)').run('portfolio_home');
    } catch (err) {
      console.error('Failed to log visitor event:', err.message);
    }
  }
  next();
});

// Mock database project entries
const projects = [
  {
    id: "agent-passport-zsp",
    name: "Agent-Passport ZSP",
    status: "live",
    tagline: "API Middleware & Governance",
    description: "A secure multi-agent authorization framework that eliminates long-lived credentials in favor of dynamic, auto-expiring access tokens. Integrates anomaly detection to intercept malicious SQL or shell commands before token issuance, logging events in a SHA-256 hash-chain audit ledger.",
    stack: ["React", "Express.js", "WebSocket", "Docker"],
    hasCaseStudy: true,
    caseStudy: {
      problem: "Static credentials introduce a persistent attack vector; automated agent tasks lack tool-scoped boundaries.",
      tradeoffs: "OAuth2 flows are too high-latency for multi-agent local environments. Dynamic, tool-scoped dynamic tokens are lighter and faster.",
      approach: "Constructed a proxy gateway that screens inputs for injection markers and commits hashes to a chain ledger.",
      result: "Dynamic auto-expiring credentials implemented with zero overhead in agent tool execution."
    }
  },
  {
    id: "khetibadimitra",
    name: "KhetibadiMitra",
    status: "live",
    tagline: "Generative AI NLP",
    description: "A voice-first agricultural advisory system supporting over 27 Indian languages. Allows rural farmers to input speech requests and receive instant, soil-health and crop recommendations driven by fine-tuned generative LLM queries.",
    stack: ["Generative AI", "Voice NLP", "Speech Recognition"],
    hasCaseStudy: false
  },
  {
    id: "weather-pulse",
    name: "Weather Pulse",
    status: "live",
    tagline: "Front-End Engineering",
    description: "A live-updating glassmorphic weather platform that adapts its color schemes and typography dynamic values based on local API conditions. Focuses on rich user interfaces, custom transitions, and performant API fetching.",
    stack: ["React", "Vite", "Tailwind CSS", "OpenWeatherMap API"],
    hasCaseStudy: false
  },
  {
    id: "substation-anomaly-detector",
    name: "Substation Anomaly Detector",
    status: "research",
    tagline: "OT Security Research",
    description: "Research into preventing False Data Injection and Replay Attacks in power grid substations. Analyzed industrial Control System operational technology signals to map out security validation rules for physical sensor safety.",
    stack: ["OT Security", "C++", "Signal Analysis"],
    hasCaseStudy: false
  }
];

// GET /api/projects - Serves project records as JSON
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// POST /api/contact - Validates input fields, logs message to console and db, and responds
app.post(
  '/api/contact',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required.')
      .isLength({ max: 100 })
      .withMessage('Name must be under 100 characters.'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required.')
      .isEmail()
      .withMessage('Please provide a valid email address.'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required.')
      .isLength({ min: 10, max: 2000 })
      .withMessage('Message must be between 10 and 2000 characters.')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Structured server-side console logging
    console.log('====================================');
    console.log('📥 NEW CONTACT FORM SUBMISSION');
    console.log(`👤 Name:    ${name}`);
    console.log(`✉️ Email:   ${email}`);
    console.log(`💬 Message: ${message}`);
    console.log('====================================');

    try {
      // Insert contact message into SQLite database
      const stmt = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
      stmt.run(name, email, message);

      res.json({
        success: true,
        message: 'Thank you for reaching out! Your message was received successfully.'
      });
    } catch (err) {
      console.error('Failed to insert message into database:', err.message);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error: Failed to store message.'
      });
    }
  }
);

// GET /api/messages - Protected admin endpoint to retrieve all contact submissions
app.get('/api/messages', (req, res) => {
  const token = req.headers['x-admin-token'] || req.headers['authorization'];

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const stmt = db.prepare('SELECT * FROM messages ORDER BY created_at DESC');
    const messages = stmt.all();
    res.json(messages);
  } catch (err) {
    console.error('Failed to fetch messages:', err.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// GET /api/visitors - Protected admin endpoint to retrieve visitor logs
app.get('/api/visitors', (req, res) => {
  const token = req.headers['x-admin-token'] || req.headers['authorization'];

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const stmt = db.prepare('SELECT * FROM visitors ORDER BY visited_at DESC');
    const visitors = stmt.all();
    res.json(visitors);
  } catch (err) {
    console.error('Failed to fetch visitors:', err.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
});
