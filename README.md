# Bandita Priyadarshini — Software Developer Portfolio

A responsive, highly polished software developer portfolio website.

## 🚀 How to Run Locally

Due to modern browser security restrictions (CORS), you cannot run this website by simply double-clicking the `index.html` file in your file explorer. Browsers block dynamic requests (`fetch()`) when pages are loaded via the `file://` protocol.

To preview and interact with the site, you need to serve it using a local web server:

### Option A: Using Python (Recommended)
If you have Python installed, open your terminal/command prompt in this project directory and run:
```bash
python -m http.server 8000
```
Then, open your web browser and navigate to:
**[http://localhost:8000](http://localhost:8000)**

### Option B: Using Node.js / npx
If you have Node.js installed, open your terminal in this project directory and run:
```bash
npx serve .
```
Then, navigate to the local address displayed in your terminal (usually **[http://localhost:3000](http://localhost:3000)**).

---

## 📂 Codebase Architecture

This codebase is structured as a modular single-page application (SPA):
* **`index.html`**: The main landing shell containing fonts, the navigation bar, the compiler loading terminal overlay, and the target `#app` container.
* **`styles.css`**: Contains all variables, themes (light/dark mode layouts), keyframe animations, hover states, and responsive styling.
* **`script.js`**: Core controller logic:
  * Simulates the compiler terminal loader screen on entry.
  * Fetches the component HTML sections from `sections/` dynamically.
  * Synchronously reveals the contents when the log screen completes typing.
  * Initializes interactive behaviors: light/dark theme toggle, portfolio status filters, 3D card tilt, and IntersectionObserver scroll reveals.
* **`sections/`**: Separate raw HTML snippets of all portfolio sections:
  * `hero.html`
  * `about.html`
  * `skills.html`
  * `projects.html`
  * `experience.html`
  * `education.html`
  * `achievements.html`
  * `contact.html` (including the footer layout)
