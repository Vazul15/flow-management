import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { TeacherPreviewAll } from "../types/types";
import { teacherAddColumns } from "../types/ColumnsType";
import { Button } from "../ui/button";
import { TableSchool } from "../table/Table-School";
import { useAuth } from "../auth/AuthProvider";
import { fetchAllTeachersExceptGroup} from "@/services/teacherService/teacherService";
import LoadingSpinner from "../LoadingSpinner";
import { fetchAddTeacherToGroup } from "@/services/groupService/groupService";


export const DisplayAllTeachersExceptGroup = () => {
  const { groupName } = useParams<{ groupName: string }>();
  const [teachers, setTeachers] = useState<TeacherPreviewAll[]>([]);
  const [selectedTeachersId, setSelectedTeachersId] = useState<string[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { toast } = useToast();

  const handleAddTeacherToGroup = async () => {
    if (selectedTeachersId.length > 0 && token && groupName) {
        try {
          await fetchAddTeacherToGroup(selectedTeachersId, groupName, token);
          toast({
            title: "Teachers added to group",
            description: `Successfully added teachers to group ${groupName}`,
          });
          setFetchTrigger((prev) => !prev);
        } catch (error) {
          toast({
            title: "Failed to add teachers",
            description: "There was an issue adding teachers to the group.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      setLoading(true);
    } else {
      toast({
        title: "No teachers selected",
        description: "Please select at least one teacher.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (groupName && token) {
      const fetchTeacherData = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
          const teacherData = await fetchAllTeachersExceptGroup(groupName, token);
          setTeachers(teacherData);
        } catch (error) {
          toast({
            title: "Failed to fetch teachers",
            description: "There was an issue fetching the teachers data.",
            variant: "destructive",
          });
          setError("Failed to fetch teachers.");
        } finally {
          setLoading(false);
        }
      };
      fetchTeacherData();
    }
  }, [groupName, fetchTrigger, token]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <TableSchool
            columns={teacherAddColumns}
            data={teachers}
            onRowSelectionChange={setSelectedTeachersId}
          />
          <div>
            <Button onClick={handleAddTeacherToGroup}>Add Teacher(s)</Button>
          </div>
        </>
      )}
    </div>
  );
};
