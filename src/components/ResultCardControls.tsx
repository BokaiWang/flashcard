import React from "react";
import { Button } from "./ui/button";

const ResultCardControls = () => {
  return (
    <div className="flex justify-between w-full">
      <Button
        onClick={(e) => {
          console.log("Retry!");
        }}
        variant={"outline"}
      >
        Retry
      </Button>
      <Button
        onClick={(e) => {
          console.log("Finish!");
        }}
      >
        Finish
      </Button>
    </div>
  );
};

export default ResultCardControls;
