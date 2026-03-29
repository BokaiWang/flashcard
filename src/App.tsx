import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import TestResultPage from "./pages/TestResultPage";
import { removeRoutePrefixForwardSlash } from "./helpers";
import { Router } from "./routes.constants";
import LearningResultPage from "./pages/LearningResultPage";
import Layout from "./components/common/Layout";
import { useEffect } from "react";
import useLearningHistory from "./store/learningHistoryStore";
import { useShallow } from "zustand/shallow";
import { learningHistoryPropertySelector } from "./selector/learningHistory.selectors";

function App() {
  const { theme } = useLearningHistory(
    useShallow(learningHistoryPropertySelector),
  );
  useEffect(() => {
    if (theme === "DARK") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Navigate
                to={removeRoutePrefixForwardSlash(Router.homePage)}
                replace
              />
            }
          />
          <Route
            path={removeRoutePrefixForwardSlash(Router.homePage)}
            element={<HomePage />}
          />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
