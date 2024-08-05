import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

interface ModifySelectProps {
  valueSelected: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

const ModifySelect: React.FC<ModifySelectProps> = ({
  valueSelected,
  onChange,
  children,
}) => {
  return (
    <Select value={valueSelected} onValueChange={onChange}>
      <SelectTrigger>{valueSelected || "Select an option"}</SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
};

export default ModifySelect;
