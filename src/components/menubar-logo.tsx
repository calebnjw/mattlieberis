"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const config = require("../../next.config.ts");
console.log("CONFIG >>> ");
console.log(config);
console.log("BASEPATH: " + config.basePath);
const avatarPath =
  config.basePath == undefined ? "/replyall.jpg" : config.basePath + "/replyall.jpg";
console.log("AVATAR LOCATION: " + avatarPath);

export default function MenubarLogo() {
  return (
    <Avatar className="size-6 m-2">
      <AvatarImage src={avatarPath}/>
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  );
}
