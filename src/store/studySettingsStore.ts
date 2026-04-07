import type { Mode } from "@/types";
import { create } from "zustand";

export type StudySettingsState = {
  deckName: string;
  wordNumber: number | "custom";
  customWordNumber: number;
  mode: Mode | "";
};

export type StudySettingsActions = {
  setDeckName: (value: string) => void;
  setWordNumber: (value: number | "custom") => void;
  setCustomWordNumber: (value: number) => void;
  setMode: (value: Mode | "") => void;
  resetStudySettings: () => void;
};

const useStudySettings = create<StudySettingsState & StudySettingsActions>()(
  (set, _, store) => ({
    deckName: "",
    wordNumber: 0,
    customWordNumber: 0,
    mode: "",
    setDeckName: (deckName) => set(() => ({ deckName })),
    setWordNumber: (wordNumber) => set(() => ({ wordNumber })),
    setCustomWordNumber: (customWordNumber) =>
      set(() => ({ customWordNumber })),
    setMode: (mode) => set(() => ({ mode })),
    resetStudySettings: () => set(store.getInitialState()),
  }),
);

// const useStudySettings = createSelectors(useStudySettingsBase);

export default useStudySettings;
