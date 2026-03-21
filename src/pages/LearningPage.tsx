import React from "react";
import PageContainer from "@/components/PageContainer";
import { useStudy } from "@/customHooks/useStudy";
import Deck from "@/components/Deck";
import { JapaneseDecks } from "@/data/japaneseDecks";

const LearningPage = () => {
  const { deck } = useStudy();
  const selectedDeck = JapaneseDecks[deck];

  return (
    <PageContainer>
      <Deck deck={selectedDeck} />
    </PageContainer>
  );
};

export default LearningPage;
