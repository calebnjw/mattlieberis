import { getAllEpisodeData } from "@/lib/utils/episodeUtils";
import Link from "next/link";

export default function AllEpisodesPage() {
  const allEpisodeData = getAllEpisodeData();

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4">
        {allEpisodeData.map((episodeData) => (
          <div key={episodeData.id} className="border p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-2">
              {episodeData.date} |{" "}
              {episodeData.spotifyLink === "" ? (
                <div>Not on Spotify</div>
              ) : (
                <Link
                  href={episodeData.spotifyLink}
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  Listen on Spotify
                </Link>
              )}
            </div>
            <h1 className="text-2xl font-bold">
              <Link href={`/episode/${episodeData.id}`}>{episodeData.title}</Link>
            </h1>
            <p className="mt-2">{episodeData.episodeDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
