import { getRandomEpisodeNumber } from "@/utils/episodeUtils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const episodeId: number = getRandomEpisodeNumber();
  const redirectUrl = `/episodes/${episodeId}`;

  redirect(redirectUrl);
}
