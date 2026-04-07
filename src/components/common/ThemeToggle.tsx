import {
  learningHistoryActionSelector,
  learningHistoryPropertySelector,
} from "@/selector/learningHistory.selectors";
import useLearningHistory from "@/store/learningHistoryStore";
import { Moon, Sun } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

const ThemeToggle = () => {
  const { theme } = useLearningHistory(
    useShallow(learningHistoryPropertySelector),
  );
  const { updateTheme } = useLearningHistory(
    useShallow(learningHistoryActionSelector),
  );

  const onToggleTheme = () => {
    if (theme === "DARK") {
      updateTheme("LIGHT");
    } else {
      updateTheme("DARK");
    }
  };

  return (
    <div
      onClick={onToggleTheme}
      className="flex justify-center items-center bg-amber-50 hover:bg-amber-200 rounded-sm w-8 h-8 dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer"
    >
      {theme === "DARK" ? <Moon /> : <Sun />}
    </div>
  );
};

export default ThemeToggle;
