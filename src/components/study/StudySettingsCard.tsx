import {
  JapaneseDeckOptions,
  WordNumberOptions,
  ModeOptions,
} from "@/data/japaneseDecks";
import InputComponent from "../common/InputComponent";

import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useNavigate } from "react-router";
import { isNaN } from "lodash";
import type { Mode } from "@/types";
import useStudySettings from "@/store/studySettingsStore";
import { isEmpty } from "@/helpers";
import { useShallow } from "zustand/react/shallow";
import {
  studySettingsActionSelector,
  studySettingsPropertySelector,
} from "@/selector/studySettings.selectors";
import SelectComponent from "../common/SelectComponent";

const StudySettingsCard = () => {
  const navigate = useNavigate();

  const { deckName, wordNumber, customWordNumber, mode } = useStudySettings(
    useShallow(studySettingsPropertySelector),
  );

  const { setDeckName, setWordNumber, setCustomWordNumber, setMode } =
    useStudySettings(useShallow(studySettingsActionSelector));

  const shouldDisableGoButton =
    isEmpty(deckName) ||
    (isEmpty(wordNumber) && isEmpty(customWordNumber)) ||
    isEmpty(mode);

  const onStart = () => navigate("/learning");
  return (
    <Card className="bg-amber-100 dark:bg-slate-950 flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle>What do you want to study?</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 mt-10">
        <div>
          <SelectComponent
            onSelect={(value: string) => setDeckName(value)}
            options={JapaneseDeckOptions}
            placeholder={"Select a deck"}
            label={"Select a deck"}
          />
        </div>
        <div>
          <SelectComponent
            onSelect={(value: string) => {
              const convertedValue = Number(value);
              setWordNumber(
                isNaN(convertedValue) ? (value as "custom") : convertedValue,
              );
            }}
            options={WordNumberOptions}
            placeholder={"Select a number"}
            label={"How many words do you want to learn?"}
          />
        </div>
        {wordNumber === "custom" && (
          <div>
            <InputComponent
              onChange={(e) => {
                setCustomWordNumber(Number(e.target.value));
              }}
              label={"Set a number"}
              placeholder={"Set a number"}
            />
          </div>
        )}
        <div>
          <SelectComponent
            onSelect={(value: string) => setMode(value as Mode)}
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
