import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

import MenubarLogo from "@/components/menubar-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DefaultNavbar() {
  return (
    <div className="w-full max-w-3xl absolute flex flex-row justify-between border border-neutral-200 dark:border-neutral-900 rounded-full bg-white dark:bg-black">
      <div className="flex">
        <Link href="/">
          <MenubarLogo />
        </Link>
        <NavigationMenu viewport={false} className="gap-x-1">
          <NavigationMenuItem className="list-none">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle() }>
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
