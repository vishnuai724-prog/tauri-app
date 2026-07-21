"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  Sidebar as UISidebar,
} from "@/shared/components/ui/sidebar";
import React from "react";
import { sidebarData } from "@/shared/config/sidebar";
import { useAuth } from "@/shared/contexts/auth-context";
import { useSidebarConfig } from "@/shared/contexts/sidebar-context";
import { NavGroup } from "@/features/shell/components/layout/nav-group";
import { NavUser } from "@/features/shell/components/layout/nav-user";
import { TeamSwitcher } from "@/features/shell/components/layout/team-switcher";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof UISidebar>) {
  const { user } = useAuth();
  const { config } = useSidebarConfig();

  return (
    <UISidebar
      variant={config.variant}
      collapsible={config.collapsible}
      side={config.side}
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((nav) => (
          <NavGroup key={nav.title} {...nav} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.name,
              email: user.email,
              avatar: user.avatar || "",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
}
