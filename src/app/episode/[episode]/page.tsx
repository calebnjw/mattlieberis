import Logo from "@/components/logo";
import Link from "next/link";
import mattlieberData from "@/public/mattlieber.json";
import { getEpisodeData } from "@/utils/episodeUtils";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ episode: string }>;
};

export default async function EpisodePage({ params }: Props) {
  const { episode } = await params;
  const episodeData = await getEpisodeData(Number(episode));

  if (!episodeData) {
    notFound();
  }

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

async function getEpisode(episodeId: number) {
  const episodes = mattlieberData.data;
  return episodes[episodeId - 1]; // Subtract 1 since array is 0-based but episode IDs start at 1
}
