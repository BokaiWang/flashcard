type WordType = "名詞" | "副詞" | "助詞" | "い形容詞" | "な形容詞" | "動詞";

export enum LearningState {
  NOT_FAMILIAR = "NOT_FAMILIAR",
  REMEMBERED = "REMEMBERED",
  FORGOT = "FORGOT",
}

export type FlashcardType = {
  id: string;
  word: string; // 単語
  pronunciation: string; // たんご
  meaning: string; // "word"

  // Japanese-specific
  wordType: WordType;
  pitchAccent: number; // 0, 1, 2, 3...
  example?: string;
  learningState: LearningState | null;
  cloze: string;

  // spaced repetition (future)
  lastReviewedAt?: number;
  nextReviewAt?: number;
  interval?: number;
};

export type DeckType = {
  id: string;
  name: string; // "N5 Vocabulary"
  flashcards: FlashcardType[];
};
