import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MenubarLogo() {
  return (
    <Avatar className="size-10 m-2">
      <AvatarImage src="/replyall.jpg" />
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  );
}
