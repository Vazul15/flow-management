import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { studentPreview } from "../types/studentTypes";
import { studentAddColumns } from "../types/ColumnsType";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { TableSchool } from "../table/Table-School";
import { useAuth } from "../auth/AuthProvider";
import { fetchAllStudentsExceptGroup } from "@/services/studentService/studentService";
import LoadingSpinner from "../LoadingSpinner";
import { fetchAddStudentsToGroup } from "@/services/groupService/groupService";

const DisplayAllStudentsExceptGroup = () => {
  const { groupName } = useParams<{ groupName: string }>();
  const [students, setStudents] = useState<studentPreview[]>([]);
  const [selectedStudentsId, setSelectedStudentsId] = useState<string[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { toast } = useToast();

  const handleAddStudentsToGroup = async () => {
    if (selectedStudentsId.length > 0 && token && groupName) {
      try {
        await fetchAddStudentsToGroup(
          selectedStudentsId,
          groupName || "",
          token
        );
        toast({
          title: "Students added to group",
          description: `Successfully added students to group ${groupName}`,
        });
        setFetchTrigger((prev) => !prev);
      } catch (error) {
        toast({
          title: "Failed to add students",
          description: "There was an issue adding students to the group.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No students selected",
        description: "Please select at least one student.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (groupName && token) {
      const fetchStudentsData = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
          const studentsData = await fetchAllStudentsExceptGroup(
            groupName,
            token
          );
          setStudents(studentsData);
        } catch (error) {
          setError("Failed to fetch students.");
        } finally {
          setLoading(false);
        }
      };
      fetchStudentsData();
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
            columns={studentAddColumns}
            data={students}
            onRowSelectionChange={setSelectedStudentsId}
          />
          <div>
            <Button onClick={handleAddStudentsToGroup}>Add Student(s)</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayAllStudentsExceptGroup;
