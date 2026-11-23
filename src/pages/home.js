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
  spotifyLink.innerHTML = '<span>Listen on Spotify</span> <img src="public/icons/arrow-up-right.svg" alt="" width="20" height="20">';
  spotifyLink.target = '_blank';
  spotifyLink.rel = 'noopener noreferrer';
  const unavailable = document.createElement('span');
  unavailable.textContent = 'This episode isn’t available on Spotify.';
  episodeLinks.append(spotifyLink, unavailable);
  episodeContainer.append(synopsis, description, episodeLinks);
  drawer.appendChild(episodeContainer);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let drawerExpanded = drawer.open;
  let drawerAnimation = null;
  summary.setAttribute('aria-expanded', String(drawerExpanded));

  function collapsedDrawerHeight() {
    const style = getComputedStyle(drawer);
    return summary.getBoundingClientRect().height
      + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
  }

  function finishDrawerAnimation() {
    const animation = drawerAnimation;
    drawerAnimation = null;
    drawer.open = drawerExpanded;
    delete drawer.dataset.animating;
    animation?.cancel();
    if (!drawerExpanded) drawer.scrollTop = 0;
  }

  summary.addEventListener('click', (event) => {
    event.preventDefault();
    // Start from the current rendered height so repeated clicks reverse smoothly.
    const startHeight = drawer.getBoundingClientRect().height;
    drawerAnimation?.cancel();
    drawerAnimation = null;
    drawerExpanded = !drawerExpanded;
    summary.setAttribute('aria-expanded', String(drawerExpanded));
    episodeContainer.inert = !drawerExpanded;

    if (reducedMotion.matches || typeof drawer.animate !== 'function') {
      finishDrawerAnimation();
      return;
    }

    // Keep the contents rendered until the closing animation finishes.
    drawer.open = true;
    drawer.dataset.animating = 'true';
    const endHeight = drawerExpanded
      ? drawer.getBoundingClientRect().height
      : collapsedDrawerHeight();
    const animation = drawer.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    );
    drawerAnimation = animation;
    animation.onfinish = () => {
      if (drawerAnimation === animation) finishDrawerAnimation();
    };
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && drawerAnimation) finishDrawerAnimation();
  });

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

  function updateEpisode() {
    mattLieberIs.textContent = `Matt Lieber ${episodeData.mattDescription.trim()}`;
    contextTitle.textContent = `${episodeData.title}`;
    description.textContent = episodeData.episodeDescription;
    spotifyLink.hidden = !episodeData.spotifyLink;
    unavailable.hidden = Boolean(episodeData.spotifyLink);
    if (episodeData.spotifyLink) spotifyLink.href = episodeData.spotifyLink;
    else spotifyLink.removeAttribute('href');
    copyRequest += 1;
    hideCopyStatus();
  }

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

  updateEpisode();
  // Reserve only the collapsed header: opening the drawer overlays the page
  // instead of moving the quote. Still adjust for header wrapping on mobile.
  new ResizeObserver(() => {
    document.body.style.setProperty('--drawer-peek-height', `${collapsedDrawerHeight()}px`);
  }).observe(summary);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHome);
