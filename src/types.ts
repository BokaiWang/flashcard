type WordType =
  | "名詞"
  | "副詞"
  | "助詞"
  | "い形容詞"
  | "な形容詞"
  | "動詞"
  | string;

export enum LearningState {
  NEW = "NEW",
  NOT_FAMILIAR = "NOT_FAMILIAR",
  MASTERED = "MASTERED",
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
  choices?: string[];

  // spaced repetition (future)
  lastReviewedAt?: Date;
  nextReviewAt?: Date;
  interval?: number;
};

export type DeckType = {
  id: string;
  name: string; // "N5 Vocabulary"
  flashcards: FlashcardType[];
};

export enum Mode {
  REVIEW = "REVIEW",
  NEW = "NEW",
  MIXED = "MIXED",
  TEST = "TEST",
}

export type Option = {
  title: string;
  value: string;
};
