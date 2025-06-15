import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

import MenubarLogo from "@/components/menubarLogo";
import { ThemeToggle } from "@/components/themeToggle";

export default function DefaultNavbar() {
  return (
    <div className="flex flex-row justify-between border border-neutral-200 dark:border-neutral-900 rounded-full bg-white dark:bg-black w-full px-1">
      <div className="flex">
        <Link href="/">
          <MenubarLogo />
        </Link>
        <NavigationMenu viewport={false} className="gap-x-1">
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
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </div>
  );
}
