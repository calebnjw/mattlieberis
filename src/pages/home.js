import { Navbar } from '../components/navbar.js';
import { loadEpisodeData, getRandomEpisodeData } from '../utils/episodeUtils.js';

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
  mattLieberIs.className = 'text-super geist-900 color-primary';
  mattLieberIs.textContent = `Matt Lieber ${episodeData.mattDescription}`;
  app.appendChild(mattLieberIs);

  // Create espisode details container
  const episodeContainer = document.createElement('div');
  episodeContainer.className = '';
  app.appendChild(episodeContainer);

  const episodeTitle = document.createElement('div');
  episodeTitle.className = '';
  episodeTitle.textContent = episodeData.title;
  episodeContainer.appendChild(episodeTitle);

  const episodeDescription = document.createElement('div');
  episodeDescription.className = '';
  episodeDescription.textContent = episodeData.episodeDescription;
  episodeContainer.appendChild(episodeDescription);

  const episodeInfo = document.createElement('div');
  episodeInfo.className = 'd-flex-row';
  if (episodeData.spotifyLink) {
    episodeInfo.className = '';
    episodeInfo.innerHTML = `
      ${episodeData.date} | 
      <a href="${episodeData.spotifyLink}" target="_blank" rel="noopener noreferrer" class="text-rose-500 dark:text-rose-300 hover:underline">
        Listen on Spotify
      </a>
    `;
  } else {
    episodeInfo.innerHTML = `
      ${episodeData.date} | Not on Spotify
    `;
  }
  episodeContainer.appendChild(episodeInfo);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHome);
