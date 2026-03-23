import type {
  StudySettingsActions,
  StudySettingsState,
} from "@/store/studySettingsStore";

export const studySettingsPropertySelector = ({
  deckName,
  wordNumber,
  customWordNumber,
  mode,
}: StudySettingsState) => ({
  deckName,
  wordNumber,
  customWordNumber,
  mode,
});

export const studySettingsActionSelector = ({
  setDeckName,
  setWordNumber,
  setCustomWordNumber,
  setMode,
  resetStudySettings,
}: StudySettingsActions) => ({
  setDeckName,
  setWordNumber,
  setCustomWordNumber,
  setMode,
  resetStudySettings,
});
