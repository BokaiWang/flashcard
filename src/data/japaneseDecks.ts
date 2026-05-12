import { Mode, type DeckType, type Option } from "@/types";
import { n5Flashcards } from "./n5_vocab";
import { n4Flashcards } from "./n4_vocab";
import { n3Flashcards } from "./n3_vocab";

export const JapaneseDeckOptions: Option[] = [
  { title: "N5", value: "N5" },
  { title: "N4", value: "N4" },
  { title: "N3", value: "N3" },
  // { title: "N2", value: "N2" },
  // { title: "N1", value: "N1" },
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

export const JapaneseDecks: { [key: string]: DeckType } = {
  N5: {
    id: "N5",
    name: "Japanese N5 Vocabulary",
    flashcards: n5Flashcards,
  },
  N4: {
    id: "N4",
    name: "Japanese N4 Vocabulary",
    flashcards: n4Flashcards,
  },
  N3: {
    id: "N3",
    name: "Japanese N3 Vocabulary",
    flashcards: n3Flashcards,
  },
  N2: {
    id: "N2",
    name: "Japanese N2 Vocabulary",
    flashcards: [],
  },
};
