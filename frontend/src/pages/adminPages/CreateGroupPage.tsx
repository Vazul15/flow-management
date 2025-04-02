import { newGroup } from "../../components/types/group-type";
import { NewGroupForm } from "../../components/forms/NewGroupForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const fetchCreateNewGroup = async (
  newGroupData: newGroup,
  token: string
): Promise<number> => {
  newGroupData.groupTypes = newGroupData.groupTypes.map((type) =>
    type.toUpperCase()
  );
  newGroupData.groupLevel = newGroupData.groupLevel.toUpperCase();

  try {
    const response = await fetch("/api/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newGroupData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Failed to create new group:", error);
    return -1;
  }
};
export const CreateGroupPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateGroup = async (formData: newGroup) => {
    if (token) {
      setLoading(true);
      setError(null);

      try {
        const groupId = await fetchCreateNewGroup(formData, token);

        if (groupId !== -1) {
          navigate("/management/group/all");
        } else {
          setError("Failed to create group");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="text-gray-200">
      <div className="relative">
        <div className="absolute top-20 left-16">
          <h1 className="text-2xl font-semibold text-gray-100">
            Create a New Group
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Provide the necessary details below to create a new group for your activities. <br />
            Make sure to select at least one group type and level.
          </p>
        </div>
      </div>

      {/* Form középen, lejjebb */}
      <div className="flex justify-center items-start pt-48">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <NewGroupForm onSubmit={handleCreateGroup} />
        )}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            <strong>Error: </strong>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};


// return (
//   <div className="p-1 bg-gray-200 rounded-2xl max-w-md mx-auto">
//     {loading ? (
//       <LoadingSpinner />
//     ) : (
//       <NewGroupForm onSubmit={handleCreateGroup} />
//     )}
//     {error && (
//       <div style={{ color: "red", marginTop: "10px" }}>
//         <strong>Error: </strong>
//         {error}
//       </div>
//     )}
//   </div>
// );