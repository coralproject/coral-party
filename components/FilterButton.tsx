import { FunctionComponent } from "react";
import clsx from "clsx";

interface Props {
  value: string;
  onClick: (value: string) => void;
  selected: boolean;
  children?: React.ReactNode;
}

const FilterButton: FunctionComponent<Props> = ({
  value,
  onClick,
  children,
  selected,
}) => {
  return (
    <button
      className={clsx(
        "border rounded p-2",
        selected ? "bg-white text-blue-600" : "hover:bg-blue-600",
        value && "font-mono"
      )}
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </button>
  );
};

export default FilterButton;
