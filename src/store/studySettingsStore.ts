import type { Mode } from "@/types";
import { create } from "zustand";
import createSelectors from "./createSelectors";

type StudySettingsState = {
  deckName: string;
  wordNumber: number | "custom";
  customWordNumber: number;
  mode: Mode | "";
};

type StudySettingsActions = {
  setDeckName: (value: string) => void;
  setWordNumber: (value: number | "custom") => void;
  setCustomWordNumber: (value: number) => void;
  setMode: (value: Mode | "") => void;
  resetStudySettings: () => void;
};

const useStudySettingsBase = create<
  StudySettingsState & StudySettingsActions
>()((set, get, store) => ({
  deckName: "",
  wordNumber: 0,
  customWordNumber: 0,
  mode: "",
  setDeckName: (deckName) => set(() => ({ deckName })),
  setWordNumber: (wordNumber) => set(() => ({ wordNumber })),
  setCustomWordNumber: (customWordNumber) => set(() => ({ customWordNumber })),
  setMode: (mode) => set(() => ({ mode })),
  resetStudySettings: () => set(store.getInitialState()),
}));

const useStudySettings = createSelectors(useStudySettingsBase);

export default useStudySettings;
