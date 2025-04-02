import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import SpotlightCard from "../ui/SpotlightCard/SpotlightCard";
import { studentStatistics } from "../types/studentTypes";

export interface studentStats {
    studentStat: studentStatistics;
}

export const StatisticsCard = ({ studentStat }: studentStats) => {
    const pieData = [
        { id: "Present", value: studentStat.studentPresentPercentage, color: "#3B82F6" },
        { id: "Absent", value: studentStat.studentAbsentPercentage, color: "#EF4444" },
    ];

    return (
        <div className="flex flex-wrap justify-start gap-6 p-4">
            <SpotlightCard className="p-2 bg-gradient-to-b from-blue-200 to-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-yellow-200 w-80">
                <div className="relative flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {studentStat.firstName} {studentStat.lastName}
                    </h3>
                    <PieChart
                        series={[
                            {
                                data: pieData,
                                arcLabel: (item) => `${item.value}%`,
                                arcLabelMinAngle: 35,
                                arcLabelRadius: "60%",
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fontWeight: "bold",
                                fontSize: "0.875rem",
                            },
                        }}
                        width={200}
                        height={100}
                    />
                    <div className="mt-4 flex justify-between w-full px-4">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-1"></div>
                            <span className="text-gray-700 text-sm">Present</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-1"></div>
                            <span className="text-gray-700 text-sm">Absent</span>
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </div>
    );
};
