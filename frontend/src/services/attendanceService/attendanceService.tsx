import { AttendanceStatus, StudentAttendance, updatedStudentAttendance } from "@/components/types/types";
import { schedule } from "@/components/types/group-type";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

export async function fetchAttendanceData (schedule: schedule, groupName: string, token: string) {
  try {
    const utcDate = new Date(Date.UTC(schedule.date.getFullYear(), schedule.date.getMonth(), schedule.date.getDate()));
    const formattedDate = utcDate.toISOString().split("T")[0];

    const response = await fetch(`/api/attendance?groupName=${groupName}&date=${formattedDate}&startTime=${schedule.startTime}&endTime=${schedule.endTime}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error("Failed to fetch attendance data");
      return [];
    }

    const data: StudentAttendance[] = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching attendance data", error);
    return [];
  }
};

export async function fetchUpdateStudentAttendance (groupName: string, token: string, studentPublicId: string, newStatus: AttendanceStatus, selectedDate: Date,  startTime: string,
  endTime: string): Promise<updatedStudentAttendance> {
  try {
        const body = {
          studentPublicId,
          groupName,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime,
          endTime,
          isPresent: newStatus
        }
        const response = await fetch("/api/attendance", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(body),
        });
  
        if (!response.ok) {
          toast({
            title: "Failed to update attendance status",
            description: "There was an issue updating the attendance.",
            variant: "destructive",
          });
          throw new Error("Network response was not ok")
        } else {
          toast({
            title: "Attendance updated",
            description: "The student's attendance status has been successfully updated.",
            variant: "default",
          });
          const data: updatedStudentAttendance = await response.json();
          return data;
        }
      } catch (error) {
        console.error("Error updating attendance status", error);
        throw new Error("Failed to update attendance status: " + error);
      }
}