import React, { type FC, type PropsWithChildren } from "react";

const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-96 h-2/3 bg-accent text-accent-foreground rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
