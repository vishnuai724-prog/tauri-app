"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { NavCollapsible, NavItem, NavLink, type NavGroup } from "@/shared/lib/types";
import { cn } from "@/shared/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { Badge } from "@/shared/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";

export function NavGroup({ title, items }: NavGroup) {
  const { pathname: pathName } = useLocation();
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} href={pathName} />;

          if (state === "collapsed")
            return (
              <SidebarMenuCollapsedDropdown
                key={key}
                item={item}
                href={pathName}
              />
            );

          return (
            <SidebarMenuCollapsible key={key} item={item} href={pathName} />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavBadge = ({
  children,
  color = "blue",
}: {
  children: ReactNode;
  color?: "blue" | "green";
}) => {
  const colorClasses =
    color === "green"
      ? "bg-green-500/10 text-green-600 dark:text-green-400"
      : "bg-blue-500/10 text-blue-600 dark:text-blue-400";

  return (
    <Badge
      className={`ml-auto rounded-full border-0 px-2 py-0.5 text-[10px] font-medium ${colorClasses}`}
    >
      {children}
    </Badge>
  );
};

const SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {
  const { setOpenMobile } = useSidebar();
  const isActive = checkIsActive(href, item);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link to={item.url} onClick={() => setOpenMobile(false)} />}
        isActive={isActive}
        tooltip={item.title}
        className={cn(
          "group/link relative transition-all duration-200",
          isActive && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        )}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-linear-to-b from-blue-500 to-sky-500" />
        )}
        {item.icon && (() => { const Icon = item.icon; return <Icon className="transition-colors" />; })()}
        <span className="font-medium">{item.title}</span>
        {item.badge && (
          <NavBadge color={item.badgeColor ?? 'blue'}>{item.badge}</NavBadge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarMenuCollapsible = ({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) => {
  const { setOpenMobile } = useSidebar();
  const isActive = checkIsActive(href, item, true);

  return (
    <Collapsible defaultOpen={isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger>
          <SidebarMenuButton
            tooltip={item.title}
            className={cn(
              "group/link transition-all duration-200",
              isActive && "text-blue-600 dark:text-blue-400",
            )}
          >
            {item.icon && (() => { const Icon = item.icon; return <Icon className="transition-colors" />; })()}
            <span className="font-medium">{item.title}</span>
            {item.badge && (
              <NavBadge color={item.badgeColor ?? 'blue'}>{item.badge}</NavBadge>
            )}
            <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub className="border-l-2 border-blue-500/20 ml-3.5">
            {item.items.map((subItem) => {
              const isSubActive = checkIsActive(href, subItem);
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    render={<Link to={subItem.url} onClick={() => setOpenMobile(false)} />}
                    isActive={isSubActive}
                    className={cn(
                      "transition-all duration-200",
                      isSubActive &&
                      "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                    )}
                  >
                    {subItem.icon && <subItem.icon className="size-4" />}
                    <span>{subItem.title}</span>
                    {subItem.badge && (
                      <NavBadge color={subItem.badgeColor ?? 'blue'}>
                        {subItem.badge}
                      </NavBadge>
                    )}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const SidebarMenuCollapsedDropdown = ({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) => {
  const isActive = checkIsActive(href, item, true);

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className={cn(
              "transition-all duration-200",
              isActive &&
              "bg-blue-500/10 text-blue-600 dark:text-blue-400",
            )}
          >
            {item.icon && (() => { const Icon = item.icon; return <Icon className="transition-colors" />; })()}
            <span className="font-medium">{item.title}</span>
            {item.badge && (
              <NavBadge color={item.badgeColor ?? 'blue'}>{item.badge}</NavBadge>
            )}
            <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={4}
          className="min-w-52 rounded-xl border-border/50 bg-background/95 backdrop-blur-xl shadow-xl"
        >
          <DropdownMenuGroup><DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">{item.title}</DropdownMenuLabel></DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-border/50" />
          {item.items.map((sub) => {
            const isSubActive = checkIsActive(href, sub);
            return (
              <DropdownMenuItem
                key={`${sub.title}-${sub.url}`}
                asChild
                className="rounded-lg"
              >
                <Link to={sub.url}
                  className={cn(
                    "flex items-center gap-2 px-2 py-2",
                    isSubActive &&
                    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                  )}
                >
                  {sub.icon && <sub.icon className="size-4" />}
                  <span className="max-w-52 text-wrap">{sub.title}</span>
                  {sub.badge && (
                    <span className="ml-auto text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">
                      {sub.badge}
                    </span>
                  )}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url ||
    href.split("?")[0] === item.url ||
    !!item?.items?.filter((i) => i.url === href).length ||
    (mainNav &&
      href.split("/")[1] !== "" &&
      href.split("/")[1] === item?.url?.toString().split("/")[1])
  );
}
