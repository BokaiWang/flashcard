import React from "react";

const FlashcardBack = () => {
  return (
    <div className="absolute backface-hidden rotate-y-180">
      <p>word</p>
      <p>この単語を覚えてください。</p>
    </div>
  );
};

export default FlashcardBack;
