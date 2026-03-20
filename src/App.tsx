import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import StatusPage from "./pages/ResultPage";
import StudyContextProvider from "./Context/StudyContextProvider";

function App() {
  return (
    <StudyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="learning" element={<LearningPage />} />
          <Route path="learning-result" element={<StatusPage />} />
        </Routes>
      </BrowserRouter>
    </StudyContextProvider>
  );
}

export default App;
