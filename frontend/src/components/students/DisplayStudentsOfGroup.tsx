import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { studentPreview } from "../types/studentTypes";
import { studentsPreviewcolumns } from "../types/ColumnsType";
import { useAuth } from "../auth/AuthProvider";
import { DataTablePreview } from "../table/DataTablePreview";
import LoadingSpinner from "../LoadingSpinner";
import {
  fetchAllStudentsOfGroup,
  fetchRemoveStudentFromGroup,
} from "@/services/groupService/groupService";

const DisplayStudentsOfGroup = () => {
  const [students, setStudents] = useState<studentPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { groupName } = useParams<{ groupName: string }>();
  const { token } = useAuth();
  const { toast } = useToast();

  const handleDeleteStudent = async (studentPublicId: string) => {
    if (token && groupName) {
      try {
        await fetchRemoveStudentFromGroup(groupName, token, studentPublicId);

        setStudents((prev) =>
          prev.filter((student) => student.publicId !== studentPublicId)
        );

        toast({
          title: "Student Removed",
          description: `The student has been removed from the group ${groupName}.`,
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to remove student: ${error.message}`,
          variant: "destructive",
        });
      }
    }
  };
  const columns = studentsPreviewcolumns(handleDeleteStudent, groupName || "");

  useEffect(() => {
    if (groupName && token) {
      const fetchStudentsData = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
          const studentsData = await fetchAllStudentsOfGroup(groupName, token);
          setStudents(studentsData);
        } catch (error) {
          toast({
            title: "Failed to fetch students",
            description: "There was an issue fetching the students data.",
            variant: "destructive",
          });
          setError("Failed to fetch students.");
        } finally {
          setLoading(false);
        }
      };
      fetchStudentsData();
    }
  }, [groupName, token]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <DataTablePreview columns={columns} data={students} />
      )}
    </div>
  );
};

export default DisplayStudentsOfGroup;
