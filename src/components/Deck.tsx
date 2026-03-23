import React, { useEffect, useMemo, useState, type FC } from "react";
import Flashcard from "./Flashcard";
import { type LearningState, Mode } from "@/types";
import { useNavigate } from "react-router";
import StudyCard from "./StudyCard";
import { Router } from "@/routes.constants";
import { isEmpty } from "lodash";
import { getStudyCards } from "@/helpers";
import useStudySettings from "@/store/studySettingsStore";
import { JapaneseDecks } from "@/data/japaneseDecks";
import useLearningHistory from "@/store/learningHistoryStore";

const Deck: FC = () => {
  const deckName = useStudySettings.use.deckName();
  const wordNumber = useStudySettings.use.wordNumber();
  const customWordNumber = useStudySettings.use.customWordNumber();
  const mode = useStudySettings.use.mode();
  const addNewDeck = useLearningHistory.use.addNewDeck();
  const historyDecks = useLearningHistory.use.decks();
  const updateLastReviewedAt =
    useLearningHistory.use.updateCardLastReviewedAt();

  const selectedDeck = useMemo(() => {
    if (isEmpty(historyDecks[deckName])) {
      return JapaneseDecks[deckName];
    }
    return historyDecks[deckName];
  }, [deckName, historyDecks]);
  const { flashcards } = selectedDeck;
  const [studyCardIndex, setStudyCardIndex] = useState(0);
  const wordNumberToUse = !isEmpty(customWordNumber)
    ? customWordNumber
    : wordNumber;
  const studyCards = useMemo(
    () => getStudyCards(flashcards, Number(wordNumberToUse), mode),
    [flashcards, wordNumberToUse, mode],
  );

  const isLastCard = studyCardIndex === studyCards.length - 1;
  const isFirstCard = studyCardIndex === 0;
  const navigate = useNavigate();

  const goNext = () => {
    const cardId = studyCards[studyCardIndex].id;
    updateLastReviewedAt(deckName, cardId);
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
    addNewDeck(selectedDeck);
  }, [selectedDeck, addNewDeck]);

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
