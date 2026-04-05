import type { FlashcardType } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type StudyCardsState = {
  studyCards: FlashcardType[];
  studyCardIndex: number;
};

export type StudyCardsActions = {
  updateStudyCards: (cards: FlashcardType[]) => void;
  updateStudyCardIndex: (cardIndex: number) => void;
};

const useStudyCardsStore = create<StudyCardsState & StudyCardsActions>()(
  devtools((set) => ({
    studyCards: [],
    studyCardIndex: 0,
    updateStudyCards: (cards) =>
      set(() => ({ studyCards: cards }), false, "updateStudyCards"),
    updateStudyCardIndex: (cardIndex) =>
      set(() => ({ studyCardIndex: cardIndex }), false, "updateStudyCardIndex"),
  })),
);

export default useStudyCardsStore;
