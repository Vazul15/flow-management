import * as React from "react";
import { useState, useEffect } from "react";
import { Calendar, Home, MessageCircleQuestion, Settings2 } from "lucide-react";
import { NavMain } from "@/components/nav/nav-main";
//import { NavSecondary } from "@/components/nav/nav-secondary";
import { TeamSwitcher } from "@/components/nav/sidebar-left/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { danceGroupNameAndLevel } from "../../types/group-type";
import { SideBarLeftBodyMenu } from "./SideBarLeftBodyMenu";
import { useAuth } from "@/components/auth/AuthProvider";
import { fetchAllGroupsName, fetchOwnGroups } from "@/services/groupService/groupService";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};


export function SidebarLeft({
  setContent,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  setContent: (content: JSX.Element | null) => void;
}) {
  const [groupsNameAndLevel, setGroupsNameAndLevel] = useState<danceGroupNameAndLevel[]>(
    []
  );
  const { userPublicId, token, userRoles } = useAuth();
  const isAdmin = userRoles.includes("ROLE_ADMIN");

  useEffect(() => {
    const fetchGroupsData = async (): Promise<void> => {
      if (isAdmin && token) {
        const groups = await fetchAllGroupsName(token);
        setGroupsNameAndLevel(groups);
      } else {
        if (token && userPublicId) {
          const groups = await fetchOwnGroups(userPublicId, token);
          setGroupsNameAndLevel(groups);
        } else {
          console.log("No token or userPublicId found.");
        }
      }
    };

    fetchGroupsData();
  }, [token, userPublicId, isAdmin]);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          danceGroups={groupsNameAndLevel.map((group) => ({
            name: group.groupName,
            level: group.groupLevel,
          }))}
        />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <SideBarLeftBodyMenu setContent={setContent} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}


