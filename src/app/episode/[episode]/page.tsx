import Logo from "@/components/logo";
import mattlieberData from "@/public/mattlieber.json";

type Props = {
  params: Promise<{ episode: string }>;
};

export default async function EpisodePage({ params }: Props) {
  const { episode } = await params;
  const episodeData = await getEpisode(Number(episode));

  if (!episodeData) {
    return <div>Episode not found</div>;
  }

  return (
    <div>
      <Logo />
      <h1>Matt Lieber {episodeData.mattDescription}</h1>
      <p>
        {episodeData.title} | {episodeData.date} |{" "}
        <a href="{episodeData.spotifyLink}" className="href">
          Listen on Spotify
        </a>
      </p>
      <p>{episodeData.episodeDescription}</p>
    </div>
  );
}

async function getEpisode(episodeId: number) {
  const episodes = mattlieberData.data;
  return episodes[episodeId - 1]; // Subtract 1 since array is 0-based but episode IDs start at 1
}
