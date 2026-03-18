import Deck from "./components/Deck";
import { N3Deck } from "./data/japaneseDecks";

function App() {
  return (
    <div className="text-foreground">
      <Deck deck={N3Deck} />
    </div>
  );
}

export default App;
