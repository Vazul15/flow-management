import { studentStatistics } from "@/components/types/studentTypes";

export async function fetchStatisticsOfGroupStudents(token: string, groupName: string): Promise<studentStatistics[]> {
    try {
        const response = await fetch(`/api/statistics/students/${groupName}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }
        );
    
        if(!response.ok) {
            throw new Error("Failed to fetch group statistics");
        }
    
    
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        return responseData;
            
    } catch (error) {
        console.error("Error occurred during fetch:", error);
        return [];
    }
}