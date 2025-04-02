import { groupsPageGroupDisplay } from "../types/group-type";
import { PencilIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import SpotlightCard from "../ui/SpotlightCard/SpotlightCard";
import { useNavigate } from "react-router-dom";
import CountUp from "../ui/CountUp/CountUp";

interface GroupCardProps {
  group: groupsPageGroupDisplay;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const navigate = useNavigate();

  const handleManageClick = () => {
    navigate(`/groups/${group.groupName}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/management/group/edit/${group.groupName}`);
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <SpotlightCard className="p-6 bg-gray-800 rounded-xl relative cursor-pointer hover:shadow-xl transform transition-transform hover:scale-105 border border-gray-300 overflow-hidden">
        <div className="relative">
          <h3 className="text-xl font-semibold text-gray-200">
            {group.groupName}
          </h3>
          <PencilIcon
            className="absolute top-4 right-4 h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-300"
            onClick={handleEditClick}
          />
        </div>

        <div className="mt-4">
          <p className="text-sm italic text-gray-300">
            {group.groupLevel.charAt(0).toUpperCase() + group.groupLevel.slice(1).toLowerCase()}
          </p>
        </div>

        <div className="absolute bottom-4 right-4 text-gray-400">
          <CountUp
            to={group.studentsNumber}
            duration={2}
            className="text-gray-400 text-sm"
            separator=","
          />
          <span className="ml-1 text-gray-400">students</span>
        </div>

        <Button
          className="mt-4 px-4 py-2 text-white rounded-mdtransition-colors duration-300"
          onClick={handleManageClick}
        >
          Manage Group
        </Button>
      </SpotlightCard>
    </div>
  );
};
