import { NotFoundPage } from "./pages/NotFoundPage";
import GroupManagerPage from "./pages/GroupManagerPage";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HomePage } from "./pages/HomePage";
import { ManagementLayoutPage } from "./pages/adminPages/ManagementLayoutPage";
import { DisplayGroupsPage } from "./pages/adminPages/DisplayGroupsPage";
import { CreateGroupPage } from "./pages/adminPages/CreateGroupPage";
import { DisplayAllStudentsPage } from "./pages/adminPages/DisplayAllStudentsPage";
import { CreateStudentPage } from "./pages/adminPages/CreateStudentPage";
import { RegisterTeacherPage } from "./pages/adminPages/RegisterTeacherPage";
import { EditGroupPage } from "./pages/adminPages/EditGroupPage";
import { TeacherStudentsDisplayPage } from "./pages/TeacherStudentsDisplayPage";
import { StatisticsPage } from "./pages/adminPages/StatisticsPage";

function App() {
  return (
    <>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/groups/:groupName" element={<GroupManagerPage />} />

          <Route path="/management" element={<ManagementLayoutPage />}>
            <Route
              path="/management/group/all"
              element={<DisplayGroupsPage />}
            />
            <Route
              path="/management/group/create"
              element={<CreateGroupPage />}
            />
            <Route
              path="/management/group/edit/:groupName"
              element={<EditGroupPage />}
            />
            <Route
              path="/management/student/all"
              element={<DisplayAllStudentsPage />}
            />
            <Route
              path="/management/student/create"
              element={<CreateStudentPage />}
            />
            <Route
              path="/management/teacher/register"
              element={<RegisterTeacherPage />}
            />
            <Route
            path="/management/statistics"
            element={<StatisticsPage />}
            />
          </Route>

          <Route path="/teacher/students" element={<TeacherStudentsDisplayPage />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Toaster />
    </>
  );
}

export default App;
