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
  const quoteText = document.createElement('h1');
  quoteText.id = 'quote-text';
  quoteText.class = 'geist-900';
  quoteText.textContent = `Matt Lieber ${episodeData.mattDescription}`;
  quoteContainer.appendChild(quoteText);

  // Create episode details container (fixed at bottom)
  const episodeDetails = createEpisodeContainer(episodeData);
  episodeDetails.id = 'episode-details';
  episodeDetails.class = 'episode-container';
  app.appendChild(episodeDetails);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHome);