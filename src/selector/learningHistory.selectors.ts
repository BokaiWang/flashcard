import type {
  LearningHistoryActions,
  LearningHistoryState,
} from "@/store/learningHistoryStore";

export const learningHistoryPropertySelector = ({
  decks,
  lastUsedCards,
}: LearningHistoryState) => ({
  decks,
  lastUsedCards,
});

export const learningHistoryActionSelector = ({
  addNewDeck,
  updateCardLastReviewedAt,
  updateCardLearningState,
  updateLastUsedCards,
}: LearningHistoryActions) => ({
  addNewDeck,
  updateCardLastReviewedAt,
  updateCardLearningState,
  updateLastUsedCards,
});
