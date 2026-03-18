type WordType = "名詞" | "副詞" | "助詞" | "い形容詞" | "な形容詞" | "動詞";

export type Flashcard = {
  id: string;

  // core
  word: string; // 単語
  reading: string; // たんご
  meaning: string; // "word"

  // Japanese-specific
  wordType: WordType;
  pitchAccent: number; // 0, 1, 2, 3...

  // optional learning helpers
  example?: string;
  exampleReading?: string;
  exampleMeaning?: string;

  deckId: string;

  // spaced repetition (future)
  lastReviewedAt?: number;
  nextReviewAt?: number;
  interval?: number;
};

export type Deck = {
  id: string;
  name: string; // "N5 Vocabulary"
};
