import React, { useState, type FC, type PropsWithChildren } from "react";
import FlashcardFront from "./FlashcardFront";
import FlashcardBack from "./FlashcardBack";
import { cn } from "@/lib/utils";
import type { AnswerState, FlashcardType } from "@/types";

interface Props {
  flashcard: FlashcardType;
  onAnswer: (answer: AnswerState) => void;
}

const Flashcard: FC<PropsWithChildren<Props>> = ({ flashcard, onAnswer }) => {
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => setFlipped(!flipped);
  return (
    <div
      className={cn(
        "perspective-distant flex flex-col justify-center items-center w-96 h-1/2 bg-accent text-accent-foreground rounded-xl transition-transform duration-500 transform-3d",
        flipped && "rotate-y-180",
      )}
      onClick={flipCard}
    >
      <FlashcardFront flashcard={flashcard} />
      <FlashcardBack flashcard={flashcard} onAnswer={onAnswer} />
    </div>
  );
};

export default Flashcard;
