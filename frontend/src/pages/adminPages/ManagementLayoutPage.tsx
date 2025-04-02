import { Outlet } from "react-router-dom";
import { ManagementNavigationBar } from "@/components/nav/AdminManagementNavigationBar";

export const ManagementLayoutPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col overflow-hidden text-gray-200">
      <div className="relative">
        <ManagementNavigationBar />
      </div>
      <div className="w-full flex-grow mt-8 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900">
        <Outlet />
      </div>
    </div>
  );
};
