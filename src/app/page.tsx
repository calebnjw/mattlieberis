import {EpisodeData, getEpisodeData} from "@/lib/utils/episodeUtils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Home() {
  var episodeData: EpisodeData = getEpisodeData(1);

  return (
    <div className="grid grid-cols-1 h-full content-end">
      <h1 className="h-full items-center text-6xl text-rose-500 dark:text-rose-400 font-extrabold tracking-tight">
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
                <Link href={episodeData.spotifyLink} className="text-rose-500 dark:text-rose-300">
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
