import type { Mode } from "@/types";
import { create } from "zustand";

type StudySettingsState = {
  deckName: string;
  wordNumber: number | "custom";
  customWordNumber: number;
  mode?: Mode;
};

type StudySettingsActions = {
  setDeckName: (value: string) => void;
  setWordNumber: (value: number | "custom") => void;
  setCustomWordNumber: (value: number) => void;
  setMode: (value: Mode) => void;
};

const useStudySettings = create<StudySettingsState & StudySettingsActions>()(
  (set) => ({
    deckName: "",
    wordNumber: 0,
    customWordNumber: 0,
    mode: undefined,
    setDeckName: (deckName) => set(() => ({ deckName })),
    setWordNumber: (wordNumber) => set(() => ({ wordNumber })),
    setCustomWordNumber: (customWordNumber) =>
      set(() => ({ customWordNumber })),
    setMode: (mode) => set(() => ({ mode })),
  }),
);

export default useStudySettings;
