import React, { type FC, type PropsWithChildren } from "react";
import type { AnswerState, FlashcardType } from "@/types";
import FlashcardControls from "./FlashcardControls";

interface Props {
  flashcard: FlashcardType;
  onAnswer: (answer: AnswerState) => void;
}

const FlashcardBack: FC<PropsWithChildren<Props>> = ({
  flashcard,
  onAnswer,
}) => {
  return (
    <div className="absolute backface-hidden rotate-y-180 p-3 w-full h-full">
      <div className="h-4/5 flex flex-col justify-center">
        <p>Example</p>
        <p>{flashcard.example}</p>
      </div>
      <div>
        <FlashcardControls onAnswer={onAnswer} />
      </div>
    </div>
  );
};

export default FlashcardBack;
