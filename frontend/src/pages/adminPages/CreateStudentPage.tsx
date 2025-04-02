import { newStudent } from "../../components/types/studentTypes";
import { NewStudentForm } from "../../components/forms/NewStudentForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchCreateNewStudent } from "@/services/studentService/studentService";

export const CreateStudentPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateStudent = async (formData: newStudent) => {
    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const studentPublicId = await fetchCreateNewStudent(formData, token);

      if (studentPublicId) {
        console.log(`Student created successfully with ID: ${studentPublicId}`);
        navigate("/management/student/all");
      } else {
        setError("Failed to create student");
      }
    } catch (error: any) {
      setError(error.message);
      console.error("Failed to create student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-200">
      <div className="relative">
        <div className="absolute top-20 left-16">
          <h1 className="text-2xl font-semibold text-gray-100">
            Create New Student</h1>
          <p className="text-sm text-gray-400 mt-2">
            Provide the necessary details to add a new student.<br />
            All fields are mandatory. Please ensure all information is accurate.
          </p>
        </div>
      </div>

      {/* Form középen, lejjebb */}
      <div className="flex justify-center items-start pt-48 ">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <NewStudentForm onSubmit={handleCreateStudent} />
        )}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            <strong>Error: </strong>{error}
          </div>
        )}
      </div>
    </div>
  );
};
