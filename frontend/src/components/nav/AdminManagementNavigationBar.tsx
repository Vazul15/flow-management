import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const ManagementNavigationBar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg py-4 px-6 rounded-lg relative">
      <ul className="flex gap-6 items-center justify-between">
        <div className="flex gap-6">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer text-gray-800 hover:text-gray-700 transition duration-300 px-4 py-2 rounded-lg">
                Groups
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link to="/management/group/all">
                  <DropdownMenuItem className="cursor-pointer">View Groups</DropdownMenuItem>
                </Link>
                <Link to="/management/group/create">
                  <DropdownMenuItem className="cursor-pointer">Create New Group</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer text-gray-800 hover:text-gray-700 transition duration-300 px-4 py-2 rounded-lg">
                Students
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link to="/management/student/all">
                  <DropdownMenuItem className="cursor-pointer">View Students</DropdownMenuItem>
                </Link>
                <Link to="/management/student/create">
                  <DropdownMenuItem className="cursor-pointer">Create New Student</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer text-gray-800 hover:text-gray-700 transition duration-300 px-4 py-2 rounded-lg">
                Teachers
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link to="/management/teacher/register">
                  <DropdownMenuItem className="cursor-pointer">Register New Teacher</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={() => navigate("/management/statistics")}
                className="cursor-pointer text-gray-800 hover:text-gray-700 transition duration-300 px-4 py-2 rounded-lg"
              >
                Statistics
              </DropdownMenuTrigger>
            </DropdownMenu>
          </li>
        </div>
        <li>
          <Button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800" onClick={handleHomeClick}>
            Home
          </Button>
        </li>
      </ul>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffcc00bd] to-[#b19f04]"></div>
    </nav>
  );
};
