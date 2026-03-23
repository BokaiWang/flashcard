import React, { type FC, type PropsWithChildren } from "react";
import type { LearningState, FlashcardType } from "@/types";
import FlashcardControls from "./FlashcardControls";
import PitchAccent from "./PitchAccent";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import useStudySettings from "@/store/studySettingsStore";

interface Props {
  flashcard: FlashcardType;
  onAnswer: (answer: LearningState) => void;
  flipCard: () => void;
  isLastCard: boolean;
}

const FlashcardBack: FC<PropsWithChildren<Props>> = ({
  flashcard,
  onAnswer,
  flipCard,
  isLastCard,
}) => {
  const deckName = useStudySettings.use.deckName();
  return (
    <Card className="absolute backface-hidden rotate-y-180 w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl m-auto">{deckName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-5 h-full text-2xl">
        <div className="flex gap-3 justify-center items-center">
          <p>{flashcard.pronunciation}</p>
          <PitchAccent pitchAccent={flashcard.pitchAccent} />
        </div>
        <p>{flashcard.meaning}</p>
        <p>{flashcard.example}</p>
      </CardContent>
      <CardFooter>
        <FlashcardControls
          onAnswer={onAnswer}
          flipCard={flipCard}
          isLastCard={isLastCard}
        />
      </CardFooter>
    </Card>
  );
};

export default FlashcardBack;
