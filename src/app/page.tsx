import { EpisodeData, getRandomEpisodeData } from "@/lib/utils/episodeUtils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Home() {
  const episodeData: EpisodeData = getRandomEpisodeData();

  return (
    <div className="flex flex-col h-100 content-center items-center">
      <h1 className="text-6xl text-rose-500 font-extrabold tracking-tight">
        Matt Lieber {episodeData.mattDescription}
      </h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="episode-information">
          <AccordionTrigger>
            {episodeData.title} | {episodeData.date}
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 mb-2">{episodeData.episodeDescription}</div>
            <div className="text-sm font-medium text-gray-500 mb-2">
              {episodeData.spotifyLink === "" ? (
                ""
              ) : (
                <Link href={episodeData.spotifyLink} className="text-rose-500">
                  Listen on Spotify
                </Link>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
