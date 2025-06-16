"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const config = require("../../next.config.ts");
const avatarPath =
  config.basePath !== undefined ? config.basePath + "/replyall.jpg" : "/replyall.jpg";

export default function MenubarLogo() {
  return (
    <Avatar className="size-6 m-2">
      <AvatarImage src={avatarPath} />
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  );
}
