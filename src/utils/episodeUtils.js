let mattlieberData = null;

/**
 * Load episode data from JSON file
 * @returns {Promise<void>}
 */
export async function loadEpisodeData() {
  if (mattlieberData) return;
  const response = await fetch('./public/mattlieber.json');
  mattlieberData = await response.json();
}

/**
 * Returns a random episode number between 1 and total episodes
 * @returns {number}
 */
export function getRandomEpisodeNumber() {
  if (!mattlieberData) {
    throw new Error('Episode data not loaded. Call loadEpisodeData() first.');
  }
  const randomNumber = Math.ceil(Math.random() * mattlieberData.data.length);
  console.log("randomNumber: ", randomNumber);
  return randomNumber;
}

/**
 * Returns episode data for the given episode number
 * Episode numbers start at 1
 * @param {number} episodeNumber - The episode number to get the data for
 * @returns {Object}
 */
export function getEpisodeData(episodeNumber) {
  if (!mattlieberData) {
    throw new Error('Episode data not loaded. Call loadEpisodeData() first.');
  }
  const episodeData = mattlieberData.data[episodeNumber - 1];
  console.log("episodeData: ", episodeData);
  return episodeData;
}

/**
 * Returns random episode data
 * @returns {Object}
 */
export function getRandomEpisodeData() {
  return getEpisodeData(getRandomEpisodeNumber());
}

/**
 * Returns all episode data
 * @returns {Array}
 */
export function getAllEpisodeData() {
  if (!mattlieberData) {
    throw new Error('Episode data not loaded. Call loadEpisodeData() first.');
  }
  return mattlieberData.data;
}

/** 
 * Takes episode data and returns HTML elements with episode details
 * @param {Object} episodeData - The episode data to create the elements for
 * @returns {HTMLElement} - The container element with episode details
*/
export function createEpisodeContainer(episodeData) {
  // Return a standalone component; the caller decides where to insert it.
  const episodeContainer = document.createElement('div');
  episodeContainer.className = 'episode-details';

  const quote = document.createElement('blockquote');
  quote.className = 'episode-quote';
  const quoteText = `Matt Lieber ${episodeData.mattDescription.trim()}`;
  const hasQuote = episodeData.mattDescription.trim() !== 'is not described.';
  quote.textContent = hasQuote ? `“${quoteText}”` : 'No Matt Lieber description in this episode.';
  quote.classList.toggle('episode-quote-missing', !hasQuote);
  episodeContainer.appendChild(quote);

  // Keep episode context above the quote, as in the archive reference.
  const episodeInfoHeader = document.createElement('div');
  episodeInfoHeader.className = 'episode-details-header';
  episodeContainer.appendChild(episodeInfoHeader);

  const episodeTitle = document.createElement('h2');
  episodeTitle.className = 'episode-title';
  const titleParts = episodeData.title.match(/^(#\d+)\s+(.+)$/);
  if (titleParts) {
    const badge = document.createElement('span');
    badge.className = 'episode-number';
    badge.textContent = titleParts[1];
    episodeTitle.appendChild(badge);
  }
  const titleText = document.createElement('span');
  titleText.textContent = titleParts ? titleParts[2] : episodeData.title;
  episodeTitle.appendChild(titleText);
  episodeInfoHeader.appendChild(episodeTitle);

  const actions = document.createElement('div');
  actions.className = 'episode-actions';
  if (hasQuote) {
    const status = document.createElement('span');
    status.className = 'episode-copy-status';
    status.setAttribute('role', 'status');
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'episode-copy quote-button archive-button';
    copy.innerHTML = '<img src="public/icons/clipboard.svg" alt="" width="18" height="18"><span>Copy quote</span>';
    copy.setAttribute('aria-label', `Copy quote from ${episodeData.title}`);
    let timer;
    copy.addEventListener('click', async () => {
      clearTimeout(timer);
      try {
        await navigator.clipboard.writeText(`“${quoteText}” — Reply All, ${episodeData.title}`);
        status.textContent = 'Copied!';
      } catch {
        status.textContent = 'Couldn’t copy. Select the quote to copy it.';
      }
      timer = setTimeout(() => { status.textContent = ''; }, 3000);
    });
    actions.append(status, copy);
  }
  if (episodeData.spotifyLink) {
    const link = document.createElement('a');
    link.className = 'spotify-link';
    link.href = episodeData.spotifyLink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = '<span>Listen on Spotify</span> <img src="public/icons/arrow-up-right.svg" alt="" width="20" height="20">'
    actions.appendChild(link);
  } else {
    const unavailable = document.createElement('span');
    unavailable.className = 'episode-meta';
    unavailable.textContent = 'Not available on Spotify';
    actions.appendChild(unavailable);
  }
  episodeInfoHeader.appendChild(actions);

  const episodeDescription = document.createElement('p');
  episodeDescription.className = 'episode-description';
  episodeDescription.textContent = `${episodeData.date} — ${episodeData.episodeDescription}`;
  episodeContainer.appendChild(episodeDescription);

  return episodeContainer;
}
