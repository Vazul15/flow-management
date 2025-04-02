import { NavStudentSidebarWithCollapsibleMenuProps } from "@/components/types/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { ChevronsRight } from "lucide-react";
import { useState } from "react";
import TeacherImage from "../../../assets/ballerina-teacher-com.svg";
import { DisplayAllTeachersExceptGroup } from "@/components/teachers/DisplayAllTeachersExceptGroup";
import { DisplayTeachersOfGroup } from "@/components/teachers/DisplayTeachersOfGroup";

export const SideBarLeftBodyTeachers = ({
  setContent,
}: NavStudentSidebarWithCollapsibleMenuProps) => {
  const [isTeachersMenuOpen, setIsTeachersMenuOpen] = useState(false);

  const toggleTeachersMenu = () => {
    setIsTeachersMenuOpen((prevState: boolean) => !prevState);
  };

  const showAllTeachersOfGroup = () => setContent(<DisplayTeachersOfGroup />);
  const addTeacherToGroup = () => setContent(<DisplayAllTeachersExceptGroup />);

  return (
    <>
      <Collapsible open={isTeachersMenuOpen} onOpenChange={toggleTeachersMenu}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex items-center text-white">
            <img
              src={TeacherImage}
              alt="Ballerina Students"
              width="24"
              height="24"
              className="bg-white rounded-full p-1"
            />
            <span className="mr-2">Teachers</span>
            <ChevronsRight
              className={`${isTeachersMenuOpen ? "rotate-90" : ""}`}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="text-white" >
            <SidebarMenuItem>
              <SidebarMenuButton onClick={showAllTeachersOfGroup}>
                Teachers of the group
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={addTeacherToGroup}>
                Add teacher to group
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem></SidebarMenuItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
