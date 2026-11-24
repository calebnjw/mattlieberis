export class EpisodeDrawer {
  constructor(onPeekHeightChange) {
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
      if (reducedMotion.matches && drawerAnimation) {
        finishDrawerAnimation();
      }
    });

    new ResizeObserver(() => {
      onPeekHeightChange(collapsedDrawerHeight());
    }).observe(summary);

    this.element = drawer;
    this.contextTitle = contextTitle;
    this.description = description;
    this.spotifyLink = spotifyLink;
    this.unavailable = unavailable;
  }

  update(episode) {
    this.contextTitle.textContent = episode.title;
    this.description.textContent = episode.episodeDescription;

    const spotifyUrl = episode.spotifyLink;
    this.spotifyLink.hidden = !spotifyUrl;
    this.unavailable.hidden = Boolean(spotifyUrl);

    if (spotifyUrl) {
      this.spotifyLink.href = spotifyUrl;
    } else {
      this.spotifyLink.removeAttribute('href');
    }
  }
}
