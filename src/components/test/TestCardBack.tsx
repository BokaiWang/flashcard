import React, { type FC, type PropsWithChildren } from "react";
import type { LearningState, FlashcardType } from "@/types";
import TestCardControls from "./TestCardControls";
import PitchAccent from "../common/PitchAccent";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import useStudySettings from "@/store/studySettingsStore";
import { useShallow } from "zustand/react/shallow";
import { studySettingsPropertySelector } from "@/selector/studySettings.selectors";

interface Props {
  flashcard: FlashcardType;
  onAnswerLearningState: (answer: LearningState) => void;
  flipCard: () => void;
  isLastCard: boolean;
}

const FlashcardBack: FC<PropsWithChildren<Props>> = ({
  flashcard,
  onAnswerLearningState,
  flipCard,
  isLastCard,
}) => {
  const { deckName } = useStudySettings(
    useShallow(studySettingsPropertySelector),
  );
  return (
    <Card className="bg-amber-100 dark:bg-slate-950 absolute backface-hidden rotate-y-180 w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl m-auto">{deckName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-5 h-full text-2xl">
        <div className="flex flex-col gap-3 justify-center items-center border-y w-full py-6">
          <div className="flex gap-3 justify-center items-center">
            <p>{flashcard.word}</p>
            <PitchAccent pitchAccent={flashcard.pitchAccent} />
          </div>
          <p className="text-2xl">{flashcard.pronunciation}</p>
          <p className="text-2xl ">{flashcard.wordType}</p>
        </div>
        <div>
          <p>{flashcard.meaning}</p>
        </div>
        <div className="border-y w-full py-6 ">
          <p className="text-xl text-center">{flashcard.example}</p>
        </div>
      </CardContent>
      <CardFooter>
        <TestCardControls
          onAnswerLearningState={onAnswerLearningState}
          flipCard={flipCard}
          isLastCard={isLastCard}
        />
      </CardFooter>
    </Card>
  );
};

export default FlashcardBack;
