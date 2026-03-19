import React, { type FC, type PropsWithChildren } from "react";

interface Props {
  pitchAccent: number;
}

const PitchAccent: FC<PropsWithChildren<Props>> = ({ pitchAccent }) => {
  return (
    <div className="rounded-full border-2 h-9 w-9 text-2xl inline-flex justify-center items-center">
      {pitchAccent}
    </div>
  );
};

export default PitchAccent;
