import React, { useState } from "react";
import FlashcardFront from "./FlashcardFront";
import FlashcardBack from "./FlashcardBack";
import { cn } from "@/lib/utils";

const Flashcard = () => {
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => setFlipped(!flipped);
  return (
    <div
      className={cn(
        "perspective-distant flex flex-col justify-center items-center w-96 h-1/2 bg-accent text-accent-foreground rounded-xl transition-transform duration-500 transform-3d",
        flipped && "rotate-y-180",
      )}
      onClick={flipCard}
    >
      <FlashcardFront />
      <FlashcardBack />
    </div>
  );
};

export default Flashcard;
