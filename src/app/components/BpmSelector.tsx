import React from "react";

type Props = { bpm: number; setBpm: (bpm: number) => void };

const BpmSelector = ({ bpm, setBpm }: Props) => {
  return (
    <div>
      <span>BPM:</span>
      <input
        type="number"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        min={30}
        max={300}
        step={1}
        className="border rounded p-2 m-2"
      />
    </div>
  );
};

export default BpmSelector;
