import { StudyContext } from "@/Context/StudyContextProvider";
import { useContext } from "react";

export const useStudy = () => {
  const context = useContext(StudyContext);

  if (!context) {
    throw new Error("useStudy must be used within StudyContextProvider");
  }

  return context;
};
