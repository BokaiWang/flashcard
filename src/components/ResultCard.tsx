import React, { useCallback, type FC, type PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LearningState, type FlashcardType } from "@/types";
import { PieChart, Pie } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import { cloneDeep } from "lodash";
import ResultCardControls from "./ResultCardControls";

interface Props {
  readDeck: FlashcardType[];
}

const chartConfig = {
  [LearningState.NEW]: { label: "New", color: "var(--destructive)" },
  [LearningState.NOT_FAMILIAR]: {
    label: "Not Familiar",
    color: "var(--accent)",
  },
  [LearningState.MASTERED]: { label: "Mastered", color: "#00a63e" },
} satisfies ChartConfig;

const ResultCard: FC<PropsWithChildren<Props>> = ({ readDeck }) => {
  const calculateCounts = useCallback(
    (
      acc: { learningState: LearningState; counts: number; fill: string }[],
      learning: LearningState,
    ) => {
      const cloned = cloneDeep(acc);
      const index = cloned.findIndex(
        ({ learningState }) => learningState === learning,
      );
      cloned[index] = {
        ...cloned[index],
        counts: cloned[index].counts + 1,
      };
      return cloned;
    },
    [],
  );
  const chartData = readDeck.reduce(
    (acc, curr) => {
      switch (curr.learningState) {
        case LearningState.NEW: {
          const newStatus = calculateCounts(acc, LearningState.NEW);
          return [...newStatus];
        }
        case LearningState.NOT_FAMILIAR: {
          const newStatus = calculateCounts(acc, LearningState.NOT_FAMILIAR);
          return [...newStatus];
        }
        case LearningState.MASTERED: {
          const newStatus = calculateCounts(acc, LearningState.MASTERED);
          return [...newStatus];
        }
        default:
          return acc;
      }
    },
    [
      {
        learningState: LearningState.NEW,
        counts: 0,
        fill: "var(--destructive)",
      },
      {
        learningState: LearningState.NOT_FAMILIAR,
        counts: 0,
        fill: "var(--accent)",
      },
      {
        learningState: LearningState.MASTERED,
        counts: 0,
        fill: "#00a63e",
      },
    ],
  );

  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Learning Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 bg-des">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="counts"
              label
              nameKey="learningState"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <ResultCardControls />
      </CardFooter>
    </Card>
  );
};

export default ResultCard;
