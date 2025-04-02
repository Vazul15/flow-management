import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../../ui/sidebar";
import { ChevronsRight } from "lucide-react";
import ballerinaImage from "@/assets/ballerina-students.svg";

import { NavStudentSidebarWithCollapsibleMenuProps } from "../../types/types";
import DisplayStudentsOfGroup from "../../students/DisplayStudentsOfGroup";
import DisplayAllStudentsExceptGroup from "../../students/DisplayAllStudentsExceptGroup";

export const SideBarLeftBodyStudent = ({
  setContent,
}: NavStudentSidebarWithCollapsibleMenuProps) => {
  const [isStudentsMenuOpen, setIsStudentsMenuOpen] = useState(false);

  const toggleStudentsMenu = () =>
    setIsStudentsMenuOpen((prevState) => !prevState);
  const showAllStudentsOfGroup = () => setContent(<DisplayStudentsOfGroup />);
  const addStudentToGroup = () => setContent(<DisplayAllStudentsExceptGroup />);
  return (
    <>
      <Collapsible open={isStudentsMenuOpen} onOpenChange={toggleStudentsMenu}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex items-center text-white">
            <img
              src={ballerinaImage}
              alt="Ballerina Students"
              width="24"
              height="24"
              className="bg-white rounded-full p-1"
            />
            <span className="mr-2">Students</span>
            <ChevronsRight
              className={`${isStudentsMenuOpen ? "rotate-90" : ""}`}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="text-white">
            <SidebarMenuItem>
              <SidebarMenuButton onClick={showAllStudentsOfGroup}>
                Students of the group
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={addStudentToGroup}>
                Add student to group
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
