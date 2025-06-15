import Logo from "@/components/logo";
import Link from "next/link";
import mattlieberData from "@/public/mattlieber.json";
import { getEpisodeData, EpisodeData } from "@/utils/episodeUtils";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ episode: string }>;
};

// // Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const episodes: EpisodeData[] = getAllEpisodeData();
//   return episodes.map((episode: EpisodeData) => ({
//     episode: episode,
//   }));
// }

export default async function EpisodePage({ params }: Props) {
  const { episode } = await params;
  const episodeData: EpisodeData = await getEpisodeData(Number(episode));

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
