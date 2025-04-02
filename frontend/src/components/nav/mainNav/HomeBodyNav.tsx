import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, to, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        to={to}
        className={cn(
          "hover:bg-accent block text-text select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-none transition-colors hover:border-border dark:hover:border-darkBorder",
          className
        )}
        {...props}
      >
        <div className="text-base font-heading leading-none">{title}</div>
        <p className="text-muted-foreground font-base line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

export const HomeBodyNav = () => {
  const { userRoles } = useAuth();
  const isAdmin = userRoles.includes("ROLE_ADMIN");

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row flex-wrap justify-center items-center space-x-4 w-full bg-background">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="m750:max-w-[80px] m750:text-xs text-base font-heading leading-none">
              Employment
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[500px] lg:grid-cols-[.75fr_1fr] m750:w-[300px]">
                <ListItem to="https://ui.shadcn.com/docs" title="Time log" />
                <ListItem
                  to="https://ui.shadcn.com/docs/installation"
                  title="Personal vacation calendar"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="m750:max-w-[80px] m750:text-xs text-base font-heading leading-none">
              Teacher Dashboard
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[500px] lg:grid-cols-[.75fr_1fr] m750:w-[300px]">
                <ListItem to="/teacher/groups" title="My Groups" />
                <ListItem to="/teacher/students" title="My Students" />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {isAdmin && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/management"
                  className="hover:bg-accent block p-3 rounded-md text-base font-heading leading-none"
                >
                  Admin Management
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
