"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MenubarLogo() {
  return (
    <Avatar className="size-6 m-2">
      <AvatarImage src="/replyall.jpg" />
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  );
}
