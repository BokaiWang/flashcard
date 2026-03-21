import type { DeckType, LearningState } from "@/types";
import { create } from "zustand";
import { cloneDeep } from "lodash";

type LearningHistoryState = {
  decks: DeckType[];
};

type LearningHistoryActions = {
  addNewDeck: (newDeck: DeckType) => void;
  updateCardLearningState: (
    deckName: string,
    cardId: string,
    learningState: LearningState,
  ) => void;
  updateCardLastReviewedAt: (deckName: string, cardId: string) => void;
};

const useLearningHistory = create<
  LearningHistoryState & LearningHistoryActions
>()((set) => ({
  decks: [],
  addNewDeck: (newDeck: DeckType) =>
    set((prevState) => ({ decks: [...prevState.decks, newDeck] })),
  updateCardLearningState: (
    deckName: string,
    cardId: string,
    learningState: LearningState,
  ) =>
    set((prevState) => {
      const cloned = cloneDeep(prevState);
      const { decks } = cloned;
      const indexToDeck = decks.findIndex((deck) => deckName === deck.name);
      const indexToCard = decks[indexToDeck].flashcards.findIndex(
        (card) => card.id === cardId,
      );
      cloned.decks[indexToDeck].flashcards[indexToCard].learningState =
        learningState;
      return cloned;
    }, true),

  updateCardLastReviewedAt: (deckName: string, cardId: string) =>
    set((prevState) => {
      const cloned = cloneDeep(prevState);
      const { decks } = cloned;
      const indexToDeck = decks.findIndex((deck) => deckName === deck.name);
      const indexToCard = decks[indexToDeck].flashcards.findIndex(
        (card) => card.id === cardId,
      );
      cloned.decks[indexToDeck].flashcards[indexToCard].lastReviewedAt =
        new Date();
      return cloned;
    }, true),
}));

export default useLearningHistory;
