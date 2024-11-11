import { NotFoundPage } from "./pages/NotFoundPage";
import Page from "./pages/page";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
