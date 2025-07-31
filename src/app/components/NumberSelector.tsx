import React from "react";

type Props = {
  title: React.ReactNode;
  state: number;
  min?: number;
  max?: number;
  setState: (state: number) => void;
};

const NumberSelector = ({
  title,
  state,
  setState,
  min = 1,
  max = 1000,
}: Props) => {
  return (
    <div className="flex">
      {title}:
      <input
        type="number"
        value={state}
        onChange={(e) => setState(Number(e.target.value))}
        min={min}
        max={max}
        step={1}
        className="border rounded p-2 m-2"
      />
    </div>
  );
};

export default NumberSelector;
