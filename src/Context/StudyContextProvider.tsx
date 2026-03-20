import type { Mode } from "@/types";
import {
  createContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";

export type StudyContextType = {
  deck: string;
  wordNumber: string;
  customWordNumber: string;
  mode: Mode | "";
  setDeck: (value: string) => void;
  setWordNumber: (value: string) => void;
  setCustomWordNumber: (value: string) => void;
  setMode: (value: Mode) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const StudyContext = createContext<StudyContextType | null>(null);

const StudyContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [deck, setDeck] = useState("");
  const [wordNumber, setWordNumber] = useState("");
  const [customWordNumber, setCustomWordNumber] = useState("");
  const [mode, setMode] = useState<Mode | "">("");
  return (
    <StudyContext
      value={{
        deck,
        wordNumber,
        customWordNumber,
        mode,
        setDeck,
        setWordNumber,
        setCustomWordNumber,
        setMode,
      }}
    >
      {children}
    </StudyContext>
  );
};

export default StudyContextProvider;
