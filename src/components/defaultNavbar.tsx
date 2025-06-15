import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

import MenubarLogo from "./menubarLogo";

export default function DefaultNavbar() {
  return (
    <div className="flex flex-row align-center w-full gap-x-2">
      <Link href="/">
        <MenubarLogo />
      </Link>
      <NavigationMenu viewport={false} className="gap-x-2">
        <NavigationMenuItem className="list-none">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/all">All Episodes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="list-none">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}
