import { teacherNameEmail } from "@/components/types/teacherTypes";
import { TeacherPreviewAll } from "@/components/types/types";

export async function fetchAllTeachersExceptGroup(
  groupName: string,
  token: string
): Promise<TeacherPreviewAll[]> {
  const response = await fetch(
    `/api/teacher/all/except-group?name=${groupName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("API Response Status:", response.status);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchCreateTeacher (
  newTeacherData: teacherNameEmail,
  token: string
): Promise<number> {
  const teacherEmailName = {
    firstName: newTeacherData.firstName,
    email: newTeacherData.email,
  };

  const response = await fetch("/api/teacher/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teacherEmailName),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
