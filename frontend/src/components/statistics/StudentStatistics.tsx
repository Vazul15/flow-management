import { useEffect, useState } from "react";
import { studentStatistics } from "../types/studentTypes";
import { useAuth } from "../auth/AuthProvider";
import { fetchStatisticsOfGroupStudents } from "@/services/statisticService/statisticService";
import { StatisticsCard } from "./StatisticsCard";

export const StudentStatistics = ({ groupName, setGroupStudentNumber }: { groupName: string, setGroupStudentNumber: (num: number) => void; }) => {
    const [studentsStats, setStudentsStats] = useState<studentStatistics[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchAllStatOfStudentsOfGroup = async () => {
            try {
                if (token) {
                    const data = await fetchStatisticsOfGroupStudents(token, groupName);
                    console.log("Fetched Data:", data);
                    setStudentsStats(data);
                    setGroupStudentNumber(data.length);
                }
            } catch (error) {
                console.error("Failed to fetch group names", error);
            }
        };

        fetchAllStatOfStudentsOfGroup();

    }, [token, groupName]);

    useEffect(() => {
        console.log("studentsStats state updated:", studentsStats);
    }, [studentsStats]);

    return (
        <div className="grid grid-cols-4 gap-2 ">
            {studentsStats && studentsStats.length > 0 && (
                studentsStats.map((studentStat, index) => (
                    <StatisticsCard
                        key={index}
                        studentStat={studentStat}
                    />
                ))
            )}
        </div>
    );
}
