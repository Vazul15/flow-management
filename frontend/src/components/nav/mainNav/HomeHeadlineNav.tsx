import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/forms/LoginForm";
export const HomeHeadlineNav = () => {
  const { login, logout, isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginSubmit = async (loginData: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await login(loginData);
      if (response) {
        setIsModalOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-navbar text-navbar-foreground shadow-md">
      <div className="flex-grow"></div>
      {isLoggedIn ? (
        <Button
          variant="default"
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-2 transition-all duration-300 shadow-lg min-w-[100px]"
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="default"
          onClick={handleLogin}
          className="bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg px-6 py-2 transition-all duration-300 shadow-lg min-w-[100px]"
        >
          Login
        </Button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-lg shadow-lg relative">
            {/* Modal Header */}
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-center">Login</h2>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <LoginForm onLogin={handleLoginSubmit} />
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-all text-3xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
