import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Router } from "@/routes.constants";
import { useNavigate } from "react-router";
import useStudySettings from "@/store/studySettingsStore";
import { useShallow } from "zustand/react/shallow";
import {
  studySettingsActionSelector,
  studySettingsPropertySelector,
} from "@/selector/studySettings.selectors";

const NoReviewCard = () => {
  const { deckName } = useStudySettings(
    useShallow(studySettingsPropertySelector),
  );
  const { resetStudySettings } = useStudySettings(
    useShallow(studySettingsActionSelector),
  );
  const navigate = useNavigate();
  const onBackToStudySettings = () => {
    resetStudySettings();
    navigate(Router.homePage);
  };
  return (
    <Card className="bg-amber-100 dark:bg-slate-950 flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl m-auto">{deckName}</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl flex flex-col justify-center items-center gap-5 h-full mb-20">
        <div className="flex flex-col gap-3 justify-center items-center w-full py-6">
          <p>
            Whoa! You have nothing to review~ Try learning a few words first!
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button onClick={onBackToStudySettings}>Back to Study Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default NoReviewCard;
