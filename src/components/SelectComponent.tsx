import React, { type FC, type PropsWithChildren } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import type { Option } from "@/types";

interface Props {
  onSelect: (value: string) => void;
  options: Option[];
  label: string;
  placeholder: string;
}

const SelectComponent: FC<PropsWithChildren<Props>> = ({
  onSelect,
  options,
  label,
  placeholder,
}) => {
  return (
    <Select onValueChange={onSelect}>
      <p className="m-1">{label}</p>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, title }) => (
          <SelectItem key={value} value={value}>
            {title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
