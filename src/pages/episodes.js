import { Navbar } from '../components/navbar.js';
import { createArchiveFooter } from '../components/footer.js';
import { loadEpisodeData, getAllEpisodeData, createEpisodeContainer } from '../utils/episodeUtils.js';

async function initAllEpisodes() {
  // Load navbar
  new Navbar('navbar');

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <header class="page-intro">
      <h1>All Episodes</h1>
      <p>At the end of Gimlet’s <strong>Reply All</strong>, a familiar sign-off turned co-founder <strong>Matt Lieber</strong> into something cozy, unexpectedly relieving, or wonderfully specific. The episodes and the descriptions that made the credits worth staying for are listed below.</p>
    </header>
    <p class="archive-loading" role="status">Loading the archive…</p>`;
  document.body.appendChild(createArchiveFooter());

  try {
    await loadEpisodeData();
  } catch {
    app.querySelector('.archive-loading').textContent = 'The archive couldn’t load. Please refresh to try again.';
    return;
  }
  app.querySelector('.archive-loading').remove();
  const allEpisodes = getAllEpisodeData();
  app.querySelector('h1').textContent = `All ${allEpisodes.length} Episodes`;

  const controls = document.createElement('div');
  controls.className = 'archive-controls';
  controls.innerHTML = `
    <label class="archive-sort"><span class="sr-only">Sort episodes</span>
      <select aria-controls="episode-results">
        <option value="oldest">Oldest first</option>
        <option value="latest">Newest first</option>
        <option value="shortest">Shortest description</option>
      </select>
    </label>
    <label class="archive-search"><span class="sr-only">Search episodes and quotes</span>
      <input type="search" placeholder="Search quotes, episode titles, or keywords…" aria-controls="episode-results">
    </label>`;
  app.appendChild(controls);

  const list = document.createElement('div');
  list.id = 'episode-results';
  list.className = 'episodes-list';
  app.appendChild(list);
  const empty = document.createElement('div');
  empty.className = 'archive-empty';
  empty.innerHTML = '<h2>No matching episodes</h2><p>Try a different title or a simpler keyword, like “tea” or “sunlight”.</p><button type="button" class="quote-button archive-button">Clear search</button>';
  app.appendChild(empty);
  const pagination = document.createElement('div');
  pagination.className = 'archive-pagination';
  pagination.innerHTML = '<p role="status" aria-live="polite" aria-atomic="true"></p><button type="button" class="quote-button archive-button"><img src="public/icons/refresh-cw.svg" alt="" width="20" height="20">Load more episodes</button>';
  app.appendChild(pagination);

  const search = controls.querySelector('input');
  const sort = controls.querySelector('select');
  const loadMore = pagination.querySelector('button');
  const pageSize = 6;
  let visibleCount = pageSize;

  function renderEpisodes(append = false) {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const episodes = allEpisodes.filter((episode) => {
      const text = `${episode.title} Matt Lieber ${episode.mattDescription} ${episode.episodeDescription} ${episode.date}`.toLocaleLowerCase();
      return terms.every((term) => text.includes(term));
    }).sort((a, b) => {
      if (sort.value === 'oldest') return a.id - b.id;
      if (sort.value === 'shortest') return a.mattDescription.length - b.mattDescription.length || b.id - a.id;
      return b.id - a.id;
    });

    const start = append ? list.children.length : 0;
    if (!append) list.replaceChildren();
    episodes.slice(start, visibleCount).forEach((episodeData) => {
      const episodeContainer = document.createElement('article');
      episodeContainer.className = 'episode-card';
      episodeContainer.appendChild(createEpisodeContainer(episodeData));
      list.appendChild(episodeContainer);
    });
    empty.hidden = episodes.length > 0;
    loadMore.hidden = visibleCount >= episodes.length;
    pagination.querySelector('p').textContent = `Showing ${Math.min(visibleCount, episodes.length)} of ${episodes.length} episodes`;
    if (append) {
      // Keep keyboard focus at the newly revealed content, even on the last batch.
      const firstNew = list.children[start]?.querySelector('h2');
      firstNew?.setAttribute('tabindex', '-1');
      firstNew?.focus({ preventScroll: true });
    }
  }

  function resetResults() {
    visibleCount = pageSize;
    renderEpisodes();
  }
  search.addEventListener('input', resetResults);
  sort.addEventListener('change', resetResults);
  empty.querySelector('button').addEventListener('click', () => {
    search.value = '';
    resetResults();
    search.focus();
  });
  loadMore.addEventListener('click', () => {
    visibleCount += pageSize;
    renderEpisodes(true);
  });
  renderEpisodes();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAllEpisodes);
