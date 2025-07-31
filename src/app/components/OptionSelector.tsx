import React from "react";

type Props<T> = {
  title: React.ReactNode;
  options: { value: T; label: string }[];
  selectedValue: T;
  onSelect: (value: T) => void;
};

const OptionSelector = <T,>({
  title,
  options,
  selectedValue,
  onSelect,
}: Props<T>) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">{title}:</span>
      <select
        value={String(selectedValue)}
        onChange={(e) => {
          const option = options.find(
            (opt) => String(opt.value) === e.target.value
          );
          if (option) {
            onSelect(option.value);
          }
        }}
        className="border rounded p-4 m-2 text-lg h-12 bg-white"
      >
        {options.map((option, index) => (
          <option key={index} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionSelector;
