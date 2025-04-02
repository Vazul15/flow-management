import { useAuth } from "@/components/auth/AuthProvider";
import { GroupCard } from "@/components/groups/GroupCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { groupsPageGroupDisplay } from "@/components/types/group-type";
import { fetchAllGroupsData } from "@/services/groupService/groupService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DisplayGroupsPage = () => {
  const [groups, setGroups] = useState<groupsPageGroupDisplay[]>([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async (): Promise<void> => {
      if (token) {
        try {
          setLoading(true);
          const groupsData = await fetchAllGroupsData(token);
          setGroups(groupsData);
        } catch (error) {
          setError("Failed to load groups");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchGroups();
  }, [token, navigate]);

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {loading ? (
        <div className="flex justify-center items-center w-full h-96">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : groups && groups.length > 0 ? (
        groups.map((group) => <GroupCard key={group.groupName} group={group} />)
      ) : (
        <p className="text-gray-500">No groups available.</p>
      )}
    </div>
  );
};
