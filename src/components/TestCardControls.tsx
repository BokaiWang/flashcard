import React, { type FC, type PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { LearningState } from "@/types";

interface Props {
  onAnswerLearningState: (answer: LearningState) => void;
  flipCard: () => void;
  isLastCard: boolean;
}

const FlashcardControls: FC<PropsWithChildren<Props>> = ({
  onAnswerLearningState,
  flipCard,
  isLastCard,
}) => {
  return (
    <div className="flex justify-between w-full">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onAnswerLearningState(LearningState.NEW);
          if (!isLastCard) {
            flipCard();
          }
        }}
        variant={"destructive"}
      >
        Forgot
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onAnswerLearningState(LearningState.NOT_FAMILIAR);
          if (!isLastCard) {
            flipCard();
          }
        }}
        variant={"outline"}
      >
        Not Familiar
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onAnswerLearningState(LearningState.MASTERED);
          if (!isLastCard) {
            flipCard();
          }
        }}
      >
        Remembered
      </Button>
    </div>
  );
};

export default FlashcardControls;
