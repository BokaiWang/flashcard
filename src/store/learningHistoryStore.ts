import type { DeckType, FlashcardType, LearningState } from "@/types";
import { create } from "zustand";
import { cloneDeep, set as setLodash } from "lodash";
import { isEmpty } from "@/helpers";
import { devtools } from "zustand/middleware";

export type LearningHistoryState = {
  decks: { [key: string]: DeckType };
  lastUsedCards: FlashcardType[];
};

export type LearningHistoryActions = {
  addNewDeck: (newDeck: DeckType) => void;
  updateCardLearningState: (
    deckName: string,
    cardId: string,
    learningState: LearningState,
  ) => void;
  updateCardLastReviewedAt: (deckName: string, cardId: string) => void;
  updateLastUsedCards: (lastUsedCards: FlashcardType[]) => void;
};

const useLearningHistory = create<
  LearningHistoryState & LearningHistoryActions
>()(
  devtools((set) => ({
    decks: {},
    lastUsedCards: [],
    addNewDeck: (newDeck: DeckType) =>
      set(
        (prevState) => {
          if (prevState.decks?.[newDeck.id] !== newDeck) {
            return {
              decks: { ...prevState.decks, [newDeck.id]: { ...newDeck } },
            };
          }
          return prevState;
        },
        undefined,
        "addNewDeck",
      ),
    updateCardLearningState: (
      deckId: string,
      cardId: string,
      learningState: LearningState,
    ) =>
      set(
        (prevState) => {
          const cloned = cloneDeep(prevState);
          const { decks } = cloned;
          const selectedDeck = decks?.[deckId];
          if (!isEmpty(selectedDeck)) {
            const indexToCard = selectedDeck.flashcards.findIndex(
              (card) => card.id === cardId,
            );

            const newDecks = setLodash(
              decks,
              [deckId, "flashcards", indexToCard, "learningState"],
              learningState,
            );

            return { decks: { ...newDecks } };
          }
          return prevState;
        },
        false,
        "updateCardLearningState",
      ),

    updateCardLastReviewedAt: (deckId: string, cardId: string) =>
      set(
        (prevState) => {
          const cloned = cloneDeep(prevState);
          const { decks } = cloned;
          const selectedDeck = decks?.[deckId];
          if (!isEmpty(selectedDeck)) {
            const indexToCard = selectedDeck.flashcards.findIndex(
              (card) => card.id === cardId,
            );
            const newDecks = setLodash(
              decks,
              [deckId, "flashcards", indexToCard, "lastReviewedAt"],
              new Date(),
            );
            return { decks: { ...newDecks } };
          }
          return prevState;
        },
        false,
        "updateCardLastReviewedAt",
      ),
    updateLastUsedCards: (cards: FlashcardType[]) =>
      set(() => ({ lastUsedCards: cards }), false, "updateLastUsedCards"),
  })),
);

// const useLearningHistory = createSelectors(useLearningHistoryBase);

export default useLearningHistory;
