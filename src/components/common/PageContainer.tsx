import React, { type FC, type PropsWithChildren } from "react";

const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-[calc(100vh-60px)] flex justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center w-11/12 h-11/12 sm:w-1/2 sm:h-7/8">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
