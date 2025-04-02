import { useEffect, useState } from "react";
import { studentPreview } from "../../components/types/studentTypes";
import { allStudentPreviewEditable } from "../../components/types/ColumnsType";
import { TableSchool } from "@/components/table/Table-School";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  fetchAllStudentsData,
  fetchDeleteStudent,
} from "@/services/studentService/studentService";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export const DisplayAllStudentsPage = () => {
  const [students, setStudents] = useState<studentPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDeleteStudent = async (studentPublicId: string) => {
    if (token) {
      try {
        setLoading(true);
        await fetchDeleteStudent(studentPublicId, token);
        setStudents((prev) =>
          prev.filter((student) => student.publicId !== studentPublicId)
        );
        toast({
          title: "Student Deleted",
          description: `The student has been successfully deleted.`,
        });
      } catch (error: any) {
        setError(`Failed to delete student: ${error.message}`);
        toast({
          title: "Error",
          description: `Failed to delete student: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchAllStudents = async () => {
      if (token) {
        setLoading(true);
        try {
          const studentsData = await fetchAllStudentsData(token);
          setStudents(studentsData);
        } catch (error) {
          setError("Failed to fetch students data.");
          toast({
            title: "Error",
            description: "Failed to fetch students data.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAllStudents();
  }, [token, navigate, toast]);

  const columns = allStudentPreviewEditable(handleDeleteStudent);

  return (
    <div className="text-gray-200">
      <div className="relative">
        <div className="absolute top-20 left-16">
          <h1 className="text-2xl font-semibold text-gray-100">All Students</h1>
          <p className="text-sm text-gray-400 mt-2">
            View and manage the list of all registered students.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-start pt-48 ">
        <div className="w-full max-w-[90%] mx-auto p-1 bg-white shadow-lg rounded-lg overflow-auto">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div style={{ color: "red", marginBottom: "10px" }}>
              <strong>Error: </strong>
              {error}
            </div>
          ) : (
            <TableSchool columns={columns} data={students} />
          )}
        </div>
      </div>
    </div>
  );
};
