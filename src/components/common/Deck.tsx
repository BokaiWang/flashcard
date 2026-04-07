import { useEffect, useMemo, type FC } from "react";
import TestCard from "../test/TestCard";
import { type LearningState, Mode } from "@/types";
import { useLocation, useNavigate } from "react-router";
import StudyCard from "../study/StudyCard";
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
import NoTestCard from "../test/NoTestCard";
import useTestSession from "@/store/testSession";
import { testSessionActionSelector } from "@/selector/testSession.selectors";
import useStudyCardsStore from "@/store/studyCardsStore";
import NoReviewCard from "../study/NoReviewCard";

const Deck: FC = () => {
  const { state: locationState } = useLocation();
  const { deckName, wordNumber, customWordNumber, mode } = useStudySettings(
    useShallow(studySettingsPropertySelector),
  );

  const { decks: historyDecks, lastUsedCards } = useLearningHistory(
    useShallow(learningHistoryPropertySelector),
  );
  const {
    addNewDeck,
    updateCardLastReviewedAt,
    updateLastUsedCards,
    updateCardLearningState,
  } = useLearningHistory(useShallow(learningHistoryActionSelector));

  const { updateCorrectAnswers } = useTestSession(
    useShallow(testSessionActionSelector),
  );
  const updateStudyCards = useStudyCardsStore(
    (state) => state.updateStudyCards,
  );
  const updateStudyCardIndex = useStudyCardsStore(
    (state) => state.updateStudyCardIndex,
  );

  const studyCardIndex = useStudyCardsStore((state) => state.studyCardIndex);

  const selectedDeck = useMemo(() => {
    if (isEmpty(historyDecks[deckName])) {
      return JapaneseDecks[deckName];
    }
    return historyDecks[deckName];
  }, [deckName]);

  const { flashcards } = selectedDeck;

  const wordNumberToUse = !isEmpty(customWordNumber)
    ? customWordNumber
    : wordNumber;
  const studyCards = useMemo(() => {
    if (locationState?.shouldUseTheSameStudyCards) {
      return lastUsedCards;
    }

    const studyCards = getStudyCards(flashcards, Number(wordNumberToUse), mode);
    updateLastUsedCards(studyCards);
    updateStudyCards(studyCards);

    if (mode === Mode.TEST) {
      updateCorrectAnswers(studyCards.map((card) => card.word));
    }
    return studyCards;
  }, [
    flashcards,
    wordNumberToUse,
    mode,
    locationState?.shouldUseTheSameStudyCards,
    updateLastUsedCards,
    updateCorrectAnswers,
    updateStudyCards,
  ]);

  useEffect(() => {
    updateStudyCardIndex(0);
  }, []);

  const isLastCard = studyCardIndex === studyCards.length - 1;
  const isFirstCard = studyCardIndex === 0;
  const navigate = useNavigate();

  const goNext = () => {
    const cardId = studyCards[studyCardIndex].id;
    updateCardLastReviewedAt(deckName, cardId);

    if (isLastCard) {
      navigate(Router.learningResultPage);
    } else {
      updateStudyCardIndex(studyCardIndex + 1);
    }
  };

  const goPrevious = () => {
    updateStudyCardIndex(studyCardIndex - 1);
  };

  const onAnswerLearningState = (answer: LearningState) => {
    const cardId = studyCards[studyCardIndex].id;
    updateCardLearningState(deckName, cardId, answer);
    if (!isLastCard) {
      updateStudyCardIndex(studyCardIndex + 1);
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
    if (isEmpty(studyCards)) {
      return <NoReviewCard />;
    } else {
      return (
        <StudyCard
          flashcard={studyCards[studyCardIndex]}
          goNext={goNext}
          goPrevious={goPrevious}
          isFirstCard={isFirstCard}
        />
      );
    }
  } else {
    if (isEmpty(studyCards)) {
      return <NoTestCard />;
    } else {
      return (
        <TestCard
          cardIndex={studyCardIndex}
          flashcard={studyCards[studyCardIndex]}
          onAnswerLearningState={onAnswerLearningState}
          isLastCard={isLastCard}
        />
      );
    }
  }
};

export default Deck;
