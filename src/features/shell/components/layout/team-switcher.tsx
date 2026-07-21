"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile, state } = useSidebar();
  const [activeTeam, setActiveTeam] = useState(teams[0]);
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild={true as any}>
            <SidebarMenuButton
              size="lg"
              className="group/team relative overflow-hidden data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Gradient Logo Container */}
              <div className="relative flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-sky-500 shadow-md shadow-blue-500/20 transition-transform group-hover/team:scale-105">
                {activeTeam?.logo && (() => { const ActiveTeamLogo = activeTeam.logo; return <ActiveTeamLogo className="size-4 text-white" />; })()}
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-lg bg-linear-to-br from-white/20 to-transparent" />
              </div>

              {!isCollapsed && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeTeam?.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground flex items-center gap-1">
                      {activeTeam?.plan}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-muted-foreground transition-colors group-hover/team:text-foreground" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-border/50 bg-background/95 backdrop-blur-xl shadow-xl z-50"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
                Teams
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-3 p-2.5 cursor-pointer rounded-lg transition-colors"
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500/10 to-sky-500/10 border border-blue-500/20">
                    {(() => { const TeamLogo = team.logo; return <TeamLogo className="size-4 text-blue-600 dark:text-blue-400" />; })()}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{team.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {team.plan}
                    </div>
                  </div>
                  <DropdownMenuShortcut className="bg-muted px-1.5 py-0.5 rounded text-[10px]">
                    ⌘{index + 1}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-3 p-2.5 cursor-pointer rounded-lg">
                <div className="flex size-8 items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50">
                  <Plus className="size-4 text-muted-foreground" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add new team
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
