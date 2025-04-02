import { useAuth } from "@/components/auth/AuthProvider";
import { DataTablePreview } from "@/components/table/DataTablePreview";
import { studentsOfTeacherColumns } from "@/components/types/ColumnsType";
import { studentPreview } from "@/components/types/studentTypes";
import { useEffect, useState } from "react";

const fetchStudentsOfTeacher = async (
  publicId: string,
  token: string
): Promise<studentPreview[]> => {
  try {
    const response = await fetch(`/api/teacher/students?publicId=${publicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: studentPreview[] = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
export const TeacherStudentsDisplayPage = () => {
  const [students, setStudents] = useState<studentPreview[]>([]);
  const { userPublicId, token } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      if (userPublicId && token) {
        const studentData = await fetchStudentsOfTeacher(userPublicId, token);
        setStudents(studentData);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <DataTablePreview columns={studentsOfTeacherColumns} data={students} />
    </div>
  );
};
