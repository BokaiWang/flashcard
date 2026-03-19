import React, { type FC, type PropsWithChildren } from "react";
import type { LearningState, DeckType, FlashcardType } from "@/types";
import FlashcardControls from "./FlashcardControls";
import PitchAccent from "./PitchAccent";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface Props {
  deck: DeckType;
  flashcard: FlashcardType;
  onAnswer: (answer: LearningState) => void;
  flipCard: () => void;
  isLastCard: boolean;
}

const FlashcardBack: FC<PropsWithChildren<Props>> = ({
  deck,
  flashcard,
  onAnswer,
  flipCard,
  isLastCard,
}) => {
  return (
    <Card className="absolute backface-hidden rotate-y-180 w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl m-auto">{deck.name}</CardTitle>
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
