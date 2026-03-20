import { Mode, type DeckType, type Option } from "@/types";

export const JapaneseDeckOptions: Option[] = [
  { title: "N5", value: "N5" },
  { title: "N4", value: "N4" },
  { title: "N3", value: "N3" },
  { title: "N2", value: "N2" },
  { title: "N1", value: "N1" },
];

export const WordNumberOptions: Option[] = [
  { title: "10", value: "10" },
  { title: "20", value: "20" },
  { title: "30", value: "30" },
  { title: "Custom", value: "custom" },
];

export const ModeOptions: Option[] = [
  { title: "Review", value: Mode.REVIEW },
  { title: "New Cards", value: Mode.NEW },
  { title: "Mixed", value: Mode.MIXED },
  { title: "Test", value: Mode.TEST },
];

export const N3Deck: DeckType = {
  id: "1",
  name: "Japanese N3 Vocabulary",
  flashcards: [
    {
      id: "1",
      word: "単語",
      pronunciation: "たんご",
      meaning: "單字",
      wordType: "名詞",
      pitchAccent: 2,
      example: "この単語を覚えてください。",
      cloze: "この____を覚えてください。",
      learningState: null,
    },
    {
      id: "2",
      word: "食べる",
      pronunciation: "たべる",
      meaning: "吃東西",
      wordType: "動詞",
      pitchAccent: 2,
      example: "昼ご飯を食べましたか。",
      cloze: "昼ご飯を________か。",
      learningState: null,
    },
  ],
};

export const JapaneseDecks: { [key: string]: DeckType } = {
  N5: {
    id: "1",
    name: "Japanese N5 Vocabulary",
    flashcards: [
      {
        id: "1",
        word: "単語",
        pronunciation: "たんご",
        meaning: "單字",
        wordType: "名詞",
        pitchAccent: 2,
        example: "この単語を覚えてください。",
        cloze: "この____を覚えてください。",
        learningState: null,
      },
      {
        id: "2",
        word: "食べる",
        pronunciation: "たべる",
        meaning: "吃東西",
        wordType: "動詞",
        pitchAccent: 2,
        example: "昼ご飯を食べましたか。",
        cloze: "昼ご飯を________か。",
        learningState: null,
      },
    ],
  },
  N4: {
    id: "1",
    name: "Japanese N4 Vocabulary",
    flashcards: [
      {
        id: "1",
        word: "単語",
        pronunciation: "たんご",
        meaning: "單字",
        wordType: "名詞",
        pitchAccent: 2,
        example: "この単語を覚えてください。",
        cloze: "この____を覚えてください。",
        learningState: null,
      },
      {
        id: "2",
        word: "食べる",
        pronunciation: "たべる",
        meaning: "吃東西",
        wordType: "動詞",
        pitchAccent: 2,
        example: "昼ご飯を食べましたか。",
        cloze: "昼ご飯を________か。",
        learningState: null,
      },
    ],
  },
  N3: {
    id: "1",
    name: "Japanese N3 Vocabulary",
    flashcards: [
      {
        id: "1",
        word: "単語",
        pronunciation: "たんご",
        meaning: "單字",
        wordType: "名詞",
        pitchAccent: 2,
        example: "この単語を覚えてください。",
        cloze: "この____を覚えてください。",
        learningState: null,
      },
      {
        id: "2",
        word: "食べる",
        pronunciation: "たべる",
        meaning: "吃東西",
        wordType: "動詞",
        pitchAccent: 2,
        example: "昼ご飯を食べましたか。",
        cloze: "昼ご飯を________か。",
        learningState: null,
      },
    ],
  },
  N2: {
    id: "1",
    name: "Japanese N2 Vocabulary",
    flashcards: [
      {
        id: "1",
        word: "単語",
        pronunciation: "たんご",
        meaning: "單字",
        wordType: "名詞",
        pitchAccent: 2,
        example: "この単語を覚えてください。",
        cloze: "この____を覚えてください。",
        learningState: null,
      },
      {
        id: "2",
        word: "食べる",
        pronunciation: "たべる",
        meaning: "吃東西",
        wordType: "動詞",
        pitchAccent: 2,
        example: "昼ご飯を食べましたか。",
        cloze: "昼ご飯を________か。",
        learningState: null,
      },
    ],
  },
  N1: {
    id: "1",
    name: "Japanese N1 Vocabulary",
    flashcards: [
      {
        id: "1",
        word: "単語",
        pronunciation: "たんご",
        meaning: "單字",
        wordType: "名詞",
        pitchAccent: 2,
        example: "この単語を覚えてください。",
        cloze: "この____を覚えてください。",
        learningState: null,
      },
      {
        id: "2",
        word: "食べる",
        pronunciation: "たべる",
        meaning: "吃東西",
        wordType: "動詞",
        pitchAccent: 2,
        example: "昼ご飯を食べましたか。",
        cloze: "昼ご飯を________か。",
        learningState: null,
      },
    ],
  },
};
