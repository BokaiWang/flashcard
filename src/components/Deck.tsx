import React, { useState, type FC, type PropsWithChildren } from "react";
import Flashcard from "./Flashcard";
import type { AnswerState, FlashcardType } from "@/types";

interface Props {
  deck: FlashcardType[];
}

const Deck: FC<PropsWithChildren<Props>> = ({ deck }) => {
  const [readDeck, setReadDeck] = useState<FlashcardType[]>([]);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  const onAnswer = (answer: AnswerState) => {
    setReadDeck([
      ...readDeck,
      { ...deck[flashcardIndex], answerState: answer },
    ]);
    if (flashcardIndex < deck.length - 1) {
      setFlashcardIndex(flashcardIndex + 1);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Flashcard flashcard={deck[flashcardIndex]} onAnswer={onAnswer} />
    </div>
  );
};

export default Deck;
