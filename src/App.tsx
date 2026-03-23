import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import TestResultPage from "./pages/TestResultPage";
import { removeRoutePrefixForwardSlash } from "./helpers";
import { Router } from "./routes.constants";
import LearningResultPage from "./pages/LearningResultPage";

function App() {
  return (
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
  );
}

export default App;
