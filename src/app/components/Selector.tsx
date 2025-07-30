import React from "react";

type Props = {
  title: string;
  state: number;
  setState: (state: number) => void;
};

const Selector = ({ title, state, setState }: Props) => {
  return (
    <div>
      <span>{title}:</span>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(Number(e.target.value))}
        min={0}
        max={1000}
        step={1}
        className="border rounded p-2 m-2"
      />
    </div>
  );
};

export default Selector;
