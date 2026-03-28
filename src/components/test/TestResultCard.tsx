import React, { type FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import TestResultCardControls from "./TestResultCardControls";
import useTestSession from "@/store/testSession";
import { useShallow } from "zustand/react/shallow";
import { testSessionPropertySelector } from "@/selector/testSession.selectors";
import useLearningHistory from "@/store/learningHistoryStore";
import { learningHistoryPropertySelector } from "@/selector/learningHistory.selectors";
import { TableCell, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

const chartConfig = {
  correct: { label: "Correct", color: "var(--color-green-600)" },
  wrong: {
    label: "Wrong",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

const TestResultCard: FC = () => {
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
          ? { correct: ++result.correct }
          : { wrong: ++result.wrong }),
      };
    },
    { correct: 0, wrong: 0 },
  );

  const chartData = [
    {
      result: "correct",
      counts: correct,
      fill: "var(--color-green-600)",
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
          className="mx-auto aspect-square max-h-60 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="counts"
              label
              nameKey="result"
              innerRadius={70}
              strokeWidth={5}
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
        <div className="h-2/5 py-5">
          <ScrollArea className="h-full">
            {lastUsedCards.map((card, index) => (
              <TableRow key={card.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell
                  className={cn(
                    choices[index] === card.word
                      ? "text-green-600"
                      : "text-destructive",
                  )}
                >
                  {choices[index]}
                </TableCell>
                <TableCell>{card.example}</TableCell>
              </TableRow>
            ))}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="mt-5">
            <TestResultCardControls />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestResultCard;
