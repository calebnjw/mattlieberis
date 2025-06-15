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
  const randomNumber = Math.floor(Math.random() * NUMBER_OF_EPISODES);
  console.log("randomNumber: ", randomNumber);
  return randomNumber;
}

export function getEpisodeData(episodeNumber: number): EpisodeData {
  const episodeData = mattlieberData.data[episodeNumber] // no subtract 1 because random number is 0-based
  console.log("episodeData: ", episodeData);
  return episodeData;
}

export function getRandomEpisodeData(): EpisodeData {
  return getEpisodeData(getRandomEpisodeNumber());
}

export function getAllEpisodeData(): EpisodeData[] {
  return mattlieberData.data; // Returns the whole json array of episodes
}