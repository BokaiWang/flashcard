import React, { type FC, type PropsWithChildren } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningState, type FlashcardType } from "@/types";

interface Props {
  readDeck: FlashcardType[];
}

const StatusCard: FC<PropsWithChildren<Props>> = ({ readDeck }) => {
  const status = readDeck.reduce(
    (acc, curr) => {
      switch (curr.learningState) {
        case LearningState.FORGOT: {
          return {
            ...acc,
            [LearningState.FORGOT]: acc[LearningState.FORGOT] + 1,
          };
        }
        case LearningState.NOT_FAMILIAR: {
          return {
            ...acc,
            [LearningState.NOT_FAMILIAR]: acc[LearningState.NOT_FAMILIAR] + 1,
          };
        }
        case LearningState.REMEMBERED: {
          return {
            ...acc,
            [LearningState.REMEMBERED]: acc[LearningState.REMEMBERED] + 1,
          };
        }
        default:
          return acc;
      }
    },
    {
      [LearningState.FORGOT]: 0,
      [LearningState.NOT_FAMILIAR]: 0,
      [LearningState.REMEMBERED]: 0,
    },
  );
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl m-auto">Learning Status</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl flex flex-col justify-center items-start gap-8 h-full mb-20">
        <div className="flex gap-3 text-destructive">
          <p>{LearningState.FORGOT}</p>
          <p>-</p>
          <p>{status[LearningState.FORGOT]}</p>
        </div>
        <div className="flex gap-3">
          <p>{LearningState.NOT_FAMILIAR}</p>
          <p>-</p>
          <p>{status[LearningState.NOT_FAMILIAR]}</p>
        </div>
        <div className="flex gap-3 text-green-700">
          <p>{LearningState.REMEMBERED}</p>
          <p>-</p>
          <p>{status[LearningState.REMEMBERED]}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
