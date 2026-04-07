import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { Router } from "@/routes.constants";

const TestResultCardControls = () => {
  const navigate = useNavigate();
  const onRetry = () =>
    navigate(Router.learningPage, {
      state: { shouldUseTheSameStudyCards: true },
    });
  const onFinish = () => navigate(Router.homePage);
  return (
    <div className="flex justify-between w-full">
      <Button onClick={onRetry} variant={"outline"}>
        Retry
      </Button>
      <Button onClick={onFinish}>Finish</Button>
    </div>
  );
};

export default TestResultCardControls;
