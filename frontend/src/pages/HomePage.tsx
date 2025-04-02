import { Outlet } from "react-router-dom";
import { HomeBodyNav } from "@/components/nav/mainNav/HomeBodyNav";
import { HomeHeadlineNav } from "@/components/nav/mainNav/HomeHeadlineNav";
import { useAuth } from "@/components/auth/AuthProvider";
import ShinyText from '../components/ui/ShinyText/ShinyText';

export const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeadlineNav />
      <div className="h-1 bg-gradient-to-r from-[#ffcc00bd] to-[#b19f04]" />
      <div
        className="flex-grow flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700"
      >
        <header className="text-center py-8">
          <h1
            className="text-5xl md:text-8xl lg:text-9xl font-bold text-primary leading-tight"
            style={{ fontFamily: "Swanky Special, sans-serif" }}
          >
            Flow Management
          </h1>
        </header>
        <ShinyText
          text="This application helps with efficient administration and tracking of students' attendance and management."
          speed={9}
          className="mt-6 px-4 sm:px-8 leading-relaxed"
        />
        <div className="flex-grow flex justify-center items-center">
          {isLoggedIn && (
            <HomeBodyNav />
          )}
        </div>

        <div className="flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
