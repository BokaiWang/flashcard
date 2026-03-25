import React, { type FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import ResultCardControls from "./ResultCardControls";
import useTestSession from "@/store/testSession";
import { useShallow } from "zustand/react/shallow";
import { testSessionPropertySelector } from "@/selector/testSession.selectors";
import useLearningHistory from "@/store/learningHistoryStore";
import { learningHistoryPropertySelector } from "@/selector/learningHistory.selectors";

const chartConfig = {
  correct: { label: "Correct", color: "#00a63e" },
  wrong: {
    label: "Wrong",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

const ResultCard: FC = () => {
  const { correctAnswers, choices } = useTestSession(
    useShallow(testSessionPropertySelector),
  );
  const { lastUsedCards } = useLearningHistory(
    useShallow(learningHistoryPropertySelector),
  );
  const { correct, wrong } = correctAnswers.reduce(
    (result, answer, index) => {
      return {
        ...result,
        ...(answer === choices[index]
          ? { correct: result.correct++ }
          : { wrong: result.wrong++ }),
      };
    },
    { correct: 0, wrong: 0 },
  );

  const chartData = [
    {
      result: "correct",
      counts: correct,
      fill: "#00a63e",
    },
    {
      result: "wrong",
      counts: wrong,
      fill: "var(--destructive)",
    },
  ];

  const correctPercentage = ((correct / correctAnswers.length) * 100).toFixed(
    1,
  );

  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Test Result</CardTitle>
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
              nameKey="result"
              innerRadius={50}
              strokeWidth={3}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {correctPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Correct
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        {lastUsedCards.map((card) => (
          <p>{card.example}</p>
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <ResultCardControls />
      </CardFooter>
    </Card>
  );
};

export default ResultCard;
