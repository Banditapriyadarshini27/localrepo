export const projectsData = [
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
