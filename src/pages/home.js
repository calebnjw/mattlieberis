import { Navbar } from '../components/navbar.js';
import { loadEpisodeData, getRandomEpisodeData, createEpisodeContainer } from '../utils/episodeUtils.js';

async function initHome() {
  // Load episode data
  await loadEpisodeData();

  // Get random episode
  const episodeData = getRandomEpisodeData();

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Load navbar
  new Navbar('app');

  // Create main quote container
  const quoteContainer = document.createElement('div');
  quoteContainer.id = 'quote-container';
  app.appendChild(quoteContainer);

  // Create quote text inside main
  const mattLieberIs = document.createElement('h1');
  mattLieberIs.id = 'quote-text';
  mattLieberIs.textContent = `Matt Lieber ${episodeData.mattDescription}`;
  quoteContainer.appendChild(mattLieberIs);

  // Create episode details container (fixed at bottom)
  const episodeDetails = createEpisodeContainer(episodeData);
  episodeDetails.id = 'episode-details';
  app.appendChild(episodeDetails);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHome);