import { ChevronDown, //Plus
  } from "lucide-react";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useNavigate, useParams } from "react-router-dom";

export function TeamSwitcher({ danceGroups }: {
  danceGroups: {
    name: string;
    level: string;
  }[];
}) {

  const [activeGroup, setActiveGroup] = useState(danceGroups.length > 0 ? danceGroups[0] : null);
  const { groupName } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (groupName) {
      const group = danceGroups.find((group) => group.name === groupName);
      if (group) {
        setActiveGroup(group);
      }
    }
  }, [danceGroups]);

  const handleGroupSelect = (group: { name: string; level: string;}) => {
    setActiveGroup(group);
    navigate(`/groups/${group.name}`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5" isActive={true}>
              {activeGroup ? (
                <>
                  <span className="truncate font-semibold">{activeGroup.name}</span>
                  <ChevronDown className="opacity-50" />
                </>
              ) : (
                <span className="font-semibold" >Select Group</span>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Dance Groups
            </DropdownMenuLabel>
            {danceGroups.map((team) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => handleGroupSelect(team)}
                className="gap-2 p-2"
              >
                {team.name}
                <DropdownMenuShortcut>{team.level}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Create dance group</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
