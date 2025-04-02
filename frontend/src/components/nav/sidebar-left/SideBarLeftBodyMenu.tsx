import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavStudentSidebarWithCollapsibleMenuProps } from "../../types/types";
import { SideBarLeftBodyStudent } from "./SideBarLeftBodyStudents";
import { SideBarLeftBodyTeachers } from "./SideBarLeftBodyTeachers";
import { SlideBarLeftBodyAttendance } from "./SlideBarLeftBodyAttendance";
import AttendanceIcon from "../../../assets/Attendance.svg";


export function SideBarLeftBodyMenu({
  setContent,
}: NavStudentSidebarWithCollapsibleMenuProps) {

  const handleAttendanceClick = () => {
    setContent(<SlideBarLeftBodyAttendance />);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SideBarLeftBodyTeachers setContent={setContent} />
        <SideBarLeftBodyStudent setContent={setContent} />
        <SidebarMenuButton onClick={handleAttendanceClick} className=" text-white">
          <img
            src={AttendanceIcon}
            alt="Attendance Icon"
            className="w-6 h-6 bg-white rounded-full p-1"
          />
          <span className="ml-1 ">Attendance</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
