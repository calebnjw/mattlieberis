import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const episodeId: number = Math.floor(Math.random() * 203);
  const redirectUrl = `/episodes/${episodeId}`;

  redirect(redirectUrl);
}
