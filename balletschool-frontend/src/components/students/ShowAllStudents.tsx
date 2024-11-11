import { useEffect, useState } from 'react'
import { StudentPreview } from '../types/types'

const fetchAllStudents = async(danceGroupName: string) : Promise => {
  try {
    const response = await fetch(`/api/dancegroup/students?name=${danceGroupName}`);
    if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data: Response = await response.json();
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		return [];
	}

}

const ShowAllStudents = () => {
    const [students, setStudents] = useState<StudentPreview | null>(null);
    const [danceGroupName, setDanceGroupName] = useState<string>("");

    useEffect(() => {
      const fetchStudentsData = async () => {
        const studentsData: Promise =  await fetchAllStudents(danceGroupName);
        setStudents(studentsData);
      }
      fetchStudentsData();
    })

  return (
    <div>ShowAllStudents</div>
  )
}

export default ShowAllStudents