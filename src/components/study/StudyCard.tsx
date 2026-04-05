import React, { type FC, type PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { FlashcardType } from "@/types";
import PitchAccent from "../common/PitchAccent";
import { Button } from "../ui/button";
import useStudySettings from "@/store/studySettingsStore";
import { useShallow } from "zustand/react/shallow";
import { studySettingsPropertySelector } from "@/selector/studySettings.selectors";
import { Separator } from "../ui/separator";

interface Props {
  flashcard: FlashcardType;
  isFirstCard: boolean;
  goNext: () => void;
  goPrevious: () => void;
}

const StudyCard: FC<PropsWithChildren<Props>> = ({
  flashcard,
  isFirstCard,
  goNext,
  goPrevious,
}) => {
  const { deckName } = useStudySettings(
    useShallow(studySettingsPropertySelector),
  );

  return (
    <Card className="bg-amber-100 dark:bg-slate-950 flex flex-col w-full h-full gap-3">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{deckName}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl flex flex-col justify-between items-center gap-1 h-full m-0!">
        <div className="flex flex-col gap-2 justify-center items-center w-full mt-2">
          <div className="flex gap-3 justify-center items-center">
            <p>{flashcard.word}</p>
            <PitchAccent pitchAccent={flashcard.pitchAccent} />
          </div>
          <p className="text-2xl">{flashcard.pronunciation}</p>
          <p className="text-2xl ">{flashcard.wordType}</p>
        </div>
        <Separator />
        <div>
          <p>{flashcard.meaning}</p>
        </div>
        <Separator />
        <div>
          <p className="text-xl text-center">{flashcard.example}</p>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button
          disabled={isFirstCard}
          variant={"secondary"}
          onClick={goPrevious}
        >
          Previous
        </Button>
        <Button onClick={goNext}>Next</Button>
      </CardFooter>
    </Card>
  );
};

export default StudyCard;
