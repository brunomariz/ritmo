import React, { useEffect, useState } from "react";

type Props = {
  title: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

function SliderSelector({ title, value, min, max, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="cursor-pointer py-3">
      <div className="text-sm flex justify-end">
        <label className="">{title}:</label>
        <span className="px-2">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        onChange={handleChange}
        className="cursor-pointer w-full"
        value={value}
      />
      <div className="relative flex justify-between text-sm text-gray-500">
        <span className="absolute -top-5 left-0">{min}</span>
        <span className="absolute -top-5 left-[96%]">{max}</span>
      </div>
    </div>
  );
}

export default SliderSelector;
