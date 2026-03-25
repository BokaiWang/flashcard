import React, { type FC, type PropsWithChildren } from "react";
import type { FlashcardType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useStudySettings from "@/store/studySettingsStore";
import { useShallow } from "zustand/react/shallow";
import { studySettingsPropertySelector } from "@/selector/studySettings.selectors";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import useTestSession from "@/store/testSession";
import { testSessionActionSelector } from "@/selector/testSession.selectors";
interface Props {
  cardIndex: number;
  flashcard: FlashcardType;
  flipCard: () => void;
}

const FlashcardFront: FC<PropsWithChildren<Props>> = ({
  cardIndex,
  flashcard,
  flipCard,
}) => {
  const { deckName } = useStudySettings(
    useShallow(studySettingsPropertySelector),
  );
  const { updateChoices } = useTestSession(
    useShallow(testSessionActionSelector),
  );

  const onAnswer = (choice: string) => {
    flipCard();
    updateChoices(choice);
  };
  console.log("flashcard choices", flashcard.choices);
  return (
    <Card className="absolute backface-hidden w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl m-auto">{deckName}</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl flex flex-col justify-center items-center gap-8 h-full mb-20">
        <div className="flex flex-col gap-3 w-full items-start">
          <p>
            {cardIndex + 1} - {flashcard.cloze}
          </p>
          <Separator />
          <div className="flex flex-col gap-3 ">
            {flashcard.choices?.map((choice, index) => (
              <Button
                key={choice}
                onClick={() => onAnswer(choice)}
                className="w-40 h-10 text-xl justify-start!"
              >
                {index + 1} - {choice}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardFront;
