import { isNil } from "lodash";
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

const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getChoices = <T>(arr: T[], length: number): T[] => {
  const newArray: T[] = [];
  while (newArray.length < length) {
    const item = getRandomItem(arr);
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  }

  return newArray;
};

export const getStudyCards = (
  cards: FlashcardType[],
  count: number,
  mode: Mode | "",
) => {
  const newCards = cards.filter((c) => isEmpty(c.lastReviewedAt));
  const reviewCards = cards.filter((c) => !isEmpty(c.lastReviewedAt));
  let selected: FlashcardType[] = [];
  if (mode === Mode.MIXED) {
    selected = [
      ...shuffle(reviewCards).slice(0, Math.floor(count * 0.7)),
      ...shuffle(newCards).slice(0, Math.ceil(count * 0.3)),
    ];
  } else if (mode === Mode.NEW) {
    selected = [...shuffle(newCards).slice(0, count)];
  } else if (mode === Mode.REVIEW) {
    selected = [...shuffle(reviewCards).slice(0, count)];
  } else if (mode === Mode.TEST) {
    const selectedCards = isEmpty(reviewCards)
      ? []
      : [...shuffle(reviewCards).slice(0, count)];
    const answers = selectedCards.map((card) => card.word);
    selected = selectedCards.map((card) => {
      const choices = getChoices(answers, 4);
      const correctAnswerIndex = choices.findIndex(
        (choice) => choice === card.word,
      );
      if (correctAnswerIndex < 0) {
        choices[3] = card.word;
      }
      return { ...card, choices: shuffle(choices) };
    });
  }

  return shuffle(selected);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value: any) =>
  isNil(value) ||
  value === false ||
  (Object.keys(value).length === 0 && value.constructor === Object) ||
  value.length === 0;
