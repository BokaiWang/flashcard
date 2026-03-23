import React, { useState, type FC, type PropsWithChildren } from "react";
import FlashcardFront from "./FlashcardFront";
import FlashcardBack from "./FlashcardBack";
import { cn } from "@/lib/utils";
import type { LearningState, FlashcardType } from "@/types";

interface Props {
  flashcard: FlashcardType;
  onAnswer: (answer: LearningState) => void;
  isLastCard: boolean;
}

const Flashcard: FC<PropsWithChildren<Props>> = ({
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
        "perspective-distant flex flex-col justify-center items-center w-full h-full bg-accent text-accent-foreground rounded-xl transition-transform duration-500 transform-3d",
        flipped && "rotate-y-180",
      )}
      onClick={flipCard}
    >
      <FlashcardFront flashcard={flashcard} />
      <FlashcardBack
        flashcard={flashcard}
        onAnswer={onAnswer}
        flipCard={flipCard}
        isLastCard={isLastCard}
      />
    </div>
  );
};

export default Flashcard;
