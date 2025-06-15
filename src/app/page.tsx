import { EpisodeData, getRandomEpisodeData } from "@/lib/utils/episodeUtils";
import Logo from "@/components/logo";
import Link from "next/link";

export default function Home() {
  const episodeData: EpisodeData = getRandomEpisodeData();

  return (
    <div>
      <Logo />
      <h1>Matt Lieber {episodeData.mattDescription}</h1>
      <p>
        {episodeData.title} | {episodeData.date} |{" "}
        {episodeData.spotifyLink === "" ? (
          "Not on Spotify"
        ) : (
          <Link href={episodeData.spotifyLink}>Listen on Spotify</Link>
        )}
      </p>
      <p>{episodeData.episodeDescription}</p>
    </div>
  );
}
