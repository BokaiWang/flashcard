import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import StatusPage from "./pages/ResultPage";
import StudyContextProvider from "./Context/StudyContextProvider";
import { removeRoutePrefixForwardSlash } from "./helpers";
import { Router } from "./routes.constants";

function App() {
  return (
    <StudyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path={removeRoutePrefixForwardSlash(Router.learningPage)}
            element={<LearningPage />}
          />
          <Route
            path={removeRoutePrefixForwardSlash(Router.resultPage)}
            element={<StatusPage />}
          />
        </Routes>
      </BrowserRouter>
    </StudyContextProvider>
  );
}

export default App;
