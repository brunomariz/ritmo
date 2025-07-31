"use client";
import { generateRandomNotesWeighted } from "@/generators/rhythmGenerator";
import { Note } from "@/@types/rhythm";
import Button from "./Button";
import { InstrumentPitchMap } from "@/constants/pitchMap";

interface GenerateButtonProps {
  setSequence: (sequence: Note[]) => void;
  barCount: number;
  repeatCount: number;
  pitchMap: InstrumentPitchMap;
}

export default function GenerateButton({
  setSequence,
  barCount,
  repeatCount,
  pitchMap,
}: GenerateButtonProps) {
  const handleGenerate = () => {
    const sequence = generateRandomNotesWeighted(
      barCount,
      repeatCount,
      pitchMap
    );
    setSequence(sequence);
  };

  return (
    <Button onClick={handleGenerate} className="bg-blue-500 text-white">
      Generate
    </Button>
  );
}
