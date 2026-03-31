import { Navbar } from '../components/navbar.js';
import { loadEpisodeData, getRandomEpisodeData, createEpisodeElement } from '../utils/episodeUtils.js';

async function initHome() {
  // Load navbar
  new Navbar('navbar');

  // Load episode data
  await loadEpisodeData();

  // Get random episode
  const episodeData = getRandomEpisodeData();

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Create title
  const mattLieberIs = document.createElement('h1');
  mattLieberIs.className = 'text-super geist-900 color-primary mb-1';
  mattLieberIs.textContent = `Matt Lieber ${episodeData.mattDescription}`;
  app.appendChild(mattLieberIs);

  app.appendChild(createEpisodeElement(episodeData));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHome);
