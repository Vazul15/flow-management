import { TeacherPreviewAll } from "../types/types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataTablePreview } from "../table/DataTablePreview";
import { teachersPreviewcolumns } from "../types/ColumnsType";
import { useAuth } from "../auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "../LoadingSpinner";
import {
  fetchAllTeachersOfGroup,
  removeTeacherFromGroup,
} from "@/services/groupService/groupService";

export const DisplayTeachersOfGroup = () => {
  const [teachers, setTeachers] = useState<TeacherPreviewAll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { groupName } = useParams<{ groupName: string }>();
  const { token } = useAuth();
  const { toast } = useToast();

  const handleRemoveTeacherFromGroup = async (teacherPublicId: string) => {
    if (token && groupName) {
      try {
        setLoading(true);
        await removeTeacherFromGroup(token, teacherPublicId, groupName);
        
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.publicId !== teacherPublicId)
        );
        toast({
          title: "Teacher Removed",
          description: `The teacher has been removed from the group ${groupName}.`,
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to remove teacher: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = teachersPreviewcolumns(
    handleRemoveTeacherFromGroup,
    groupName || ""
  );

  useEffect(() => {
    if (groupName && token) {
      const fetchTeachersData = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
          const teachersData = await fetchAllTeachersOfGroup(groupName, token);
          setTeachers(teachersData);
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
      fetchTeachersData();
      console.log("teachers: ", teachers);
    }
  }, [groupName, token]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <DataTablePreview columns={columns} data={teachers} />
      )}
    </div>
  );
};
