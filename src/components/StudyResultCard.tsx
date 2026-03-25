import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { useNavigate } from "react-router";
import useStudySettings from "@/store/studySettingsStore";
import useLearningHistory from "@/store/learningHistoryStore";
import { isEmpty } from "@/helpers";
import { useShallow } from "zustand/react/shallow";
import {
  studySettingsActionSelector,
  studySettingsPropertySelector,
} from "@/selector/studySettings.selectors";
import { learningHistoryPropertySelector } from "@/selector/learningHistory.selectors";
import { Router } from "@/routes.constants";

const chartConfig = {
  unlearned: { label: "Unlearned", color: "var(--accent)" },
  learned: { label: "Learned", color: "#00a63e" },
} satisfies ChartConfig;

const StudyResultCard = () => {
  const { deckName } = useStudySettings(
    useShallow(studySettingsPropertySelector),
  );
  const { resetStudySettings } = useStudySettings(
    useShallow(studySettingsActionSelector),
  );

  const { decks: historyDecks } = useLearningHistory(
    useShallow(learningHistoryPropertySelector),
  );

  const navigate = useNavigate();
  const selectedDeck = useMemo(() => {
    return historyDecks[deckName];
  }, [deckName]);

  const studyResult = useMemo(
    () =>
      selectedDeck.flashcards.reduce(
        (acc, curr) => {
          return {
            ...acc,
            ...(isEmpty(curr.lastReviewedAt)
              ? { unlearnedCounts: acc.unlearnedCounts + 1 }
              : { learnedCounts: acc.learnedCounts + 1 }),
          };
        },
        {
          unlearnedCounts: 0,
          learnedCounts: 0,
        },
      ),
    [selectedDeck],
  );
  const { unlearnedCounts, learnedCounts } = studyResult;
  const totalCounts = selectedDeck.flashcards.length;

  const chartData = [
    { status: "learned", counts: learnedCounts, fill: "#00a63e" },
    {
      status: "unlearned",
      counts: unlearnedCounts,
      fill: "var(--accent)",
    },
  ];

  const studiedPercentage = ((learnedCounts / totalCounts) * 100).toFixed(1);

  const onReview = () => {
    navigate(Router.learningPage, {
      state: { shouldUseTheSameStudyCards: true },
    });
  };

  const onStartNewSession = () => {
    navigate(Router.learningPage);
  };

  const onFinish = () => {
    resetStudySettings();
    navigate("/");
  };

  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Congratulations!</CardTitle>
        <CardDescription>
          You've completed this session! This is what you've learned so far in
          this {deckName} deck.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 bg-des">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-96 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="counts"
              nameKey="status"
              label
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
                          {studiedPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Learned
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-around mt-10 text-sm">
        <Button onClick={onReview} variant={"outline"}>
          Review
        </Button>
        <Button onClick={onStartNewSession}>Start another session</Button>
        <Button onClick={onFinish}>Finish</Button>
      </CardFooter>
    </Card>
  );
};

export default StudyResultCard;
