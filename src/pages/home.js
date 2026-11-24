import { Navbar } from '../components/navbar.js';
import { EpisodeDrawer } from '../components/episodeDrawer.js';
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
  copyButton.innerHTML = '<img src="public/icons/clipboard.svg" alt="Copy quote to clipboard" width="20" height="20">';
  const copyStatus = document.createElement('span');
  copyStatus.className = 'quote-copy-status';
  copyStatus.setAttribute('role', 'status');
  controls.append(randomButton, copyButton, copyStatus);
  app.appendChild(controls);
  const shortcuts = document.createElement('p');
  shortcuts.className = 'quote-shortcuts';
  shortcuts.innerHTML = '<kbd>Space</kbd> next description <span aria-hidden="true">•</span> <kbd>C</kbd> copy';
  app.appendChild(shortcuts);

  const drawer = new EpisodeDrawer((height) => {
    document.body.style.setProperty('--drawer-peek-height', `${height}px`);
  });
  app.appendChild(drawer.element);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let copyTimer;
  let copyRequest = 0;

  function hideCopyStatus() {
    clearTimeout(copyTimer);
    delete copyStatus.dataset.visible;
    if (reducedMotion.matches) {
      copyStatus.textContent = '';
    }
  }

  // Retain the message during its fade-out, then empty the live region.
  copyStatus.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'opacity' && copyStatus.dataset.visible !== 'true') {
      copyStatus.textContent = '';
    }
  });

  function nextQuote() {
    episodeData = getRandomEpisodeData();
    updateEpisode();
  }

  async function copyQuote() {
    const request = ++copyRequest;
    clearTimeout(copyTimer);
    let message;
    try {
      await navigator.clipboard.writeText(`“${mattLieberIs.textContent}” — Reply All, ${episodeData.title}`);
      message = 'Copied to clipboard!';
    } catch {
      message = 'Couldn’t copy. Select the quote to copy it.';
    }
    if (request !== copyRequest) return;
    copyStatus.textContent = message;
    copyStatus.dataset.visible = 'true';
    copyTimer = setTimeout(hideCopyStatus, 3000);
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

  function updateEpisode() {
    mattLieberIs.textContent = `Matt Lieber ${episodeData.mattDescription.trim()}`;
    drawer.update(episodeData);
    copyRequest += 1;
    hideCopyStatus();
  };

  updateEpisode()
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHome);
