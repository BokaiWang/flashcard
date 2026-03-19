import { type DeckType } from "@/types";

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
