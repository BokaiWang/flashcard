import React, {
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import Flashcard from "./Flashcard";
import { type LearningState, type DeckType, Mode } from "@/types";
import { useNavigate } from "react-router";
import { useStudy } from "@/customHooks/useStudy";
import StudyCard from "./StudyCard";
import { Router } from "@/routes.constants";
import { useReadDeck } from "@/customHooks/useReadDeck";
import { isEmpty } from "lodash";
import { getStudyCards } from "@/helpers";

interface Props {
  deck: DeckType;
}

const Deck: FC<PropsWithChildren<Props>> = ({ deck }) => {
  const { flashcards } = deck;
  const [studyCardIndex, setStudyCardIndex] = useState(0);
  const { mode, wordNumber, customWordNumber } = useStudy();
  const { readDeck, setReadDeck } = useReadDeck();
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
    setReadDeck([
      ...readDeck,
      { ...studyCards[studyCardIndex], lastReviewedAt: new Date() },
    ]);
    if (isLastCard) {
      navigate(Router.learningResultPage);
    } else {
      setStudyCardIndex(studyCardIndex + 1);
    }
  };

  const goPrevious = () => {
    setReadDeck([...readDeck.slice(0, readDeck.length)]);
    setStudyCardIndex(studyCardIndex - 1);
  };

  const onAnswer = (answer: LearningState) => {
    setReadDeck([
      ...readDeck,
      { ...studyCards[studyCardIndex], learningState: answer },
    ]);
    if (!isLastCard) {
      setStudyCardIndex(studyCardIndex + 1);
    } else {
      navigate(Router.testResultPage);
    }
  };

  if (mode !== Mode.TEST) {
    return (
      <StudyCard
        deck={deck}
        flashcard={studyCards[studyCardIndex]}
        goNext={goNext}
        goPrevious={goPrevious}
        isFirstCard={isFirstCard}
      />
    );
  } else {
    return (
      <Flashcard
        deck={deck}
        flashcard={studyCards[studyCardIndex]}
        onAnswer={onAnswer}
        isLastCard={isLastCard}
      />
    );
  }
};

export default Deck;
