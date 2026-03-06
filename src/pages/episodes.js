import { Navbar } from '../components/navbar.js';
import { loadEpisodeData, getAllEpisodeData } from '../utils/episodeUtils.js';

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
  const grid = document.createElement('div');
  grid.className = '';

  allEpisodes.forEach((episode) => {
    const card = document.createElement('div');
    card.className = '';

    const cardTitle = document.createElement('h2');
    cardTitle.className = '';
    cardTitle.textContent = episode.title;
    card.appendChild(cardTitle);

    const date = document.createElement('div');
    date.className = '';

    if (episode.spotifyLink) {
      date.innerHTML = `
        ${episode.date} |
        <a href="${episode.spotifyLink}" class="">
          Listen on Spotify
        </a>
      `;
    } else {
      date.textContent = `${episode.date} | Not on Spotify`;
    }

    card.appendChild(date);

    const description = document.createElement('p');
    description.className = '';
    description.textContent = episode.episodeDescription;
    card.appendChild(description);

    grid.appendChild(card);
  });

  app.appendChild(grid);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAllEpisodes);
