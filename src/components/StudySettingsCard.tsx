import React from "react";
import {
  JapaneseDeckOptions,
  WordNumberOptions,
  ModeOptions,
} from "@/data/japaneseDecks";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { useNavigate } from "react-router";
import { useStudy } from "@/customHooks/useStudy";
import { isEmpty } from "lodash";
import type { Mode } from "@/types";

const StudySettingsCard = () => {
  const navigate = useNavigate();
  const {
    deck,
    wordNumber,
    customWordNumber,
    mode,
    setDeck,
    setWordNumber,
    setCustomWordNumber,
    setMode,
  } = useStudy();

  const shouldDisableGoButton =
    isEmpty(deck) ||
    (isEmpty(wordNumber) && isEmpty(customWordNumber)) ||
    isEmpty(mode);

  const onStart = () => navigate("/learning");
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle>What do you want to study?</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 mt-10">
        <div>
          <SelectComponent
            onSelect={(value) => setDeck(value)}
            options={JapaneseDeckOptions}
            placeholder={"Select a deck"}
            label={"Select a deck"}
          />
        </div>
        <div>
          <SelectComponent
            onSelect={(value) => setWordNumber(value)}
            options={WordNumberOptions}
            placeholder={"Select a number"}
            label={"How many words do you want to learn?"}
          />
        </div>
        {wordNumber === "custom" && (
          <InputComponent
            onChange={(e) => {
              setCustomWordNumber(e.target.value);
            }}
            label={"Set a number"}
            placeholder={"Set a number"}
          />
        )}
        <div>
          <SelectComponent
            onSelect={(value) => setMode(value as Mode)}
            options={ModeOptions}
            placeholder={"Select a mode"}
            label={"Mode"}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col mt-10 text-sm">
        <Button disabled={shouldDisableGoButton} onClick={onStart}>
          Let's go!!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudySettingsCard;
