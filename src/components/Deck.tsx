import React, { useEffect, useMemo, useState, type FC } from "react";
import Flashcard from "./Flashcard";
import { type LearningState, Mode } from "@/types";
import { useLocation, useNavigate } from "react-router";
import StudyCard from "./StudyCard";
import { Router } from "@/routes.constants";
import { isEmpty } from "lodash";
import { getStudyCards } from "@/helpers";
import useStudySettings from "@/store/studySettingsStore";
import { JapaneseDecks } from "@/data/japaneseDecks";
import useLearningHistory from "@/store/learningHistoryStore";
import { useShallow } from "zustand/react/shallow";
import { studySettingsPropertySelector } from "@/selector/studySettings.selectors";
import {
  learningHistoryActionSelector,
  learningHistoryPropertySelector,
} from "@/selector/learningHistory.selectors";

const Deck: FC = () => {
  const { state: locationState } = useLocation();
  const { deckName, wordNumber, customWordNumber, mode } = useStudySettings(
    useShallow(studySettingsPropertySelector),
  );

  const { decks: historyDecks, lastUsedCards } = useLearningHistory(
    useShallow(learningHistoryPropertySelector),
  );
  const { addNewDeck, updateCardLastReviewedAt, updateLastUsedCards } =
    useLearningHistory(useShallow(learningHistoryActionSelector));

  const selectedDeck = useMemo(() => {
    if (isEmpty(historyDecks[deckName])) {
      return JapaneseDecks[deckName];
    }
    return historyDecks[deckName];
  }, [deckName]);

  const { flashcards } = selectedDeck;
  const [studyCardIndex, setStudyCardIndex] = useState(0);
  const wordNumberToUse = !isEmpty(customWordNumber)
    ? customWordNumber
    : wordNumber;
  const studyCards = useMemo(() => {
    if (locationState?.shouldUseTheSameStudyCards) {
      return lastUsedCards;
    }

    const studyCards = getStudyCards(flashcards, Number(wordNumberToUse), mode);
    updateLastUsedCards(studyCards);
    return studyCards;
  }, [
    flashcards,
    wordNumberToUse,
    mode,
    locationState?.shouldUseTheSameStudyCards,
    updateLastUsedCards,
  ]);

  const isLastCard = studyCardIndex === studyCards.length - 1;
  const isFirstCard = studyCardIndex === 0;
  const navigate = useNavigate();

  const goNext = () => {
    const cardId = studyCards[studyCardIndex].id;
    updateCardLastReviewedAt(deckName, cardId);

    if (isLastCard) {
      navigate(Router.learningResultPage);
    } else {
      setStudyCardIndex(studyCardIndex + 1);
    }
  };

  const goPrevious = () => {
    setStudyCardIndex(studyCardIndex - 1);
  };

  const onAnswer = (answer: LearningState) => {
    if (!isLastCard) {
      setStudyCardIndex(studyCardIndex + 1);
    } else {
      navigate(Router.testResultPage);
    }
  };

  useEffect(() => {
    if (isEmpty(historyDecks[deckName])) {
      addNewDeck(selectedDeck);
    }
  }, [historyDecks, deckName, selectedDeck]);

  if (mode !== Mode.TEST) {
    return (
      <StudyCard
        flashcard={studyCards[studyCardIndex]}
        goNext={goNext}
        goPrevious={goPrevious}
        isFirstCard={isFirstCard}
      />
    );
  } else {
    return (
      <Flashcard
        flashcard={studyCards[studyCardIndex]}
        onAnswer={onAnswer}
        isLastCard={isLastCard}
      />
    );
  }
};

export default Deck;
