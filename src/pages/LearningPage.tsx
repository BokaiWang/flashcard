import React from "react";
import PageContainer from "@/components/common/PageContainer";
import Deck from "@/components/common/Deck";
import { Progress } from "@/components/ui/progress";
import useStudyCardsStore from "@/store/studyCardsStore";
import { isEmpty } from "@/helpers";

const LearningPage = () => {
  const studyCardIndex = useStudyCardsStore((state) => state.studyCardIndex);
  const studyCards = useStudyCardsStore((state) => state.studyCards);
  const total = studyCards.length;
  const current = studyCardIndex + 1;
  const percentage = ((current / total) * 100).toFixed(1);

  return (
    <PageContainer>
      {!isEmpty(studyCards) && (
        <>
          <div className="w-full flex justify-between items-end">
            <p>{`${current}/${total}`}</p>
            <p>{percentage}%</p>
          </div>
          <Progress
            indicatorClassName="bg-amber-200 dark:bg-primary"
            value={Number(percentage)}
          />
        </>
      )}
      <Deck />
    </PageContainer>
  );
};

export default LearningPage;
