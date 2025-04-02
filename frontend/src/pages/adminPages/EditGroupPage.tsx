import { useEffect, useState } from "react";
import { updateGroup } from "../../components/types/group-type";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateGroupForm } from "../../components/forms/UpdateGroupForm";
import { useAuth } from "@/components/auth/AuthProvider";
import { fetchGroupData, fetchUpdateGroupData } from "@/services/groupService/groupService";

export const EditGroupPage = () => {
  const { groupName } = useParams<{ groupName: string }>();
  const [groupData, setGroupData] = useState<updateGroup | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: updateGroup) => {
    if (token && groupName) {
      const updateResponse = await fetchUpdateGroupData(groupName, token, data);
      if (updateResponse !== -1) {
        console.log("Group updated successfully!");
        navigate("/management/group/all");
      } else {
        console.error("Failed to update group");
      }
    }
  };

  useEffect(() => {
    const fetchGroup = async (): Promise<void> => {
      if (token && groupName) {
        const groupDataResponse = await fetchGroupData(groupName, token);
        setGroupData(groupDataResponse);
      }
    };
    fetchGroup();
  }, [token, groupName]);

  return (
    <div className="text-gray-200">
      <div className="relative">
        <div className="absolute top-8 left-16">
          <h1 className="text-2xl font-semibold text-gray-100">Edit Group</h1>
          <p className="text-sm text-gray-400 mt-2">
            Update the details of the selected group.<br />
            Adjust the group name, types, or level as needed.
          </p>
        </div>
      </div>

      {/* Form középen, lejjebb */}
      <div className="flex justify-center items-start pt-38">
        {groupData ? (
          <UpdateGroupForm onSubmit={handleSubmit} initialData={groupData} />
        ) : (
          <p className="text-gray-400">Loading group data...</p>
        )}
      </div>
    </div>
  );
};
