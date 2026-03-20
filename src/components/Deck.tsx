import React, { useState, type FC, type PropsWithChildren } from "react";
import Flashcard from "./Flashcard";
import type { LearningState, DeckType, FlashcardType } from "@/types";
import { useNavigate } from "react-router";

interface Props {
  deck: DeckType;
}

const Deck: FC<PropsWithChildren<Props>> = ({ deck }) => {
  const { flashcards } = deck;
  const [readDeck, setReadDeck] = useState<FlashcardType[]>([]);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const isLastCard = flashcardIndex === flashcards.length - 1;
  const navigate = useNavigate();

  const onAnswer = (answer: LearningState) => {
    setReadDeck([
      ...readDeck,
      { ...flashcards[flashcardIndex], learningState: answer },
    ]);
    if (!isLastCard) {
      setFlashcardIndex(flashcardIndex + 1);
    } else {
      navigate("/learning-result");
    }
  };

  return (
    <Flashcard
      deck={deck}
      flashcard={flashcards[flashcardIndex]}
      onAnswer={onAnswer}
      isLastCard={isLastCard}
    />
  );
};

export default Deck;
