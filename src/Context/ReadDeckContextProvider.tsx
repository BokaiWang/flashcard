import type { FlashcardType } from "@/types";
import {
  createContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";

export type ReadDeckContextType = {
  readDeck: FlashcardType[];
  setReadDeck: (value: FlashcardType[]) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ReadDeckContext = createContext<ReadDeckContextType | null>(null);

const ReadDeckContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [readDeck, setReadDeck] = useState<FlashcardType[]>([]);

  return (
    <ReadDeckContext
      value={{
        readDeck,
        setReadDeck,
      }}
    >
      {children}
    </ReadDeckContext>
  );
};

export default ReadDeckContextProvider;
