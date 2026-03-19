import React, { useState, type FC, type PropsWithChildren } from "react";
import FlashcardFront from "./FlashcardFront";
import FlashcardBack from "./FlashcardBack";
import { cn } from "@/lib/utils";
import type { LearningState, DeckType, FlashcardType } from "@/types";

interface Props {
  deck: DeckType;
  flashcard: FlashcardType;
  onAnswer: (answer: LearningState) => void;
  isLastCard: boolean;
}

const Flashcard: FC<PropsWithChildren<Props>> = ({
  deck,
  flashcard,
  onAnswer,
  isLastCard,
}) => {
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={cn(
        "perspective-distant flex flex-col justify-center items-center w-96 h-1/2 bg-accent text-accent-foreground rounded-xl transition-transform duration-500 transform-3d",
        flipped && "rotate-y-180",
      )}
      onClick={flipCard}
    >
      <FlashcardFront flashcard={flashcard} deck={deck} />
      <FlashcardBack
        deck={deck}
        flashcard={flashcard}
        onAnswer={onAnswer}
        flipCard={flipCard}
        isLastCard={isLastCard}
      />
    </div>
  );
};

export default Flashcard;
