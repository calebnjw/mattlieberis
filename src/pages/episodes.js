import { Navbar } from '../components/navbar.js';
import { loadEpisodeData, getAllEpisodeData, createEpisodeElement } from '../utils/episodeUtils.js';

async function initAllEpisodes() {
  // Load navbar
  new Navbar('navbar');

  // Load episode data
  await loadEpisodeData();

  // Get all episodes
  const allEpisodes = getAllEpisodeData();

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Create episodes grid
  app.className = 'd-flex-column';

  allEpisodes.forEach((episodeData) => {
    const episodeContainer = document.createElement('div');
    episodeContainer.className = 'card mb-1';
    episodeContainer.onclick = () => {
      window.open(`${episodeData.spotifyLink}`, '_blank').focus();
    }

    episodeContainer.appendChild(createEpisodeElement(episodeData));

    app.appendChild(episodeContainer);
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAllEpisodes);
