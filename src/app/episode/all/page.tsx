import { getAllEpisodeData } from "@/lib/utils/episodeUtils";
import Link from "next/link";

export default function AllEpisodesPage() {
  const allEpisodeData = getAllEpisodeData();

  return (
    <div className="container mx-auto p-4">
      <h1>I&apos;m the all episodes page</h1>
      <h1 className="text-2xl font-bold mb-4">All Episodes</h1>
      <div className="grid gap-4">
        {allEpisodeData.map((episodeData) => (
          <div key={episodeData.id} className="border p-4 rounded-lg">
            <h1>
              <Link href={`/episode/${episodeData.id}`}>{episodeData.title}</Link>
            </h1>
            <p>
              {episodeData.date} |{" "}
              {episodeData.spotifyLink === "" ? (
                "Not on Spotify"
              ) : (
                <Link href={episodeData.spotifyLink} rel="noopener noreferrer">
                  Listen on Spotify
                </Link>
              )}
            </p>
            <p className="my-2">{episodeData.episodeDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
