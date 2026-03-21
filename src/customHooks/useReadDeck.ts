import { ReadDeckContext } from "@/Context/ReadDeckContextProvider";
import { useContext } from "react";

export const useReadDeck = () => {
  const context = useContext(ReadDeckContext);

  if (!context) {
    throw new Error("useReadDeck must be used within ReadDeckContextProvider");
  }

  return context;
};
