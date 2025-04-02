import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TableSchool } from "@/components/table/Table-School";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AttendanceStatus, StudentAttendance } from "@/components/types/types";
import { attendanceColumns } from "@/components/types/ColumnsType";
import { useParams } from "react-router-dom";
import { fetchAttendanceData, fetchUpdateStudentAttendance } from "@/services/attendanceService/attendanceService";
import { useAuth } from "@/components/auth/AuthProvider";
import { fetchGetRecurringShedulesOfGroupByDate } from "@/services/groupService/groupService";
import {
  recurringScheduleStartEndTime,
  schedule,
} from "@/components/types/group-type";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";


export const SlideBarLeftBodyAttendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState<StudentAttendance[]>([]);
  const [schedules, setSchedules] = useState<recurringScheduleStartEndTime[]>(
    []
  );
  const [selectedSchedule, setSelectedSchedule] =
    useState<recurringScheduleStartEndTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { groupName } = useParams();
  const { toast } = useToast();


  const toggleAttendanceStatus = async (
    studentPublicId: string,
    newStatus: AttendanceStatus
  ) => {
    if (token && groupName && selectedDate && selectedSchedule) {
      try {
        const response = await fetchUpdateStudentAttendance(
          groupName,
          token,
          studentPublicId,
          newStatus,
          selectedDate,
          selectedSchedule.startTime,
          selectedSchedule.endTime
        );

        if (response) {
          setAttendanceData((prevData) =>
            prevData.map((student) =>
              student.publicId === studentPublicId
                ? { ...student, isPresent: response.isPresent }
                : student
            )
          );
        } else {
          throw new Error("Failed to update attendance status on the server.");
        }
      } catch (error) {
        console.error("Error updating attendance status:", error);
        toast({
          title: "Failed to update attendance",
          description: "Something went wrong while updating the attendance.",
          variant: "destructive",
        });
      }
    }
  };


  useEffect(() => {
    if (groupName && token) {
      setSelectedSchedule(null);
      setAttendanceData([]);
      const fetchGroupRecurringSchedules = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchGetRecurringShedulesOfGroupByDate(
            groupName,
            selectedDate,
            token
          );
          setSchedules(data);
        } catch (error) {
          toast({
            title: "Failed to fetch group recurring schedules",
            description:
              "There was an issue fetching the group recurring schedules.",
            variant: "destructive",
          });
          setError("Failed to fetch group recurring schedules.");
        } finally {
          setLoading(false);
        }
      };
      fetchGroupRecurringSchedules();
    }
  }, [selectedDate, groupName, token]);

  useEffect(() => {
    if (groupName && token && selectedSchedule) {
      const fetchStudentsAttendance = async () => {
        setLoading(true);
        setError(null);
        try {
          const schedule: schedule = {
            date: selectedDate,
            startTime: selectedSchedule.startTime,
            endTime: selectedSchedule.endTime,
          };
          const data = await fetchAttendanceData(schedule, groupName, token);
          console.log("student schedules: " + data);

          setAttendanceData(data);
        } catch (error) {
          toast({
            title: "Failed to fetch studens attendace data",
            description: "There was an issue fetching studens attendace data.",
            variant: "destructive",
          });
          setError("Failed to fetch studens attendace data.");
        } finally {
          setLoading(false);
        }
      };
      fetchStudentsAttendance();
    }
  }, [selectedSchedule, selectedDate, groupName, token]);

  const columns = attendanceColumns(toggleAttendanceStatus);

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <DayPicker
          selected={selectedDate}
          onDayClick={(date) => {
            setSelectedDate(date);
            setSelectedSchedule(null);
          }}
          toDate={new Date()}
          className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
          classNames={{
            day_selected: "bg-[#c49a6c] text-white",
            day_today: "border border-[#c49a6c] text-[#c49a6c] font-semibold",
            day: "hover:bg-gray-100 transition-all duration-200 ease-in-out",
          }}
        />

        <div className="ml-auto mr-auto p-12 border-2 border-[#c49a6c52] bg-[#d3cbb5] rounded-lg shadow-lg">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-left text-[#4B3B2F]">
              Schedules of the day
            </h3>
            <div className="flex flex-col gap-2 mt-2">
              {schedules.length > 0 ? (
                schedules.map((schedule, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedSchedule === schedule ? "default" : "outline"
                    }
                    onClick={() => setSelectedSchedule(schedule)}
                  >
                    {`${schedule.startTime.slice(
                      0,
                      5
                    )} - ${schedule.endTime.slice(0, 5)}`}
                  </Button>
                ))
              ) : (
                <p>No school hours on the day</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <TableSchool
            columns={columns}
            data={attendanceData}
          />
        </>
      )}
    </div>
  );
};
