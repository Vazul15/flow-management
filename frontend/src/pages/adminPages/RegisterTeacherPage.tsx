import { useNavigate } from "react-router-dom";
import { teacherNameEmail } from "../../components/types/teacherTypes";
import { RegisterTeacherForm } from "../../components/forms/RegisterTeacherForm";
import { useAuth } from "@/components/auth/AuthProvider";
import { fetchCreateTeacher } from "@/services/teacherService/teacherService";

export const RegisterTeacherPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (
    teacherEmailName: teacherNameEmail
  ): Promise<number> => {
    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const data = await fetchCreateTeacher(teacherEmailName, token);
    navigate("/");
    return data;
  };

  return (
    <div className="text-gray-200">

      <div className="relative">
        <div className="absolute top-20 left-16">
          <h1 className="text-2xl font-semibold text-gray-100">
            Teacher Registration
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Please fill in the details below to register a teacher profile.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-start pt-48">
        <RegisterTeacherForm onRegister={handleRegister} />
      </div>
    </div>
  );
};
