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

