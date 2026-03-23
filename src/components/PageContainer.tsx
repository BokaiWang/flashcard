import React, { type FC, type PropsWithChildren } from "react";

const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/2 h-3/4">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
