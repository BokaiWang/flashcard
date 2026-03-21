import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import TestResultPage from "./pages/TestResultPage";
import StudyContextProvider from "./Context/StudyContextProvider";
import { removeRoutePrefixForwardSlash } from "./helpers";
import { Router } from "./routes.constants";
import LearningResultPage from "./pages/LearningResultPage";
import ReadDeckContextProvider from "./Context/ReadDeckContextProvider";

function App() {
  return (
    <StudyContextProvider>
      <ReadDeckContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path={removeRoutePrefixForwardSlash(Router.learningPage)}
              element={<LearningPage />}
            />
            <Route
              path={removeRoutePrefixForwardSlash(Router.learningResultPage)}
              element={<LearningResultPage />}
            />
            <Route
              path={removeRoutePrefixForwardSlash(Router.testResultPage)}
              element={<TestResultPage />}
            />
          </Routes>
        </BrowserRouter>
      </ReadDeckContextProvider>
    </StudyContextProvider>
  );
}

export default App;
