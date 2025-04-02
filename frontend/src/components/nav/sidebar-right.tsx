import * as React from "react";

//import { Calendars } from "@/components/nav/calendars";
//import { DatePicker } from "@/components/nav/date-picker";
import { NavUser } from "@/components/nav/nav-user";
import {
  Sidebar,
  //SidebarContent,
  //SidebarFooter,
  SidebarHeader,
  //SidebarMenu,
  //SidebarMenuButton,
  //SidebarMenuItem,
  //SidebarSeparator,
} from "@/components/ui/sidebar";
import { teacherNameEmail } from "../types/teacherTypes";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
//import { Plus } from "lucide-react";

// const data = {
//   calendars: [
//     {
//       name: "Notes",
//       items: ["To have an essay written", "A colleague is also coming", "Family"],
//     },
//   ],
// };

const fetchTeacher = async (publicId: string, token: string): Promise<teacherNameEmail> => {
  try {
    const response = await fetch(`/api/teacher?publicId=${publicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { userPublicId, token } = useAuth();
  const [teacher, setTeacher] = useState<teacherNameEmail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (userPublicId && token) {
        try {
          const teacherData = await fetchTeacher(userPublicId, token);
          setTeacher(teacherData);
        } catch (error) {
          console.error("Failed to fetch teacher data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [userPublicId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        {teacher ? (
          <NavUser user={teacher} />
        ) : (
          <div>No teacher data available</div>
        )}
      </SidebarHeader>
      {/* <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>Add New Note</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
