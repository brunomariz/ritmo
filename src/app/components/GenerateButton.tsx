"use client";
import { generateRandomNotesWeighted } from "@/generators/rhythmGenerator";
import { Note, PitchMap } from "@/@types/rhythm";
import Button from "./Button";

interface GenerateButtonProps {
  setSequence: (sequence: Note[]) => void;
  barCount: number;
  pitchMap: PitchMap;
}

export default function GenerateButton({
  setSequence,
  barCount,
  pitchMap,
}: GenerateButtonProps) {
  const handleGenerate = () => {
    const sequence = generateRandomNotesWeighted(barCount, pitchMap);
    setSequence(sequence);
  };

  return (
    <Button onClick={handleGenerate} className="bg-blue-500 text-white">
      Generate
    </Button>
  );
}
