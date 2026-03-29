import React, { useState, type FC, type PropsWithChildren } from "react";
import TestCardFront from "./TestCardFront";
import TestCardBack from "./TestCardBack";
import { cn } from "@/lib/utils";
import type { LearningState, FlashcardType } from "@/types";

interface Props {
  cardIndex: number;
  flashcard: FlashcardType;
  onAnswerLearningState: (answer: LearningState) => void;
  isLastCard: boolean;
}

const Flashcard: FC<PropsWithChildren<Props>> = ({
  cardIndex,
  flashcard,
  onAnswerLearningState,
  isLastCard,
}) => {
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={cn(
        "bg-amber-100 dark:bg-slate-950 perspective-distant flex flex-col justify-center items-center w-full h-full text-accent-foreground rounded-xl transition-transform duration-500 transform-3d",
        flipped && "rotate-y-180",
      )}
    >
      <TestCardFront
        flipCard={flipCard}
        cardIndex={cardIndex}
        flashcard={flashcard}
      />
      {flipped && (
        <TestCardBack
          flashcard={flashcard}
          onAnswerLearningState={onAnswerLearningState}
          flipCard={flipCard}
          isLastCard={isLastCard}
        />
      )}
    </div>
  );
};

export default Flashcard;
