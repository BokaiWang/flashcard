import React, { type FC, type PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { FlashcardType } from "@/types";
import PitchAccent from "./PitchAccent";
import { Button } from "./ui/button";
import useStudySettings from "@/store/studySettingsStore";
import { useShallow } from "zustand/react/shallow";
import { studySettingsPropertySelector } from "@/selector/studySettings.selectors";

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
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl m-auto">{deckName}</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl flex flex-col justify-center items-center gap-5 h-full mb-20">
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
      <CardFooter className="flex justify-around">
        <Button disabled={isFirstCard} variant={"outline"} onClick={goPrevious}>
          Previous
        </Button>
        <Button onClick={goNext}>Next</Button>
      </CardFooter>
    </Card>
  );
};

export default StudyCard;
