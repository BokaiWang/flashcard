import React from "react";
import PageContainer from "@/components/PageContainer";
import { useStudy } from "@/customHooks/useStudy";

const LearningPage = () => {
  const context = useStudy();

  return <PageContainer>Learning page</PageContainer>;
};

export default LearningPage;
