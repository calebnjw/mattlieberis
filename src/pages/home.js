import { Navbar } from '../components/navbar.js';
import { loadEpisodeData, getRandomEpisodeData } from '../utils/episodeUtils.js';

async function initHome() {
  // Load navbar
  new Navbar('navbar');

  // Load episode data
  await loadEpisodeData();

  // Get random episode
  let episodeData = getRandomEpisodeData();

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Create title
  const mattLieberIs = document.createElement('h1');
  mattLieberIs.className = 'home-quote';
  mattLieberIs.textContent = `Matt Lieber ${episodeData.mattDescription}`;
  mattLieberIs.setAttribute('aria-live', 'polite');
  app.appendChild(mattLieberIs);

  // Quote actions sit below the existing heading.
  const controls = document.createElement('div');
  controls.className = 'quote-controls';

  const randomButton = document.createElement('button');
  randomButton.type = 'button';
  randomButton.className = 'quote-button quote-next';
  randomButton.innerHTML = '<img src="public/icons/refresh-cw.svg" alt="" width="20" height="20"><span>Next description</span>';

  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'quote-button quote-copy';
  copyButton.setAttribute('aria-label', 'Copy quote to clipboard');
  copyButton.title = 'Copy quote to clipboard';
  copyButton.innerHTML = '<img src="public/icons/clipboard.svg" alt="Copy quote to clipboard">';

  const copyStatus = document.createElement('span');
  copyStatus.className = 'quote-copy-status';
  copyStatus.setAttribute('role', 'status');
  controls.append(randomButton, copyButton, copyStatus);
  app.appendChild(controls);

  const shortcuts = document.createElement('p');
  shortcuts.className = 'quote-shortcuts';
  shortcuts.innerHTML = '<kbd>Space</kbd> next description <span aria-hidden="true">•</span> <kbd>C</kbd> copy';
  app.appendChild(shortcuts);

  // Native disclosure keeps the bottom drawer keyboard-accessible.
  const drawer = document.createElement('details');
  drawer.className = 'episode-drawer';
  drawer.open = false;
  const summary = document.createElement('summary');
  summary.className = 'episode-drawer-toggle';
  const contextLabel = document.createElement('span');
  contextLabel.className = 'episode-context-label';
  contextLabel.textContent = 'Episode';
  const contextTitle = document.createElement('span');
  contextTitle.className = 'episode-context-title';
  summary.append(contextLabel, contextTitle);
  drawer.appendChild(summary);
  app.appendChild(drawer);

  const episodeContainer = document.createElement('div');
  episodeContainer.className = 'episode-drawer-body';
  const synopsis = document.createElement('h2');
  synopsis.className = 'episode-drawer-label';
  synopsis.textContent = 'Synopsis';
  const description = document.createElement('p');
  description.className = 'episode-drawer-description';
  const episodeLinks = document.createElement('div');
  episodeLinks.className = 'episode-links';
  const spotifyLink = document.createElement('a');
  spotifyLink.className = 'spotify-link';
  spotifyLink.textContent = 'Listen on Spotify ↗';
  spotifyLink.target = '_blank';
  spotifyLink.rel = 'noopener noreferrer';
  const unavailable = document.createElement('span');
  unavailable.textContent = 'This episode isn’t available on Spotify.';
  episodeLinks.append(spotifyLink, unavailable);
  episodeContainer.append(synopsis, description, episodeLinks);
  drawer.appendChild(episodeContainer);

  let copyTimer;
  function updateEpisode() {
    mattLieberIs.textContent = `Matt Lieber ${episodeData.mattDescription.trim()}`;
    contextTitle.textContent = `${episodeData.title}`;
    description.textContent = episodeData.episodeDescription;
    spotifyLink.hidden = !episodeData.spotifyLink;
    unavailable.hidden = Boolean(episodeData.spotifyLink);
    if (episodeData.spotifyLink) spotifyLink.href = episodeData.spotifyLink;
    else spotifyLink.removeAttribute('href');
    clearTimeout(copyTimer);
    copyStatus.textContent = '';
  }

  function nextQuote() {
    episodeData = getRandomEpisodeData();
    updateEpisode();
  }

  async function copyQuote() {
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText(`“${mattLieberIs.textContent}” — Reply All, ${episodeData.title}`);
      copyStatus.textContent = 'Copied to clipboard!';
    } catch {
      copyStatus.textContent = 'Couldn’t copy. Select the quote to copy it.';
    }
    copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 3000);
  }

  randomButton.addEventListener('click', nextQuote);
  copyButton.addEventListener('click', copyQuote);
  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (event.target.closest('input, textarea, select, button, a, summary, [contenteditable]:not([contenteditable="false"])')) return;
    if (event.code === 'Space') {
      event.preventDefault();
      nextQuote();
    } else if (event.code === 'KeyC') {
      event.preventDefault();
      copyQuote();
    }
  });

  updateEpisode();
  // Reserve space for the drawer, including when its content wraps on mobile.
  new ResizeObserver(() => {
    document.body.style.setProperty('--drawer-height', `${drawer.getBoundingClientRect().height}px`);
  }).observe(drawer);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHome);
