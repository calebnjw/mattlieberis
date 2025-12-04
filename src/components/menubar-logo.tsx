"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {basePath} from "../../next.config";

const avatarPath =  basePath + "/replyall.jpg";

export default function MenubarLogo() {
  return (
    <Avatar className="size-6 m-2">
      <AvatarImage src={avatarPath}/>
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  );
}
