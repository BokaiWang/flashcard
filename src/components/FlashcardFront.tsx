import React, { type FC, type PropsWithChildren } from "react";
import type { FlashcardType } from "@/types";
interface Props {
  flashcard: FlashcardType;
}

const FlashcardFront: FC<PropsWithChildren<Props>> = ({ flashcard }) => {
  return (
    <div className="absolute backface-hidden p-3 flex flex-col justify-center items-center">
      <p>
        {flashcard.word}
        <span>{flashcard.pitchAccent}</span>
      </p>
      <p>{flashcard.reading}</p>
      <p>{flashcard.wordType}</p>
    </div>
  );
};

export default FlashcardFront;
