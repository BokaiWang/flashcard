import type { TestSessionActions, TestSessionState } from "@/store/testSession";

export const testSessionPropertySelector = ({
  correctAnswers,
  choices,
}: TestSessionState) => ({
  correctAnswers,
  choices,
});

export const testSessionActionSelector = ({
  updateCorrectAnswers,
  updateChoices,
}: TestSessionActions) => ({
  updateCorrectAnswers,
  updateChoices,
});
