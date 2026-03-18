import React, { type FC, type PropsWithChildren } from "react";
import { Button } from "./ui/button";
import type { AnswerState } from "@/types";

interface Props {
  onAnswer: (answer: AnswerState) => void;
}

const FlashcardControls: FC<PropsWithChildren<Props>> = ({ onAnswer }) => {
  return (
    <div className="flex justify-between">
      <Button onClick={() => onAnswer("FORGOT")} variant={"destructive"}>
        Forgot
      </Button>
      <Button onClick={() => onAnswer("NOT_FAMILIAR")} variant={"outline"}>
        Not Familiar
      </Button>
      <Button onClick={() => onAnswer("REMEMBERED")}>Remembered</Button>
    </div>
  );
};

export default FlashcardControls;
