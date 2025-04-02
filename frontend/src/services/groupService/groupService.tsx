import {
  danceGroupNameAndLevel,
  groupsPageGroupDisplay,
  newGroup,
  recurringScheduleStartEndTime,
  updateGroup,
} from "@/components/types/group-type";
import { studentPreview } from "@/components/types/studentTypes";
import { TeacherPreviewAll } from "@/components/types/types";

export async function fetchCreateNewGroup(
  newGroupData: newGroup,
  token: string
): Promise<number> {
  newGroupData.groupTypes = newGroupData.groupTypes.map((type) =>
    type.toUpperCase()
  );
  newGroupData.groupLevel = newGroupData.groupLevel.toUpperCase();
  const response = await fetch("/api/group", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newGroupData),
  });
  if (!response.ok) {
    throw new Error("Failed to create new group");
  }
  const data = await response.json();
  return data.id;
}

export async function fetchAllGroupsData(
  token: string
): Promise<groupsPageGroupDisplay[]> {
  try {
    const response = await fetch("/api/group/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function fetchAddStudentsToGroup(
  studentIds: string[],
  groupName: string,
  token: string
): Promise<void> {
  const studentsBody = {
    studentsPublicId: Array.from(new Set(studentIds)),
    groupName: groupName,
  };

  const response = await fetch(`/api/group/students`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studentsBody),
  });

  if (!response.ok) {
    throw new Error("Failed to add students to group");
  }

  return response.json();
}

export async function fetchAddTeacherToGroup(
  teacherIds: string[],
  groupName: string,
  token: string
): Promise<void> {
  const teachersBody = {
    teachersPublicIds: Array.from(new Set(teacherIds)),
    groupName: groupName,
  };

  const response = await fetch("/api/group/teachers", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teachersBody),
  });

  if (!response.ok) {
    throw new Error("Failed to add teachers to group");
  }

  return response.json();
}

export async function fetchAllStudentsOfGroup(
  groupName: string,
  token: string
): Promise<studentPreview[]> {
  try {
    const response = await fetch(`/api/group/students?name=${groupName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: studentPreview[] = await response.json();
    console.log("Students: ", data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function fetchAllTeachersOfGroup(
  groupName: string,
  token: string
): Promise<TeacherPreviewAll[]> {
  const response = await fetch(`/api/group/teachers?name=${groupName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

export async function fetchRemoveStudentFromGroup(
  groupName: string,
  token: string,
  studentPublicId: string
): Promise<void> {
  const response = await fetch(
    `/api/group/${groupName}/student/${studentPublicId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to remove student: ${response.statusText}`);
  }
}

export async function removeTeacherFromGroup(
  token: string,
  teacherPublicId: string,
  groupName: string
): Promise<void> {
  const response = await fetch(
    `/api/group/${groupName}/teacher/${teacherPublicId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to remove teacher: ${response.statusText}`);
  }
}

export async function fetchGroupData(
  groupName: string,
  token: string
): Promise<updateGroup | null> {
  try {
    const response = await fetch(`/api/group?name=${groupName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function fetchUpdateGroupData(
  groupName: string,
  token: string,
  updateGroupData: updateGroup
): Promise<number> {
  updateGroupData.groupTypes = updateGroupData.groupTypes.map((type) =>
    type.toUpperCase()
  );
  updateGroupData.groupLevel = updateGroupData.groupLevel.toUpperCase();

  const response = await fetch(`/api/group/update/${groupName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateGroupData),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  console.log(data);

  return data;
}

export async function fetchGetRecurringShedulesOfGroupByDate(
  groupName: string,
  date: Date,
  token: string
): Promise<recurringScheduleStartEndTime[]> {

  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const formattedDate = utcDate.toISOString().split("T")[0];

  const response = await fetch(
    `/api/group/recurring-schedules?groupName=${encodeURIComponent(groupName)}&date=${formattedDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const data = await response.json();
  return data;
}

export async function fetchOwnGroups(
  userPublicId: string,
  token: string,
): Promise<danceGroupNameAndLevel[]> {
  try {
    const response = await fetch(
      `/api/group/all/ownGroupNames?publicId=${userPublicId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const groupNames: danceGroupNameAndLevel[] = await response.json();
    return groupNames;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export async function fetchAllGroupsName(
  token: string
): Promise<danceGroupNameAndLevel[]> {
  try {
    const response = await fetch("/api/group/all/names", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const groupNames: danceGroupNameAndLevel[] = await response.json();

    return groupNames;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};


