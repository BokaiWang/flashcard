import type {
  LearningHistoryActions,
  LearningHistoryState,
} from "@/store/learningHistoryStore";

export const learningHistoryPropertySelector = ({
  decks,
  lastUsedCards,
  theme,
}: LearningHistoryState) => ({
  decks,
  lastUsedCards,
  theme,
});

export const learningHistoryActionSelector = ({
  addNewDeck,
  updateCardLastReviewedAt,
  updateCardLearningState,
  updateLastUsedCards,
  updateTheme,
}: LearningHistoryActions) => ({
  addNewDeck,
  updateCardLastReviewedAt,
  updateCardLearningState,
  updateLastUsedCards,
  updateTheme,
});
