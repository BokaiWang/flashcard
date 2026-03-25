import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type TestSessionState = {
  correctAnswers: string[];
  choices: string[];
};

export type TestSessionActions = {
  updateCorrectAnswers: (answers: string[]) => void;
  updateChoices: (choice: string) => void;
};

const useTestSession = create<TestSessionState & TestSessionActions>()(
  devtools((set) => ({
    correctAnswers: [],
    choices: [],
    updateCorrectAnswers: (answers) =>
      set(
        () => ({ correctAnswers: answers }),
        undefined,
        "updateCorrectAnswers",
      ),
    updateChoices: (choice) =>
      set(
        (state) => ({ choices: [...state.choices, choice] }),
        undefined,
        "updateChoices",
      ),
  })),
);

export default useTestSession;
