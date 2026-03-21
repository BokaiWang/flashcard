import { Mode, type FlashcardType } from "./types";

export const removeRoutePrefixForwardSlash = (route: string) =>
  route.substring(0);

const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const getStudyCards = (
  cards: FlashcardType[],
  count: number,
  mode: Mode | "",
) => {
  const newCards = cards.filter((c) => c.learningState === null);
  const reviewCards = cards.filter((c) => c.learningState !== null);
  let selected: FlashcardType[] = [];
  console.log("new cards: ", newCards);
  console.log("review cards: ", reviewCards);
  if (mode === Mode.MIXED) {
    selected = [
      ...shuffle(reviewCards).slice(0, Math.floor(count * 0.7)),
      ...shuffle(newCards).slice(0, Math.ceil(count * 0.3)),
    ];
  } else if (mode === Mode.NEW) {
    selected = [...shuffle(newCards).slice(0, count)];
  } else if (mode === Mode.REVIEW) {
    selected = [...shuffle(reviewCards).slice(0, count)];
  }

  console.log("selected cards: ", selected);

  return shuffle(selected);
};
