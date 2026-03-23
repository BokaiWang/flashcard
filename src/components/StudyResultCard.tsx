import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ChartContainer, type ChartConfig } from "./ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { JapaneseDecks } from "@/data/japaneseDecks";
import { useNavigate } from "react-router";
import useStudySettings from "@/store/studySettingsStore";

const chartConfig = {
  unlearned: { label: "Unlearned", color: "var(--accent)" },
  studied: { label: "Studied", color: "#00a63e" },
} satisfies ChartConfig;

const StudyResultCard = () => {
  const { deckName, resetStudySettings } = useStudySettings();
  const navigate = useNavigate();
  const selectedDeck = JapaneseDecks[deckName];
  const totalCounts = selectedDeck.flashcards.length;
  const learnedCounts = readDeck.length;
  const unlearnedCounts = totalCounts - learnedCounts;
  const chartData = [
    { status: "studied", counts: learnedCounts, fill: "#00a63e" },
    {
      status: "unlearned",
      counts: unlearnedCounts,
      fill: "var(--accent)",
    },
  ];

  const studiedPercentage = ((learnedCounts / totalCounts) * 100).toFixed(1);

  const onFinish = () => {
    resetStudySettings();
    navigate("/");
  };

  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle>Congratulations!</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 bg-des">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="counts"
              nameKey="status"
              label
              innerRadius={60}
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
                          {studiedPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Studied
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-around mt-10 text-sm">
        <Button variant={"outline"}>Review</Button>
        <Button>Start a new deck</Button>
        <Button onClick={onFinish}>Finish</Button>
      </CardFooter>
    </Card>
  );
};

export default StudyResultCard;
