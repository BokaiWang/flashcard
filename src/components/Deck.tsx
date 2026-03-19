import React, { useState, type FC, type PropsWithChildren } from "react";
import Flashcard from "./Flashcard";
import type { LearningState, DeckType, FlashcardType } from "@/types";
import StatusCard from "./ResultCard";

interface Props {
  deck: DeckType;
}

const Deck: FC<PropsWithChildren<Props>> = ({ deck }) => {
  const { flashcards } = deck;
  const [readDeck, setReadDeck] = useState<FlashcardType[]>([]);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const isLastCard = flashcardIndex === flashcards.length - 1;

  const onAnswer = (answer: LearningState) => {
    setReadDeck([
      ...readDeck,
      { ...flashcards[flashcardIndex], learningState: answer },
    ]);
    if (!isLastCard) {
      setFlashcardIndex(flashcardIndex + 1);
    } else {
      setShowStatus(!showStatus);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {showStatus ? (
        <div
          className={
            "flex flex-col justify-center items-center w-96 h-1/2 bg-accent text-accent-foreground rounded-xl"
          }
        >
          <StatusCard readDeck={readDeck} />
        </div>
      ) : (
        <Flashcard
          deck={deck}
          flashcard={flashcards[flashcardIndex]}
          onAnswer={onAnswer}
          isLastCard={isLastCard}
        />
      )}
    </div>
  );
};

export default Deck;
