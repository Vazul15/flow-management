import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { fetchAllGroupsName } from "@/services/groupService/groupService";
import AnimatedList from "../../components/ui/AnimatedList/AnimatedList";
import { StudentStatistics } from "@/components/statistics/StudentStatistics";
import CountUp from "@/components/ui/CountUp/CountUp";

export const StatisticsPage = () => {
    const [groupNames, setGroupNames] = useState<string[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [groupStudentNumber, setGroupStudentNumber] = useState<number>(0);
    const { token } = useAuth();

    useEffect(() => {
        const fetchAllGroupNames = async () => {
            try {
                if (token) {
                    const data = await fetchAllGroupsName(token);
                    setGroupNames(data.map((group) => group.groupName));
                }
            } catch (error) {
                console.error("Failed to fetch group names", error);
            }
        };

        fetchAllGroupNames();
    }, [token]);

    const handleGroupSelect = (groupName: string) => {
        setSelectedGroup(selectedGroup === groupName ? "" : groupName);
        console.log(groupName);
    };


    return (
        <div className="flex flex-row w-full h-screen ">
            <div className="w-1/4 min-w-[200px] max-w-[300px] p-4 shadow-md border-r overflow-auto">
                <h2 className="text-lg font-semibold mb-4">Groups</h2>
                {groupNames.length > 0 && (
                    <AnimatedList
                        items={groupNames}
                        onItemSelect={(groupName) => handleGroupSelect(groupName)}
                        showGradients={false}
                        enableArrowNavigation={true}
                        displayScrollbar={false}
                    />
                )}
            </div>
            <div className="flex-1 p-6">
                {selectedGroup.length > 0 ? (
                    <div className="bg-gradient-to-br from-zinc-700 to-zinc-100 border-gray-300 shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Statistics for "{selectedGroup}" Group
                        </h2>
                        <div className="flex flex-col mb-6 mt-15">
                            <h3 className="text-lg font-light text-white mb-2">
                                Number of students in the group:
                            </h3>
                            <CountUp
                                to={groupStudentNumber}
                                duration={2}
                                className="text-5xl font-bold text-yellow-200"
                                separator=","

                            />
                        </div>
                        <StudentStatistics
                            groupName={selectedGroup}
                            setGroupStudentNumber={setGroupStudentNumber} />
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <p className="text-gray-500 text-lg">
                            Select a group to view statistics.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

