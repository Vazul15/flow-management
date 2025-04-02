import { studentPreview, newStudent } from "@/components/types/studentTypes";

export async function fetchAllStudentsExceptGroup(
  groupName: string,
  token: string
): Promise<studentPreview[]> {
  const response = await fetch(
    `/api/student/all/except-group?name=${groupName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchAllStudentsData(
  token: string
): Promise<studentPreview[]> {
  try {
    const response = await fetch(`/api/student/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: studentPreview[] = await response.json();
    console.log("Students: ", data);
    console.log("Token: ", token);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function fetchDeleteStudent(
  studentPublicId: string,
  token: string
): Promise<void> {
  const response = await fetch(`/api/student/${studentPublicId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  if (response.status === 204) {
    return;
  }
  return response.json();
}

export async function fetchCreateNewStudent(
  newStudentData: newStudent,
  token: string
): Promise<string | void> {
  newStudentData.gender = newStudentData.gender.toUpperCase();

  try {
    const response = await fetch("/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newStudentData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.publicId;
  } catch (error) {
    console.error("Failed to create new student:", error);
    throw new Error("Failed to create student");
  }
}
