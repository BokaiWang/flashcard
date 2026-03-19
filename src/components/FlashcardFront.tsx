import React, { type FC, type PropsWithChildren } from "react";
import type { DeckType, FlashcardType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PitchAccent from "./PitchAccent";
interface Props {
  deck: DeckType;
  flashcard: FlashcardType;
}

const FlashcardFront: FC<PropsWithChildren<Props>> = ({ deck, flashcard }) => {
  return (
    <Card className="absolute backface-hidden w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl m-auto">{deck.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl flex flex-col justify-center items-center gap-8 h-full mb-20">
        <div className="flex gap-3 justify-center items-center">
          <p>{flashcard.word}</p>
          <PitchAccent pitchAccent={flashcard.pitchAccent} />
        </div>
        <p>{flashcard.wordType}</p>
      </CardContent>
    </Card>
  );
};

export default FlashcardFront;
