import { Navbar } from '../components/navbar.js';
import { loadEpisodeData, getAllEpisodeData, createEpisodeContainer } from '../utils/episodeUtils.js';

async function initAllEpisodes() {
  // Load episode data
  await loadEpisodeData();

  // Get all episodes
  const allEpisodes = getAllEpisodeData();

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Load navbar
  new Navbar('app');

  // Create episodes grid
  const episodeListContainer = document.createElement('div');
  episodeListContainer.id = 'episode-list-container';
  episodeListContainer.className = 'd-flex-column pb-3';

  allEpisodes.forEach((episodeData) => {
    const episodeContainer = createEpisodeContainer(episodeData);
    episodeContainer.style.cursor = 'pointer';
    episodeContainer.onclick = () => {
      if (episodeData.spotifyLink) {
        window.open(episodeData.spotifyLink, '_blank').focus();
      }
    };

    episodeListContainer.appendChild(episodeContainer);
  });

  app.appendChild(episodeListContainer);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAllEpisodes);
