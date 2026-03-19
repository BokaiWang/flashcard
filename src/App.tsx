import { BrowserRouter, Routes, Route } from "react-router";
import Deck from "./components/Deck";
import { N3Deck } from "./data/japaneseDecks";
import HomePage from "./pages/HomePage";
import LearningPage from "./pages/LearningPage";
import StatusPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="learning" element={<LearningPage />} />
        <Route path="learning-result" element={<StatusPage />} />
      </Routes>
    </BrowserRouter>
    // <div className="text-foreground">
    //   <Deck deck={N3Deck} />
    // </div>
  );
}

export default App;
