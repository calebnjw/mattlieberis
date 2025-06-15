import mattlieberData from "@/public/mattlieber.json";

export type EpisodeData = {
  id: number;
  title: string;
  date: string;
  episodeDescription: string;
  mattDescription: string;
  spotifyLink: string;
};

const NUMBER_OF_EPISODES = mattlieberData.data.length;

/**
 * Returns a random episode number between 0 and NUMBER_OF_EPISODES - 1
 * @returns {number} A random episode number
 */
export function getRandomEpisodeNumber(): number {
  return Math.floor(Math.random() * NUMBER_OF_EPISODES);
}

export function getEpisodeData(episodeNumber: number): EpisodeData {
  return mattlieberData.data[episodeNumber - 1]; // Subtract 1 since array is 0-based but episode IDs start at 1
}

export function getRandomEpisodeData(): EpisodeData {
  return getEpisodeData(getRandomEpisodeNumber());
}

export function getAllEpisodeData(): EpisodeData[] {
  return mattlieberData.data; // Returns the whole json array of episodes
}