import React from "react";
import FlashcardFront from "./FlashcardFront";
import FlashcardBack from "./FlashcardBack";

const Flashcard = () => {
  return (
    <div className="flex flex-col justify-center items-center w-96 h-1/2 border-amber-600 border rounded-xl">
      <FlashcardFront />
      <FlashcardBack />
    </div>
  );
};

export default Flashcard;
