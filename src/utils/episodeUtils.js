let mattlieberData = null;

/**
 * Load episode data from JSON file
 * @returns {Promise<void>}
 */
export async function loadEpisodeData() {
  if (mattlieberData) return;
  const response = await fetch('https://calebnjw.github.io/mattlieberis/public/mattlieber.json');
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
  return 73; // For testing, return a fixed episode number. Change to randomNumber for production.
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
  // Create episode details container
  const episodeContainer = document.createElement('div');
  episodeContainer.className = 'd-flex-column episode-container';

  // Container to hold episode title, date and link in the same line. 
  const episodeInfoHeader = document.createElement('div');
  episodeInfoHeader.className = 'd-flex-column mb-1';
  episodeContainer.appendChild(episodeInfoHeader);

  const episodeTitle = document.createElement('div');
  episodeTitle.className = 'text-title geist-600 color-primary mb-05';
  episodeTitle.textContent = episodeData.title;
  episodeInfoHeader.appendChild(episodeTitle);

  const episodeInfo = document.createElement('div');
  episodeInfo.className = 'geist-600 color-secondary mb-05';
  if (episodeData.spotifyLink) {
    episodeInfo.innerHTML = `
      ${episodeData.date} | 
      <a href="${episodeData.spotifyLink}" target="_blank" rel="noopener noreferrer" class="color-primary" style="text-decoration: none;">
        Listen on Spotify
      </a>
    `;
  } else {
    episodeInfo.innerHTML = `${episodeData.date}`;
  }
  episodeInfoHeader.appendChild(episodeInfo);

  const episodeDescription = document.createElement('div');
  episodeDescription.className = 'geist-400 color-secondary';
  episodeDescription.textContent = episodeData.episodeDescription;
  episodeContainer.appendChild(episodeDescription);

  return episodeContainer;
}