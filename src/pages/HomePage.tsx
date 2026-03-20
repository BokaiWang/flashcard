import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PageContainer from "@/components/PageContainer";
import SelectComponent from "@/components/SelectComponent";
import {
  JapaneseDeckOptions,
  ModeOptions,
  WordNumberOptions,
} from "@/data/japaneseDecks";
import { Button } from "@/components/ui/button";
import { isEmpty } from "lodash";
import InputComponent from "@/components/InputComponent";
import { useNavigate } from "react-router";
import { useStudy } from "@/customHooks/useStudy";
import type { Mode } from "@/types";

const HomePage = () => {
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
    <PageContainer>
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
    </PageContainer>
  );
};

export default HomePage;
