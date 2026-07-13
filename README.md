# Bandita Priyadarshini — Full-Stack Portfolio

A fully responsive, animated software developer portfolio website migrated to a modern React + Express architecture.

---

## 📂 Project Architecture

This project is structured as a monorepo containing a frontend client and an Express API backend:

* **`/`** (root): Monorepo orchestrator. Configured with a root `package.json` utilizing `concurrently` to run both frontend and backend concurrently in development.
* **`client/`**: React SPA bootstrapped with Vite.
  * Extensively modularized into reusable React components (`Nav`, `LoadingScreen`, `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Education`, `Achievements`, `Contact`, `Footer`).
  * Features visual theme (light/dark mode) and project status filters driven by React state (`useContext`/`useState`).
  * Integrates scroll reveals via a custom `useIntersectionObserver` hook.
  * Connects to `/api` routes via a Vite proxy redirecting requests to `http://localhost:5000` in dev.
* **`server/`**: Express API backend.
  * **`GET /api/projects`**: Serves project card entries as JSON.
  * **`POST /api/contact`**: Receives, validates, and logs contact submissions (ready for nodemailer/resend integration).

---

## 🚀 Local Development Setup

To run both the frontend and backend servers together locally:

### 1. Install Dependencies
Install dependencies for the root, frontend, and backend folders by running the following script in the root directory:
```bash
npm run install-all
```

### 2. Start the Development Servers
Spin up both the Vite React dev server (port 5173) and the Express server (port 5000) simultaneously:
```bash
npm run dev
```

Then, open your web browser and navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🌐 Deployment Instructions

### Frontend (Client)
Deploy the `client/` folder to static hosts like **Vercel** or **Netlify**:
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Redirects**: Configure single page application redirects (e.g. `vercel.json` or `_redirects` file) so frontend routing works properly.

### Backend (Server)
Deploy the `server/` folder to server platforms like **Render**, **Railway**, or **Heroku**:
* **Start Command**: `npm start`
* **Port**: Ensure the server uses the environment variable `process.env.PORT`.
