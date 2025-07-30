import React from "react";

type Props = { bpm: number; setBpm: (bpm: number) => void };

const BpmSelector = ({ bpm, setBpm }: Props) => {
  return (
    <div>
      BPM:
      <input
        type="number"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        min={30}
        max={300}
        step={1}
        className="p-2"
      />
    </div>
  );
};

export default BpmSelector;
