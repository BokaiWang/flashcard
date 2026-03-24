import React, {
  type ChangeEvent,
  type FC,
  type PropsWithChildren,
} from "react";
import { Input } from "./ui/input";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  label: string;
  placeholder: string;
}

const InputComponent: FC<PropsWithChildren<Props>> = ({
  onChange,
  label,
  placeholder,
}) => {
  return (
    <div>
      <p className="m-1">{label}</p>
      <Input
        className="h-14! text-2xl!"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
