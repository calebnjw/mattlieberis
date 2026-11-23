import { Navbar } from '../components/navbar.js';
import { createArchiveFooter } from '../components/footer.js';

function initAbout() {
  // Load navbar
  new Navbar('navbar');

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Adapt the reference panels using the site's shared typography and colors.
  const aboutContent = document.createElement('div');
  aboutContent.className = 'about-content';
  aboutContent.innerHTML = `
    <header class="page-intro">
      <h1>About This Project</h1>
    </header>
    <section class="about-panel">
      <span class="section-badge">The Subject</span>
      <h2>Who is Matt Lieber?</h2>
      <p>Matt Lieber is an American media executive, producer, and entrepreneur best known as the co-founder and former president of Gimlet Media from 2014 to 2022. Gimlet Media was acquired by Spotify in 2019, and Matt Lieber continued to lead the company, until Gimlet Media was merged into Spotify Studios in 2023.</p>
    </section>
    <section class="about-project">
      <div><p class="section-label">Project Files</p>
        <p>This open-source catalog was created by <a href="https://calebnjw.com" rel="noopener noreferrer" target="_blank">caleb</a>. The source code is available on GitHub. Quotes were transcribed by caleb. Website was built with the massive help of Codex.</p>
        <p>To contribute to the project, please submit a pull request with corrections or additions on the Github Repository.</p>
        <a class="quote-button project-link" href="https://github.com/calebnjw/mattlieberis" target="_blank" rel="noopener noreferrer"><img src="public/icons/github_invertocat_black.svg" alt="" width="20" height="20">Explore on GitHub</a>
      </div>
    </section>
    <section class="about-project">
      <div><p class="section-label">Other Projects</p>
        <p>Projects around the web that are in a similar vein to this one!</p>
        <a class="quote-button project-link" href="https://mattlieberiseverything.tumblr.com/" target="_blank" rel="noopener noreferrer">Matt Lieber is everything.</a>
      </div>
    </section>
    `;
  app.appendChild(aboutContent);
  document.body.appendChild(createArchiveFooter());
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAbout);
