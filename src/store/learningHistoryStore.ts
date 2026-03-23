import type { DeckType, LearningState } from "@/types";
import { create } from "zustand";
import { cloneDeep, set as setLodash } from "lodash";
import { isEmpty } from "@/helpers";
import createSelectors from "./createSelectors";
import { devtools } from "zustand/middleware";

type LearningHistoryState = {
  decks: { [key: string]: DeckType };
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

const useLearningHistoryBase = create<
  LearningHistoryState & LearningHistoryActions
>()(
  devtools((set) => ({
    decks: {},
    addNewDeck: (newDeck: DeckType) =>
      set(
        (prevState) => ({
          decks: { ...prevState.decks, [newDeck.id]: { ...newDeck } },
        }),
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

            return { ...prevState, decks: { ...newDecks } };
          }
          return prevState;
        },
        true,
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
            return { ...prevState, decks: { ...newDecks } };
          }
          return prevState;
        },
        true,
        "updateCardLastReviewedAt",
      ),
  })),
);

const useLearningHistory = createSelectors(useLearningHistoryBase);

export default useLearningHistory;
